<template>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap" rel="stylesheet" />
  <div class="topbar d-flex align-items-center">
    <nav class="navbar navbar-expand" style="background-color: darkblue">
      <div class="topbar-logo-header">
        <div class="">
          <img style="
              transition: box-shadow 0.3s ease-in-out;
              width: 100px;
              height: auto;
            "
            src="//www.meowbox.com/cdn/shop/files/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204.svg?v=1716102790&amp"
            class="logo-icon" alt="logo icon" />
        </div>
        <div class="">
          <h4 class="logo-text" style="
              font-size: 25px;
              font-weight: bold;
              font-family: 'Fredoka', sans-serif;
              color: white;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            ">
            PET CARE
          </h4>
        </div>
      </div>
      <div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>
      <div class="flex-grow-1"></div>
      <div class="user-box dropdown">
        <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img style="
              transition: box-shadow 0.3s ease-in-out;
              width: 100px;
              height: auto;
            "
            src="//www.meowbox.com/cdn/shop/files/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204.svg?v=1716102790&amp"
            class="user-img" alt="user avatar" />
          <div class="user-info ps-3">
            <p class="user-name mb-0" style="
                font-size: 17px;
                font-weight: bold;
                font-family: 'Fredoka', sans-serif;
                color: #F8F9FA;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
              ">
              PET CARE
            </p>
            <template v-if="user.check == true">
              <p class="designattion mb-0" style="
                font-size: 13px;
                font-weight: bold;
                font-family: 'Fredoka', sans-serif;
                color: #F8F9FA;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
              ">
                {{ user.name }}
              </p>
              <p class="designattion mb-0">{{ user.email }}</p>
            </template>
          </div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">

          <li>

            <a v-on:click="dangXuat()" class="dropdown-item" href="javascript:;"><i
                class="bx bx-log-out-circle"></i><span>Đăng
                xuất</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-right' });
export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    const currentPath = this.$route.path;

    if (currentPath.startsWith('/doctor') && localStorage.getItem("token_doctor")) {
      this.user = {
        name: localStorage.getItem("name_doctor"),
        email: localStorage.getItem("email_doctor"),
        check: true,
        role: 'Bác sĩ'
      };
    } else if (localStorage.getItem("token_admin")) {
      this.user = {
        name: localStorage.getItem("name_admin"),
        email: localStorage.getItem("email_admin"),
        check: true,
        role: 'Admin'
      };
    } else {
      this.user = { check: false };
    }

    console.log(this.user);
  }
  ,
  methods: {
    dangXuat() {
      let token = localStorage.getItem("token_admin") || localStorage.getItem("token_doctor");

      axios
        .get("http://127.0.0.1:8000/api/nhan-vien/dang-xuat", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);

            // Xoá token và info tương ứng
            if (localStorage.getItem("token_admin")) {
              localStorage.removeItem("token_admin");
              localStorage.removeItem("name_admin");
              localStorage.removeItem("email_admin");
            } else if (localStorage.getItem("token_doctor")) {
              localStorage.removeItem("token_doctor");
              localStorage.removeItem("name_doctor");
              localStorage.removeItem("email_doctor");
            }

            this.$router.push("/nhan-vien/dang-nhap");
          } else {
            toaster.error(res.data.message);
          }
        });
    }

  },
};
</script>
<style>
.dropdown-menu .dropdown-item {
  font-size: 16px;
  /* Tăng chữ trong từng dòng */
  padding: 12px 20px;
  /* Dễ bấm hơn */
}

.dropdown-menu {
  font-size: 16px;
  /* Tăng kích thước chữ */
  padding: 10px 0;
  /* Tăng khoảng cách trên dưới */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-menu .dropdown-item:hover {
  background-color: #f0f8ff;
  /* xanh nhạt nhẹ nhàng */
  color: #003366;
  /* chữ xanh đậm */
  border-radius: 5px;
  /* bo nhẹ góc */
}

.dropdown-menu {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  visibility: hidden;
}

/* Khi mở */
.dropdown-menu.show {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
</style>