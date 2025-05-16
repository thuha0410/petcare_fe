<template>
    <div class="">
        <!-- LỌC THỐNG KÊ -->
        <div class="card mb-4">
            <div class="card-header">
                <h3 class="text-black fw-bold" style="font-family: 'Tahoma', sans-serif; font-size: 25px">BỘ LỌC THỐNG
                    KÊ</h3>
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
                </div>
            </div>
        </div>

        <!-- THỐNG KÊ CARD -->
        <div class="row mb-4">
            <div class="col-md-3" v-for="card in cards" :key="card.title">
                <div class="card shadow-sm rounded-3 border-0 text-white" :class="card.bg">
                    <div class="card-body">
                        <h6 class="card-title">{{ card.title }}</h6>
                        <h4 class="fw-bold">{{ card.value }} <span v-if="card.showCurrency">VNĐ</span></h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- BIỂU ĐỒ -->
        <div class="card mb-4">
            <div class="card-header">
                <h3 class="text-black fw-bold" style="font-family: 'Tahoma', sans-serif; font-size: 25px">BIỂU ĐỒ DOANH
                    THU THEO THÁNG</h3>
            </div>
            <div class="card-body">
                <div style="height: 400px">
                    <canvas ref="revenueChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
Chart.register(...registerables);

export default {
    data() {
        return {
            selectedYear: new Date().getFullYear(),
            selectedMonth: 0,
            years: [],
            cards: [],
            revenueChart: null,
            monthlyData: {
                labels: [],
                datasets: [
                    {
                        label: 'Doanh thu dịch vụ',
                        data: [],
                        backgroundColor: '#74C0FC',
                        borderColor: '#004880',
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
                        backgroundColor: '#E1D7FE',
                        borderColor: '#876DD5',
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
            const now = new Date().getFullYear();
            this.years = Array.from({ length: 5 }, (_, i) => now - i);
        },
        fetchData() {
            this.fetchTongHop();
            this.fetchMonthlyRevenue();
        },
        fetchTongHop() {
            axios.get('http://127.0.0.1:8000/api/doanh-thu/tong-hop', {
                params: { year: this.selectedYear, month: this.selectedMonth }
            })
                .then(res => {
                    const d = res.data;
                    this.cards = [
                        { title: 'Tổng doanh thu', value: this.formatCurrency(d.tong_tien || 0), showCurrency: true, bg: 'bg-success' },
                        { title: 'Doanh thu dịch vụ', value: this.formatCurrency(d.tong_dich_vu || 0), showCurrency: true, bg: 'bg-info' },
                        { title: 'Tổng tiền thuốc', value: this.formatCurrency(d.tong_thuoc || 0), showCurrency: true, bg: 'bg-warning' },
                        { title: 'Số lượng hóa đơn', value: d.tong_hoa_don || 0, showCurrency: false, bg: 'bg-purple' }
                    ];
                })
                .catch(err => {
                    console.error(err);
                });
        },
        fetchMonthlyRevenue() {
            axios.get('http://127.0.0.1:8000/api/doanh-thu/bieu-do', {
                params: {
                    year: this.selectedYear,
                    month: this.selectedMonth // ✅ Gửi thêm month nếu muốn lọc
                }
            })
                .then(res => {
                    const data = res.data;

                    // Nếu lọc tháng cụ thể => chỉ hiển thị tháng đó trên biểu đồ
                    if (this.selectedMonth > 0) {
                        this.monthlyData.labels = [`Tháng ${this.selectedMonth}`];
                        const found = data.find(item => item.thang == this.selectedMonth);
                        this.monthlyData.datasets[0].data = [found?.tong_dich_vu || 0];
                        this.monthlyData.datasets[1].data = [found?.tong_thuoc || 0];
                        this.monthlyData.datasets[2].data = [found?.so_hoa_don || 0];
                    } else {
                        // Nếu lọc cả năm
                        this.monthlyData.labels = data.map(item => `Tháng ${item.thang}`);
                        this.monthlyData.datasets[0].data = data.map(item => item.tong_dich_vu);
                        this.monthlyData.datasets[1].data = data.map(item => item.tong_thuoc);
                        this.monthlyData.datasets[2].data = data.map(item => item.so_hoa_don);
                    }

                    if (this.revenueChart) this.revenueChart.destroy();

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
                                        title: { display: true, text: 'Doanh thu (VNĐ)' },
                                        ticks: {
                                            callback: val =>
                                                new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(val)
                                        }
                                    },
                                    y1: {
                                        beginAtZero: true,
                                        position: 'right',
                                        grid: { drawOnChartArea: false },
                                        title: { display: true, text: 'Số lượng hóa đơn' }
                                    }
                                }
                            }
                        });
                    });
                })
                .catch(err => console.error(err));
        },


        formatCurrency(val) {
            return new Intl.NumberFormat('vi-VN').format(val);
        }
    }
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
.bg-purple {
    background-color: #d3c6fb !important; /* Bootstrap purple */
    color: white;
}
anvas {
    min-width: 900px; /* giữ khung ngang */
}
</style>