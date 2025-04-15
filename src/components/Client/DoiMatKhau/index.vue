<template>
    <div class="container-fluid">
      <video autoplay loop muted playsinline class="video-background">
        <source
          src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
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
          <input v-model="newPassword" type="password" class="form-control" placeholder="Mật khẩu mới" required />
        </div>
  
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input v-model="confirmPassword" type="password" class="form-control" placeholder="Nhập lại mật khẩu" required />
        </div>
  
        <button class="button mt-4" @click="datLaiMatKhau">
          Đặt lại mật khẩu
        </button>
  
        <router-link to="/client/dang-nhap-dang-ky">
          <div class="text-center mt-3">
            <a href="#" class="link">Quay lại đăng nhập</a>
          </div>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: ''
      };
    },
    methods: {
      datLaiMatKhau() {
        if (!this.newPassword || !this.confirmPassword) {
          alert("Vui lòng nhập đầy đủ thông tin.");
          return;
        }
        if (this.newPassword !== this.confirmPassword) {
          alert("Mật khẩu không khớp.");
          return;
        }
        // TODO: Gửi API đổi mật khẩu
        console.log("Mật khẩu mới:", this.newPassword);
        alert("Mật khẩu của bạn đã được cập nhật.");
      }
    }
  };
  </script>
  
  <style scoped>
.container {
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
}

.link {
  color: #00ccff;
  text-decoration: underline;
  font-size: 14px;
  display: inline-block;
}
</style>

  