import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-right' });

export const kiemTraQuyen = async (idChucNang) => {
    try {
        const url = 'http://127.0.0.1:8000/api/NhanVien/kiem-tra-quyen/' + idChucNang;
        const response = await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token_admin")
            }
        });
        
        if (response.data.status) {
            return true;
        } else {
            toaster.error("Bạn không có quyền truy cập chức năng này!");
            return false;
        }
    } catch (error) {
        toaster.error("Có lỗi xảy ra khi kiểm tra quyền!");
        return false;
    }
}; 