<template>
  <div class="container">
    <video autoplay loop muted playsinline class="video-background">
      <source
        src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
        type="video/mp4"
      />
    </video>
    <div class="content">
      <div
        class="logo text-center"
        style="
          font-size: 25px;
          font-weight: bold;
          font-family: 'Fredoka', sans-serif;
          color: #0099ff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        "
      >
        PETCARE
      </div>
      <div class="tabs">
        <div class="tab active fw-bold" v-on:click="showLogin()">ĐĂNG NHẬP</div>
        <div class="tab fw-bold" v-on:click="showSignup()">ĐĂNG KÝ</div>
      </div>

      <div id="login-form">
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="fa-solid fa-square-envelope"></i
          ></span>
          <input
            type="email"
            class="form-control"
            placeholder="email của bạn"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="fa-solid fa-key"></i
          ></span>
          <input
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            type="password"
            placeholder="Mật khẩu của bạn"
          />
        </div>
        <div class="text-end mt-2">
          <a href="#" class="link">Quên mật khẩu?</a>
        </div>
        <button
          style="
            font-size: 18px;
            font-weight: bold;
            font-family: 'Fredoka', sans-serif;
            color: white;
          "
          class="button mt-3"
        >
          ĐĂNG NHẬP
        </button>
      </div>

      <div id="signup-form" style="display: none">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="fa-solid fa-square-envelope"></i
          ></span>
          <input
            type="email"
            class="form-control"
            placeholder="email của bạn"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="fa-solid fa-key"></i
          ></span>
          <input
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            type="password"
            placeholder="Mật khẩu của bạn"
          />
        </div>
        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping"
            ><i class="fa-regular fa-keyboard"></i
          ></span>
          <input
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        <button
          style="
            font-size: 18px;
            font-weight: bold;
            font-family: 'Fredoka', sans-serif;
            color: white;
          "
          class="button mt-4"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-left" });
export default {
  data() {
    return {
      khach_hang: {
        email: "",
        pass: "",
      },
    };
  },
  methods: {
    dangNhap() {
      axios
        .post("http://127.0.0.1:8000/api/khachhang/dangNhap", this.khach_hang)
        .then((res) => {
          if (res.data.status == 1) {
            toaster.success(res.data.message);
            localStorage.setItem("token_client", res.data.token);
            this.$router.push("/khach-hang/home-page");
          } else {
            toaster.error(res.data.message);
          }
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

<style>
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
</style>