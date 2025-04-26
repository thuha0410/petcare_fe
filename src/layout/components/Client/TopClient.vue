<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <!-- Logo -->
      <img
        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743147212/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204_ex3zcl.svg"
        style="
          transition: box-shadow 0.3s ease-in-out;
          width: 100px;
          height: auto;
        " alt="" />
      <router-link to="/">
        <a class="navbar-brand me-5" href="#">PETCARE</a>
      </router-link>
      <!-- Nút mở menu khi thu gọn -->
      <button class="navbar-toggler" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav me-3">
        <li class="nav-item me-2 text-nowrap">
          <router-link to="/">
            <a class="nav-link" href="#">Trang chủ</a>
          </router-link>
        </li>
        <li class="nav-item me-2 text-nowrap">
          <router-link to="/client/gioi-thieu">
            <a class="nav-link" href="#">Giới thiệu</a>
          </router-link>
        </li>
        <li class="nav-item me-2 text-nowrap">
          <router-link to="/client/bang-gia">
            <a class="nav-link" href="#">Bảng giá</a>
          </router-link>
        </li>

        <li class="nav-item me-2 text-nowrap">
          <router-link to="/client/xem-dich-vu">
            <a class="nav-link" href="#">Dịch vụ</a>
          </router-link>
        </li>
        <li class="nav-item me-2 text-nowrap">
          <router-link to="/client/dat-lich">
            <a class="nav-link" href="#">Đặt lịch</a>
          </router-link>
        </li>
      </ul>
      <!-- Menu chính -->
      <div class="collapse navbar-collapse" :class="{ show: isOpen }" id="navbarNav">
        <!-- Thanh tìm kiếm ở giữa -->
        <form class="d-flex search-bar input-group me-2 mx-auto">
          <input class="form-control" type="search" placeholder="Tìm kiếm..." v-model="searchQuery" />
          <button class="btn btn-search btn-outline-primary bg-white" type="">
            🔍
          </button>
        </form>

        <!-- Nút CTA -->
        <template v-if="khach_hang.ho_va_ten != null">
          <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img
              src="https://res.cloudinary.com/dd1p908gm/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1744797071/331a803a8e1291013ddeb4e51ff51f36_hlezfr.jpg"
              class="user-img" alt="user avatar" />
            <div class="user-info ps-3">
              <p class="user-name mb-0">{{ khach_hang.ho_va_ten }}</p>
              <p class="designattion mb-0">{{ khach_hang.email }}</p>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <router-link to="client/thong-tin-ca-nhan">
              <li>
                <a class="dropdown-item" href="javascript:;"><i class="bx bx-log-out-circle"></i><span>Thông tin cá
                    nhân</span></a>
              </li>
            </router-link>
            <li>
              <a v-on:click="dangXuat()" class="dropdown-item" href="javascript:;"><i
                  class="bx bx-log-out-circle"></i><span>Đăng Xuất</span></a>
            </li>
            <li>
              <a v-on:click="dangXuatAll()" class="dropdown-item" href="javascript:;"><i
                  class="bx bx-log-out-circle"></i><span>Đăng Xuất Tất Cả</span></a>
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:;"
                ><i class="bx bx-log-out-circle"></i
                ><router-link to="/client/thong-tin-ca-nhan/">Thông tin cá nhân</router-link></a
              >
            </li>
          </ul>
        </template>
        <template v-else>
          <router-link to="/client/dang-nhap-dang-ky">
            <a class="btn btn-custom ms-3 text-nowrap d-flex" href="#">ĐĂNG NHẬP</a>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });
export default {
  data() {
    return {
      user: {},
      isOpen: false,
      searchQuery: "",
      khach_hang: {},
    };
  },
  mounted() {
    this.load();
    console.log(this.user);
  },
  methods: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
    load() {
      axios
        .get("http://127.0.0.1:8000/api/khach-hang/lay-du-lieu", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_client"),
          },
        })
        .then((res) => {
          this.khach_hang = res.data.data;
        });
    },
    dangXuat() {
      axios
        .get("http://127.0.0.1:8000/api/khach-hang/dang-xuat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_client"),
          },
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            localStorage.removeItem("token_client");
            this.khach_hang.ho_va_ten = null;
          } else {
            toaster.error(res.data.message);
          }
        });
    },
    dangXuatAll() {
      axios
        .get("http://127.0.0.1:8000/api/khach-hang/dang-xuat-all", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_client"),
          },
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            localStorage.removeItem("token_client");
            this.khach_hang.ho_va_ten = null;
          } else {
            toaster.error(res.data.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  color: #0077cc;
}

.nav-link {
  color: #333;
  font-size: 18px;
}

.nav-link:hover {
  color: #0077cc;
}

.btn-custom {
  background-color: #003366;
  color: white;
  border-radius: 5px;
}

.btn-custom:hover {
  background-color: #002244;
}

/* Thanh tìm kiếm */
.search-bar {
  width: 40%;
  min-width: 250px;
}

.search-bar input {
  border-radius: 20px;
  padding: 8px 15px;
}

.btn-search {
  background-color: #0077cc;
  color: white;
  border-radius: 20px;
  padding: 8px 15px;
}

.btn-search:hover {
  background-color: #0055aa;
}
</style>