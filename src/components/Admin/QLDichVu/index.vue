<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH
                SÁCH DỊCH VỤ</h3>
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
                            <th>Tên dịch vụ </th>
                            <th>Loại dịch vụ </th>
                            <th>Hình ảnh </th>
                            <th>Phân loại kg</th>
                            <th>Cân nặng từ (kg)</th>
                            <th>Cân nặng đến(kg)</th>
                            <th>Mô tả</th>
                            <th>Giá</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_dich_vu" :key="index">
                            <tr>
                                <th class="text-center align-middle">{{ index + 1 }}</th>
                                <td class="text-center align-middle">{{ value.ten_dv }}</td>
                                <td class="text-center align-middle">{{ value.ten_loaidv }}</td>
                                <td class="text-center align-middle ">
                                    <img style="width: 100px;" :src="value.hinh_anh" alt="">
                                </td>
                                <td class="text-center align-middle">{{ value.phan_loai_kg === 1 ? 'Có' : 'Không' }}
                                </td>
                                <td class="text-center align-middle">{{ value.can_nang_min }}</td>
                                <td class="text-center align-middle">{{ value.can_nang_max }}</td>
                                <td class="text-center align-middle">
                                    <span data-bs-toggle="modal" data-bs-target="#mota"><i
                                            class="fa-solid fa-2x fa-circle-exclamation"
                                            v-on:click="Object.assign(chi_tiet_dv, value)"></i></span>
                                </td>
                                <td class="text-center align-middle">{{ value.gia }}</td>
                                <td class="text-center align-middle">
                                    <button v-if="value.tinh_trang == 1" v-on:click="doi_trang_thai(value)"
                                        class="btn btn-success me-2">Hoạt động</button>
                                    <button v-else class="btn btn-warning " v-on:click="doi_trang_thai(value)">Tạm
                                        dừng</button>
                                </td>
                                <td class="text-center align-middle">
                                    <button v-on:click="Object.assign(update_dich_vu, value)" data-bs-toggle="modal"
                                        data-bs-target="#capnhat" style="width:100px;" class="btn btn-primary me-2">Cập
                                        nhật</button>
                                    <button v-on:click="Object.assign(del_dich_vu, value)" data-bs-toggle="modal"
                                        data-bs-target="#xoa" style="width:100px;" class="btn btn-danger ">Xóa</button>
                                </td>
                            </tr>
                        </template>

                    </tbody>
                </table>
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
                    <h5>Bạn có muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
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
                    {{ chi_tiet_dv.mo_ta }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÊM MỚI DỊCH VỤ</h1>
                </div>
                <div class="modal-body">
                    <label for="">Tên dịch vụ</label>
                    <input v-model="dich_vu.ten_dv" class="form-control mb-2" type="text">
                    <label for="">Hình ảnh</label>
                    <input v-model="dich_vu.hinh_anh" class="form-control mb-2" type="text">
                    <div class="mb-3">
                        <label class="form-label">Có phân loại cân nặng?</label>
                        <select class="form-select" v-model.number="dich_vu.phan_loai_kg">
                            <option :value="1">Có</option>
                            <option :value="0">Không</option>
                        </select>
                    </div>
                    <div class="row mb-3" v-if="dich_vu.phan_loai_kg === 1">
                        <div class="col">
                            <label class="form-label">Cân nặng từ (kg)</label>
                            <input v-model="dich_vu.can_nang_min" type="number" class="form-control" step="0.1">
                        </div>
                        <div class="col">
                            <label class="form-label">Cân nặng đến (kg)</label>
                            <input v-model="dich_vu.can_nang_max" type="number" class="form-control" step="0.1">
                        </div>
                    </div>
                    <div class="mb-3 text-muted fst-italic" v-else>
                        Dịch vụ không phân loại theo cân nặng.
                    </div>
                    <label for="">Mô tả</label>
                    <input v-model="dich_vu.mo_ta" class="form-control mb-2" type="text">
                    <label for="">Phân loại dịch vụ</label>
                    <select v-model="dich_vu.id_loaidv" class="form-control mb-2 form-select" name="" id="">
                        <template v-for="(value, index) in list_loai_dv" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_loaidv }}</option>
                        </template>
                    </select>
                    <label for="">Giá</label>
                    <input v-model="dich_vu.gia" class="form-control mb-2" type="number">
                    <label for="">Tình trạng</label>
                    <select v-model="dich_vu.tinh_trang" class="form-control mb-2 form-select" name="" id="">
                        <option value="0">Tạm dừng</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button v-on:click="them()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                        mới</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Tên dịch vụ</label>
                    <input v-model="update_dich_vu.ten_dv" class="form-control mb-2" type="text">
                    <label for="">Hình ảnh</label>
                    <input v-model="update_dich_vu.hinh_anh" class="form-control mb-2" type="text">
                    <label class="form-label">Có phân loại cân nặng?</label>
                    <select class="form-select" v-model.number="update_dich_vu.phan_loai_kg" @change="onPhanLoaiChange">
                        <option :value="1">Có</option>
                        <option :value="0">Không</option>
                    </select>


                    <!-- Nếu Có -->
                    <div class="row mb-3" v-if="update_dich_vu.phan_loai_kg === 1">
                        <div class="col">
                            <label class="form-label">Cân nặng từ (kg)</label>
                            <input v-model="update_dich_vu.can_nang_min" type="number" class="form-control" step="0.1">
                        </div>
                        <div class="col">
                            <label class="form-label">Cân nặng đến (kg)</label>
                            <input v-model="update_dich_vu.can_nang_max" type="number" class="form-control" step="0.1">
                        </div>
                    </div>

                    <!-- Nếu Không -->
                    <div class="mb-3 text-muted fst-italic" v-else>
                        Dịch vụ không phân loại theo cân nặng.
                    </div>
                    <label for="">Mô tả</label>
                    <input v-model="update_dich_vu.mo_ta" class="form-control mb-2" type="text">
                    <label for="">Phân loại dịch vụ</label>
                    <select v-model="update_dich_vu.id_loaidv" class="form-control mb-2 form-select" name="" id="">
                        <template v-for="(value, index) in list_loai_dv" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_loaidv }}</option>
                        </template>
                    </select>
                    <label for="">Giá</label>
                    <input v-model="update_dich_vu.gia" class="form-control mb-2" type="number">
                    <label for="">Tình trạng</label>
                    <select v-model="update_dich_vu.tinh_trang" class="form-control mb-2 form-select" name="" id="">
                        <option value="0">Tạm dừng</option>
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

