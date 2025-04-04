<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="container vh-100 mt-5">
                <h2 class="text-center">Lịch Tương Tác</h2>
                <FullCalendar :options="calendarOptions" />
            </div>
        </div>
        <div class="col-lg-4">
            <!-- Hiển thị card khi có ngày được chọn -->
            <div v-if="selectedDate" class="card mt-4">
                <div class="card-header">
                    <h5>Chọn khung giờ cho ngày: {{ selectedDate }}</h5>
                </div>
                <div class="card-body d-flex flex-wrap gap-2">
                    <button v-for="time in timeSlots" :key="time" class="btn btn-primary" @click="selectTime(time)">
                        {{ time }}
                    </button>
                </div>
            </div>

            <!-- Hiển thị thông báo khi chọn khung giờ -->
            <div v-if="selectedTime" class="alert alert-success mt-3">
                Bạn đã chọn khung giờ: <strong>{{ selectedTime }}</strong> vào ngày <strong>{{ selectedDate }}</strong>
                <button class="btn btn-primary d-flex justify-content-end">Tiếp tục</button>
            </div>
        </div>
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
        const selectedDate = ref(null);
        const selectedTime = ref(null);
        const timeSlots = ref([
            "08:00 - 09:00",
            "09:00 - 10:00",
            "10:00 - 11:00",
            "13:00 - 14:00",
            "14:00 - 15:00",
            "15:00 - 16:00"
        ]);

        const calendarOptions = ref({
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            locale: 'vi',
            selectable: true,
            editable: true,
            dateClick: (info) => {
                selectedDate.value = info.dateStr; // Lưu ngày được chọn
                selectedTime.value = null; // Reset khung giờ khi chọn ngày mới
            }
        });

        const selectTime = (time) => {
            selectedTime.value = time;
        };

        return { calendarOptions, selectedDate, selectedTime, timeSlots, selectTime };
    }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';
</style>
