import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';

const toaster = createToaster({ position: 'top-left' });

export function kiemTraQuyen(id_chuc_nang) {
  return async (to, from, next) => {
try{
      const token = localStorage.getItem('token_admin');
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
      toaster.error('Lỗi khi kiểm tra quyền');
      return next(false);
    }
  };
}