<template>
    <div class="row">
        <div class="col-lg-1"></div>

        <!-- Card Thông tin cơ sở y tế -->
        <div class="col-lg-3">
            <div class="card rounded-3">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white">Thông tin cơ sở y tế</h3>
                </div>
                <div class="card-body">
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-building"></i> Phòng khám PetCare
                    </p>
                    <p class="ms-3" style="font-size: 15px;">03 Quang Trung, Hải Châu 1, Hải Châu, Đà Nẵng</p>

                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-brands fa-servicestack"></i> Tên dịch vụ
                    </p>
                    <p class="ms-3" style="font-size: 15px;">{{ list_dv.ten_dv }}</p>

                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-calendar-days"></i> Ngày:</p>
                    <p class="ms-3" style="font-size: 15px;">{{ selectedDate || "Chưa chọn" }}</p>

                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-clock"></i> Giờ:</p>
                    <p class="ms-3" style="font-size: 15px;">{{ selectedTime || "Chưa chọn" }}</p>
                </div>
            </div>
        </div>

        <!-- Card Nội dung -->
        <div class="col-lg-7">
            <!-- Hiển thị lịch nếu showCalendar = true -->
            <div class="card" v-if="showCalendar">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Chọn lịch hẹn</h3>
                </div>
                <div class="card-body">
                    <FullCalendar :options="calendarOptions" />
                    <button class="btn btn-secondary mt-3" @click="toggleCalendar">Quay lại</button>
                </div>
            </div>

            <!-- Hiển thị bảng dịch vụ nếu showCalendar = false -->
            <div class="card" v-else>
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Vui lòng xác nhận dịch vụ</h3>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Tên dịch vụ</th>
                                <th class="text-center align-middle">Giá tiền</th>
                                <th class="text-center align-middle">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center align-middle">1</td>
                                <td class="text-center align-middle">{{ list_dv.ten_dv || '...' }}</td>
                                <td class="text-center align-middle">{{ list_dv.gia || '...' }} VNĐ</td>
                                <td class="text-center align-middle">
                                    <button class="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#info">Chi tiết</button>
                                    <button class="btn btn-primary ms-2 btn-hover" @click="toggleCalendar">Đặt khám
                                        ngay</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card mt-3" v-if="selectedDate && showCalendar">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Chọn giờ</h3>
                </div>
                <div class="card-body d-flex flex-wrap justify-content-center">
                    <button v-for="(value,index) in availableTimes" :key="index" class="btn btn-outline-primary m-2"
                        @click="selectTime(value.khung_gio)">
                        {{ value.khung_gio }}
                    </button>
                </div>
                <div class="text-center mb-3">
                    <button class="btn btn-success mt-2" @click="xacNhanLichHen()" :disabled="!selectedTime">
                        Xác nhận lịch hẹn
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-1"></div>
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export default {
    components: { FullCalendar },
    data() {
        return {
            id: this.$route.params.id,
            list_dv: {},
            showCalendar: false,
            selectedDate: null,
            selectedTime: null,
            id_lich: null,
            availableTimes: [],
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: 'vi',
                selectable: true,
                editable: true,
                height: 600,
                contentHeight: 'auto',
                dateClick: this.handleDateClick
            }
        };
    },
    mounted() {
        this.loadDichVu();
        this.loadLich();
        window.scrollTo(0, 0);
        
        
    },
    methods: {
        loadLich() {
            axios
                .get("http://127.0.0.1:8000/api/lich/load")
                .then((res) => {
                    this.availableTimes = res.data.data;
                    
                });
        },
        loadDichVu() {
            axios
                .get("http://127.0.0.1:8000/api/dich-vu/load-chi-tiet/" + this.id)
                .then((res) => {
                    this.list_dv = res.data.data;
                });
        },
        toggleCalendar() {
            if (this.showCalendar) {
                this.showCalendar = false;
                this.selectedDate = null;
                this.selectedTime = null;
            } else {
                this.showCalendar = true;
            }
        },
        selectTime(time) {
            this.selectedTime = time;
        },
        handleDateClick(info) {
            this.selectedDate = info.dateStr;
            this.selectedTime = null;
        },
        xacNhanLichHen(id) {
            console.log(this.availableTimes);
            if (!this.selectedDate || !this.selectedTime) return;

            const data = {
                id_lich: this.id_lich,
                id_dv: this.list_dv.id,
                ngay: this.selectedDate,
                gio: this.selectedTime,
            };
            axios
                .post('http://127.0.0.1:8000/api/lich-hen/them', data ,
                {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_client')
                        }
                    }
                )
                .then((res) => {
                    alert("Đặt lịch thành công!");
                    this.toggleCalendar();
                })
                .catch((err) => {
                    console.error(err);
                    alert("Có lỗi xảy ra khi đặt lịch.");
                });
        }
    }
};
</script>

<style>
.btn-hover:hover {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
}

@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';
</style>