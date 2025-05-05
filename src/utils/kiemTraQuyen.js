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
        toaster.error('Vui lòng đăng nhập để tiếp tục');
        return next('/nhan-vien/dang-nhap');
      }

      // Nếu là bác sĩ và đang truy cập chức năng của bác sĩ (id_chuc_nang = 17)
      if (token_doctor && id_chuc_nang === 17) {
        return next(); // Cho phép bác sĩ truy cập chức năng của bác sĩ
      }

      // Kiểm tra quyền thông qua API
      try {
        const res = await doctorApi.checkPermission(id_chuc_nang);

        if (res.data.status === 1) {
          return next();
        } else {
          toaster.error(res.data.message || 'Bạn không có quyền truy cập chức năng này');
          return next(false);
        }
      } catch (apiError) {
        // Lỗi API đã được xử lý trong interceptor
        return next(false);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền:', error);
      toaster.error('Đã xảy ra lỗi khi kiểm tra quyền truy cập');
      return next(false);
    }
  };
}
