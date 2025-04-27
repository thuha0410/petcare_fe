<template>
    <div>
        <div class="row">
            <div class="col-lg-6">

                <span style="width:100%; ">
                    <img style="margin-top: 5%;  width: 100px; height: 150px;" class=""
                        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743239937/step3-dogimg_oqzgd5.avif"
                        alt="">
                    <h1 style="color: #1F365E; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                        class="ms-5 fw-bold">ĐẶT LỊCH KHÁM THEO
                        BÁC SĨ</h1>
                    <div style="font-size: medium; font-family: Poppins; color: black;" class="mt-4">

                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Đặt khám theo giờ, không
                            cần chờ lấy
                            số thứ tự, chờ thanh toán </p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Chọn bác sĩ & thời gian
                            linh hoạt</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Tư vấn & khám bệnh chuyên
                            sâu</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Được hưởng chính sách khi
                            đặt lịch </p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Chủ động chọn bác sĩ tin
                            tưởng, đặt
                            càng sớm, càng có cơ hội có số thứ tự thấp nhất, tránh
                            hết số</p>
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
                <h2 class="text-center fw-bold" style="color: darkblue;">CHỌN BÁC SĨ</h2>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm bác sĩ"
                        aria-label="Recipient's username" aria-describedby="button-addon2">
                    <button v-on:click="timkiem()" class="btn btn-outline-primary" type="button" id="button-addon2">Tìm
                        kiếm</button>
                </div>
                <br>
                <template v-for="(value, index) in list_nhan_vien" :key="index">
                    <div class="card p-3">
                        <div class="row align-items-center">
                            <!-- Cột hình ảnh -->
                            <div class="col-lg-4 d-flex justify-content-center">
                                <router-link :to="`/client/xem-bs/${value.id}`">
                                    <img :src="value.hinh_anh" alt="" class="img-fluid rounded"
                                        style="width: 70%; max-width: 150px; cursor: pointer;">
                                </router-link>
                            </div>

                            <!-- Cột nội dung -->
                            <div class="col-lg-8">
                                <router-link :to="`/client/xem-bs/${value.id}`">
                                    <h5 class="card-title text-primary mt-3">BS. {{ value.ten_nv }}</h5>
                                </router-link>

                                <!-- Thông tin bác sĩ -->
                                <div class="row mt-2">
                                    <div class="col-md-3 fw-bold">Mô tả:</div>
                                    <div class="col-md-9">Mô tả: <span>{{ value.mo_ta }}</span></div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-3 fw-bold">Giá khám:</div>
                                    <div class="col-md-9 text-danger"><strong>{{ value.tien_kham }}</strong> VND</div>
                                </div>

                                <!-- Icon + Button -->
                                <div class="d-flex justify-content-between align-items-center mt-3">
                                    <p class="text-success m-0">
                                        <i class="fa-solid fa-shield-cat"></i> PetCare
                                    </p>
                                    <router-link to="/client/chon-dich-vu/" class="text-decoration-none">
                                        <div class="text-end ">
                                            <button class="btn btn-info text-white ">Đặt khám ngay</button>
                                        </div>
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
import axios from 'axios';

export default {
    data() {
        return {
            list_nhan_vien: [],
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
                .get('http://127.0.0.1:8000/api/dich-vu/load-bac-si')
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                })
        },
        timkiem() {
            axios
                .post('http://127.0.0.1:8000/api/dich-vu/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                })
        },
    },
}
</script>
<style>
body {
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png ) no-repeat;
    background-size: cover;
}
</style>