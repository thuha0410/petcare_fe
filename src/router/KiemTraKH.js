import axios from "axios";

export default function(from, to, next) {
    axios
        .get("http://127.0.0.1:8000/api/khach-hang/Kiem-tra-dang-nhap", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token_client")
            }
        })
        .then((res) => {
            if (res.data.status) {
                
                localStorage.setItem("name_kh", res.data.name);
                localStorage.setItem("mail_kh", res.data.email);
                localStorage.setItem("check_kh", res.data.status);
                next();
            } else{

                localStorage.removeItem("check_kh");
                localStorage.removeItem("mail_kh");
                localStorage.removeItem("name_kh");
                toaster.error(res.data.message);
                next();
            }
        });
}