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
      <ul class="navbar-nav mx-auto me-3">
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
        <template v-if="khach_hang && khach_hang.id">
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
            <li>
              <a class="dropdown-item" href="javascript:;"><i class="fa-solid fa-pen-nib"></i><router-link
                  to="/client/thong-tin-ca-nhan/"><span style="color: black;">Thông tin cá nhân</span></router-link></a>
            </li>
            <li>
              <a v-on:click="dangXuat()" class="dropdown-item" href="javascript:;"><i
                  class="bx bx-log-out-circle " ></i><span style="color: black;">Đăng Xuất</span></a>
            </li>
            <li>
              <a v-on:click="dangXuatAll()" class="dropdown-item" href="javascript:;"><i
                  class="bx bx-log-out-circle"></i><span style="color: black;">Đăng Xuất Tất Cả</span></a>
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
import { createToaster } from "@meforma/vue-toaster";
import apiClient from "../../../services/apiClient";
const toaster = createToaster({ position: 'top-left' });

export default {
  data() {
    return {
      isOpen: false,
      searchQuery: "",
      khach_hang: {},
    };
  },
  mounted() {
    this.kiemTraKH();
    // Listen for storage events
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    // Clean up
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    handleStorageChange(event) {
      // If token changed, check authentication again
      if (event.key === 'token_client') {
        this.kiemTraKH();
      }
    },
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
    kiemTraKH() {
      const token = localStorage.getItem("token_client");
      if (!token) {
        this.khach_hang = {};
        return;
      }
      
      apiClient.get("/api/khach-hang/lay-du-lieu")
        .then((res) => {
          if (res.data.status == 1) {
            this.khach_hang = res.data.data;
            // Store user info
            localStorage.setItem("name_kh", res.data.data.ho_va_ten || '');
            localStorage.setItem("mail_kh", res.data.data.email || '');
            localStorage.setItem("id_khach_hang", res.data.data.id || '');
          } else {
            this.khach_hang = {};
          }
        })
        .catch(() => {
          this.khach_hang = {};
        });
    },
    dangXuat() {
      apiClient.get("/api/khach-hang/dang-xuat")
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            localStorage.removeItem("token_client");
            localStorage.removeItem("token_kh");
            localStorage.removeItem("mail_kh");
            localStorage.removeItem("name_kh");
            localStorage.removeItem("id_khach_hang");
            this.khach_hang = {};
            this.$router.push("/client/dang-nhap-dang-ky");
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch(() => {
          toaster.error('Đã xảy ra lỗi khi đăng xuất');
        });
    },
    dangXuatAll() {
      apiClient.get("/api/khach-hang/dang-xuat-all")
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            localStorage.removeItem("token_client");
            localStorage.removeItem("token_kh");
            localStorage.removeItem("mail_kh");
            localStorage.removeItem("name_kh");
            localStorage.removeItem("id_khach_hang");
            this.khach_hang = {};
            this.$router.push("/client/dang-nhap-dang-ky");
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch(() => {
          toaster.error('Đã xảy ra lỗi khi đăng xuất tất cả');
        });
    },
    xuLyDatLich() {
      const token = localStorage.getItem("token_client");
      if (!token) {
        this.$router.push("/client/dang-nhap-dang-ky");
        return;
      }

      apiClient.get("/api/khach-hang/lay-du-lieu")
        .then(res => {
          const id_kh = res.data.data.id;
          localStorage.setItem("id_khach_hang", id_kh);
          return apiClient.get(`/api/pets/${id_kh}`);
        })
        .then(res => {
          const pets = res.data.pets;
          if (pets && pets.length > 0) {
            this.$router.push("/client/dat-lich");
          } else {
            toaster.error("Bạn chưa có thú cưng nào. Vui lòng thêm thú cưng trước khi đặt lịch.");
            this.$router.push("/client/thong-tin-ca-nhan");
          }
        })
        .catch(err => {
          console.error("Lỗi khi kiểm tra thú cưng:", err);
          this.$router.push("/client/thong-tin-ca-nhan");
        });
    }
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
.navbar-nav {
  text-align: center;
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
.dropdown-menu {
  font-size: 16px; /* Tăng kích thước chữ */
  padding: 10px 0; /* Tăng khoảng cách trên dưới */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.dropdown-menu .dropdown-item:hover {
  background-color: #f0f8ff; /* xanh nhạt nhẹ nhàng */
  color: #003366; /* chữ xanh đậm */
  border-radius: 5px; /* bo nhẹ góc */
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
.dropdown-menu .dropdown-item {
  font-size: 16px; /* Tăng chữ trong từng dòng */
  padding: 12px 20px; /* Dễ bấm hơn */
}
</style>