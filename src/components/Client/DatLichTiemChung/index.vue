<template>
    <div class="row">
        <div class="col-lg-6">
            <span style="width:100%; ">
                <h1 style="color: darkblue; margin-top: 20%;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; "
                    class="ms-5 text-center fw-bold">ĐẶT LỊCH TIÊM CHỦNG</h1>
                <div style="font-size: medium; font-family: Poppins; color: black;" class="mt-4">
                    <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Chủ động tìm hiểu, lựa chọn
                        loại tiêm chủng phù hợp với nhu cầu</p>
                    <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Nhiều lựa chọn cơ sở công,
                        tư, mức phí phù hợp</p>
                    <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Giảm thiểu việc thiếu Vắc Xin
                        theo mùa</p>
                    <p><i class="fa-regular fa-circle-check" style="color: #35c051;"></i> Được hưởng chính sách hoàn
                        tiền khi đặt lịch trên PetCare (đối với các csyt tư có áp dụng)</p>
                    <hr>
                    <h3 class="text-center">Liên hệ để tư vấn thêm <i class="fa-solid fa-phone-volume"
                            style="color: #22779b;"></i>
                        0905676869 hoặc <button class="btn btn-warning">Chat ngay</button> </h3>
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

    <div class="row ">
        
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
                <h2 class="text-center fw-bold" style="color: darkblue;">CHỌN DỊCH VỤ TIÊM CHỦNG</h2>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm...." aria-label="Recipient's username"
                        aria-describedby="button-addon2">
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
</template>
<script>
import apiClient from '../../services/apiClient';

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
    },

    methods: {
        load() {
            apiClient
                .get('/api/dich-vu/load-tiem-chung')
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