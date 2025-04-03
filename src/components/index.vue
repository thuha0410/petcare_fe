<template>
    <div class="container mt-5">
        <h2 class="text-center">Lịch Tương Tác</h2>
        <FullCalendar :options="calendarOptions" />
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
        const calendarOptions = ref({
            plugins: [dayGridPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            locale: 'vi',
            selectable: true,
            editable: true,
            // events: [
            //     {
            //         title: 'Sự kiện mẫu',
            //         start: new Date().toISOString().split('T')[0]
            //     }
            // ],
            // dateClick: (info) => {
            //     let title = prompt("Nhập tiêu đề sự kiện:");
            //     if (title) {
            //         calendarOptions.value.events.push({
            //             title: title,
            //             start: info.dateStr
            //         });
            //     }
            // }
        });

        return { calendarOptions };
    }
};
</script>
<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';
</style>