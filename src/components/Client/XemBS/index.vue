<template>
    <div class="page-content">
        <div class="card">
            <div class="row g-0">
                <div class="col-md-2 border-end">
                    <img style="height: 450px; width: 650px;" :src="list_nvct.hinh_anh" class="img-fluid rounded-4" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h1 style="color: darkblue;" class="card-title">Ths BS. {{ list_nvct.ten_nv }}</h1>
                        <dl style="font-size:20px;" class="row">
                            <dt class="col-sm-2">Chuyên khoa</dt>
                            <dd class="col-sm-9">Thú y</dd>

                            <dt class="col-sm-2">Mô tả </dt>
                            <dd class="col-sm-9">{{ list_nvct.mo_ta }}</dd>

                            <dt class="col-sm-2">Giá khám</dt>
                            <dd class="col-sm-9">{{ list_nvct.tien_kham }}</dd>

                            <dt class="col-sm-2">Lịch khám</dt>
                            <dd class="col-sm-9">Hẹn khám</dd>
                        </dl>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-info btn-lg custom-btn">Đặt khám ngay</button>
                </div>
            </div>
        </div>
        <div class="card rounded-3">
            <div class="card-header">
                <h3>Giới thiệu</h3>
            </div>
            <div class="card-body">
                <p style="font-size:20px;">{{ list_nvct.mo_ta }}</p>
            </div>
        </div>

        <h6 class="text-uppercase mb-0">Một số bác sĩ khác</h6>
        <hr>
        <div class="row row-cols-1 row-cols-lg-3 g-4">
            <div class="col d-flex" v-for="(value, index) in list_nv" :key="index">
                <div class="card w-100 h-100">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <router-link :to="`/client/xem-bs/${value.id}`">
                                <img class="img-fluid" :src="value.hinh_anh" alt="">
                            </router-link>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <router-link :to="`/client/xem-bs/${value.id}`">
                                    <h4 style="color: darkblue;" class="card-title">Ths BS {{ value.ten_nv }}</h4>
                                </router-link>

                                <hr>
                                <div style="font-size:20px;" class="row">
                                    <div class="col-lg-5">
                                        <b>Chuyên khoa</b><br>
                                        <b>Giá khám</b>
                                    </div>
                                    <div class="col-lg-7">
                                        <span>Chẩn đoán hình ảnh</span><br>
                                        <span>{{ value.tien_kham }}</span>
                                    </div>
                                </div>
                                <hr>
                                <div class="text-end">
                                    <button class="btn btn-outline-info btn-lg custom-btn">Đặt lịch ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import apiClient from '../../services/apiClient';

export default {
    data() {
        return {
            list_nv: [],
            list_nvct: {}
        }
    },
    mounted() {
        this.loadData();
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler() {
                this.loadData();
                window.scrollTo(0, 0); // Cuộn về đầu trang khi đổi bác sĩ
            }
        }
    },
    methods: {
        loadData() {
            const id = this.$route.params.id;
            axios
                .get(`http://127.0.0.1:8000/api/nhan-vien/load-chi-tiet/${id}`)
                .then((res) => {
                    this.list_nvct = res.data.data;
                });

            axios
                .get('http://127.0.0.1:8000/api/nhan-vien/load')
                .then((res) => {
                    this.list_nv = res.data.data.filter(nv => nv.id != id && nv.id_chucvu === 1);
                });
        }
    }
}
</script>
<style></style>