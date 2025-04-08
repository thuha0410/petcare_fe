<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                NHÀ CUNG CẤP</h3>
            
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value,index) in list_nha_cung_cap" :key="index">
                            <tr class="text-center align-middle text-nowrap">
                            <th>{{ index+1 }}</th>
                            <td>{{ value.ten_ncc }}</td>
                            <td>{{ value.email }}</td>
                            <td>{{ value.sdt }}</td>
                            <td>{{ value.dia_chi }}</td>
                            <td>
                                <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 0" class="btn btn-warning">Ngưng hoạt động</button>
                                <button v-on:click="doiTT(value)" v-else class="btn btn-success">Hoạt động</button>
                            </td>
                            <td>
                                <button  v-on:click="Object.assign(update_nha_cung_cap, value)" data-bs-toggle="modal" data-bs-target="#capnhat" style="width:100px ;"
                                    class="btn btn-primary me-2">Cập nhật</button>
                                <button v-on:click="Object.assign(del_nha_cung_cap, value)" data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px ;"
                                    class="btn btn-danger">Xóa</button>
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
                    <label for="">Tên nhà cung cấp</label>
                    <input v-model="nha_cung_cap.ten_ncc" class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input v-model="nha_cung_cap.email" class="form-control mb-2" type="text">
                    <label for="">Số điện thoại</label>
                    <input v-model="nha_cung_cap.sdt" class="form-control mb-2" type="text">
                    <label for="">Địa chỉ</label>
                    <input v-model="nha_cung_cap.dia_chi" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="nha_cung_cap.tinh_trang"  class="form-control mb-2" name="" id="">
                        <option value="0">Ngưng hoạt động</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button v-on:click="them()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
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
                    <h5>Bạn có muốn xóa <span class="text-danger">{{ del_nha_cung_cap.ten_ncc }}</span> không?</h5>
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
                    <label for="">Tên nhà cung cấp</label>
                    <input v-model="update_nha_cung_cap.ten_ncc" class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input v-model="update_nha_cung_cap.email" class="form-control mb-2" type="text">
                    <label for="">Số điện thoại</label>
                    <input v-model="update_nha_cung_cap.sdt" class="form-control mb-2" type="text">
                    <label for="">Địa chỉ</label>
                    <input v-model="update_nha_cung_cap.dia_chi" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="update_nha_cung_cap.tinh_trang"  class="form-control mb-2" name="" id="">
                        <option value="0">Ngưng hoạt động</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button v-on:click="update()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập nhật</button>
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
                .get('http://127.0.0.1:8000/api/nha-cung-cap/load')
                .then((res) => {
                    this.list_nha_cung_cap = res.data.data
                })
        },
        them() {
            axios
                .post('http://127.0.0.1:8000/api/nha-cung-cap/them', this.nha_cung_cap)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Thêm mới thất bại')
                    }
                })
                .catch((res)=>{
                    
                    toaster.error(res.response.data.message);
                })
        },
        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/nha-cung-cap/xoa', this.del_nha_cung_cap)
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
                .post('http://127.0.0.1:8000/api/nha-cung-cap/update', this.update_nha_cung_cap)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.load()
                    } else {
                        toaster.error('Cập nhật không thành công')
                    }

                })

        },
        doiTT(x){
            axios
            .post('http://127.0.0.1:8000/api/nha-cung-cap/doi-TT',x)
            .then((res)=>{
                if (res.data.status == true) {
                    toaster.success(res.data.message)
                        this.load()
                    } else {
                   toaster.error('Đổi trạng thái thất bại')
                    }
                
            })
        }
    },
    mounted() {
        this.load()
    },
    data() {
        return {
            nha_cung_cap: {
            'ten_ncc':'',
            'email':'',
            'sdt':'',
            'dia_chi':'',
            'tinh_trang':'',
            },
            list_nha_cung_cap: [],
            del_nha_cung_cap: {},
            update_nha_cung_cap: {}
        }
    },
}
</script>
<style></style>