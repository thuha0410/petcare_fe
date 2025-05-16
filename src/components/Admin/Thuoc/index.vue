<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                THUỐC</h3>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button"
                    id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Tên thuốc</th>
                            <th>Đơn vị</th>
                            <th>Mô tả</th>
                            <th>Giá bán</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_thuoc" :key="index">
                            <tr class="text-center align-middle text-nowrap">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.ten_thuoc }}</td>
                                <td>{{ value.don_vi }}</td>
                                <td class="text-center align-middle">
                                    <span data-bs-toggle="modal" data-bs-target="#mota"><i
                                            class="fa-solid fa-2x fa-circle-exclamation"
                                            v-on:click="Object.assign(chi_tiet_thuoc, value)"></i></span>
                                </td>
                                <td>{{ value.gia_ban }}</td>
                                <td>
                                    <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 0"
                                        class="btn btn-warning">Ngưng sử dụng</button>
                                    <button v-on:click="doiTT(value)" v-else class="btn btn-success">Đang sử dụng</button>
                                </td>
                                <td>
                                    <button v-on:click="Object.assign(update_thuoc, value)" data-bs-toggle="modal"
                                        data-bs-target="#capnhat" style="width:100px ;" class="btn btn-primary me-2">Cập
                                        nhật</button>
                                    <button v-on:click="Object.assign(del_thuoc, value)" data-bs-toggle="modal"
                                        data-bs-target="#xoa" style="width:100px ;" class="btn btn-danger">Xóa</button>
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
                    <label for="">Tên thuốc</label>
                    <input v-model="thuoc.ten_thuoc" class="form-control mb-2" type="text">
                    <label for="">Đơn vị</label>
                    <input v-model="thuoc.don_vi" class="form-control mb-2" type="text">
                    <label for="">Mô tả</label>
                    <input v-model="thuoc.mo_ta" class="form-control mb-2" type="text">
                    <label for="">Giá bán</label>
                    <input v-model="thuoc.gia_ban" class="form-control mb-2" type="number">
                    <label for="">Tình trạng</label>
                    <select v-model="thuoc.tinh_trang" class="form-control form-select mb-2" name="" id="">
                        <option value="0">Ngưng sử dụng</option>
                        <option value="1">Đang sử dụng</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button v-on:click="them()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Thêm</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal chi tiet -->
    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-secondary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">MÔ TẢ DỊCH VỤ</h1>
                </div>
                <div class="modal-body">
                    {{ chi_tiet_thuoc.mo_ta }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal xoa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xlg">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn chắc chắn muốn xóa <span class="text-danger">{{ del_thuoc.ten_thuoc }}</span> không?</h5>
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
                    <label for="">Tên thuốc</label>
                    <input v-model="update_thuoc.ten_thuoc" class="form-control mb-2" type="text">
                    <label for="">Đơn vị</label>
                    <input v-model="update_thuoc.don_vi" class="form-control mb-2" type="text">
                    <label for="">Mô tả</label>
                    <input v-model="update_thuoc.mo_ta" class="form-control mb-2" type="text">
                    <label for="">Giá bán</label>
                    <input v-model="update_thuoc.gia_ban" class="form-control mb-2" type="number">
                    <label for="">Tình trạng</label>
                    <select v-model="update_thuoc.tinh_trang" class="form-control form-select mb-2" name="" id="">
                        <option value="0">Ngưng sử dụng</option>
                        <option value="1">Đang sử dụng</option>
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
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });
export default {
    methods: {
        load() {
            axios
                .get('http://127.0.0.1:8000/api/thuoc/load',
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_thuoc = res.data.data
                })
        },
        them() {
            axios
                .post('http://127.0.0.1:8000/api/thuoc/them', this.thuoc,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                        this.thuoc = {
                            'ten_thuoc': '',
                            'don_vi': '',
                            'mo_ta': '',
                            'gia_ban': '',
                            'tinh_trang': '',
                        }
                    } else {
                        toaster.error('Thêm mới thất bại')
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.errors;
                        for (let field in errors) {
                            errors[field].forEach(err => {
                                toaster.error(err);
                            });
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi máy chủ.');
                    }
                });
        },
        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/thuoc/xoa', this.del_thuoc,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
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
                .post('http://127.0.0.1:8000/api/thuoc/update', this.update_thuoc,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
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
                .post('http://127.0.0.1:8000/api/thuoc/doi-TT', x,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
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
                .post('http://127.0.0.1:8000/api/thuoc/tim-kiem', this.tim_kiem,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_thuoc = res.data.data
                })
        },
    },
    mounted() {
        this.load()
    },
    data() {
        return {
            thuoc: {
                'ten_thuoc': '',
                'don_vi': '',
                'mo_ta': '',
                'gia_ban': '',
                'tinh_trang': '',
            },
            list_thuoc: [],
            del_thuoc: {},
            update_thuoc: {},
            tim_kiem: {
                noi_dung: ''
            },
            chi_tiet_thuoc:{}
        }
    },
}
</script>
<style></style>