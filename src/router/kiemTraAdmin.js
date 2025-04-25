import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-left' });

export default function(to, from, next) {
    // Get token from localStorage
    const token = localStorage.getItem("token_admin");

    // Check login status
    axios
        .get("http://127.0.0.1:8000/api/nhan-vien/kiem-tra-dang-nhap",{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            if (res.data.status) {
                // Store user info
                localStorage.setItem("name_nv", res.data.name);
                localStorage.setItem("mail_nv", res.data.email);
                localStorage.setItem("token_nv", res.data.token);
                
                // Get required permission from route meta
                const requiredPermission = to.meta.permission;
                
                // If route requires permission, check it
                if (requiredPermission) {
                    // Use the middleware directly instead of separate permission check
                    axios
                        .get("http://127.0.0.1:8000/api/dich-vu/load-admin", {
                            headers: {
                                Authorization: 'Bearer ' + token
                            }
                        })
                        .then(() => {
                            next();
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 403) {
                                toaster.error("Bạn không có quyền truy cập chức năng này");
                            } else {
                                toaster.error("Không thể kiểm tra quyền truy cập");
                            }
                            next('/nhan-vien/dang-nhap');
                        });
                } else {
                    next();
                }
            } else {
                localStorage.removeItem("token_nv");
                localStorage.removeItem("mail_nv");
                localStorage.removeItem("name_nv");
                next("/nhan-vien/dang-nhap");
                toaster.error(res.data.message);
            }
        })
        .catch(() => {
            localStorage.removeItem("token_nv");
            localStorage.removeItem("mail_nv");
            localStorage.removeItem("name_nv");
            next("/nhan-vien/dang-nhap");
            toaster.error("Lỗi kết nối máy chủ");
        });
}