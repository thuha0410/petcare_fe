import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });

export default function(to,from,next){
    axios
        .get("http://127.0.0.1:8000/api/nhan-vien/kiem-tra-dang-nhap",{
            headers :{
                Authorization:'Bearer ' + localStorage.getItem('token_admin')
            }
        })
        .then((res)=>{
            if(res.data.status){
                localStorage.setItem('name_admin',res.data.name);
                localStorage.setItem('email_admin',res.data.email);
                localStorage.setItem('token_admin',res.data.status);
                next();
            }else{
                localStorage.removeItem('name_admin');
                localStorage.removeItem('email_admin');
                localStorage.removeItem('token_admin');
                next("/nhan-vien/dang-nhap");
                toaster.error(res.data.message);
            }
        })
}