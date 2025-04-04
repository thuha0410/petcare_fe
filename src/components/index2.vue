<template>
    <div class="row">
        <div class="container w-75 mt-5">
                <h2 class="text-center">Đặt Lịch</h2>
                <FullCalendar :options="calendarOptions" />
            </div>
    </div>
    <!-- Modal chọn khung giờ -->
    <div class="modal fade" id="timeModal" tabindex="-1" aria-labelledby="timeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="timeModalLabel">Chọn khung giờ cho ngày: {{ selectedDate }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-wrap gap-2">
                    <button v-for="time in timeSlots" :key="time" class="btn btn-primary" @click="selectTime(time)">
                        {{ time }}
                    </button>
                </div>
                <div v-if="selectedTime" class="modal-footer">
                    <div class="alert alert-success w-100 text-center">
                        Bạn đã chọn khung giờ: <strong>{{ selectedTime }}</strong> vào ngày <strong>{{ selectedDate }}</strong>
                    </div>
                    <button class="btn btn-primary" data-bs-dismiss="modal">Tiếp tục</button>
                </div>
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
            "07:00 - 08:00",
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
            dateClick: (info) => {
                selectedDate.value = info.dateStr;
                selectedTime.value = null;
                let modal = new bootstrap.Modal(document.getElementById('timeModal'));
                modal.show();
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