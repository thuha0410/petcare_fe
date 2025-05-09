<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f8f9fa;">
        <div class="container bg-white p-4 shadow rounded" style="max-width: 800px; font-family: 'Arial', sans-serif;">
            <div class="d-flex align-items-center mb-4">
                <img src="//www.meowbox.com/cdn/shop/files/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204.svg?v=1716102790&"
                    alt="PetCare Logo" style="height: 60px; margin-right: 15px;">
                <div>
                    <h5 class="mb-0 fw-bold" style="color: #0d6efd;">PHÒNG KHÁM THÚ CƯNG PETCARE</h5>
                    <p class="mb-0 ms-4" style="font-size: 14px;">Quan tâm đúng lúc - Thú cưng hạnh phúc</p>
                </div>
            </div>
            <h2 class="text-center fw-bold mb-4 text-primary">ĐƠN THUỐC</h2>

            <div class="mb-4">
                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-2"><strong>Tên thú cưng:</strong> {{ donThuoc.ten_pet }}</p>
                        <p class="mb-2"><strong>Ngày khám:</strong> {{ formatDate(donThuoc.ngay_kham) }}</p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-2"><strong>Chẩn đoán:</strong> {{ donThuoc.chuan_doan }}</p>
                        <p class="mb-2"><strong>Bác sĩ điều trị:</strong> {{ donThuoc.ten_bac_si }}</p>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th class="text-center" style="width: 60px">#</th>
                            <th>Tên thuốc</th>
                            <th class="text-center" style="width: 100px">Số lượng</th>
                            <th>Liều lượng</th>
                            <th style="width: 300px">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in chiTiet" :key="index">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td>{{ item.ten_thuoc }}</td>
                            <td class="text-center">{{ item.so_luong }}</td>
                            <td>{{ item.lieu_luong }}</td>
                            <td></td>
                        </tr>
                        <tr v-if="!chiTiet || chiTiet.length === 0">
                            <td colspan="5" class="text-center">Không có thông tin thuốc</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <label for="">Ghi chú: </label>
            <br>
            <div class="mt-5 row">
                <div class="col text-start">
                    <p><strong>Ngày in:</strong> {{ formatDate(new Date()) }}</p>
                </div>
                <div class="col text-end me-5">
                    <label><strong>Bác sĩ điều trị</strong></label> <br>
                    <label class="me-3">(Ký tên)</label>
                    <br>
                    <br><br><br>
                    <p>{{ donThuoc.ten_bac_si }}</p>
                </div>
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
import api from '@/services/api';
import { createToaster } from '@meforma/vue-toaster';
const toaster = createToaster({ position: "top-right" });
import { nextTick } from 'vue';
export default {
    data() {
        return {
            donThuoc: {},
            chiTiet: []
        }
    },
    created() {
        this.loadDonThuoc();
    },
    methods: {
        async loadDonThuoc() {
            try {
                const id = this.$route.query.id;
                console.log('ID đơn thuốc:', id);

                if (!id) {
                    toaster.error('Không tìm thấy thông tin đơn thuốc');
                    return;
                }

                const response = await api.get(`http://127.0.0.1:8000/api/don-thuoc/chi-tiet-in/${id}`);
                console.log('Response từ API:', response.data);

                if (response.data.status) {
                    this.donThuoc = response.data.data.don_thuoc;
                    this.chiTiet = response.data.data.chi_tiet;
                    console.log('Don thuoc:', this.donThuoc);
                    console.log('Chi tiet:', this.chiTiet);
                } else {
                    toaster.error('Không thể lấy thông tin đơn thuốc');
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin đơn thuốc:', error);
                toaster.error('Lỗi khi tải thông tin đơn thuốc');
            }
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
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
}
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

.table-light {
    background-color: #f8f9fa;
}

.table-light th {
    background-color: #e9ecef;
}
</style>