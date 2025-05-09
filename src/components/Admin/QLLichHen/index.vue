<template>
    <div class="card">
        <div class="card-header">
            <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH
                SÁCH LỊCH HẸN</h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
                                class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
                    </div>
                </div>
                <div class="col-lg-3">
                    <!-- Lọc ngày -->
                    <div class="input-group">
                        <input type="date" class="form-control" />
                        <button class="btn btn-dark">Lọc</button>

                    </div>
                </div>
                <div class="col-lg-3">
                    <!-- lọc trạng thái -->
                    <div class="input-group">
                        <select class="form-select">
                            <option value="">-- Tất cả trạng thái --</option>
                            <option value="2">Đã xác nhận</option>
                            <option value="1">Chưa xác nhận</option>
                            <option value="0">Đã hủy</option>

                        </select>
                        <button class="btn btn-dark">Lọc</button>
                    </div>
                </div>
            </div>
            <div class="table table-resposive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>#</th>
                            <th>Tên dịch vụ</th>
                            <th>Tên khách hàng</th>
                            <th>Tên thú cưng</th>
                            <th>Ngày hẹn</th>
                            <th>Giờ hẹn</th>
                            <th>Tên nhân viên</th>
                            <th>Tiền cọc </th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_lich" :key="index">
                            <tr class="text-center align-middle">
                                <th>{{ index + 1 }}</th>
                                <td>{{ getTenDV(value.id_dv) }}</td>
                                <td>{{ value.ho_va_ten }}</td>
                                <td>{{ value.ten_pet }}</td>
                                <td>{{ value.ngay }}</td>
                                <td>{{ value.gio }}</td>
                                <td>{{ getTenNV(value.id_nv) }}</td>
                                <td>{{ value.tien_coc }}</td>
                                <td class="text-center align-middle">
                                    <button v-if="value.tinh_trang == 1" v-on:click="doi_trang_thai(value)"
                                        class="btn btn-success me-2">Đã duyệt</button>
                                    <button v-else class="btn btn-warning " v-on:click="doi_trang_thai(value)">Chờ
                                        duyệt</button>
                                </td>
                                <td>
                                    <button @click="showModal(value)" data-bs-toggle="modal"
                                        data-bs-target="#capnhat" style="width:100px;" class="btn btn-primary me-2">Cập
                                        nhật</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
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

                    <label for="">Phân công nhân viên</label>
                    <select v-model="update_lich.id_nv" class="form-control mb-2" :disabled="!isServiceEditable">
                        <template v-for="(value, index) in nhan_vien" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                        </template>
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
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            list_lich: [],
            update_lich: {},
            del_lich: [],
            khach_hang: [],
            pet: [],
            nhan_vien: [],
            dich_vu: [],
        }
    },
    mounted() {
        this.loadLichHen();
        this.loadKhachHang();
        this.loadPet();
        this.loadDataNV();
        this.loadDichVu();
    },
    computed: {
    isServiceEditable() {
        const service = this.dich_vu.find(dv => dv.id == this.update_lich.id_dv);
        return service ? Number(service.id_loaidv) === 4 : false;
    }
},

    methods: {
        showModal(value) {
            this.update_lich = { ...value }; 
        },

        loadLichHen() {
            axios
                .get('http://127.0.0.1:8000/api/lich-hen/load')
                .then((res) => {
                    this.list_lich = res.data.data
                })
        },
        loadKhachHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/load", {
                })
                .then((res) => {
                    this.khach_hang = res.data.data
                    console.log(this.khach_hang);
                });
        },
        loadPet() {
            axios
                .get("http://127.0.0.1:8000/api/load-pet", {
                })
                .then((res) => {
                    this.pet = res.data.data
                    console.log(this.pet);
                });
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
        update() {
            const service = this.dich_vu.find(dv => dv.id === this.update_lich.id_dv);
            if (service && service.id_loaidv !== 4) {
                toaster.error('Dịch vụ này không thể sửa thông tin!');
                return;
            }
            axios
                .post('http://127.0.0.1:8000/api/lich-hen/update', this.update_lich)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadLichHen()
                    } else {
                        toaster.error('Cập nhật không thành công')
                    }

                })
        },
        getTenNV(id_nv) {
            const nv = this.nhan_vien.find(nv => nv.id == id_nv);
            return nv ? nv.ten_nv : 'Nhân viên chăm sóc';
        },
        getTenDV(id_dv) {
            const dv = this.dich_vu.find(dv => dv.id == id_dv);
            return dv ? dv.ten_dv : 'Chưa có';
        },
        doi_trang_thai(x) {
            axios
                .post("http://127.0.0.1:8000/api/lich-hen/doi", x)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadLichHen();
                    } else {
                        toaster.error("Đổi trạng thái dịch vụ thất bại!")
                    }
                });
        },
        loadDichVu() {
            axios
                .get('http://127.0.0.1:8000/api/dich-vu/load')
                .then((res) => {
                    this.dich_vu = res.data.data
                })
        },
    },
}
</script>
<style></style>