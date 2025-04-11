<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between" style="background-color: darkblue;">
            <h4 class="text-white mt-3">ĐÁNH GIÁ</h4>
        </div>
        <div class="card-body">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
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
                                <template v-for="(value, index) in list_khach_hang" :key="index" >
                                    <td class="text-center align-middle">{{ index.ho_va_ten}}</td>
                                </template>
                                <td class="text-center align-middle">{{ value.noi_dung }}</td>
                                <td class="text-center align-middle">{{ value.ngay_tao }}</td>
                                <td class="text-center align-middle">
                                    <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 1"
                                        class="btn btn-success">Hiển thị</button>
                                    <button v-on:click="doiTT(value)" v-else class="btn btn-secondary">Ẩn</button>
                                </td>
                                <td class="text-center align-middle">
                                    <button v-on:click="xoa()" class="btn btn-danger"><i
                                            class="fa-solid fa-trash"></i></button>
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
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default {
    
    mounted() {
        this.load();
        this.loadKH()
    },
    load() {
        axios
            .get('http://127.0.0.1:8000/api/danh-gia/load')
            .then((res) => {
                this.list_danh_gia = res.data.data
            })
    },
    loadKH() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/load", {
                })
                .then((res) => {
                    this.list_khach_hang = res.data.data
                    console.log(this.list_khach_hang);

                });
        },
    xoa() {
        axios
            .post('http://127.0.0.1:8000/api/danh-gia/xoa', this.del_danh_gia)
            .then((res) => {
                if (res.data.status == true) {
                    toaster.success(res.data.message)
                    this.load()
                } else {
                    toaster.error('Xóa thất bại')
                }
            })
    },
    doiTT(x) {
        axios
            .post('http://127.0.0.1:8000/api/danh-gia/doi-TT', x)
            .then((res) => {
                if (res.data.status == true) {
                    toaster.success(res.data.message)
                    this.load()
                } else {
                    toaster.error('Đổi trạng thái thất bại')
                }

            })
    },
    timkiem() {
        axios
            .post('http://127.0.0.1:8000/api/danh-gia/tim-kiem', this.tim_kiem)
            .then((res) => {
                this.list_danh_gia = res.data.data
            })
    },
    data() {
        return {
            danh_gia: {
                'id_kh': '',
                'noi_dung': '',
                'ngay_tao': '',
                'tinh_trang': '',
            },
            list_danh_gia: [],
            list_khach_hang:[],
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
}
</script>
<style></style>