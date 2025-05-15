<template>
  <div class="container">
    <video autoplay loop muted playsinline class="video-background">
      <source src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
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
        <div class="tab active fw-bold" v-on:click="showLogin()">ĐĂNG NHẬP</div>
        <div class="tab fw-bold" v-on:click="showSignup()">ĐĂNG KÝ</div>
      </div>

      <div id="login-form">
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-square-envelope"></i></span>
          <input v-model="khach_hang.email" type="email" class="form-control" placeholder="Email của bạn"
            aria-label="Email" aria-describedby="basic-addon1" />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping">
            <i class="fa-solid fa-key"></i>
          </span>
          <input v-model="khach_hang.pass" class="form-control" style="" placeholder="Mật khẩu của bạn"
            :type="showPassword ? 'text' : 'password'" aria-label="Password" aria-describedby="basic-addon1" />
        </div>
        <router-link to="/client/send-mail">
          <div class="text-end mt-2">
            <a href="#" class="link">Quên mật khẩu?</a>
          </div>
        </router-link>
        <button style="
            font-size: 18px;
            font-weight: bold;
            font-family: 'Fredoka', sans-serif;
            color: white;
          " class="button mt-3" v-on:click="dangNhap()">
          ĐĂNG NHẬP
        </button>
      </div>

      <div id="signup-form" style="display: none">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-user"></i></span>
          <input v-model="khach_hang.ho_va_ten" type="text" class="form-control" placeholder="Tên của bạn" />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-square-envelope"></i></span>
          <input v-model="khach_hang.email" type="email" class="form-control" placeholder="Email của bạn" />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-phone"></i></span>
          <input v-model="khach_hang.so_dien_thoai" class="form-control" type="tel" placeholder="Số điện thoại của bạn"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-key"></i></span>
          <input v-model="khach_hang.password" class="form-control" placeholder="Mật khẩu của bạn"
            :type="showPassword ? 'text' : 'password'" />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"><i class="fa-regular fa-keyboard"></i></span>
          <input v-model="khach_hang.password_confirmation" class="form-control" placeholder="Nhập lại mật khẩu"
            :type="showPassword ? 'text' : 'password'" />
        </div>
        <button style="
            font-size: 18px;
            font-weight: bold;
            font-family: 'Fredoka', sans-serif;
            color: white;
          " class="button mt-4" v-on:click="dangKy()">
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import apiClient from "../../../services/apiClient";
const toaster = createToaster({ position: "top-left" });

export default {
  data() {
    return {
      khach_hang: {
        email: "",
        pass: "",
        ho_va_ten: "",
        so_dien_thoai: "",
        password: "",
        password_confirmation: "",
      },
      isLoading: false,
      showPassword: false
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    dangNhap() {
      this.isLoading = true;
      apiClient.post("/api/khach-hang/dang-nhap", this.khach_hang)
        .then((res) => {
          if (res.data.status == 1) {
            toaster.success(res.data.message);
            
            // Store token and other user information
            localStorage.setItem("token_client", res.data.token);
            
            // Trigger the storage event manually for TopClient to detect
            window.dispatchEvent(new StorageEvent('storage', {
              key: 'token_client',
              newValue: res.data.token
            }));
            
            // Navigate to homepage or previous page if available
            const returnUrl = this.$route.query.returnUrl || '/';
            this.$router.push(returnUrl);
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((err) => {
          // Error handling is already managed by apiClient interceptors
          console.error("Login error:", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    dangKy() {
      this.isLoading = true;
      apiClient.post("/api/khach-hang/dang-ky", this.khach_hang)
        .then((res) => {
          // Hiển thị thông báo thành công
          toaster.success(res.data.message);

          // Reset dữ liệu form sau khi đăng ký thành công
          this.khach_hang = {
            ho_va_ten: "",
            email: "",
            so_dien_thoai: "",
            password: "",
            password_confirmation: ""
          };

          // Hiển thị form đăng nhập sau khi đăng ký thành công
          this.showLogin();
        })
        .catch((err) => {
          // Error handling is already managed by apiClient interceptors
          console.error("Registration error:", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showLogin() {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("signup-form").style.display = "none";
      document.querySelectorAll(".tab")[0].classList.add("active");
      document.querySelectorAll(".tab")[1].classList.remove("active");
    },
    showSignup() {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("signup-form").style.display = "block";
      document.querySelectorAll(".tab")[1].classList.add("active");
      document.querySelectorAll(".tab")[0].classList.remove("active");
    },
  },
};
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