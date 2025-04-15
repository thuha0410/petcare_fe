<template>
    <div>
        <!-- PHIẾU NHẬP THUỐC -->
        <div class="card mb-4">
            <div class="card-header text-white d-flex justify-content-between" style="background-color: darkblue;">
                <h5 class="mb-0 text-white fw-bold">PHIẾU NHẬP THUỐC</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label class="form-label">Tên kho</label>
                        <select v-model="phieuNhap.id_kho" class="form-select"
                            :class="{ 'is-invalid': highlightWarning && !phieuNhap.id_kho }">
                            <option disabled value="">-- Chọn kho --</option>
                            <option v-for="kho in listKho" :key="kho.id" :value="kho.id">{{ kho.ten_kho }}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Tên nhà cung cấp</label>
                        <select v-model="phieuNhap.id_ncc" class="form-select"
                            :class="{ 'is-invalid': highlightWarning && !phieuNhap.id_ncc }">
                            <option disabled value="">-- Chọn nhà cung cấp --</option>
                            <option v-for="ncc in listNCC" :key="ncc.id" :value="ncc.id">{{ ncc.ten_ncc }}</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Ngày nhập</label>
                        <input type="date" v-model="phieuNhap.ngay_nhap" class="form-control" />
                    </div>
                </div>

                <table class="table table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th>Thuốc</th>
                            <th>Số lượng</th>
                            <th>Giá nhập</th>
                            <th>Hạn sử dụng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in chiTiet" :key="index" class="text-center">
                            <td>{{ getTenThuoc(item.id_thuoc) }}</td>
                            <td>{{ item.so_luong }}</td>
                            <td>{{ item.gia_nhap }}</td>
                            <td>{{ item.han_su_dung }}</td>
                            <td>{{ (item.so_luong * item.gia_nhap).toLocaleString() }}</td>
                            <td><button class="btn btn-sm btn-danger" @click="xoaDong(index)">Xóa</button></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-end fw-bold">Tổng tiền:</td>
                            <td class="fw-bold text-danger">{{ tinhTongTien().toLocaleString() }} VND</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-secondary" @click="moModalThuoc">+ Thêm thuốc</button>
                    <button class="btn btn-primary" @click="luuPhieu">Lưu phiếu nhập</button>
                </div>
            </div>
        </div>

        <!-- DANH SÁCH PHIẾU NHẬP -->
        <div class="card">

            <div class="card-header bg-secondary text-white d-flex justify-content-between">
                <h5 class="mb-0 text-white">DANH SÁCH PHIẾU NHẬP</h5>
            </div>
            <div class="d-flex justify-content-between align-items-center my-3 flex-wrap gap-2">
                <!-- TÌM KIẾM BÊN TRÁI -->
                <div class="input-group ms-3" style="max-width: 350px;">
                    <input v-model="tim_kiem.noi_dung" type="text" class="form-control"
                        placeholder="Nhập tên kho hoặc nhà cung cấp...">
                    <button v-on:click="timkiem()" class="btn btn-outline-secondary">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <!-- LỌC NGÀY BÊN PHẢI -->
                <div class="d-flex align-items-center gap-2">
                    <label class="me-1 mb-0">Từ:</label>
                    <input v-model="loc_ngay.tu_ngay" type="date" class="form-control form-control-sm">
                    <label class="me-1 mb-0 ms-2">Đến:</label>
                    <input v-model="loc_ngay.den_ngay" type="date" class="form-control form-control-sm">
                    <button class="btn btn-sm btn-dark me-2" v-on:click="locTheoNgay()"><i
                            class="fa-solid fa-filter"></i></button>

                    <div class="text-nowrap me-2">
                        <button class="btn btn-outline-secondary btn-sm" v-on:click="xoaBoLoc()">Xoá bộ lọc</button>

                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Kho</th>
                            <th>Nhà cung cấp</th>
                            <th>Ngày nhập</th>
                            <th>Số thuốc</th>
                            <th>Tổng tiền</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(phieu, index) in danhSachPhieu" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ phieu.kho?.ten_kho || '[N/A]' }}</td>
                            <td>{{ phieu.ncc?.ten_ncc || '[N/A]' }}</td>
                            <td>{{ phieu.ngay_nhap }}</td>
                            <td>{{ phieu.chi_tiet?.length || 0 }}</td>
                            <td>{{ tinhTong(phieu.chi_tiet).toLocaleString() }} VND</td>
                            <td>
                                <button class="btn btn-info btn-sm" v-on:click="xemChiTiet(phieu)">Chi tiết</button>
                                <button v-on:click="Object.assign(del_phieu, phieu)" class="btn btn-danger btn-sm ms-2"
                                    data-bs-toggle="modal" data-bs-target="#modalXacNhanXoa">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- modal chi tiet -->
        <div class="modal fade" id="modalChiTiet" tabindex="-1" ref="modalChiTiet">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">Chi tiết phiếu nhập</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Thuốc</th>
                                    <th>Số lượng</th>
                                    <th>Giá nhập</th>
                                    <th>Hạn sử dụng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(thuoc, index) in chiTietDangXem" :key="index">
                                    <td>{{ getTenThuoc(thuoc.id_thuoc) }}</td>
                                    <td>{{ thuoc.so_luong }}</td>
                                    <td>{{ thuoc.gia_nhap }}</td>
                                    <td>{{ thuoc.han_su_dung }}</td>
                                    <td>{{ (thuoc.so_luong * thuoc.gia_nhap).toLocaleString() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL THÊM THUỐC -->
        <div class="modal fade" id="themThuocModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Thêm thuốc</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label>Thuốc</label>
                            <select v-model="thuocNhap.id_thuoc" class="form-select">
                                <option disabled value="">-- Chọn thuốc --</option>
                                <option v-for="thuoc in listThuoc" :key="thuoc.id" :value="thuoc.id">
                                    {{ thuoc.ten_thuoc }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label>Số lượng</label>
                            <input type="number" v-model.number="thuocNhap.so_luong" class="form-control" min="1" />
                        </div>
                        <div class="mb-3">
                            <label>Giá nhập</label>
                            <input type="number" v-model.number="thuocNhap.gia_nhap" class="form-control" min="1" />
                        </div>
                        <div class="mb-3">
                            <label>Hạn sử dụng</label>
                            <input type="date" v-model="thuocNhap.han_su_dung" class="form-control" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button class="btn btn-primary" @click="xacNhanThemThuoc" data-bs-dismiss="modal">Thêm</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal xoa phieu nhap -->
        <div class="modal fade" id="modalXacNhanXoa" tabindex="-1" aria-hidden="true" ref="modalXacNhanXoa">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">Xác nhận xoá</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xoá phiếu nhập này không?</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                        <button class="btn btn-danger" v-on:click="xoa()" data-bs-dismiss="modal">Xoá</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';
const toaster = createToaster({ position: 'top-right' });
export default {
    data() {
        return {
            phieuNhap: {
                id_kho: '',
                id_ncc: '',
                ngay_nhap: new Date().toISOString().slice(0, 10),
            },
            del_phieu: {},
            chiTiet: [],
            danhSachPhieu: [],
            chiTietDangXem: [],
            listKho: [],
            listNCC: [],
            listThuoc: [],
            thuocNhap: {
                id_thuoc: '',
                so_luong: 1,
                gia_nhap: 1000,
                han_su_dung: '',
            },
            tim_kiem: {
                noi_dung: ''
            },
            loc_ngay: {
                tu_ngay: '',
                den_ngay: ''
            },
            highlightWarning: false,
        };
    },
    mounted() {
        this.loaddataKhoNCCThuoc();
        this.loadPhieu();
    },
    methods: {
        loaddataKhoNCCThuoc() {
            axios.get('http://127.0.0.1:8000/api/phieu-nhap/load-kho-ncc-thuoc')
                .then(res => {
                    this.listKho = res.data.kho;
                    this.listNCC = res.data.ncc;
                    this.listThuoc = res.data.thuoc;
                });
        },
        timkiem() {
            axios
                .post('http://127.0.0.1:8000/api/phieu-nhap/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.danhSachPhieu = res.data.data
                })
        },

        xoa() {
            axios
                .post('http://127.0.0.1:8000/api/phieu-nhap/xoa', this.del_phieu)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadPhieu()
                    } else {
                        toaster.error('Xóa thất bại')
                    }
                })
                .catch((err) => {
                    toaster.error('Lỗi khi xoá: ' + err.message);
                });
        },
        moModalThuoc() {
            if (!this.phieuNhap.id_kho || !this.phieuNhap.id_ncc) {
                this.highlightWarning = true;
                toaster.error('Chọn kho và nhà cung cấp trước khi thêm thuốc.');
                return;
            }
            new bootstrap.Modal(document.getElementById('themThuocModal')).show();
        },
        xacNhanThemThuoc() {
            const { id_thuoc, so_luong, gia_nhap, han_su_dung } = this.thuocNhap;
            const today = new Date().toISOString().slice(0, 10);

            if (!id_thuoc || so_luong <= 0 || gia_nhap <= 0 || !han_su_dung || han_su_dung <= today) {
                toaster.error('Vui lòng nhập đúng và đầy đủ thông tin thuốc!');
                return;
            }
            if (this.chiTiet.some(t => t.id_thuoc === id_thuoc)) {
                toaster.error('Thuốc đã tồn tại trong danh sách!');
                return;
            }
            this.chiTiet.push({ ...this.thuocNhap });
            this.thuocNhap = { id_thuoc: '', so_luong: 1, gia_nhap: 1000, han_su_dung: '' };
            toaster.success('Đã thêm thuốc vào danh sách!');
        },
        luuPhieu() {
            if (!this.phieuNhap.id_kho || !this.phieuNhap.id_ncc || !this.phieuNhap.ngay_nhap || this.chiTiet.length === 0) {
                toaster.error('Vui lòng nhập đầy đủ thông tin phiếu.');
                return;
            }
            const dataGui = {
                ...this.phieuNhap,
                chi_tiet: this.chiTiet
            };
            axios.post('http://127.0.0.1:8000/api/phieu-nhap/tao', dataGui)
                .then(res => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.resetPhieu();
                        this.loadPhieu();
                    } else {
                        toaster.error(res.data.message);
                    }
                });
        },
        resetPhieu() {
            this.phieuNhap = {
                id_kho: '',
                id_ncc: '',
                ngay_nhap: new Date().toISOString().slice(0, 10),
            };
            this.chiTiet = [];
        },
        loadPhieu() {
            axios.get('http://127.0.0.1:8000/api/phieu-nhap')
                .then(res => {
                    this.danhSachPhieu = res.data.data;
                });
        },
        xemChiTiet(phieu) {
            this.chiTietDangXem = phieu.chi_tiet;
            const modalElement = this.$refs.modalChiTiet;
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        },
        getTenThuoc(id) {
            const t = this.listThuoc.find(x => x.id === id);
            return t ? t.ten_thuoc : '[Không rõ]';
        },
        tinhTong(arr) {
            return arr.reduce((sum, item) => sum + item.so_luong * item.gia_nhap, 0);
        },
        tinhTongTien() {
            return this.tinhTong(this.chiTiet);
        },
        xoaDong(index) {
            this.chiTiet.splice(index, 1);
            toaster.success('Đã xóa dòng thuốc.');
        },
        locTheoNgay() {
            if (!this.loc_ngay.tu_ngay || !this.loc_ngay.den_ngay) {
                return this.$toast.warning("Vui lòng chọn đầy đủ TỪ NGÀY và ĐẾN NGÀY!");
            }

            axios
                .post("http://127.0.0.1:8000/api/phieu-nhap/loc-theo-ngay", {
                    tu_ngay: this.loc_ngay.tu_ngay,
                    den_ngay: this.loc_ngay.den_ngay
                })
                .then((res) => {
                    this.danhSachPhieu = res.data.data;
                })
                .catch((err) => {
                    this.$toast.error("Lỗi khi lọc: " + err.message);
                });
        },
        xoaBoLoc() {
            this.loc_ngay.tu_ngay = '';
            this.loc_ngay.den_ngay = '';
            this.tim_kiem.noi_dung = '';
            this.loadPhieu(); // gọi lại để hiển thị toàn bộ
        }
    }
};
</script>

<style scoped>
.card {
    margin-bottom: 30px;
}
</style>