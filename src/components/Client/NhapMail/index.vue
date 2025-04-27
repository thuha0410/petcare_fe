<template>
  <div class="container">
    <video autoplay loop muted playsinline class="video-background">
      <source src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
        type="video/mp4" />
    </video>

    <div class="content">
      <div class="logo text-center">
        PETCARE
      </div>
      <div class="tabs">
        <p class="tab active fw-bold" style="font-size: 20px; color: white;">NHẬP EMAIL</p>
      </div>

      <div id="login-form">
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">
            <i class="fa-solid fa-square-envelope"></i>
          </span>
          <input v-model="mail.email" type="email" class="form-control" placeholder="Email của bạn" />
        </div>

        <button class="button mt-3" @click="sendMail(value)">
          Gửi email ngay
        </button>

        <router-link to="/client/dang-nhap-dang-ky">
          <div class="text-center mt-3">
            <a href="#" class="link">Quay lại đăng nhập</a>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';
const toaster = createToaster({ position: 'top-left' });

export default {
  data() {
    return {
      mail: {
        email: ''
      },
      activated: false,
      waitingForVerify: false,
    };
  },
  mounted() {
    const isActivated = this.$route.query.activated;
    if (isActivated === 'true') this.activated = true;
  },
  methods: {
    sendMail(x) {
      axios
        .post("http://127.0.0.1:8000/api/khach-hang/send-mail", this.mail)
        .then((res) => {
          toaster.success(res.data.message)
        })
    }
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
  font-size: 30px;
  font-weight: bold;
  color: #0099ff;
}

.tab {
  padding: 10px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.active {
  border-bottom: 4px solid rgb(240, 233, 233);
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
  background: rgba(22, 20, 20, 0.6);
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 450px;
}
</style>