import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-right' });
import api from '@/services/api';
export default {
    data() {
        return {
            phan_loai_kg: 1,
            hienCanNang: true,
            can_nang_min: '',
            can_nang_max: '',
            dich_vu: {
                "ten_dv": '',
                'id_loaidv': '',
                'mo_ta': '',
                'gia': '',
                'hinh_anh': '',
                'can_nang_min': '',
                'can_nang_max': '',
                'phan_loai_kg': 1,
                'tinh_trang': ''
            },
            list_dich_vu: [],
            update_dich_vu: {
                ten_dv: '',
                id_loaidv: '',
                mo_ta: '',
                gia: '',
                hinh_anh: '',
                can_nang_min: '',
                can_nang_max: '',
                phan_loai_kg: 1, // Mặc định là "Có"
                tinh_trang: ''
            },
            del_dich_vu: {},
            list_loai_dv: [],
            chi_tiet_dv: {}
        }
    },
    mounted() {
        this.loaddata(),
            this.loaddataLoaiDV()
    },
    methods: {
        onPhanLoaiChange() {
            if (this.update_dich_vu.phan_loai_kg === 0) {
                this.update_dich_vu.can_nang_min = '';
                this.update_dich_vu.can_nang_max = '';
            }
        },
        them() {
            axios
                .post('http://127.0.0.1:8000/api/dich-vu/them', this.dich_vu,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loaddata()
                        this.dich_vu = {
                            "ten_dv": '',
                            'id_loaidv': '',
                            'mo_ta': '',
                            'gia': '',
                            'hinh_anh': '',
                            'can_nang_min': '',
                            'can_nang_max': '',
                            'phan_loai_kg': '',
                            'tinh_trang': ''
                        }
                    } else {
                        toaster.error('Thêm mới dịch vụ thất bại')
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
                .post("http://127.0.0.1:8000/api/dich-vu/del", this.del_dich_vu,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Xóa dịch vụ thất bại!")
                    }

                });
        },

        update() {
            axios
                .post("http://127.0.0.1:8000/api/dich-vu/update", this.update_dich_vu,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Cập nhật dịch vụ thất bại!")
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

        doi_trang_thai(x) {
            axios
                .post("http://127.0.0.1:8000/api/dich-vu/doi", x,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loaddata();
                    } else {
                        toaster.error("Đổi trạng thái dịch vụ thất bại!")
                    }
                });
        },
        loaddata() {
            axios
                .get("http://127.0.0.1:8000/api/dich-vu/load",
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_dich_vu = res.data.data
                });
        },
        loaddataLoaiDV() {
            axios
                .get("http://127.0.0.1:8000/api/loai-dich-vu/load",
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_loai_dv = res.data.data
                    console.log(this.list_loai_dv);

                });
        },

    },
}
</script>
<style></style>