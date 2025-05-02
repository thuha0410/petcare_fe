<template>
    <div class="container">
        <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('https://cellphones.com.vn/sforum/wp-content/uploads/2023/04/hinh-anh-30-4-21.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1;
    "></div>
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
const toaster = createToaster({ position: 'top-left' });
import api from '@/services/api';
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
        async dangNhap() {
            try {
                const { data } = await axios.post(
                    'http://127.0.0.1:8000/api/nhan-vien/dang-nhap',
                    this.nhan_vien
                );
                if (data.status === 1) {
                    toaster.success(data.message);
                    localStorage.setItem('token_admin', data.token);
                    localStorage.setItem('name_admin', data.name);
                    localStorage.setItem('email_admin', data.email);
                    
                    // Get permissions from the response
                    const permissions = data.permissions || [];

                    // Map permission IDs to routes
                    const routeMap = {
                        1: '/admin/nhap-thuoc',
                        2: '/admin/ql-ton-kho',
                        3: '/admin/ql-lich-hen',
                        4: '/admin/ql-dich-vu',
                        5: '/admin/ql-nhan-vien',
                        6: '/admin/ql-khach-hang',
                        7: '/admin/ql-pet',
                        8: '/admin/ql-thuoc',
                        9: '/admin/ql-nha-cung-cap',
                        10: '/admin/ql-luong',
                        11: '/admin/ql-danh-gia',
                        12: '/admin/ql-kho',
                        13: '/admin/hoa-don',
                        14: '/admin/doanh-thu',
                        15: '/admin/ql-chuc-vu',
                        16: '/admin/phan-quyen',
                    };

                    // Check if user has permission 17 (doctor)
                    if (permissions.includes(17) || permissions.includes('17')) {
                        this.$router.push('/doctor');
                    } else {
                        // Check for other valid permissions
                        const firstAllowed = permissions.find(id => routeMap[parseInt(id)]);
                        if (firstAllowed) {
                            this.$router.push(routeMap[parseInt(firstAllowed)]);
                        } else {
                            toaster.error('Tài khoản của bạn không hợp lệ!');
                        }
                    }
                } else {
                    toaster.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toaster.error('Đã có lỗi xảy ra!');
            }
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