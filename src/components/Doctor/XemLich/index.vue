<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="container vh-100 mt-5">
                <h2 class="text-center">Lịch Khám</h2>
                <FullCalendar :options="calendarOptions" />
            </div>
        </div>
    </div>

    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eventModalLabel">Thông tin sự kiện</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Tiêu đề:</strong> {{ eventInfo.title }}</p>
                    <p><strong>Thời gian:</strong> {{ eventInfo.start }}</p>
                    <p><strong>Mô tả:</strong> {{ eventInfo.description }}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            eventInfo: {
                title: "",
                start: "",
                description: ""
            },
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: 'vi',
                editable: true,
                events: [
                    {
                        title: "Họp nhóm phát triển",
                        start: "2025-04-10T10:00:00",
                        description: "Họp nhóm phát triển phần mềm tại phòng họp số 2."
                    },
                    {
                        title: "Thuyết trình dự án",
                        start: "2025-04-15T14:00:00",
                        description: "Thuyết trình về dự án mới cho ban giám đốc."
                    }
                ],
                eventClick: null
            }
        };
    },
    methods: {
        handleEventClick(info) {
            this.eventInfo = {
                title: info.event.title,
                start: info.event.start.toLocaleString(),
                description: info.event.extendedProps.description || "Không có mô tả."
            };
            const modal = new bootstrap.Modal(document.getElementById('eventModal'));
            modal.show();
        }
    },
    created() {
        this.calendarOptions.eventClick = this.handleEventClick;
    }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';
</style>
