<template>
    <div>
      <button class="btn btn-primary" @click="toggleCalendar">
        {{ showCalendar ? "Quay lại" : "Đặt lịch" }}
      </button>
  
      <div v-if="showCalendar" class="mt-3">
        <FullCalendar :options="calendarOptions" />
      </div>
  
      <div v-if="selectedDate" class="mt-3">
        <strong>Ngày đã chọn:</strong> {{ selectedDate }}
      </div>
    </div>
  </template>
  
  <script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  
  export default {
    components: {
      FullCalendar
    },
    data() {
      return {
        showCalendar: false,
        selectedDate: null,
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          locale: 'vi',
          selectable: true,
          height: 600,
          dateClick: this.handleDateClick
        }
      }
    },
    methods: {
      handleDateClick(info) {
        this.selectedDate = info.dateStr
      },
      toggleCalendar() {
        this.showCalendar = !this.showCalendar
        if (!this.showCalendar) {
          this.selectedDate = null
        }
      }
    }
  }
  </script>
  
  <style>
  @import "~@fullcalendar/core/main.css";
  @import "~@fullcalendar/daygrid/main.css";
  </style>
  