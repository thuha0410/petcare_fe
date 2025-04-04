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
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-building"></i> Phòng khám PetCare</p>
                    <p class="ms-3" style="font-size: 15px;">03 Quang Trung, Hải Châu 1, Hải Châu, Đà Nẵng</p>

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
                                <td class="text-center align-middle">Lorem ipsum dolor sit amet consectetur.</td>
                                <td class="text-center align-middle">250.000</td>
                                <td class="text-center align-middle">
                                    <button class="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#info">Chi tiết</button>
                                    <button class="btn btn-primary ms-2 btn-hover" @click="toggleCalendar">Đặt khám ngay</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Chọn giờ -->
            <div class="card mt-3" v-if="selectedDate && showCalendar">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Chọn giờ</h3>
                </div>
                <div class="card-body d-flex flex-wrap justify-content-center">
                    <button v-for="time in availableTimes" :key="time" class="btn btn-outline-primary m-2"
                        @click="selectTime(time)">
                        {{ time }}
                    </button>
                </div>
            </div>
        </div>

        <div class="col-lg-1"></div>
    </div>
</template>

<script>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
    components: {
        FullCalendar
    },
    setup() {
        const showCalendar = ref(false); // Điều kiện để ẩn/hiện lịch
        const selectedDate = ref(null);
        const selectedTime = ref(null);
        const availableTimes = ref([
            "08:00 - 09:00",
            "09:00 - 10:00",
            "10:00 - 11:00",
            "13:00 - 14:00",
            "14:00 - 15:00",
            "15:00 - 16:00",
            "16:00 - 17:00"
        ]);

        const calendarOptions = ref({
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            locale: 'vi',
            selectable: true,
            editable: true,
            height: 600,
            contentHeight: 'auto',
            dateClick: (info) => {
                selectedDate.value = info.dateStr;
                selectedTime.value = null;
            }
        });

        const selectTime = (time) => {
            selectedTime.value = time;
        };

        const toggleCalendar = () => {
            if (showCalendar.value) {
                // Nếu đang mở lịch, ẩn lịch & reset chọn ngày & giờ
                showCalendar.value = false;
                selectedDate.value = null;
                selectedTime.value = null;
            } else {
                // Nếu đang ở trang dịch vụ, mở lịch
                showCalendar.value = true;
            }
        };

        return { showCalendar, calendarOptions, selectedDate, selectedTime, availableTimes, selectTime, toggleCalendar };
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
