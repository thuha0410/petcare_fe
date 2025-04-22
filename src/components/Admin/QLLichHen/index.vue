<template>
    <div class="card">
        <div class="card-header">
            <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH
                SÁCH LỊCH HẸN</h3>
        </div>
        <div class="card-body">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
                        class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-resposive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>#</th>
                            <th>Mã lịch hẹn</th>
                            <th>Tên thú cưng</th>
                            <th>Ngày giờ hẹn</th>
                            <th>Tên bác sĩ</th>
                            <th>Tiền cọc </th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_lich" :key="index">
                            <tr class="text-center align-middle">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.id_lich }}</td>
                                <td>{{ value.ten_pet }}</td>
                                <td>{{ value.ngay_gio_hen }}</td>
                                <td>{{ value.ten_nv }}</td>
                                <td>{{ value.tien_coc }}</td>
                                <td>
                                    <button v-on:click="doiTT(value)" v-if="value.tinh_trang == 0"
                                        class="btn btn-warning">Chờ duyệt</button>
                                    <button v-on:click="doiTT(value)" v-else class="btn btn-success">Đã duyệt</button>
                                </td>
                                <td>
                                    <button v-on:click="Object.assign(update_lich, value)" data-bs-toggle="modal"
                                    data-bs-target="#capnhat" style="width:100px;"
                                        class="btn btn-primary me-2">Cập nhật</button>
                                    <button v-on:click="Object.assign(del_lich, value)" data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px;"
                                        class="btn btn-danger ">Xóa</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
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
                    <h5>Bạn có muốn xóa lịch hẹn này không?</h5>
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
                    <label for="">Mã lịch hẹn</label>
                    <input v-model="update_lich.id_lich" class="form-control mb-2" type="text">
                    <label for="">Tên thú cưng</label>
                    <input v-model="update_lich.ten_pet" class="form-control mb-2" type="text">
                    <label for="">Ngày giờ hẹn</label>
                    <input v-model="update_lich.ngay_gio_hen" class="form-control mb-2" type="text">
                    <label for="">Tên bác sĩ</label>
                    <input v-model="update_lich.ten_nv" class="form-control mb-2" type="password">
                    <label for="">Tiền cọc</label>
                    <input v-model="update_lich.tien_coc" class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select v-model="update_lich.tinh_trang" class="form-control mb-2" name="" id="">
                        <option value="0">Chờ duyệt</option>
                        <option value="1">Đã duyệt</option>
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

export default {
    data() {
        return {
            list_lich: [],
            update_lich: [],
            del_lich: [],
            nhan_vien: [],
            pet: [],
        }
    },
    mounted() {
        this.loadLichHen();
        this.loadNhanVien();
        this.loadPet();
    },
    methods: {
        loadLichHen() {
            axios
                .get('http://127.0.0.1:8000/api/lich-hen/load')
                .then((res) => {
                    this.list_lich = res.data.data
                })
        },
        loadNhanVien() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/load", {
                })
                .then((res) => {
                    this.nhan_vien = res.data.data
                    console.log(this.nhan_vien);
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
        

    },
}
</script>
<style></style>