import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });

export default function(to, from, next) {
    // Kiểm tra token
    const token = localStorage.getItem('token_admin');
    if (!token) {
        localStorage.removeItem('name_admin');
        localStorage.removeItem('email_admin');
        localStorage.removeItem('token_admin');
        next("/nhan-vien/dang-nhap");
        toaster.error('Vui lòng đăng nhập để tiếp tục');
        return;
    }

    // Kiểm tra đăng nhập và quyền
    axios.get("http://127.0.0.1:8000/api/nhan-vien/kiem-tra-dang-nhap", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then((res) => {
        if (res.data.status) {
            // Lưu thông tin admin
            localStorage.setItem('name_admin', res.data.name);
            localStorage.setItem('email_admin', res.data.email);
            localStorage.setItem('token_admin', res.data.status);

            // Map route với ID chức năng
            const routePermissions = {
                '/admin/ql-dich-vu': 4,        // Quản Lý Dịch Vụ
                '/admin/ql-loai-dich-vu': 4,   // Quản Lý Loại Dịch Vụ
                '/admin/ql-khach-hang': 6,     // Quản Lý Khách Hàng
                '/admin/ql-pet': 6,            // Quản Lý Pet
                '/admin/ql-luong': 7,          // Quản Lý Lương
                '/admin/ql-thuoc': 8,          // Quản Lý Thuốc
                '/admin/ql-nhan-vien': 8,      // Quản Lý Nhân Viên
                '/admin/ql-nha-cung-cap': 9,   // Quản Lý Nhà Cung Cấp
                '/admin/ql-danh-gia': 9,       // Quản Lý Đánh Giá
                '/admin/ql-chuc-vu': 10,       // Quản Lý Chức Vụ
                '/admin/ql-kho': 11,           // Quản Lý Kho
                '/admin/hoa-don': 12,          // Quản Lý Phiếu Nhập
                '/admin/ql-ton-kho': 13,       // Quản Lý Thuốc Kho
                '/admin/phan-quyen': 14,       // Quản Lý Phân Quyền
                '/admin/ql-lich-hen': 15       // Quản Lý Lịch Hẹn
            };

            const functionId = routePermissions[to.path];
            if (functionId) {
                // Kiểm tra xem nhân viên có được phân quyền cho chức năng này không
                axios.get(`http://127.0.0.1:8000/api/phan-quyen/kiem-tra-quyen/${functionId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then((permissionRes) => {
                    if (permissionRes.data.status) {
                        next(); // Cho phép truy cập nếu có quyền
                    } else {
                        toaster.error('Bạn không có quyền truy cập chức năng này');
                        next(false); // Không cho phép truy cập và không chuyển hướng
                    }
                })
                .catch(() => {
                    toaster.error('Bạn không có quyền truy cập chức năng này');
                    next(false); // Không cho phép truy cập và không chuyển hướng
                });
            } else {
                next(); // Cho phép truy cập nếu route không yêu cầu quyền
            }
        } else {
            localStorage.removeItem('name_admin');
            localStorage.removeItem('email_admin');
            localStorage.removeItem('token_admin');
            next("/nhan-vien/dang-nhap");
            toaster.error(res.data.message);
        }
    })
    .catch(() => {
        localStorage.removeItem('name_admin');
        localStorage.removeItem('email_admin');
        localStorage.removeItem('token_admin');
        next("/nhan-vien/dang-nhap");
        toaster.error('Phiên đăng nhập đã hết hạn');
    });
}