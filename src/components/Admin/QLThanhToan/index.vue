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
                                <span :class="['badge', hd.tinh_trang ? 'bg-success' : 'bg-warning']">
                                    {{ hd.tinh_trang ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-primary btn-sm" v-if="!hd.tinh_trang"
                                    @click="moModalCapNhat(hd)">Cập nhật</button> &nbsp;
                                &nbsp;
                                <button class="btn btn-info btn-sm" @click="xemChiTiet(hd)">Chi tiết</button>
                            </td>
                        </tr>
                        <tr v-if="list_hoa_don.length === 0">
                            <td colspan="9" class="text-center text-muted">Chưa có hóa đơn nào</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal cập nhật hóa đơn -->
        <div class="modal fade" id="modalCapNhat" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true"
            ref="modalCapNhat">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="modalLabel">Cập nhật hóa đơn</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <label class="form-label">Tên nhân viên</label>
                        <select v-model="hoa_don_edit.id_nv" class="form-control mb-2 form-select" name="" id="">
                            <template v-for="(value, index) in list_nhan_vien.filter(nv => nv.id_chucvu === 2)" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_nv }}</option>
                            </template>
                        </select>
                        <label class="form-label">Phương thức thanh toán</label>
                        <select class="form-select" v-model="hoa_don_edit.phuong_thuc">
                            <option value="0">Tiền mặt</option>
                            <option value="1">Chuyển khoản</option>
                        </select>
                        <label class="form-label mt-2">Tiền khám</label>
                        <input type="number" class="form-control" v-model="hoa_don_edit.tien_kham" min="0" />
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button class="btn btn-primary" @click="capNhatHoaDon">Lưu</button>
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
            }
        };
    },
    mounted() {
        this.taiDanhSach();
        this.loaddataNV();
    },
    methods: {
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
        formatTien(val) {
            return val ? val.toLocaleString('vi-VN') + ' ₫' : '0 ₫';
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
        xemChiTiet(hd) {
            console.log(hd);
        }
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