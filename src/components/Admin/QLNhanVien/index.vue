<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH SÁCH
                NHÂN VIÊN</h3>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button"
                    id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Hình ảnh</th>
                            <th>Email</th>
                            <th>Tiền khám</th>
                            <th>Mô tả</th>
                            <th>Tình trạng</th>
                            <th>Tên chức vụ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_nhan_vien" :key="index">
                            <tr class="text-center align-middle text-nowrap">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.ten_nv }}</td>
                                <td>{{ value.gioi_tinh === 1 ? 'Nữ' : 'Nam' }}</td>
                                <td><img style="height: 110px; width: 100px;" class="rounded-circle img-fluid"
                                        :src="value.hinh_anh">
                                </td>
                                <td>{{ value.email }}</td>
                                <td>
                                    <span v-if="value.ten_chuc_vu === 'Bác sĩ'">{{ value.tien_kham }}</span>
                                    <span v-else>-</span>
                                </td>
                                <td class="text-center align-middle">
                                    <span data-bs-toggle="modal" data-bs-target="#mota"><i
                                            class="fa-solid fa-2x fa-circle-exclamation"
                                            v-on:click="Object.assign(chi_tiet_nv, value)"></i></span>
                                </td>
                                <td>
                                    <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 0"
                                        class="btn btn-secondary">Nghỉ</button>
                                    <button v-on:click="doiTT(value)" v-else class="btn btn-success">Hoạt động</button>
                                </td>
                                <td>{{ value.ten_chuc_vu }}</td>
                                <td>
                                    <button v-on:click="Object.assign(update_nhan_vien, value)" data-bs-toggle="modal"
                                        data-bs-target="#capnhat" style="width:100px ;" class="btn btn-primary me-2">Cập
                                        nhật</button>
                                    <button v-on:click="Object.assign(del_nhan_vien, value)" data-bs-toggle="modal"
                                        data-bs-target="#xoa" style="width:100px ;" class="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-secondary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">MÔ TẢ DỊCH VỤ</h1>
                </div>
                <div class="modal-body">
                    {{ chi_tiet_nv.mo_ta }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                </div>
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
                    <label for="">Họ và tên</label>
                    <input v-model="nhan_vien.ten_nv" class="form-control mb-2" type="text">
                    <label for="">Giới tính</label>
                    <select v-model="nhan_vien.gioi_tinh" class="form-control mb-2 form-select" name="" id="">
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    <label for="">Hình ảnh</label>
                    <input v-model="nhan_vien.hinh_anh" class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input v-model="nhan_vien.email" class="form-control mb-2" type="text">
                    <label for="">Password</label>
                    <input v-model="nhan_vien.password" class="form-control mb-2" type="password">
                    <label for="">Mô tả</label>
                    <input v-model="nhan_vien.mo_ta" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="nhan_vien.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Nghỉ</option>
                        <option value="1">Hoạt động</option>
                    </select>
                    <label for="">Tên chức vụ</label>
                    <select v-model="nhan_vien.id_chucvu" class="form-control mb-2 form-select" name="" id="">
                        <template v-for="(value, index) in list_chuc_vu" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_chuc_vu }}</option>
                        </template>
                    </select>
                    <div class="" v-if="isBacSi(nhan_vien.id_chucvu)">
                        <label for="">Tiền khám</label>
                        <input v-model="nhan_vien.tien_kham" class="form-control mb-2" type="number">
                    </div>
                    <!-- <input v-model="nhan_vien.id_chucvu" class="form-control mb-2" type="text"> -->
                </div>
                <div class="modal-footer">
                    <button v-on:click="them()" type="button" class="btn btn-primary"
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
                    <h5>Bạn có muốn xóa <span class="text-danger">{{ del_nhan_vien.ten_nv }}</span> không?</h5>
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
                    <label for="">Họ và tên</label>
                    <input v-model="update_nhan_vien.ten_nv" class="form-control mb-2" type="text">
                    <label for="">Giới tính</label>
                    <select v-model="update_nhan_vien.gioi_tinh" class="form-control mb-2" name="" id="">
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    <label for="">Hình ảnh</label>
                    <input v-model="update_nhan_vien.hinh_anh" class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input v-model="update_nhan_vien.email" class="form-control mb-2" type="text">
                    <label for="">Password</label>
                    <input v-model="update_nhan_vien.password" class="form-control mb-2" type="password">

                    <label for="">Mô tả</label>
                    <textarea v-model="update_nhan_vien.mo_ta" class="form-control mb-2" name="" id="" cols="10"
                        rows="10"></textarea>
                    <label for="">Tình trạng</label>
                    <select v-model="update_nhan_vien.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Nghỉ</option>
                        <option value="1">Hoạt động</option>
                    </select>
                    <label for="">Tên chức vụ</label>
                    <select v-model="update_nhan_vien.id_chucvu" class="form-control mb-2 form-select" name="" id="">
                        <template v-for="(value, index) in list_chuc_vu" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_chuc_vu }}</option>
                        </template>
                    </select>
                    <div class="" v-if="isBacSi(update_nhan_vien.id_chucvu)">
                        <label for="">Tiền khám</label>
                        <input v-model="update_nhan_vien.tien_kham" class="form-control mb-2" type="number">
                    </div>

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
    data() {
        return {
            nhan_vien: {
                'ten_nv': '',
                'gioi_tinh': '',
                'email': '',
                'tien_kham': '',
                'password': '',
                'mo_ta': '',
                'hinh_anh': '',
                'tinh_trang': '',
                'id_chucvu': '',
            },
            list_nhan_vien: [],
            list_chuc_vu: [],
            del_nhan_vien: {},
            update_nhan_vien: {},
            chi_tiet_nv: {},
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
    mounted() {
        this.load(),
            this.loadChucVu()
    },
    methods: {
        load() {
            axios
                .get('http://127.0.0.1:8000/api/nhan-vien/load')
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                })
        },
        isBacSi(idChucVu) {
            const chucVu = this.list_chuc_vu.find(c => c.id === idChucVu);
            return chucVu && chucVu.ten_chuc_vu === 'Bác sĩ';
        },
        loadChucVu() {
            axios
                .get("http://127.0.0.1:8000/api/chuc-vu/load", {
                })
                .then((res) => {
                    this.list_chuc_vu = res.data.data
                    console.log(this.list_chuc_vu);
                });
        },
        them() {
            axios
                .post('http://127.0.0.1:8000/api/nhan-vien/them', this.nhan_vien)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                        this.nhan_vien = {
                            'ten_nv': '',
                            'gioi_tinh': '',
                            'email': '',
                            'tien_kham': '',
                            'password': '',
                            'mo_ta': '',
                            'hinh_anh': '',
                            'tinh_trang': '',
                            'id_chucvu': '',
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
                .post('http://127.0.0.1:8000/api/nhan-vien/xoa', this.del_nhan_vien)
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
                .post('http://127.0.0.1:8000/api/nhan-vien/update', this.update_nhan_vien)
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
                .post('http://127.0.0.1:8000/api/nhan-vien/doi-TT', x)
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
                .post('http://127.0.0.1:8000/api/nhan-vien/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                })
        },
    },

}
</script>
<style></style>