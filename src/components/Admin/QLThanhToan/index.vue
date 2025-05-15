<template>
    <div class="row">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h3>Quản lý hóa đơn</h3>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-3">
                        <select v-model="filter_nv" class="form-select">
                            <option disabled value="">-- Lọc theo nhân viên --</option>
                            <option v-for="nv in list_nhan_vien.filter(nv => nv.id_chucvu === 2)" :key="nv.id"
                                :value="nv.ten_nv">{{ nv.ten_nv }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <input type="date" v-model="filter_date" class="form-control" />
                    </div>
                    <div class="col-md-2 d-flex gap-2">
                        <button class="btn btn-primary w-100" @click="locHoaDon">
                            <i class="fa-solid fa-filter me-1"></i> Lọc
                        </button>
                        <button class="btn btn-outline-secondary" @click="xoaBoLoc">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                </div>

                <table class="table table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Tên nhân viên thanh toán</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày xuất</th>
                            <th>Phương thức</th>
                            <th>Tình trạng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(hd, index) in list_hoa_don" :key="index" class="text-center align-middle">
                            <td>{{ hd.id }}</td>
                            <td>
                                {{ hd.ten_nv || 'Chưa có nhân viên thanh toán' }}

                            </td>
                            <td>{{ hd.ho_va_ten }}</td>
                            <td>{{ formatDate(hd.ngay_xuat_hoa_don) }}</td>
                            <td>{{ hd.phuong_thuc == 1 ? 'Chuyển khoản' : 'Tiền mặt' }}</td>

                            <td>
                                <span :class="[hd.tinh_trang ? 'text-primary fw-bold' : 'text-danger fw-bold']">
                                    {{ hd.tinh_trang ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                                </span>
                            </td>
                            <td>
                                <template v-if="hd.tinh_trang == 0">
                                    <button type="button" class="btn btn-outline-danger px-5"
                                        @click="batModalThanhToan(hd)">Thanh toán</button>
                                </template>
                                <template v-else>

                                    <span @click="xemChiTiet(hd)"><i class="fa-solid fa-2x fa-circle-info"></i></span>
                                </template>
                            </td>
                        </tr>
                        <tr v-if="list_hoa_don.length === 0">
                            <td colspan="9" class="text-center text-muted">Chưa có hóa đơn nào</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade" id="chitiet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-sm">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <i class="fa-solid fa-receipt me-2"></i>Chi tiết hóa đơn
                        </h5>
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item d-flex justify-content-between">
                                <span><i class="fa-solid fa-pills"></i> Tiền đơn thuốc:</span>
                                <strong class="text-end">{{ formatTien(chiTiet.tien_don_thuoc) }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><i class="fa-solid fa-stethoscope"></i> Tiền dịch vụ:</span>
                                <strong class="text-end">{{ formatTien(chiTiet.tien_dich_vu) }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><i class="fa-solid fa-user-nurse"></i> Tiền khám:</span>
                                <strong class="text-end">{{ formatTien(chiTiet.tien_kham) }}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span><i class="fa-solid fa-money-check-dollar"></i>Tiền cọc dịch vụ:</span>
                                <strong class="text-end text-danger">- {{ formatTien(chiTiet.tien_coc_dich_vu)
                                    }}</strong>
                            </li>
                        </ul>

                        <div class="text-end border-top pt-2">
                            <span class="me-2 fw-bold">Tổng tiền thanh toán:</span>
                            <span class="fw-bold text-primary fs-5">
                                {{ formatTien(tongTienHoaDonChiTiet) }}
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Thanh toán -->
        <div class="modal fade" id="modalThanhToan" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content shadow-lg border-0">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title"> Xác nhận thanh toán</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <!-- Thông tin nhân viên -->
                        <div class="mb-3">
                            <label class="form-label fw-bold">Nhân viên thu:</label>
                            <select v-model="hoa_don_edit.id_nv" class="form-select">
                                <template v-for="(value, index) in list_nhan_vien.filter(nv => nv.id_chucvu === 2)"
                                    :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                                </template>
                            </select>
                        </div>
                        <hr>
                        <!-- Tiền chi tiết -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tiền đơn thuốc:</label>
                                <div class="form-control bg-light">{{ parseInt(chiTiet.tien_don_thuoc).toLocaleString()
                                }} VND</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tiền dịch vụ:</label>
                                <div class="form-control bg-light">{{ (chiTiet.tien_dich_vu).toLocaleString() }} VND
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tiền cọc:</label>
                                <div class="form-control bg-light">{{ (chiTiet.tien_coc_dich_vu).toLocaleString() }} VND
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tiền khám:</label>
                                <input v-model="hoa_don_edit.tien_kham" type="number" min="1" class="form-control"
                                    placeholder="Nhập tiền khám" />
                            </div>
                        </div>
                        <hr>
                        <!-- Tổng tiền -->
                        <div class="mb-4">
                            <label class="form-label fw-bold text-danger">Tổng tiền thanh toán:</label>
                            <div class="form-control bg-light fw-bold text-danger fs-5">
                                {{ formatTien(tinhTongTien()) }}
                            </div>
                        </div>

                        <!-- Phương thức thanh toán -->
                        <div class="mb-3">
                            <label class="form-label fw-bold">Phương thức thanh toán:</label>
                            <select v-model="hoa_don_edit.phuong_thuc" class="form-select">
                                <option value="0"> Tiền mặt</option>
                                <option value="1">Chuyển khoản</option>
                            </select>
                        </div>
                        <!-- <div v-if="hoa_don_edit.phuong_thuc == 1" class="text-center my-3">
                            <img :src="qrImageUrl" alt="QR chuyển khoản" style="max-width: 250px;" />
                            <div class="mt-2 text-muted small">
                                Vui lòng quét mã để chuyển khoản<br />
                                <strong>Số tiền: {{ formatTien(tinhTongTien()) }}</strong><br />
                                <strong>Nội dung: {{ noiDungChuyenKhoan }}</strong>
                            </div>
                        </div> -->
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                        <button type="button" class="btn btn-success px-4" @click="xacNhanThanhToan()">
                            Xác nhận thanh toán
                        </button>
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
            list_hoa_don: [],
            list_nhan_vien: [],
            search: '',
            originalList: [],
            hoa_don_edit: {
                phuong_thuc: 0,
                tien_kham: 0
            },
            filter_nv: '',
            filter_date: '',
            chiTiet: {
                tien_don_thuoc: 0,
                tien_dich_vu: 0,
                tien_kham: 0,
                tien_coc_dich_vu: 0
            }
        };
    },
    computed: {
        
        tongTienHoaDonChiTiet() {
            const a = Number(this.chiTiet.tien_don_thuoc) || 0;
            const b = Number(this.chiTiet.tien_dich_vu) || 0;
            const c = Number(this.chiTiet.tien_kham) || 0;
            const d = Number(this.chiTiet.tien_coc_dich_vu) || 0;
            return a + b + c - d;
        }

    },
    mounted() {
        this.taiDanhSach();
        this.loaddataNV();
    },
    methods: {
        xoaBoLoc() {
            this.filter_nv = '';
            this.filter_date = '';
            this.list_hoa_don = [];        // Xoá tạm dữ liệu để tránh hiển thị cũ
            this.taiDanhSach();            // Gọi lại API để lấy danh sách mới nhất
        },
        locHoaDon() {
            this.list_hoa_don = this.originalList.filter(hd => {
                const matchNhanVien = this.filter_nv === '' || hd.ten_nv?.toLowerCase().includes(this.filter_nv.toLowerCase());
                const matchNgay = this.filter_date === '' || new Date(hd.ngay_xuat_hoa_don).toISOString().slice(0, 10) === this.filter_date;
                return matchNhanVien && matchNgay;
            });
        },
        xacNhanThanhToan() {
            axios.post('http://127.0.0.1:8000/api/hoa-don/thanh-toan', this.hoa_don_edit)
                .then(res => {
                    if (res.data.status) {
                        toaster.success('Thanh toán thành công');
                        this.taiDanhSach();
                        document.querySelector('#modalThanhToan .btn-close').click();
                        //trang in hoa don
                        const routeData = this.$router.resolve({
                            path: '/admin/in-hoa-don',
                            query: { id: this.hoa_don_edit.id }
                        });
                        window.open(routeData.href, '_blank', 'width=800,height=600');
                    } else {
                        toaster.error(res.data.message || 'Thanh toán thất bại');
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors;
                        for (const field in errors) {
                            toaster.error(errors[field][0]);
                        }
                    } else {
                        toaster.error('Lỗi khi gửi yêu cầu thanh toán');
                    }
                });
        },

        batModalThanhToan(hd) {
            this.hoa_don_edit = {
                id: hd.id,
                id_nv: '', // chọn trong modal
                phuong_thuc: 0,
                tien_kham: 0
            };

            axios.get(`http://127.0.0.1:8000/api/hoa-don/chi-tiet-tien/${hd.id}`)
                .then(res => {
                    if (res.data.status) {
                        this.chiTiet = res.data.data;
                        const modal = new bootstrap.Modal(document.getElementById('modalThanhToan'));
                        modal.show();

                    }
                });
        },
        tinhTongTien() {
            const a = parseFloat(this.chiTiet.tien_don_thuoc) || 0;
            const b = parseFloat(this.chiTiet.tien_dich_vu) || 0;
            const c = Number(this.hoa_don_edit.tien_kham) || 0;
            const d = parseFloat(this.chiTiet.tien_coc_dich_vu) || 0;

            return (a + b + c) - d;
        },
        formatTien(val) {
            return parseInt(val).toLocaleString() + ' VND';
        },
        xemChiTiet(hd) {
            axios.get(`http://127.0.0.1:8000/api/hoa-don/chi-tiet-tien/${hd.id}`)
                .then(res => {
                    if (res.data.status) {
                        this.chiTiet = res.data.data;
                        const modal = new bootstrap.Modal(document.getElementById('chitiet'));
                        modal.show();
                    } else {
                        toaster.error('Không lấy được chi tiết hóa đơn');
                    }
                })
                .catch(() => toaster.error('Lỗi khi lấy chi tiết hóa đơn'));
        },
        loaddataNV() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/load", {
                })
                .then((res) => {
                    this.list_nhan_vien = res.data.data
                    console.log(this.list_nhan_vien);

                });
        },
        moModalCapNhat(hd) {
            this.hoa_don_edit = { ...hd };
            this.hoa_don_edit.tien_kham = hd.tien_kham || 0;
            this.hoa_don_edit.phuong_thuc = hd.phuong_thuc || 0;
            const modal = new bootstrap.Modal(this.$refs.modalCapNhat);
            modal.show();
        },
        async capNhatHoaDon() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/hoa-don/update', this.hoa_don_edit);
                if (res.data.status) {
                    toaster.success('Cập nhật thành công');
                    await this.taiDanhSach(); // gọi lại API để đồng bộ dữ liệu mới
                    document.querySelector('#modalCapNhat .btn-close').click();
                } else {
                    toaster.error(res.data.message || 'Cập nhật thất bại');
                }
            } catch (e) {
                toaster.error('Lỗi khi cập nhật hóa đơn');
            }
        },

        taiDanhSach() {
            axios.get('http://127.0.0.1:8000/api/hoa-don/danh-sach')
                .then(res => {
                    if (res.data.status) {
                        this.list_hoa_don = res.data.data;
                        this.originalList = res.data.data;
                    }
                })
                .catch(() => toaster.error('Không thể tải dữ liệu'));
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN');
        },
        timKiem() {
            const term = this.search.toLowerCase();
            this.list_hoa_don = this.originalList.filter(hd =>
                hd.ten_khach_hang?.toLowerCase().includes(term)
            );
        },
    }
};
</script>

<style scoped>
.badge {
    padding: 8px 12px;
    font-size: 0.85rem;
    border-radius: 5px;
}
</style>