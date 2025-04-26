import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-left' });

export default function(to, from, next) {
    axios
        .get("http://127.0.0.1:8000/api/nhan-vien/kiem-tra-dang-nhap", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token_admin")
            }
        })
        .then((res)=>{
            if(res.data.status){
                next();
            }else{
                next("/nhan-vien/dang-nhap");
                toaster.error(res.data.message);
            }
        })
}