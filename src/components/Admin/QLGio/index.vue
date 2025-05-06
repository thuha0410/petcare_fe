<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ GIỜ</h3>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
                        class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Khung giờ</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in ds_gio" :key="index">
                            <tr class="text-center align-middle text-nowrap">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.khung_gio }}</td>
                                <td>
                                    <button v-on:click="doitt(value)" v-if="value.tinh_trang == 0"
                                        class="btn btn-success">Hiện</button>
                                    <button v-on:click="doitt(value)" v-if="value.tinh_trang == 1"
                                        class="btn btn-warning">Ẩn</button>
                                </td>
                                <td>
                                    <button v-on:click="Object.assign(sua_gio, value)" data-bs-toggle="modal"
                                        data-bs-target="#sua" class="btn btn-primary">Sửa</button>
                                    <button v-on:click="Object.assign(xoa_gio, value)" data-bs-toggle="modal"
                                        data-bs-target="#xoa" class="btn btn-danger ms-2">Xoá</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Khung giờ</label>
                    <input v-model="gio.khung_gio" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="gio.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Ẩn</option>
                        <option value="1">Hiện</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" v-on:click="them()" class="btn btn-primary"
                        data-bs-dismiss="modal">Thêm</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xlg">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" v-on:click="xoa()" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Khung giờ</label>
                    <input v-model="sua_gio.khung_gio" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="sua_gio.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Hiện</option>
                        <option value="1">Ẩn</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="sua()" data-bs-dismiss="modal">Cập
                        nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
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
            ds_gio: [],
            gio: {
                "khung_gio": "",
                'tinh_trang': "",
            },
            xoa_gio: {},
            sua_gio: {},
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/gio/them', this.gio )
                .then(
                    (res) => {
                        if (res.data.status == 1)
                            toaster.success(res.data.message)
                        this.loadData();
                    }
                )
        },
        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/gio/del', this.xoa_gio,
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
        sua() {
            axios
                .post('http://127.0.0.1:8000/api/gio/update', this.sua_gio,
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
                .get('http://127.0.0.1:8000/api/gio/load')
                .then(
                    (res) => {
                        this.ds_gio = res.data.data;
                    }
                )
        },
        doitt(x) {
            axios
                .post('http://127.0.0.1:8000/api/gio/doi-TT', x)
                .then(
                    (res) => {
                        if (res.data.status == 1)
                            toaster.success(res.data.message)
                        this.loadData();
                    }
                )
        },
    },
}
</script>
<style></style>