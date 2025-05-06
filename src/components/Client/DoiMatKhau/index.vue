<template>
  <div class="container-fluid">
    <video autoplay loop muted playsinline class="video-background">
      <source src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
        type="video/mp4" />
    </video>

    <div class="content">
      <div class="logo text-center">
        PETCARE
      </div>

      <div class="text-center mt-4 mb-4">
        <h4 style="color: white; font-family: 'Fredoka', sans-serif;">Tạo mật khẩu mới</h4>
        <p style="color: #ddd">Vui lòng nhập mật khẩu mới của bạn bên dưới.</p>
      </div>

      <div class="input-group flex-nowrap mt-3">
        <span class="input-group-text">
          <i class="fa-solid fa-lock"></i>
        </span>
        <input v-model="mat_khau.pass" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Mật khẩu mới" />
      </div>

      <div class="input-group flex-nowrap mt-3">
        <span class="input-group-text">
          <i class="fa-solid fa-lock"></i>
        </span>
        <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Nhập lại mật khẩu" />
      </div>

      <div class="form-check mt-2">
        <input class="form-check-input" type="checkbox" v-model="showPassword" id="showPassword">
        <label class="form-check-label text-white" for="showPassword">
          Hiển thị mật khẩu
        </label>
      </div>

      <button class="button mt-4" @click="doiMatKhau()">
        Đặt lại mật khẩu
      </button>

      <div class="text-center mt-3">
        <router-link to="/client/dang-nhap-dang-ky" class="link">Quay lại đăng nhập</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });
export default {
  props: ["ma_doi"],
  data() {
    return {
      mat_khau: {
        ma: this.ma_doi,
        pass: "",
      },
      confirmPassword: "",
      showPassword: false
    };
  },
  methods: {
    doiMatKhau() {
      axios
        .post(
          "http://127.0.0.1:8000/api/khach-hang/doi-mat-khau",
          this.mat_khau
        )
        .then((res) => {
          if (res.data.status == 1) {
            toaster.success(res.data.message);
            this.$router.push("/client/dang-nhap-dang-ky");
          } else {
            toaster.error(res.data.message);
          }
        })
    }
  }
}
</script>

<style scoped>
.container-fluid {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  z-index: 1;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  font-family: 'Fredoka', sans-serif;
  color: #0099ff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.button {
  font-size: 18px;
  font-weight: bold;
  font-family: 'Fredoka', sans-serif;
  color: white;
  background-color: #0099ff;
  border: none;
  padding: 12px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
}

.button:hover {
  background-color: #0088ee;
}

.link {
  color: #00ccff;
  text-decoration: underline;
  font-size: 14px;
  display: inline-block;
}

.link:hover {
  color: #00aaff;
}

.form-check-label {
  font-size: 14px;
}

.form-check-input {
  cursor: pointer;
}
</style>