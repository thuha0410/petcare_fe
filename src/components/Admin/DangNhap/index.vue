<template>
    <div class="container">
        <video autoplay loop muted playsinline class="video-background">
            <source
                src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
                type="video/mp4" />
        </video>
        <div class="content">
            <div class="logo text-center" style="
          font-size: 25px;
          font-weight: bold;
          font-family: 'Fredoka', sans-serif;
          color: #0099ff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        ">
                PETCARE
            </div>
            <div class="tabs">
                <p class="tab active fw-bold" style="font-size: 25px;">ĐĂNG NHẬP</p>
            </div>

            <div id="login-form">
                <div class="input-group flex-nowrap mb-3">
                    <span class="input-group-text" id="addon-wrapping"><i
                            class="fa-solid fa-square-envelope"></i></span>
                    <input v-model="nhan_vien.email" type="email" class="form-control" placeholder="Email của bạn"
                        aria-label="Email" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group flex-nowrap mt-3">
                    <span class="input-group-text" id="addon-wrapping">
                        <i class="fa-solid fa-key"></i>
                    </span>
                    <input v-model="nhan_vien.password" class="form-control" style="" placeholder="Mật khẩu của bạn"
                        :type="showPassword ? 'text' : 'password'" aria-label="Password"
                        aria-describedby="basic-addon1" />
                </div>
                <button style="font-size: 18px;font-weight: bold;font-family: 'Fredoka', sans-serif;color: white;"
                    class="button mt-3" v-on:click="dangNhap()">
                    ĐĂNG NHẬP
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-right' });
export default {
    data() {
        return {
            nhan_vien: {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        dangNhap() {
            axios
                .post('http://127.0.0.1:8000/api/nhan-vien/dang-nhap', this.nhan_vien)
                .then((res) => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        localStorage.setItem('token_admin', res.data.token);
                        localStorage.setItem('name_admin', res.data.name);
                        localStorage.setItem('email_admin', res.data.email);
                        this.$router.push('/admin/nhap-thuoc');
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 422) {
                        const errors = err.response.data.errors;
                        for (const key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                toaster.error(errors[key][0]);
                            }
                        }
                    } else if (err.response && err.response.data.message) {
                        toaster.error(err.response.data.message);
                    } else {
                        toaster.error("Đã xảy ra lỗi, vui lòng thử lại.");
                    }
                });
        }
    },
}
</script>
<style scoped>
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    font-size: 28px;
    font-weight: bold;
    color: #0099ff;
}

.tabs {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #ddd;
    position: relative;
    margin-bottom: 20px;
}

.tab {
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    flex: 1;
}

.active {
    border-bottom: 4px solid black;
}

.button {
    background: #003366;
    color: white;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.link {
    color: #0099ff;
    font-size: 14px;
}

.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

.content {
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.6);
    padding: 50px;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 450px;
}

.input-group:focus-within .show-password-icon {
    display: none;
}
</style>