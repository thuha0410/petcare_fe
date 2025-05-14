import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-left' });
const API_URL = "http://127.0.0.1:8000/api";

// Kiểm tra token admin
function checkToken() {
    const token = localStorage.getItem("token_admin");
    if (!token) {
        return null;
    }
    return token;
}

// Kết hợp kiểm tra đăng nhập và quyền
export function kiemTraAdminVaQuyen(id_chuc_nang) {
    return async (to, from, next) => {
        const token = checkToken();
        if (!token) {
            toaster.error('Vui lòng đăng nhập');
            return next('/nhan-vien/dang-nhap');
        }

        try {
            // Kiểm tra đăng nhập
            const loginRes = await axios.get(`${API_URL}/nhan-vien/kiem-tra-dang-nhap`, {
                headers: { Authorization: 'Bearer ' + token }
            });
            
            if (!loginRes.data.status) {
                toaster.error(loginRes.data.message || 'Vui lòng đăng nhập lại');
                return next('/nhan-vien/dang-nhap');
            }
            
            // Kiểm tra quyền
            const permRes = await axios.get(
                `${API_URL}/phan-quyen/kiem-tra-quyen/${id_chuc_nang}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            
            if (permRes.data.status === 1) {
                return next();
            } else {
                toaster.error(permRes.data.message || 'Bạn không có quyền truy cập');
                return next(false);
            }
        } catch (error) {
            toaster.error('Lỗi khi xác thực');
            return next('/nhan-vien/dang-nhap');
        }
    };
}