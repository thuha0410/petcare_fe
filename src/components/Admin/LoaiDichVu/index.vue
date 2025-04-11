<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH
                SÁCH LOẠI DỊCH VỤ</h3>
            <div class=""></div>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-primary px-5">Thêm Mới</button>
        </div>
        <div class="card-body">
            <div class="table table-resposive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>#</th>
                            <th>Tên loại dịch vụ </th>
                            <th>Mô tả</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_loai_dv" :key="index">
                            <tr>
                                <th class="text-center align-middle">{{ index + 1 }}</th>
                                <td class="text-center align-middle">{{ value.ten_loaidv }}</td>
                                <td class="text-center align-middle">
                                    <span data-bs-toggle="modal" data-bs-target="#mota"><i
                                            class="fa-solid fa-2x fa-circle-exclamation"
                                            v-on:click="Object.assign(chi_tiet_loai_dv, value)"></i></span>
                                </td>
                                <td class="text-center align-middle">
                                    <button v-on:click="Object.assign(update_loai_dv, value)" data-bs-toggle="modal"
                                        data-bs-target="#capnhat" style="width:100px;" class="btn btn-primary me-2">Cập
                                        nhật</button>
                                    <button v-on:click="Object.assign(del_loai_dv, value)" data-bs-toggle="modal"
                                        data-bs-target="#xoa" style="width:100px;" class="btn btn-danger ">Xóa</button>
                                </td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- modal xoa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal them -->
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÊM MỚI DỊCH VỤ</h1>
                </div>
                <div class="modal-body">
                    <label for="">Tên loại dịch vụ</label>
                    <input v-model="loai_dv.ten_loaidv" class="form-control mb-2" type="text">
                    <label for="">Mô tả</label>
                    <textarea v-model="loai_dv.mo_ta" class="form-control" placeholder="Nhập mô tả dịch vụ..." name=""
                        id="" rows="5"></textarea>
                </div>
                <div class="modal-footer">
                    <button v-on:click="them()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                        mới</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal i -->
    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-secondary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">MÔ TẢ DỊCH VỤ</h1>
                </div>
                <div class="modal-body">
                    {{ chi_tiet_loai_dv.mo_ta }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
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
                    <label for="">Tên dịch vụ</label>
                    <input v-model="update_loai_dv.ten_loaidv" class="form-control mb-2" type="text">
                    <label for="">Mô tả</label>
                    <textarea v-model="update_loai_dv.mo_ta" class="form-control" placeholder="Nhập mô tả dịch vụ..."
                        name="" id="" rows="3"></textarea>
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
            list_loai_dv: [],
            loai_dv: {
                'ten_loaidv': '',
                'mo_ta': '',
            },
            update_loai_dv: {},
            del_loai_dv: {},
            chi_tiet_loai_dv: {}
        }
    },
    mounted() {
        this.loaddata()
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/loai-dich-vu/them', this.loai_dv)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loaddata()
                        this.loai_dv = {
                            'ten_loaidv': '',
                            'mo_ta': '',
                        }
                    } else {
                        toaster.error('Thêm mới loại dịch vụ thất bại')
                    }
                })
                .catch((res) => {
                    toaster.error(res.response.data.message);
                });
        },
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/loai-dich-vu/xoa", this.del_loai_dv)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Xóa loại dịch vụ thất bại!")
                    }
                });
        },
        update() {
            axios
                .post("http://127.0.0.1:8000/api/loai-dich-vu/update", this.update_loai_dv)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Cập nhật loại dịch vụ thất bại!")
                    }
                });
        },
        loaddata() {
            axios
                .get("http://127.0.0.1:8000/api/loai-dich-vu/load")
                .then((res) => {
                    this.list_loai_dv = res.data.data
                });
        }

    },
}
</script>
<style></style>