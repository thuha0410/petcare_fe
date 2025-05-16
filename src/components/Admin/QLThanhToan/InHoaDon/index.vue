<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f8f9fa;">
        <div class="container bg-white p-4 shadow rounded" style="max-width: 800px; font-family: 'Arial', sans-serif;">
            <div class="d-flex align-items-center mb-4">
                <img src="https://www.meowbox.com/cdn/shop/files/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204.svg?v=1716102790"
                    alt="PetCare Logo" style="height: 60px; margin-right: 15px;">
                <div>
                    <h5 class="mb-0 fw-bold" style="color: #0d6efd;">PHÒNG KHÁM THÚ CƯNG PETCARE</h5>
                    <p class="mb-0 ms-4" style="font-size: 14px;">Quan tâm đúng lúc - Thú cưng hạnh phúc</p>
                </div>
            </div>

            <h2 class="text-center fw-bold mb-4 text-primary">HÓA ĐƠN THANH TOÁN</h2>

            <div v-if="hoaDon && chiTiet">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <p><strong>Khách hàng:</strong> {{ hoaDon.ten_khach_hang }}</p>
                        <p><strong>Thú cưng:</strong> {{ hoaDon.ten_pet }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Ngày thanh toán:</strong> {{ formatDate(hoaDon.ngay_xuat_hoa_don) }}</p>
                        <p><strong>Nhân viên thu:</strong> {{ hoaDon.ten_nv }}</p>
                    </div>
                </div>

                <ul class="list-group list-group-flush mb-3">
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Tiền đơn thuốc:</span>
                        <strong>{{ formatTien(chiTiet.tien_don_thuoc) }}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Tiền dịch vụ:</span>
                        <strong>{{ formatTien(chiTiet.tien_dich_vu) }}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Tiền khám:</span>
                        <strong>{{ formatTien(chiTiet.tien_kham) }}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Tiền cọc:</span>
                        <strong class="text-danger">- {{ formatTien(chiTiet.tien_coc_dich_vu) }}</strong>
                    </li>
                </ul>

                <div class="text-end border-top pt-2">
                    <span class="me-2 fw-bold">Tổng tiền thanh toán:</span>
                    <span class="fw-bold text-primary fs-5">{{ formatTien(tinhTong()) }}</span>
                </div>
                <p class="mb-0 "><strong>Ngày in:</strong> {{ formatDate(new Date()) }}</p>

                <div class="text-end mt-5 me-5">
                    <p class="mt-4 "><strong>Nhân viên thu tiền</strong></p>
                    <strong>(Ký tên)</strong>
                    <br><br> <br><br> <br> <br>
                    <p>{{ hoaDon.ten_nv }}</p>
                </div>
            </div>

            <div v-else>
                <p class="text-muted">Đang tải dữ liệu...</p>
            </div>
            <div class="text-center mt-4 no-print">
                <button @click="printDonThuoc" class="btn btn-primary">
                    <i class="fas fa-print me-2"></i>In đơn thuốc
                </button>
                <button @click="closeWindow" class="btn btn-secondary ms-2">
                    <i class="fas fa-times me-2"></i>Đóng
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';
const toaster = createToaster({ position: "top-right" });
import { nextTick } from 'vue';
export default {
    data() {
        return {
            hoaDon: null,
            chiTiet: null
        };
    },
    created() {
        const id = this.$route.query.id;
        if (id) {
            axios.get(`http://127.0.0.1:8000/api/hoa-don/in/${id}`,
                {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
            ).then(res => {
                if (res.data.status) {
                    this.hoaDon = res.data.data.hoa_don;
                    this.chiTiet = res.data.data.chi_tiet;
                }
            });
        }
    },
    methods: {
        formatTien(val) {
            return parseInt(val || 0).toLocaleString() + ' VND';
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN');
        },
        tinhTong() {
            const { tien_don_thuoc = 0, tien_dich_vu = 0, tien_kham = 0, tien_coc_dich_vu = 0 } = this.chiTiet || {};
            return Number(tien_don_thuoc) + Number(tien_dich_vu) + Number(tien_kham) - Number(tien_coc_dich_vu);
        },
        async printDonThuoc() {
            // Đợi Vue render DOM xong trước khi in
            await nextTick();
            setTimeout(() => {
                window.print();
            }, 300); // delay nhẹ để trình duyệt xử lý hiển thị
        },
        closeWindow() {
            window.close();
        }
    }
};
</script>

<style>
@media print {
    .no-print {
        display: none;
    }

    body {
        background-color: white;
    }

    .container {
        box-shadow: none;
        padding: 0;
    }
}

.table th {
    background-color: #f8f9fa;
    font-weight: 600;
}

.table td {
    vertical-align: middle;
}

.table-bordered {
    border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
}
</style>
