<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header" style="background-color: darkblue;">
                    <h4 class="text-white">NHẬP THÔNG TIN</h4>
                </div>
                <div class="card-body">
                    <div class="input-group">
                    </div>
                    <label for="">Mã lương</label>
                    <input v-model="loai_luong.id_luong" class="form-control" type="text">
                    <label for="">Tên nhân viên</label>
                    <select class="form-control" name="" id="">
                        <template v-for="(value,index) in nhan_vien" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                        </template>
                    </select>
                    <label for="">Tiền lương</label>
                    <input v-model="loai_luong.tien_luong" class="form-control" type="text">
                    <label for="">Ngày thanh toán</label>
                    <input v-model="loai_luong.ngay_thanh_toan" class="form-control" type="date">
                    <label for="">Tiền thưởng</label>
                    <input v-model="loai_luong.tien_thuong" class="form-control" type="text">
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="them()" class="btn btn-outline-primary">Hoàn tất</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">

            <div class="card">
                <div class="card-header" style="background-color: darkblue;">
                    <h4 class="text-white">LƯƠNG</h4>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="search" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-secondary" type="button" id="button-addon2"><i
                                class="fa-solid fa-magnifying-glass"></i>Tìm</button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle">#</th>
                                    <th class="text-center align-middle">Mã lương</th>
                                    <th class="text-center align-middle">Tên nhân viên</th>
                                    <th class="text-center align-middle">Tiền lương</th>
                                    <th class="text-center align-middle">Ngày thanh toán</th>
                                    <th class="text-center align-middle">Tiền thưởng</th>
                                    <th class="text-center align-middle">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in ds_luong" :key="index">
                                    <tr>
                                    <td class="text-center align-middle">{{ index+1 }}</td>
                                    <td class="text-center align-middle">{{ value.id_luong }}</td>
                                    <td class="text-center align-middle">{{ value.id_nv }}</td>
                                    <td class="text-center align-middle">{{ value.tien_luong }}</td>
                                    <td class="text-center align-middle">{{ value.ngay_thanh_toan }}</td>
                                    <td class="text-center align-middle">{{ value.tien_thuong }}</td>
                                    <td class="text-center align-middle">
                                        <button v-on:click="doitt(value)" v-if="value.tinh_trang == 1"
                                            class="btn btn-success">Đã thanh toán</button>
                                        <button v-on:click="doitt(value)" v-if="value.tinh_trang == 0"
                                            class="btn btn-warning">Chưa thanh toán</button>
                                    </td>
                                </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            ds_luong: [

            ],
            nhan_vien:[],
            loai_luong: {
                'id_luong': "",
                'id_nv': "",
                'tien_luong': "",
                'ngay_thanh_toan': "",
                'tinh_trang': "",
                'tien_thuong': "",
            },
        }
    },
    mounted() {
        this.loadData();
        this.loadDataNV();
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/them-luong', this.loai_luong,
                    // {
                    //     headers: {
                    //         Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                    //     }
                    // }
                )
                .then(
                    (res) => {
                        if (res.data.status == 1)
                            toaster.success(res.data.message)
                        this.loadData();
                    }
                )
        },
        loadData() {
            axios
                .get('http://127.0.0.1:8000/api/load-luong',
                    // {
                    //     headers: {
                    //         Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                    //     }
                    // }
                )
                .then(
                    (res) => {
                        this.ds_khoa_hoc = res.data.data;
                    }
                )
        },
        doitt(x) {
            axios
                .post('http://127.0.0.1:8000/api/thay-doi-trang-thai-luong', x,
                    // {
                    //     headers: {
                    //         Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                    //     }
                    // }
                )
                .then(
                    (res) => {
                        if (res.data.status == 1)
                            toaster.success(res.data.message)
                        this.loadData();
                    }
                )
        },
        loadDataNV() {
            axios
                .get('http://127.0.0.1:8000/api/nhan-vien/load')
                .then(
                    (res) => {
                        this.nhan_vien = res.data.data;
                    }
                )
        },
    },
}
</script>
<style></style>