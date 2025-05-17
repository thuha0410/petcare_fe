<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between" style="background-color: darkblue;">
            <h4 class="text-white mt-3">ĐÁNH GIÁ</h4>
        </div>
        <div class="card-body">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="tim_kiem.noi_dung" @input="timkiem"
                    placeholder="Tìm kiếm" aria-label="Recipient's username" aria-describedby="button-addon2">

                <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button"
                    id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center align-middle">#</th>
                            <th class="text-center align-middle">Tên khách hàng</th>
                            <th class="text-center align-middle">Nội dung</th>
                            <th class="text-center align-middle">Ngày tạo</th>
                            <th class="text-center align-middle">Tình trạng</th>
                            <th class="text-center align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_danh_gia" :key="index">
                            <tr>
                            <td class="text-center align-middle">{{ index + 1 }}</td>
                            <td class="text-center align-middle">{{ value.ho_va_ten }}</td>
                            <td class="text-center align-middle">{{ value.noi_dung }}</td>
                            <td class="text-center align-middle">{{ value.ngay_tao }}</td>
                            <td class="text-center align-middle">
                                <button @click="doiTT(value)" v-if="value.tinh_trang == 1" class="btn btn-success">Hiển
                                    thị</button>
                                <button @click="doiTT(value)" v-else class="btn btn-secondary">Ẩn</button>
                            </td>
                            <td class="text-center align-middle">
                                <button @click="del_danh_gia = value; xoa()" class="btn btn-danger">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                        </template>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import axios from 'axios';  
const toaster = createToaster({ position: "top-right" });

export default {
    
    data() {
        return {
            danh_gia: {
                id_kh: '',
                noi_dung: '',
                ngay_tao: '',
                tinh_trang: '',
            },
            list_danh_gia: [],
            list_khach_hang: [],
            tim_kiem: {
                noi_dung: ''
            },
            del_danh_gia: {},
        }
    },
    mounted() {
        this.loadKH();
            this.load();
    },
    methods: {
        load() {
            axios.get('http://127.0.0.1:8000/api/danh-gia/load')
                .then((res) => {
                    console.log("API load trả về:", res.data);
                    if (res.data.status) {
                        this.list_danh_gia = res.data.data;
                    } else {
                        toaster.error("Không có dữ liệu đánh giá");
                    }
                })
                .catch((err) => {
                    toaster.error("Lỗi khi load đánh giá: " + err.message);
                    console.error("Chi tiết:", err.response?.data || err.message);
                });
        },
        loadKH() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/loadkh-ql-dgia")
                .then((res) => {
                    this.list_khach_hang = res.data.data;
                    console.log("Dữ liệu khách hàng:", this.list_khach_hang);
                })
                .catch((err) => {
                    console.error("Lỗi khi load khách hàng:", err);
                });
        },
        xoa() {
            axios.post('http://127.0.0.1:8000/api/danh-gia/xoa', this.del_danh_gia)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.load();
                    } else {
                        toaster.error('Xóa thất bại');
                    }
                })
                .catch(() => toaster.error('Lỗi khi gọi API xóa'));
        },
        doiTT(x) {
            axios.post('http://127.0.0.1:8000/api/danh-gia/doi-TT', x)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.load();
                    } else {
                        toaster.error('Đổi trạng thái thất bại');
                    }
                })
                .catch(() => toaster.error('Lỗi khi gọi API đổi trạng thái'));
        },
        timkiem() {
            axios.post('http://127.0.0.1:8000/api/danh-gia/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_danh_gia = res.data.data;
                })
                .catch(() => console.error('Lỗi khi tìm kiếm'));
        }
    },
}

</script>
<style></style>