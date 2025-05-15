<template>
    <div class="row">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <div>
                    <h3>QUẢN LÝ BÁO CÁO</h3>
                </div>
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" v-model="thangChon"
                        aria-label="Floating label select example">
                        <option value="0">Toàn bộ</option>
                        <option value="1">Tháng 1</option>
                        <option value="2">Tháng 2</option>
                        <option value="3">Tháng 3</option>
                        <option value="4">Tháng 4</option>
                        <option value="5">Tháng 5</option>
                        <option value="6">Tháng 6</option>
                        <option value="7">Tháng 7</option>
                        <option value="8">Tháng 8</option>
                        <option value="9">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                    </select>
                    <label for="floatingSelect">Chọn tháng</label>
                </div>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
                            class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th>#</th>
                            <th>Ngày thanh toán</th>
                            <th>Số hóa đơn đã thanh toán</th>
                            <th>Doanh thu thuốc</th>
                            <th>Doanh thu dịch vụ</th>
                            <th>Tổng doanh thu</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle" v-for="(row, index) in list_bao_cao" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ formatDate(row.ngay) }}</td>
                            <td>{{ row.so_hoa_don }}</td>
                            <td>{{ formatTien(row.doanh_thu_thuoc) }}</td>
                            <td>{{ formatTien(row.doanh_thu_dich_vu) }}</td>
                            <td class="fw-bold text-danger">{{ formatTien(row.tong_doanh_thu) }}</td>
                            <td>
                                <button class="btn btn-danger" @click="moModalXoa(row)">Xoá</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Bạn mún xóa tht hã?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button v-on:click="xoa()" type="button" data-bs-dismiss="modal"
                                    class="btn btn-primary">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list_bao_cao: [],

        }
    },
    mounted() {

    },
    methods: {
        formatTien(val) {
            return parseInt(val || 0).toLocaleString('vi-VN') + ' VNĐ';
        },
        formatDate(dateStr) {
            return new Date(dateStr).toLocaleDateString('vi-VN');
        },
        locTheoThang() {
            // Gọi API theo tháng đã chọn, ví dụ thangChon = 3
            axios.get(`/api/bao-cao-doanh-thu?thang=${this.thangChon}`)
                .then(res => {
                    this.baoCaoList = res.data.data;
                });
        },
        moModalXoa(row) {
            this.itemXoa = row;
            const modal = new bootstrap.Modal(document.getElementById('xoa'));
            modal.show();
        },
        xoa() {
            // Gọi API xóa theo ID
            axios.delete(`/api/bao-cao-doanh-thu/${this.itemXoa.id}`)
                .then(() => {
                    this.locTheoThang(); // load lại
                });
        }
    },
}
</script>
<style scoped>
.custom-color {
    color: #fff5e1;
}

.custom-bg {
    background-color: #ff8a65;
    color: white;
}
</style>