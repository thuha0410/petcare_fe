<template>
    <div class="row">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h3>Quản lý hóa đơn</h3>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                    <input type="text" v-model="search" class="form-control" placeholder="Tìm kiếm hóa đơn..." />
                    <button class="btn btn-outline-secondary text-dark" @click="timKiem">
                        <i class="fa-solid fa-magnifying-glass"></i> Tìm
                    </button>
                </div>

                <table class="table table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Tên nhân viên thanh toán</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày xuất</th>
                            <th>Phương thức</th>
                            <th>Tổng tiền</th>
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
                            <td>{{ hd.ten_khach_hang }}</td>
                            <td>{{ formatDate(hd.ngay_xuat_hoa_don) }}</td>
                            <td>{{ hd.phuong_thuc == 1 ? 'Chuyển khoản' : 'Tiền mặt' }}</td>
                            <td>{{ formatTien(hd.tong_tien || 0) }}</td>
                            <td>
                                <span :class="[hd.tinh_trang ? 'text-primary' : 'text-warning']">
                                    {{ hd.tinh_trang ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                                </span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger px-5"
                                    @click="batModalThanhToan(hd)">Thanh toán</button>
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
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Chi tiết hóa đơn</h1>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Tiền đơn thuốc:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_don_thuoc }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền dịch vụ:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_dich_vu }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền khám:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_kham }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền cọc dịch vụ:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_coc_dich_vu }} VND</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Thanh toán -->
        <div class="modal fade" id="modalThanhToan" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">Xác nhận thanh toán</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Nhân viên thu:</label>
                            <select v-model="hoa_don_edit.id_nv" class="form-control mb-2 form-select" name="" id="">
                                <template v-for="(value, index) in list_nhan_vien.filter(nv => nv.id_chucvu === 2)"
                                    :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label>Tiền đơn thuốc:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_don_thuoc }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền dịch vụ:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_dich_vu }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền cọc:</label>
                            <div class="form-control bg-light">{{ chiTiet.tien_coc_dich_vu }} VND</div>
                        </div>
                        <div class="mb-2">
                            <label>Tiền khám:</label>
                            <input class="form-control" v-model="hoa_don_edit.tien_kham" type="number" />
                        </div>
                        <div class="mb-2">
                            <label class="fw-bold text-danger">Tổng tiền:</label>
                            <div class="form-control bg-light fw-bold text-danger">
                                {{ formatTien(tinhTongTien()) }}
                            </div>
                        </div>
                        <div class="mb-2">
                            <label>Phương thức:</label>
                            <select v-model="hoa_don_edit.phuong_thuc" class="form-select">
                                <option value="0">Tiền mặt</option>
                                <option value="1">Chuyển khoản</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" v-on:click="xacNhanThanhToan()">Xác nhận thanh toán</button>
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
            chiTiet: {
                tien_don_thuoc: 0,
                tien_dich_vu: 0,
                tien_kham: 0,
                tien_coc_dich_vu: 0
            }
        };
    },
    mounted() {
        this.taiDanhSach();
        this.loaddataNV();
    },
    methods: {
        xacNhanThanhToan() {
            axios.post('http://127.0.0.1:8000/api/hoa-don/thanh-toan', this.hoa_don_edit)
                .then(res => {
                    if (res.data.status) {
                        toaster.success('Thanh toán thành công');
                        this.taiDanhSach();
                        document.querySelector('#modalThanhToan .btn-close').click();
                    } else {
                        toaster.error(res.data.message || 'Thanh toán thất bại');
                    }
                })
                .catch(() => {
                    toaster.error('Lỗi khi gửi yêu cầu thanh toán');
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
            console.log('CHI TIẾT:', res.data.data);
        },
        tinhTongTien() {
            const a = parseFloat(this.chiTiet.tien_don_thuoc) || 0;
            const b = parseFloat(this.chiTiet.tien_dich_vu) || 0;
            const c = Number(this.hoa_don_edit.tien_kham) || 0;
            const d = parseFloat(this.chiTiet.tien_coc_dich_vu) || 0;

            return (a + b + c) - d;
        },
        formatTien(val) {
            return val ? val.toLocaleString('vi-VN') + ' VND' : '0 VND';
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