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
                phan_loai_kg: 1,
                tinh_trang: ''
            },
            del_dich_vu: {},
            list_loai_dv: [],
            chi_tiet_dv: {}
        }
    },
    mounted() {
        this.loaddata();
        this.loaddataLoaiDV();
    },
    methods: {
        getAuthHeaders() {
            const token = localStorage.getItem('token_admin');
            return {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
        },
        onPhanLoaiChange() {
            if (this.update_dich_vu.phan_loai_kg === 0) {
                this.update_dich_vu.can_nang_min = '';
                this.update_dich_vu.can_nang_max = '';
            }
        },
        async them() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/dich-vu/them', this.dich_vu, this.getAuthHeaders());
                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.loaddata();
                    this.dich_vu = {
                        "ten_dv": '',
                        'id_loaidv': '',
                        'mo_ta': '',
                        'gia': '',
                        'hinh_anh': '',
                        'can_nang_min': '',
                        'can_nang_max': '',
                        'phan_loai_kg': 1,
                        'tinh_trang': ''
                    };
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền thực hiện chức năng này');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi thêm dịch vụ');
                }
            }
        },
        async xoa() {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/dich-vu/del", this.del_dich_vu, this.getAuthHeaders());
                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.loaddata();
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền thực hiện chức năng này');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi xóa dịch vụ');
                }
            }
        },
        async update() {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/dich-vu/update", this.update_dich_vu, this.getAuthHeaders());
                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.loaddata();
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền thực hiện chức năng này');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi cập nhật dịch vụ');
                }
            }
        },
        async doi_trang_thai(x) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/dich-vu/doi", x, this.getAuthHeaders());
                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.loaddata();
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền thực hiện chức năng này');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi đổi trạng thái');
                }
            }
        },
        async loaddata() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/dich-vu/load", this.getAuthHeaders());
                this.list_dich_vu = response.data.data;
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền xem dịch vụ');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi tải dữ liệu');
                }
            }
        },
        async loaddataLoaiDV() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/loai-dich-vu/load", this.getAuthHeaders());
                this.list_loai_dv = response.data.data;
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toaster.error('Bạn không có quyền xem loại dịch vụ');
                } else if (error.response) {
                    toaster.error(error.response.data.message);
                } else {
                    toaster.error('Có lỗi xảy ra khi tải loại dịch vụ');
                }
            }
        }
    }
}
</script>
<style></style>