<template>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid">
            <!-- Logo -->
            <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743147212/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204_ex3zcl.svg"
                style="transition: box-shadow 0.3s ease-in-out; width: 100px; height: auto;" alt="">
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
                    <li class="nav-item me-2 text-nowrap"><a class="nav-link" href="#">Sản phẩm</a></li>
                    <li class="nav-item me-2 text-nowrap">
                        <router-link to="/client/xem-dich-vu">
                            <a class="nav-link" href="#">Dịch vụ</a>
                        </router-link>
                    </li>
                    <li class="nav-item me-2 text-nowrap"><a class="nav-link" href="#">Đặt lịch</a></li>


                </ul>
            <!-- Menu chính -->
            <div class="collapse navbar-collapse" :class="{ 'show': isOpen }" id="navbarNav">
                <!-- Thanh tìm kiếm ở giữa -->
                <form class="d-flex  search-bar input-group me-2 mx-auto">
                    <input class="form-control" type="search" placeholder="Tìm kiếm..." v-model="searchQuery">
                    <button class="btn btn-search btn-outline-primary bg-white" type="">🔍</button>
                </form>

                
                <!-- Nút CTA -->
                <a class="nav-link ms-5" href="#"><i class="fa-solid fa-cart-plus  fa-2x"
                        style="color: #1171bb;"></i></a>
                <router-link to="/client/dang-nhap-dang-ky">
                <a class="btn btn-custom ms-3 text-nowrap d-flex" href="#">LOGIN</a>
                </router-link>
                <a class="btn btn-custom ms-3 text-nowrap d-flex" href="#">SIGN UP</a>

            </div>
    
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            searchQuery: '',
        };
    },
    methods: {
        toggleNavbar() {
            this.isOpen = !this.isOpen;
        }
    }
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