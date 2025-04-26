<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH SÁCH
                PET</h3>
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
                            <th>Tên khách hàng</th>
                            <th>Tên pet</th>
                            <th>Chủng loại</th>
                            <th>Giới tính</th>
                            <th>Tuổi</th>
                            <th>Hình ảnh</th>
                            <th>Cân nặng(kg)</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in ds_pet" :key="index">
                            <tr class="text-center align-middle text-nowrap">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.ho_va_ten }}</td>
                                <td>{{ value.ten_pet }}</td>
                                <td>{{ value.chung_loai === 1 ? 'Mèo' : 'Chó' }}</td>
                                <td>{{ value.gioi_tinh === 1 ? 'Cái' : 'Đực' }}</td>
                                <td>{{ value.tuoi }}</td>
                                <td>
                                    <img class=" img-fluid" style="height: 100px; width: 100px;" :src="value.hinh_anh" alt="">
                                </td>
                                <td>{{ value.can_nang }}</td>
                                <td>
                                    <button v-on:click="doitt(value)" v-if="value.tinh_trang == 0"
                                        class="btn btn-success">Đã khám</button>
                                    <button v-on:click="doitt(value)" v-if="value.tinh_trang == 1"
                                        class="btn btn-warning">Chưa khám</button>
                                </td>
                                <td>
                                    <button v-on:click="Object.assign(sua_pet, value)" data-bs-toggle="modal"
                                        data-bs-target="#sua" class="btn btn-primary">Sửa</button>
                                    <button v-on:click="Object.assign(xoa_pet, value)" data-bs-toggle="modal"
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
                    <label for="">Tên khách hàng</label>
                    <select v-model="pet.id_kh" class="form-control">
                        <template v-for="(value, index) in list_khach_hang" :key="index">
                            <option v-bind:value="value.id">{{ value.ho_va_ten }}</option>
                        </template>
                    </select>
                    <label for="">Tên pet</label>
                    <input v-model="pet.ten_pet" class="form-control mb-2" type="text">
                    <label for="">Chủng loại</label>
                    <select v-model="pet.chung_loai" class="form-control mb-2" name="" id="">
                        <option value="0">Mèo</option>
                        <option value="1">Chó</option>
                    </select>
                    <label for="">Giới tính</label>
                    <select v-model="pet.gioi_tinh" class="form-control mb-2" name="" id="">
                        <option value="0">Đực</option>
                        <option value="1">Cái</option>
                    </select>
                    <label for="">Tuổi</label>
                    <input v-model="pet.tuoi" class="form-control mb-2" type="text">
                    <label for="">Hình ảnh</label>
                    <input v-model="pet.hinh_anh" class="form-control mb-2" type="text">
                    <label for="">Cân nặng</label>
                    <input v-model="pet.can_nang" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="pet.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Đã khám</option>
                        <option value="1">Chưa khám</option>
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
                    <label for="">Ten khách hàng</label>
                    <input v-model="sua_pet.id_kh" class="form-control mb-2" type="text">
                    <label for="">Tên pet</label>
                    <input v-model="sua_pet.ten_pet" class="form-control mb-2" type="text">
                    <label for="">Chủng loại</label>
                    <select v-model="sua_pet.chung_loai" class="form-control mb-2" name="" id="">
                        <option value="0">Mèo</option>
                        <option value="1">Chó</option>
                    </select>
                    <label for="">Giới tính</label>
                    <select v-model="sua_pet.gioi_tinh" class="form-control mb-2" name="" id="">
                        <option value="0">Đực</option>
                        <option value="1">Cái</option>
                    </select>
                    <label for="">Tuổi</label>
                    <input v-model="sua_pet.tuoi" class="form-control mb-2" type="text">
                    <label for="">Hình ảnh</label>
                    <!-- <img class="form-control" :src="pet.hinh_anh" alt=""> -->
                    <input v-model="sua_pet.hinh_anh" type="text">
                    <label for="">Cân nặng</label>
                    <input v-model="sua_pet.can_nang" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Đã khám</option>
                        <option value="1">Chưa khám</option>
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
            ds_pet: [],
            pet: {
                "id_kh": "",
                'ten_pet': "",
                'chung_loai': "",
                'gioi_tinh': "",
                'tuoi': "",
                'hinh_anh': "",
                'can_nang': "",
                'tinh_trang': "",
            },
            list_khach_hang: [],
            xoa_pet: {},
            sua_pet: {},
        }
    },
    mounted() {
        this.loadData();
        this.loadKhachHang();
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/them-pet', this.pet )
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
                .post('http://127.0.0.1:8000/api/xoa-pet', this.xoa_pet,
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
                .post('http://127.0.0.1:8000/api/sua-pet', this.sua_pet,
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
                .get('http://127.0.0.1:8000/api/load-pet')
                .then(
                    (res) => {
                        this.ds_pet = res.data.data;
                    }
                )
        },
        loadKhachHang(){
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/load", {
                })
                .then((res) => {
                    this.list_khach_hang = res.data.data
                });
        },
        doitt(x) {
            axios
                .post('http://127.0.0.1:8000/api/thay-doi-tt-pet', x)
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