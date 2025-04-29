<template>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
    <!-- banner -->

    <div class="row"
        style="display: flex;align-items: center;justify-content: center;text-align: center;padding: 50px 10%;background-color: #f9f9fc;">
        <div class="col-lg-6 text-center mt-5">
            <h1 class=" fw-bold"
                style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;font-size: 60px;color: darkblue;">
                DỊCH VỤ CHĂM SÓC <br>THÚ CƯNG TOÀN DIỆN</h1>
            <p style="font-size: 25px;">"Yêu thương trọn vẹn - chăm sóc tận tâm!"</p>
        </div>
        <div class="col-lg-6 text-end">
            <img src="https://cdn.shopify.com/s/files/1/0559/3713/8775/files/chewsolutions-dogimg-desktop.webp?v=1741973018"
                alt="">
        </div>
    </div>
    <marquee scrollamount="10" scrolldelay="100" class="text-white align-middle"
        style="background-color: darkblue; height: 40px;padding-top: 10px;padding-bottom: 10px;">
        Chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện, từ tắm rửa, cắt tỉa lông đến trông giữ và huấn luyện,
        đảm bảo thú cưng của bạn luôn khỏe mạnh và hạnh phúc.
    </marquee>
    <br>
    <!-- search -->
    <div class="container mt-2 d-flex justify-content-center">
        <div class="input-group" style="max-width: 600px; height: 50px;">
            <input v-model="tim_kiem.noi_dung" type="text" class="form-control rounded-start-pill"
                placeholder="Tìm kiếm dịch vụ..." aria-label="Search">
            <button v-on:click="timkiem()" class="btn btn-primary rounded-end-pill" type="button">
                <i class="fas fa-search"></i> <!-- Biểu tượng kính lúp -->
            </button>
        </div>
    </div>
    <br>
    <hr>
    <h3 class="text-center text-black fw-bold">CÁC DỊCH VỤ CHĂM SÓC THÚ CƯNG ĐỈNH CỦA CHÓP<i
            class="fa-solid fa-fire-flame-curved" style="color: #fd1c1c;"></i></h3>
    <br>
    <!--  -->
    <div class="row">
        <template v-for="(value, index) in list_dich_vu" :key="index">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
                <div class="card p-3">
                    <div class="row align-items-center" style="padding: 20px;">
                        <div class="col-lg-4 d-flex justify-content-center">
                            <img :src="value.hinh_anh" alt="" class="img-fluid rounded" style="width: 250px; ">
                        </div>
                        <div class="col-lg-8">
                            <h3 class="fw-bold" style="color: darkblue;">{{ value.ten_dv }}</h3>
                            <p style="font-size: 20px;">{{ value.mo_ta }}</p>
                            <p style="font-size: 25px;" class="text-danger fw-bold">
                                Giá dao động: <span>{{ value.gia }}</span> VND
                            </p>
                            <router-link to="/client/chon-dich-vu/" class="text-decoration-none">
                                <div class="text-end ">
                                    <button class="btn btn-info btn-hover fw-bold">ĐẶT LỊCH NGAY</button>
                                </div>
                            </router-link>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2"></div>
        </template>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_dich_vu: [],
            tim_kiem: {
                noi_dung: ''
            }
        };

    },

    mounted() {
        this.load()
        window.scrollTo(0, 0);
    },

    methods: {
        load() {
            axios
                .get('http://127.0.0.1:8000/api/dich-vu/load')
                .then((res) => {
                    this.list_dich_vu = res.data.data
                })
        },
        timkiem() {
            axios
                .post('http://127.0.0.1:8000/api/dich-vu/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_dich_vu = res.data.data
                })
        },
    },

};

</script>
<style>
body {
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png ) no-repeat;
    background-size: cover;
}

.btn-hover:hover {
    background-color: #dc3545 !important;
    /* Đổi thành màu đỏ */
    border-color: #dc3545 !important;
}
</style>