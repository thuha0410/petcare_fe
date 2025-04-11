<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap">
            <h3 class="text-dark" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
                PHIẾU NHẬP THUỐC
            </h3>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-4">
                    <label class="form-label">Kho nhập</label>
                    <select v-model="phieuNhap.id_kho" class="form-select">
                        <template v-for="(value, index) in listKho" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_kho }}</option>
                        </template>
                    </select>

                </div>
                <div class="col-md-4">
                    <label class="form-label">Nhà cung cấp</label>
                    <select v-model="phieuNhap.id_ncc" class="form-select">
                        <template v-for="(value, index) in listNCC" :key="index">
                            <option v-bind:value="value.id">{{ value.ten_ncc }}</option>
                        </template>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Ngày nhập</label>
                    <input type="date" v-model="phieuNhap.ngay_nhap" class="form-control" />
                </div>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr class="text-center align-middle">
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        <th>Giá nhập</th>
                        <th>Hạn sử dụng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, index) in chiTiet" :key="index" class="text-center align-middle">
                        <td>
                            <select v-model="thuocTam.id_thuoc" class="form-select">
                                <template v-for="(value, index) in listThuoc" :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_thuoc }}</option>
                                </template>
                            </select>
                        </td>
                        <td>{{ value.so_luong }}</td>
                        <td>{{ value.gia_nhap }}</td>
                        <td>{{ value.han_su_dung }}</td>
                        <td><button class="btn btn-danger btn-sm" @click="xoaDong(index)">Xoá</button></td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-between">
                <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#themThuocModal">+ Thêm
                    thuốc</button>
                <button class="btn btn-primary" @click="luuPhieu">Lưu phiếu nhập</button>
            </div>
        </div>
    </div>

    <!-- Modal thêm dòng thuốc -->
    <div class="modal fade" id="themThuocModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h4 class="modal-title">Thêm thuốc vào phiếu</h4>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Thuốc</label>
                        <select v-model="thuocNhap.id_thuoc" class="form-select">
                            
                            <template v-for="(value, index) in listThuoc" :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_thuoc }}</option>
                                </template>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Số lượng</label>
                        <input type="number" v-model="thuocNhap.so_luong" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá nhập</label>
                        <input type="number" v-model="thuocNhap.gia_nhap" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Hạn sử dụng</label>
                        <input type="date" v-model="thuocNhap.han_su_dung" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button class="btn btn-primary" data-bs-dismiss="modal" @click="xacNhanThemThuoc">Thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phieuNhap: {
                id_kho: '',
                id_ncc: '',
                ngay_nhap: new Date().toISOString().slice(0, 10),
            },
            chiTiet: [],
            thuocNhap: {
                id_thuoc: '',
                so_luong: '',
                gia_nhap: '',
                han_su_dung: '',
            },
            listKho: [],
            listNCC: [],
            listThuoc: []
        }
    },
    mounted() {
        this.loaddata()
        this.loaddataKho()
        this.loaddataNCC()
    },
    methods: {
        loaddata() {
            axios
                .get("http://127.0.0.1:8000/api/phieu-nhap/load")
                .then((res) => {
                    this.phieuNhap = res.data.data
                });
        },
        loaddataKhoNCC() {
            axios.get('http://127.0.0.1:8000/api/phieu-nhap/load-kho-ncc')
                .then(res => {
                    this.listKho = res.data.kho;
                    this.listNCC = res.data.ncc;
                });
        },
        xacNhanThemThuoc(){
            
        },
        luuPhieu(){

        }
    },
}
</script>
<style></style>