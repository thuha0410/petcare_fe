<template>
    <div>
        <div class="row">
            <div class="col-lg-6">

                <span style="width:100%; ">
                    <img style="margin-top: 5%;  width: 100px; height: 150px;" class=""
                        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743239937/step3-dogimg_oqzgd5.avif"
                        alt="">
                    <h1 style="color: #1F365E; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                        class="ms-5 fw-bold">ĐẶT LỊCH KHÁM BỆNH</h1>
                    <div style="font-size: medium; font-family: Poppins; color: black;" class="mt-4">

                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Đặt khám theo giờ, không
                            cần chờ lấy
                            số thứ tự, chờ thanh toán </p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Chọn dịch vụ khám & thời gian
                            linh hoạt</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Tư vấn & khám bệnh chuyên
                            sâu</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Được hưởng chính sách khi
                            đặt lịch </p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Ưu đãi, nhiệt tình, tận tụy</p>
                        <hr>
                        <h3 class="text-center">Liên hệ để tư vấn thêm <i class="fa-solid fa-phone-volume"
                                style="color: #22779b;"></i>
                            0905676869 hoặc <button class="btn btn-warning">Chat ngay</button> </h3>
                    </div>
                    <div class="text-end">
                        <img style="width: 100px; height: 150px;" class=""
                            src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743342635/step1-dogimg_hevd4u.webp"
                            alt="">
                    </div>
                </span>
            </div>
            <div class="col-lg-6">
                <video src="https://cdn.shopify.com/videos/c/o/v/ea33e6f157184b949772f6aba2b75c6b.mp4"
                    style=" border-radius: 10%; width:100%;height:100%;object-fit:var(--rof, inherit);object-position:var(--rop, inherit)"
                    preload="metadata" autoplay="" muted="true" loop=""
                    poster="https://cdn.shopify.com/s/files/1/0559/3713/8775/files/eg-d1a-hero-thumbnail_1.jpg?v=1740068403"
                    playsinline="" webkit-playsinline="" x5-playsinline=""></video>
            </div>
        </div>
        <br>
        <hr>
        <div class="row ">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
                <h2 class="text-center fw-bold" style="color: darkblue;">CHỌN DỊCH VỤ KHÁM</h2>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm bác sĩ"
                        aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button v-on:click="timkiem()" class="btn btn-outline-primary" type="button" id="button-addon2">Tìm
                        kiếm</button>
                </div>
                <br>
                <template v-for="(value, index) in list_dich_vu" :key="index">
                <div class="card p-3">
                    <div class="row align-items-center">
                        <!-- Cột hình ảnh -->
                        <div class="col-lg-4 text-center">
                            <img :src="value.hinh_anh" alt="" class="rounded-circle p-1 bg-primary" width="250">
                        </div>

                        <!-- Cột nội dung -->
                        <div class="col-lg-8">
                            <h5 class="card-title text-primary mt-3">{{ value.ten_dv }}</h5>
                            <div class="row mt-2">
                                <p style="font-size: 20px;" class=" fw-bold">
                                    Mô tả: <span>{{ value.mo_ta }}</span>
                                </p>
                            </div>
                            <div class="row mt-2">
                                <p style="font-size: 18px;" class="text-danger fw-bold">
                                    Giá: <span>{{ value.gia }}</span> VND
                                </p>
                            </div>

                            <!-- Icon + Button -->
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <p class="text-success m-0">
                                    <i class="fa-solid fa-shield-cat"></i> PetCare
                                </p>
                                <router-link :to="`/client/chon-dich-vu/` + value.id">
                                    <button class="btn btn-info text-white ">Đặt ngay</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            </div>
            <div class="col-lg-2"></div>
        </div>
    </div>
</template>
<script>
import apiClient from '../../../services/apiClient';


export default {
    data() {
        return {
            list_dich_vu: [],
            tim_kiem: {
                noi_dung: ''
            },
            danh_sach_pet: [],
        };

    },
    mounted() {
        this.load()
    },

    methods: {
        chonDichVu(id_dv) {
            const token = localStorage.getItem('token_client');
            if (!token) {
                this.$router.push('/client/dang-nhap-dang-ky');
                return;
            }

            if (this.danh_sach_pet.length === 0) {
                alert('Bạn cần thêm thú cưng trước khi đặt lịch.');
                this.$router.push('/client/thong-tin-ca-nhan');
                return;
            }

            this.$router.push(`/client/chon-dich-vu/${id_dv}`);
        },
        load() {
            apiClient
                .get('http://127.0.0.1:8000/api/dich-vu/load-kham-benh')
                .then((res) => {
                    this.list_dich_vu = res.data.data
                })
        },
        timkiem() {
            apiClient
                .post('/api/dich-vu/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_dich_vu = res.data.data
                })
        },
    },
}
</script>
<style scoped>
body {
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png ) no-repeat;
    background-size: cover;
}
</style>