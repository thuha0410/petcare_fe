<template>
    <div class="row">
        <div class="col-lg-3">
            <div class="card">
                <div style="background-color: darkblue; " class="card-header d-flex justify-content-between">
                    <h4 style="color: white;"> THÊM THÔNG TIN KHO   </h4>
                </div>
                <div class="card-body">
                    <label class="fw-bold" for="">Tên kho</label>
                    <input v-model="kho.ten_kho" class="form-control" type="text">
                    <label class="mt-2 fw-bold" for="">Địa chỉ</label>
                    <input v-model="kho.dia_chi" class="form-control" type="text">
                    <label class="mt-2 fw-bold" for="">Tình trạng</label>
                    <select v-model="kho.tinh_trang" class="form-control form-select" name="" id="">
                        <option value="1">Hoạt động</option>
                        <option value="0">Tạm ngưng</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="them()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
                </div>
                
            </div>
        </div>
        <div class="col-lg-9">
            <div class="card">
                <div style="background-color: darkblue; " class="card-header ">
                    <h4 style="color: white;" class="text-center">THÔNG TIN KHO</h4>
                    <div class="input-group">
                        <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm thông tin kho..." aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button v-on:click="timkiem()" class="btn btn-secondary" type="button" id="button-addon2"><i
                                class="fa-solid fa-magnifying-glass"></i>Tìm</button>
                    </div>
                    
                </div>
                <div class="card-body">
                    <div class="table table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle">#</th>
                                    <th class="text-center align-middle">Tên kho</th>
                                    <th class="text-center align-middle">Địa chỉ</th>
                                    <th class="text-center align-middle">Tình trạng</th>
                                    <th class="text-center align-middle">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value,index) in list_kho" :key="index">
                                    <tr>
                                    <td class="text-center align-middle">{{ index+1 }}</td>
                                    <td class="text-center align-middle">{{value.ten_kho}}</td>
                                    <td class="text-center align-middle">{{value.dia_chi}}</td>
                                    <td class="text-center align-middle">
                                        <button v-if="value.tinh_trang == 1" v-on:click="doi_trang_thai(value)" class="btn btn-success me-2">Hoạt động</button>
                                        <button v-else v-on:click="doi_trang_thai(value)" class="btn btn-secondary">Tạm ngưng</button> 
                                    </td>
                                    <td class="text-center align-middle">
                                        <button v-on:click="Object.assign(update_kho, value)" class="btn btn-primary me-2 text-center" data-bs-toggle="modal" data-bs-target="#capnhat"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <!-- xoa -->
                                        <button v-on:click="Object.assign(del_kho, value)" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#xoa"><i class="fa-solid fa-trash"></i></button>
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
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có chắc chắn muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal cap nhat -->
    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Tên kho</label>
                    <input v-model="update_kho.ten_kho"  class="form-control mb-2" type="text">
                    <label for="">Địa chỉ</label>
                    <input  class="form-control mb-2" v-model="update_kho.dia_chi" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="update_kho.tinh_trang" class="form-control form-select" name="" id="">
                        <option value="1">Hoạt động</option>
                        <option value="0">Tạm ngưng</option>
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
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-right' });
export default {
    data() {
        return {
            list_kho:[],
            kho:{
                'ten_kho':'',
                'dia_chi':'',
                'tinh_trang':''
            },
            update_kho:{},
            del_kho:{},
            tim_kiem: {
                noi_dung: ''
            },
        }
    },
    mounted() {
        this.loaddata()
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/kho/them', this.kho)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loaddata()
                        this.kho = {
                            "ten_kho": '',
                            "dia_chi": '',
                            'tinh_trang': ''
                        }
                    } else {
                        toaster.error('Thêm mới kho thất bại')
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors;

                        for (const key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                
                                errors[key].forEach(err => {
                                    toaster.error(err);
                                });
                            }
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi khi gửi yêu cầu.');
                    }
                });

        },
        timkiem() {
            axios
                .post('http://127.0.0.1:8000/api/kho/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_kho = res.data.data
                })
        },
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/kho/del", this.del_kho)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Xóa kho thất bại!")
                    }

                });
        },

        update() {
            axios
                .post("http://127.0.0.1:8000/api/kho/update", this.update_kho)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Cập nhật kho thất bại!")
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors;

                        for (const key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                
                                errors[key].forEach(err => {
                                    toaster.error(err);
                                });
                            }
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi khi gửi yêu cầu.');
                    }
                });
        },
        doi_trang_thai(x) {
            axios
                .post("http://127.0.0.1:8000/api/kho/doi", x)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Đổi trạng thái kho thất bại!")
                    }
                });
        },
        loaddata() {
            axios
                .get("http://127.0.0.1:8000/api/kho/load")
                .then((res) => {
                    this.list_kho = res.data.data
                });
        }
    },
}
</script>
<style></style>