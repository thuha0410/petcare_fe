<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                HỒ SƠ BỆNH ÁN</h3>

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
                            <th>ID Pet</th>
                            <th>Tên Chủ Pet</th>
                            <th>Số Điện Thoại</th>
                            <th>Tên Bác Sĩ điều trị</th>
                            <th>Ngày khám</th>
                            <th>Chuẩn đoán</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle text-nowrap">
                            <th>1</th>
                            <td>Pet 01</td>  <!--Khi mà thêm thì chỉ cần nhập số điện thoại khách hàng thì nó tự tạo id pet-->
                            <td>Phạm Thị Thu Hà</td>
                            <td>0902012312</td>
                            <td>Huỳnh Văn Đức</td>
                            <td>12/12/2022</td>
                            <td>Viêm hô hấp</td>
                            <td>
                                <button class="btn btn-secondary">Ẩn</button>
                                <button class="btn btn-success">Hiển thị</button>
                            </td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target="#capnhat" style="width:100px ;"
                                    class="btn btn-primary me-2">Cập nhật</button>
                                <button data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px ;"
                                    class="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN HỒ SƠ BỆNH ÁN</h1>
                </div>
                <div class="modal-body">
                    <label for="">ID Pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên Chủ Pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Số Điện Thoại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên Bác Sĩ điều trị</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Lương Văn Ái</option>
                        <option value="1">Huỳnh Nguyễn Cao Đức</option>
                    </select>
                    <label for="">Ngày Khám</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Ẩn</option>
                        <option value="1">Hiển thị</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN HỒ SƠ BỆNH ÁN
                    </h1>
                </div>
                <div class="modal-body">
                    <label for="">ID Pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên Chủ Pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Số Điện Thoại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên Bác Sĩ điều trị</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Lương Văn Ái</option>
                        <option value="1">Huỳnh Nguyễn Cao Đức</option>
                    </select>
                    <label for="">Ngày Khám</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Ẩn</option>
                        <option value="1">Hiển thị</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập nhật</button>
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
                    <h5>Bạn có muốn xóa hồ sơ <span class="text-danger">này</span> không?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
// import { createToaster } from "@meforma/vue-toaster";

// const toaster = createToaster({ position: "top-right" });
export default {
    // methods: {
    //     load() {
    //         axios
    //             .get('http://127.0.0.1:8000/api/nha-cung-cap/load')
    //             .then((res) => {
    //                 this.list_nha_cung_cap = res.data.data
    //             })
    //     },
    //     them() {
    //         axios
    //             .post('http://127.0.0.1:8000/api/nha-cung-cap/them', this.nha_cung_cap)
    //             .then((res) => {
    //                 if (res.data.status == true) {
    //                     toaster.success(res.data.message)
    //                     this.load()
    //                     this.nha_cung_cap = {
    //                         'ten_ncc': '',
    //                         'email': '',
    //                         'sdt': '',
    //                         'dia_chi': '',
    //                         'tinh_trang': '',
    //                     }
    //                 } else {
    //                     toaster.error('Thêm mới thất bại')
    //                 }
    //             })
    //             .catch((res) => {

    //                 toaster.error(res.response.data.message);
    //             })
    //     },
    //     xoa() {
    //         axios
    //             .post('http://127.0.0.1:8000/api/nha-cung-cap/xoa', this.del_nha_cung_cap)
    //             .then((res) => {
    //                 if (res.data.status == true) {
    //                     toaster.success(res.data.message)
    //                     this.load()
    //                 } else {
    //                     toaster.error('Xóa thất bại')
    //                 }
    //             })
    //     },
    //     update() {
    //         axios
    //             .post('http://127.0.0.1:8000/api/nha-cung-cap/update', this.update_nha_cung_cap)
    //             .then((res) => {
    //                 if (res.data.status == true) {
    //                     toaster.success(res.data.message)
    //                     this.load()
    //                 } else {
    //                     toaster.error('Cập nhật không thành công')
    //                 }

    //             })

    //     },
    //     doiTT(x) {
    //         axios
    //             .post('http://127.0.0.1:8000/api/nha-cung-cap/doi-TT', x)
    //             .then((res) => {
    //                 if (res.data.status == true) {
    //                     toaster.success(res.data.message)
    //                     this.load()
    //                 } else {
    //                     toaster.error('Đổi trạng thái thất bại')
    //                 }

    //             })
    //     },
    //     timkiem() {
    //         axios
    //             .post('http://127.0.0.1:8000/api/nha-cung-cap/tim-kiem', this.tim_kiem)
    //             .then((res) => {
    //                 this.list_nha_cung_cap = res.data.data
    //             })
    //     },
    // },
    // mounted() {
    //     this.load()
    // },
    // data() {
    //     return {
    //         nha_cung_cap: {
    //             'ten_ncc': '',
    //             'email': '',
    //             'sdt': '',
    //             'dia_chi': '',
    //             'tinh_trang': '',
    //         },
    //         list_nha_cung_cap: [],
    //         del_nha_cung_cap: {},
    //         update_nha_cung_cap: {},
    //         tim_kiem: {
    //             noi_dung: ''
    //         }
    //     }
    // },
}
</script>
<style></style>