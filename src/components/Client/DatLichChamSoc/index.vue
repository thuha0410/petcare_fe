<template>
    <div>
        <div class="row">
            <div class="col-lg-6">

                <span style="width:100%; ">
                    <img style="margin-top: 5%;  width: 100px; height: 150px;" class=""
                        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743239937/step3-dogimg_oqzgd5.avif"
                        alt="">
                    <h1 style="color: #1F365E; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                        class="ms-5 fw-bold">ĐẶT LỊCH CHĂM SÓC</h1>
                    <div style="font-size: medium; font-family: Poppins; color: black;" class="mt-4">
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Người dùng có thể đặt lịch
                            hẹn chăm sóc thú cưng theo ngày và giờ mong muốn thông qua hệ thống trực tuyến.</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Hệ thống cung cấp danh
                            sách các dịch vụ như tắm, cắt tỉa lông, kiểm tra sức khỏe, và tiêm phòng để người dùng lựa
                            chọn.</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Sau khi đặt lịch, người
                            dùng nhận được xác nhận qua email hoặc tin nhắn, kèm theo thông tin về nhân viên chăm sóc.
                        </p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Hệ thống nhắc lịch tự động
                            giúp chủ nuôi không bỏ lỡ buổi hẹn chăm sóc thú cưng.</p>
                        <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Người dùng có thể linh
                            hoạt thay đổi hoặc hủy lịch hẹn trực tiếp trên ứng dụng nếu có sự thay đổi kế hoạch.</p>
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
            <div class="col-lg-6 d-flex justify-content-center">
                <video src="https://res.cloudinary.com/dcv3oj0fu/video/upload/v1743665207/uoqwhf6yyxj2v9oie0xn.mp4"
                    style=" border-radius: 10%; width:50%;height:100%;object-fit:var(--rof, inherit);object-position:var(--rop, inherit)"
                    preload="metadata" autoplay="" muted="true" loop="" playsinline="" webkit-playsinline=""
                    x5-playsinline=""></video>
            </div>
        </div>
        <br>
        <hr>
        <div class="row ">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
                <h2 class="text-center fw-bold" style="color: darkblue;">Chọn dịch vụ chăm sóc</h2>
                <br>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search">
                    <button class="btn btn-primary" type="submit">Tìm</button>
                </form>
                <template v-for="(value, index) in list_dich_vu" :key="index">
                    <div class="card mt-3">
                        <div class="row">
                            <div class="col-md-3 text-center">
                                <img style="width: 50%;" class="img-fluid" :src="value.hinh_anh" alt="">
                            </div>
                            <div class="col-md-9">
                                <div>
                                    <h5 class="card-title mt-3">{{ value.ten_dv }}</h5>
                                    <h6> Mô tả: {{ value.mo_ta }}</h6>
                                    <h6> Giá: <span>{{ value.gia }}</span>đ</h6>
                                </div>
                                <p class="card-text"><i style="color: #35c051;" class="fa-solid fa-shield-cat"></i>
                                    Petcare
                                </p>
                                <router-link :to="'/client/chon-dich-vu/' + value.id">
                                    <div class="text-end me-3 mb-3"><button class="btn btn-info">Đặt ngay</button></div>
                                </router-link>
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
            list_dich_vu: []
        }
    },
    mounted() {
        this.loaddata()
    },
    methods: {
        loaddata() {
            axios
                .get("http://127.0.0.1:8000/api/dich-vu/load")
                .then((res) => {
                    this.list_dich_vu = res.data.data.filter(item => item.id_loaidv !== 1);
                });
        }

    },
}
</script>
<style></style>