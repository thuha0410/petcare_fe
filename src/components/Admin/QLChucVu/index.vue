<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between text-nowrap ">
                    <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">
                    NHẬP THÔNG TIN    
                    </h3>
                </div>
                <div class="card-body ">
                    <label for="">Tên chức vụ</label>
                    <input v-model="chuc_vu.ten_chuc_vu" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="chuc_vu.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Không hoạt động</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="them()" type="button" class="btn btn-outline-primary px-5 radius-30 ">Thêm</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between text-nowrap ">
                    <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">
                    DANH SÁCH CHỨC VỤ    
                    </h3>
                </div>
                <div class="card-body ">
                    <div class="input-group mb-3">
                        <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm"
                            aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button"
                            id="button-addon2"><i class="fa-solid fa-magnifying-glass"
                                style="color: #000000;"></i>Tìm</button>
                    </div>
                    <div class="table table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center align-middle text-nowrap">
                                    <th>#</th>
                                    <th>Tên chức vụ</th>
                                    <th>Tình trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_chuc_vu" :key="index">
                                    <tr class="text-center align-middle text-nowrap">
                                        <th>{{ index + 1 }}</th>
                                        <td>{{ value.ten_chuc_vu }}</td>
                                        <td>
                                            <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 0"
                                                class="btn btn-secondary">Không hoạt động</button>
                                            <button v-on:click="doiTT(value)" v-else class="btn btn-success">Hoạt
                                                động</button>
                                        </td>
                                        <td>
                                            <button v-on:click="Object.assign(update_chuc_vu, value)"
                                                data-bs-toggle="modal" data-bs-target="#capnhat" style="width:100px ;"
                                                class="btn btn-primary me-2">Cập nhật</button>
                                            <button v-on:click="Object.assign(del_chuc_vu, value)"
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
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xlg">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có muốn xóa <span class="text-danger">{{ del_chuc_vu.ten_chuc_vu }}</span> không?</h5>
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Tên chức vụ</label>
                    <input v-model="update_chuc_vu.ten_chuc_vu" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="update_chuc_vu.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Không hoạt động</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button v-on:click="update()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });
export default {
    methods: {
        load() {
            axios
                .get('http://127.0.0.1:8000/api/chuc-vu/load')
                .then((res) => {
                    this.list_chuc_vu = res.data.data
                })
        },
        them() {
            axios
                .post('http://127.0.0.1:8000/api/chuc-vu/them', this.chuc_vu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                        this.chuc_vu = {
                            'ten_chuc_vu': '',
                            'tinh_trang': '',
                        }
                    } else {
                        toaster.error('Thêm mới thất bại')
                    }
                })
                .catch((res) => {

                    toaster.error(res.response.data.message);
                })
        },
        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/chuc-vu/xoa', this.del_chuc_vu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Xóa thất bại')
                    }
                })
        },
        update() {
            axios
                .post('http://127.0.0.1:8000/api/chuc-vu/update', this.update_chuc_vu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Cập nhật không thành công')
                    }

                })

        },
        doiTT(x) {
            axios
                .post('http://127.0.0.1:8000/api/chuc-vu/doi-TT', x)
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
                .post('http://127.0.0.1:8000/api/chuc-vu/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_chuc_vu = res.data.data
                })
        },
    },
    mounted() {
        this.load()
    },
    data() {
        return {
            chuc_vu: {
                'ten_chuc_vu': '',
                'tinh_trang': '',
            },
            list_chuc_vu: [],
            del_chuc_vu: {},
            update_chuc_vu: {},
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
}
</script>
<style></style>