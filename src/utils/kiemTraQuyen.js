import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';

const toaster = createToaster({ position: 'top-left' });

export function kiemTraQuyen(idChucNang) {
  return async (to, from, next) => {

      const token = localStorage.getItem('token_admin');
      const res = await axios.get(
        `http://127.0.0.1:8000/api/phan-quyen/kiem-tra-quyen/${idChucNang}`,
        { headers: { Authorization: 'Bearer ' + token } }
      );
      if (res.data.status === 1) {
        return next();
      }else{
        toaster.error(res.data.message);
        return next(false);
      }
  };
}
