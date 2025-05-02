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
                    <select v-model="loai_luong.id_nv" class="form-control">
                        <template v-for="(value, index) in nhan_vien" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                        </template>
                    </select>
                    <label for="">Tiền lương</label>
                    <input v-model="loai_luong.tien_luong" class="form-control" type="text">
                    <label for="">Ngày thanh toán</label>
                    <input v-model="loai_luong.ngay_thanh_toan" class="form-control" type="date">
                    <label for="">Tiền thưởng</label>
                    <input v-model="loai_luong.tien_thuong" class="form-control" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="loai_luong.tinh_trang" class="form-control">
                        <option value="0">Chưa thanh toán</option>
                        <option value="1">Đã thanh toán</option>
                    </select>
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
                        <button v-on:click="TimKiem()" class="btn btn-secondary" type="button" id="button-addon2"><i
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
                                    <th class="text-center align-middle">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in ds_luong" :key="index">
                                    <tr>
                                        <td class="text-center align-middle">{{ index + 1 }}</td>
                                        <td class="text-center align-middle">{{ value.id_luong }}</td>
                                        <td class="text-center align-middle">{{ value.ten_nv }}</td>
                                        <td class="text-center align-middle">{{ value.tien_luong }}</td>
                                        <td class="text-center align-middle">{{ value.ngay_thanh_toan }}</td>
                                        <td class="text-center align-middle">{{ value.tien_thuong }}</td>
                                        <td class="text-center align-middle">
                                            <button v-on:click="doitt(value)" v-if="value.tinh_trang == 1"
                                                class="btn btn-success">Đã thanh toán</button>
                                            <button v-on:click="doitt(value)" v-if="value.tinh_trang == 0"
                                                class="btn btn-warning">Chưa thanh toán</button>
                                        </td>
                                        <td class="text-center align-middle">
                                            <button v-on:click="Object.assign(sua_luongNV, value)"
                                                data-bs-toggle="modal" data-bs-target="#sua" style="width:100px ;"
                                                class="btn btn-primary me-2">Sửa</button>
                                            <button v-on:click="Object.assign(xoa_luongNV, value)"
                                                data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px ;"
                                                class="btn btn-danger">Xóa</button>
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

    <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">SỬA THÔNG TIN LƯƠNG</h1>
                </div>
                <div class="modal-body">
                    <label for="">Mã lương</label>
                    <input v-model="sua_luongNV.id_luong" class="form-control" type="text">
                    <label for="">Tên nhân viên</label>
                    <select v-model="sua_luongNV.id_nv" class="form-control">
                        <template v-for="(value, index) in nhan_vien" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                        </template>
                    </select>
                    <label for="">Tiền lương</label>
                    <input v-model="sua_luongNV.tien_luong" class="form-control" type="text">
                    <label for="">Ngày thanh toán</label>
                    <input v-model="sua_luongNV.ngay_thanh_toan" class="form-control" type="date">
                    <label for="">Tiền thưởng</label>
                    <input v-model="sua_luongNV.tien_thuong" class="form-control" type="text">

                </div>
                <div class="modal-footer">
                    <button v-on:click="sua()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        nhật</button>
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
                    <h5>Bạn có muốn xóa lương của <span class="text-danger">{{ xoa_luongNV.ten_nv }}</span> không?</h5>
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
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
            ds_luong: [],
            nhan_vien: [],
            loai_luong: {
                'id_luong': "",
                'id_nv': "",
                'tien_luong': "",
                'ngay_thanh_toan': "",
                'tinh_trang': 0,
                'tien_thuong': "",
            },
            sua_luongNV: {},
            xoa_luongNV: {},
            tim_kiem: {
                noi_dung: ''
            }
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
        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/xoa-luong', this.xoa_luongNV)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Xóa thất bại')
                    }
                })
        },
        sua() {
            axios
                .post('http://127.0.0.1:8000/api/sua-luong', this.sua_luongNV)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Cập nhật không thành công')
                    }

                })

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
                        this.ds_luong = res.data.data;
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
        TimKiem() {
            axios
                .post('http://127.0.0.1:8000/api/tim-kiem-luong', this.tim_kiem)
                .then((res) => {
                    this.ds_luong = res.data.data
                })
        },
    },
}
</script>
<style></style>