<template>
    <div class="container my-4">
        <!-- LỌC THỐNG KÊ -->
        <div class="card mb-4">
            <div class="card-header">
                <h3 class="text-black" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
                    BỘ LỌC THỐNG KÊ
                </h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Năm</label>
                        <select class="form-select" v-model="selectedYear" @change="fetchData">
                            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label class="form-label">Tháng</label>
                        <select class="form-select" v-model="selectedMonth" @change="fetchData">
                            <option value="0">Tất cả các tháng</option>
                            <option v-for="month in 12" :key="month" :value="month">Tháng {{ month }}</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3 d-flex align-items-end">
                        <button class="btn btn-primary" @click="fetchData">Lọc dữ liệu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- THỐNG KÊ DOANH THU -->
        <div class="row mb-4">
            <div class="col-md-3" v-for="card in cards" :key="card.title">
                <div class="card shadow-sm rounded-3 border-0 text-white" :class="card.bg">
                    <div class="card-body">
                        <h6 class="card-title">{{ card.title }}</h6>
                        <h4 class="fw-bold">{{ card.value }} VNĐ</h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- BIỂU ĐỒ DOANH THU THEO THÁNG -->
        <div class="card mb-4">
            <div class="card-header">
                <h3 class="text-black" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
                    BIỂU ĐỒ DOANH THU THEO THÁNG
                </h3>
            </div>
            <div class="card-body">
                <div style="height: 400px;">
                    <canvas ref="revenueChart"></canvas>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h3 class="text-black" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
                    DANH SÁCH HÓA ĐƠN ĐÃ THANH TOÁN
                </h3>
                <div></div>
                <!-- Nút lọc hoặc export nếu cần -->
            </div>

            <div class="card-body">
                <div class="table table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center align-middle">
                                <th>#</th>
                                <th>Mã HĐ</th>
                                <th>Khách hàng</th>
                                <th>Ngày thanh toán</th>
                                <th>Tổng tiền</th>
                                <th>Nhân viên</th>
                                <th>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, index) in list_hoa_don" :key="item.ma_hd">
                                <tr>
                                    <th class="text-center align-middle">{{ index + 1 }}</th>
                                    <td class="text-center align-middle">{{ item.ma_hd }}</td>
                                    <td class="text-center align-middle">{{ item.ten_khach }}</td>
                                    <td class="text-center align-middle">{{ item.ngay_tt }}</td>
                                    <td class="text-center align-middle">{{ formatCurrency(item.tong_tien) }} VNĐ</td>
                                    <td class="text-center align-middle">{{ item.ten_nv }}</td>
                                    <td class="text-center align-middle">
                                        <span v-if="item.ghi_chu" data-bs-toggle="tooltip" :title="item.ghi_chu">
                                            <i class="fa-solid fa-circle-info text-primary fa-lg"></i>
                                        </span>
                                        <span v-else>—</span>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    data() {
        return {
            cards: [
                { title: 'Tổng doanh thu', value: '123,000,000', bg: 'bg-success' },
                { title: 'Doanh thu dịch vụ', value: '85,000,000', bg: 'bg-info' },
                { title: 'Tổng tiền thuốc', value: '38,000,000', bg: 'bg-warning' },
                { title: 'Số lượng hóa đơn', value: '132', bg: 'bg-secondary' },
            ],
            list_hoa_don: [],
            selectedYear: new Date().getFullYear(),
            selectedMonth: 0, // 0 = tất cả các tháng
            years: [],
            revenueChart: null,
            monthlyData: {
                labels: [],
                datasets: [
                    {
                        label: 'Doanh thu dịch vụ',
                        data: [],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Doanh thu thuốc',
                        data: [],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Số lượng hóa đơn',
                        data: [],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            }
        }
    },
    mounted() {
        this.generateYears();
        this.fetchData();
    },
    methods: {
        generateYears() {
            const currentYear = new Date().getFullYear();
            this.years = Array.from({length: 5}, (_, i) => currentYear - i);
        },
        fetchData() {
            this.fetchTongHop();
            this.fetchHoaDon();
            this.fetchMonthlyRevenue();
        },
        fetchMonthlyRevenue() {
            // Dữ liệu mẫu tạm thời cho từng tháng
            const sampleData = [
                { thang: 1, tong_dich_vu: 9000000, tong_thuoc: 5000000, so_hoa_don: 12 },
                { thang: 2, tong_dich_vu: 11000000, tong_thuoc: 6000000, so_hoa_don: 15 },
                { thang: 3, tong_dich_vu: 14000000, tong_thuoc: 7000000, so_hoa_don: 18 },
                { thang: 4, tong_dich_vu: 16000000, tong_thuoc: 8000000, so_hoa_don: 20 },
                { thang: 5, tong_dich_vu: 18000000, tong_thuoc: 9000000, so_hoa_don: 22 },
                { thang: 6, tong_dich_vu: 20000000, tong_thuoc: 10000000, so_hoa_don: 23 },
                { thang: 7, tong_dich_vu: 21000000, tong_thuoc: 11000000, so_hoa_don: 24 },
                { thang: 9, tong_dich_vu: 25000000, tong_thuoc: 13000000, so_hoa_don: 26 },
                { thang: 10, tong_dich_vu: 26000000, tong_thuoc: 14000000, so_hoa_don: 27 },
                { thang: 11, tong_dich_vu: 27000000, tong_thuoc: 15000000, so_hoa_don: 28 },
                { thang: 12, tong_dich_vu: 30000000, tong_thuoc: 16000000, so_hoa_don: 30 }
            ];

            // Lọc dữ liệu theo tháng nếu có chọn tháng cụ thể
            let filteredData = sampleData;
            if (this.selectedMonth > 0) {
                filteredData = sampleData.filter(item => item.thang === this.selectedMonth);
            }

            // Chuẩn bị dữ liệu cho biểu đồ
            this.monthlyData.labels = filteredData.map(item => `Tháng ${item.thang}`);
            this.monthlyData.datasets[0].data = filteredData.map(item => item.tong_dich_vu);
            this.monthlyData.datasets[1].data = filteredData.map(item => item.tong_thuoc);
            this.monthlyData.datasets[2].data = filteredData.map(item => item.so_hoa_don);

            if (this.revenueChart) {
                this.revenueChart.destroy();
            }

            this.$nextTick(() => {
                const ctx = this.$refs.revenueChart.getContext('2d');
                this.revenueChart = new Chart(ctx, {
                    type: 'bar',
                    data: this.monthlyData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Doanh thu theo tháng' }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Doanh thu (VNĐ)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(value);
                                    }
                                }
                            },
                            y1: {
                                beginAtZero: true,
                                position: 'right',
                                grid: { drawOnChartArea: false },
                                title: { 
                                    display: true, 
                                    text: 'Số lượng hóa đơn' 
                                }
                            }
                        }
                    }
                });
            });
        },
        fetchTongHop() {
            // Dữ liệu mẫu tạm thời thay vì gọi API
            // Giả lập dữ liệu khác nhau theo tháng nếu có chọn tháng
            let tong_doanh_thu = 123000000;
            let tong_dich_vu = 85000000;
            let tong_thuoc = 38000000;
            let so_hoa_don = 132;

            if (this.selectedMonth > 0) {
                const multiplier = this.selectedMonth / 6; // Làm cho dữ liệu thay đổi theo tháng
                tong_doanh_thu = Math.round(tong_doanh_thu * multiplier);
                tong_dich_vu = Math.round(tong_dich_vu * multiplier);
                tong_thuoc = Math.round(tong_thuoc * multiplier);
                so_hoa_don = Math.round(so_hoa_don * multiplier);
            }

            this.cards = [
                { title: 'Tổng doanh thu', value: this.formatCurrency(tong_doanh_thu), bg: 'bg-success' },
                { title: 'Doanh thu dịch vụ', value: this.formatCurrency(tong_dich_vu), bg: 'bg-info' },
                { title: 'Tổng tiền thuốc', value: this.formatCurrency(tong_thuoc), bg: 'bg-warning' },
                { title: 'Số lượng hóa đơn', value: so_hoa_don, bg: 'bg-secondary' },
            ];
        },
        fetchHoaDon() {
            // Dữ liệu mẫu tạm thời thay vì gọi API
            this.list_hoa_don = [
                { ma_hd: 'HD001', ten_khach: 'Nguyễn Văn A', ngay_tt: '01/12/2023', tong_tien: 1500000, ten_nv: 'Trần Thị B', ghi_chu: 'Khám tổng quát' },
                { ma_hd: 'HD002', ten_khach: 'Lê Văn C', ngay_tt: '02/12/2023', tong_tien: 2500000, ten_nv: 'Trần Thị B', ghi_chu: 'Điều trị viêm da' },
                { ma_hd: 'HD003', ten_khach: 'Phạm Thị D', ngay_tt: '03/12/2023', tong_tien: 1800000, ten_nv: 'Nguyễn Văn E', ghi_chu: '' },
                { ma_hd: 'HD004', ten_khach: 'Trần Văn F', ngay_tt: '04/12/2023', tong_tien: 3200000, ten_nv: 'Nguyễn Văn E', ghi_chu: 'Tiêm vaccine' },
                { ma_hd: 'HD005', ten_khach: 'Hoàng Thị G', ngay_tt: '05/12/2023', tong_tien: 2100000, ten_nv: 'Trần Thị B', ghi_chu: '' }
            ];

            // Lọc dữ liệu theo tháng nếu có chọn tháng
            if (this.selectedMonth > 0) {
                const monthStr = this.selectedMonth.toString().padStart(2, '0');
                this.list_hoa_don = this.list_hoa_don.filter(item => {
                    const parts = item.ngay_tt.split('/');
                    return parts[1] === monthStr;
                });
            }
        },
        formatCurrency(val) {
            return new Intl.NumberFormat('vi-VN').format(val);
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