<template>
    <div class="page-content">
        <div class="card">
            <div class="row g-0">
                <div class="col-md-2 border-end">
                    <img style="height: 450px; width: 650px;" :src="list_nvct.hinh_anh" class="img-fluid rounded-4"
                        alt="...">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h1 style="color: darkblue;" class="card-title">Ths BS. {{ list_nvct.ten_nv }}</h1>
                        <dl style="font-size:20px;" class="row">
                            <dt class="col-sm-2">Chuyên khoa</dt>
                            <dd class="col-sm-9">Thú y</dd>

                            <dt class="col-sm-2">Mô tả </dt>
                            <dd class="col-sm-9">{{ list_nvct.mo_ta }}</dd>

                            <dt class="col-sm-2">Giới tính </dt>
                            <dd class="col-sm-9">{{ list_nvct.gioi_tinh == 1 ? 'Nam' : 'Nữ' }}</dd>

                            <dt class="col-sm-2">Tình trạng </dt>
                            <dd class="col-sm-9">{{ list_nvct.tinh_trang == 1 ? 'Đang hoạt động' : 'Không rảnh lịch' }}</dd>
                        </dl>
                    </div>
                </div>
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
                                    </div>
                                    <div class="col-lg-7">
                                        <span>Thú y</span><br>
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';

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