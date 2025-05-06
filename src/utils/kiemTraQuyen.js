import { createToaster } from '@meforma/vue-toaster';
import { doctorApi } from '../services/apiDoctor';

const toaster = createToaster({ position: 'top-left' });

/**
 * Middleware kiểm tra quyền truy cập
 * @param {number} id_chuc_nang - ID chức năng cần kiểm tra quyền
 * @returns {Function} Middleware function cho Vue Router
 */
export function kiemTraQuyen(id_chuc_nang) {
  return async (to, from, next) => {
    try {
      // Kiểm tra cả token admin và token doctor
      const token_admin = localStorage.getItem('token_admin');
      const token_doctor = localStorage.getItem('token_doctor');
      const token = token_admin || token_doctor;

      if (!token) {
        toaster.error('Vui lòng đăng nhập lại');
        return next('/nhan-vien/dang-nhap');
      }

      const res = await axios.get(
        `http://127.0.0.1:8000/api/phan-quyen/kiem-tra-quyen/${id_chuc_nang}`,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      if (res.data.status === 1) {
        return next();


      }else{
        toaster.error(res.data.message);
        return next(false);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền:', error);
      toaster.error('Đã xảy ra lỗi khi kiểm tra quyền truy cập');
      return next(false);
    }
  };
}
