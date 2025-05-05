import { createToaster } from "@meforma/vue-toaster";
import { apiDoctor } from "../services/apiDoctor";

const toaster = createToaster({ position: 'top-left' });

/**
 * Middleware kiểm tra đăng nhập
 * Kiểm tra xem người dùng đã đăng nhập chưa trước khi cho phép truy cập vào các trang yêu cầu xác thực
 */
export default async function (to, from, next) {
    // Kiểm tra cả token admin và token doctor
    const token_admin = localStorage.getItem("token_admin");
    const token_doctor = localStorage.getItem("token_doctor");
    const token = token_admin || token_doctor;

    if (!token) {
        toaster.error('Vui lòng đăng nhập để tiếp tục');
        return next("/nhan-vien/dang-nhap");
    }

    // Kiểm tra xem route hiện tại có phải là route của bác sĩ không
    const isDoctorRoute = to.path.startsWith('/doctor');

    // Nếu là route của bác sĩ và có token_doctor, cho phép truy cập
    if (isDoctorRoute && token_doctor) {
        return next();
    }

    // Nếu là route của admin và có token_admin, cho phép truy cập
    if (!isDoctorRoute && token_admin) {
        return next();
    }

    try {
        // Kiểm tra đăng nhập thông qua API
        const res = await apiDoctor.get("/nhan-vien/kiem-tra-dang-nhap");

        if (res.data.status) {
            // Kiểm tra xem người dùng có quyền truy cập route hiện tại không
            if (isDoctorRoute && !token_doctor) {
                // Nếu là route của bác sĩ nhưng không có token_doctor
                const hasPermission = res.data.permissions &&
                    (res.data.permissions.includes(17) || res.data.permissions.includes('17'));

                if (hasPermission) {
                    next();
                } else {
                    toaster.error('Bạn không có quyền truy cập trang này');
                    next(false);
                }
            } else {
                next();
            }
        } else {
            toaster.error(res.data.message || 'Phiên đăng nhập đã hết hạn');
            next("/nhan-vien/dang-nhap");
        }
    } catch (error) {
        // Lỗi API đã được xử lý trong interceptor
        next("/nhan-vien/dang-nhap");
    }
}
