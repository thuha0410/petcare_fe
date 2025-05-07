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

                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-paw"></i> Tên pet
                    </p>
                    <select class="form-select form-control" v-model="id_pet" name="" id="">
                        <option disabled value="">--Chọn pet cần khám--</option>
                        <option v-for="(value, index) in list_pet" :key="index" v-bind:value="value.id">{{ value.ten_pet
                        }}</option>
                    </select>

                    <p class="fw-bold mt-2" style="font-size: 20px;"><i class="fa-solid fa-calendar-days"></i> Ngày:</p>
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

                    <p class="text-muted text-center mt-2" style="font-style: italic;">
                        * Chỉ có thể đặt lịch từ hôm nay đến 50 ngày tới
                    </p>
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
                                <th class="text-center align-middle">Tiền cọc</th>
                                <th class="text-center align-middle">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center align-middle">1</td>
                                <td class="text-center align-middle">{{ list_dv.ten_dv || '...' }}</td>
                                <td class="text-center align-middle">{{ list_dv.gia || '...' }} VNĐ</td>
                                <td class="text-center align-middle">{{ (list_dv.gia * 25) / 100 || '...' }} VNĐ</td>
                                <td class="text-center align-middle">
                                    <button class="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#info">Chi tiết</button>
                                    <button class="btn btn-primary ms-2 btn-hover" @click="toggleCalendar">Đặt khám
                                        ngay</button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    <p class="text-muted text-center">Tiền cọc được tính theo 25% giá dịch vụ</p>
                </div>
            </div>

            <div class="card mt-3" v-if="selectedDate && showCalendar">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Chọn giờ</h3>
                </div>
                <div class="card-body d-flex flex-wrap justify-content-center">
                    <button v-for="(value, index) in availableTimes" :key="index" class="btn m-2"
                        :disabled="isFull(value.id) || isPastTime(value.khung_gio)" @click="selectTime(value)" :class="{
                            'btn-danger': isFull(value.id),
                            'btn-warning': isPastTime(value.khung_gio) && !isFull(value.id),
                            'btn-outline-primary': !isFull(value.id) && !isPastTime(value.khung_gio)
                        }">
                        {{ value.khung_gio }}
                        <br> ({{ slotInfo[value.id] || 0 }}/2 đã đặt)
                    </button>
                </div>
                <div class="text-center mt-3">
                    <div class="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                        <div style="font-size: 16px;"><span class="legend-box bg-primary"></span> Đang chọn</div>
                        <div style="font-size: 16px;"><span class="legend-box border border-primary"></span> Còn chỗ
                        </div>
                        <div style="font-size: 16px; "><span class="legend-box "
                                style="background-color: #fb6f6f;"></span> Đã đầy</div>
                        <div style="font-size: 16px;"><span class="legend-box border bg-warning"></span> Quá giờ</div>
                    </div>
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
import apiClient from '../../../../services/apiClient';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

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
                dateClick: this.handleDateClick,
                // Giới hạn ngày hợp lệ:
                validRange: {
                    start: new Date(), // Không được chọn ngày quá khứ
                    end: (() => {
                        const today = new Date();
                        const future = new Date(today);
                        future.setDate(today.getDate() + 51); // chỉ +49 để hôm nay là ngày 1/50
                        return future.toISOString().split('T')[0];
                    })() // Chỉ cho đặt 50 ngày tới
                },
            },
            list_pet: [],
            id_pet: '',
            slotInfo: {},
        };
    },
    mounted() {
        this.loadDichVu();
        this.loadLich();
        this.loadPet();
        window.scrollTo(0, 0);
    },
    methods: {
        isFull(id_lich) {
            return (this.slotInfo[id_lich] || 0) >= 2;
        },
        loadLich() {
            apiClient
                .get("/api/lich/load")
                .then((res) => {
                    this.availableTimes = res.data.data;
                });
        },
        loadDichVu() {
            apiClient
                .get("/api/dich-vu/load-chi-tiet/" + this.id)
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
        selectTime(timeObj) {
            this.selectedTime = timeObj.khung_gio;
            this.id_lich = timeObj.id;
        },
        handleDateClick(info) {
            const selected = new Date(info.dateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 50); // tăng 50 ngày

            if (selected < today) {
                toaster.error("Không thể đặt lịch trong quá khứ!");
                return;
            }

            if (selected > maxDate) {
                toaster.error("Bạn chỉ có thể đặt lịch trong vòng 50 ngày tới!");
                return;
            }
            this.selectedDate = info.dateStr;
            this.selectedTime = null;
            this.loadSlot(info.dateStr);
        },
        xacNhanLichHen(id) {
            if (!this.id_pet) {
                toaster.error("Vui lòng chọn thú cưng cần khám để đặt lịch!");
                return;
            }

            console.log(this.availableTimes);
            if (!this.selectedDate || !this.selectedTime) return;
            const id_kh = localStorage.getItem("id_khach_hang");
            if (!id_kh) {
                alert("Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.");
                return;
            }
            const data = {
                id_lich: this.id_lich,
                id_kh: id_kh,
                id_dv: this.list_dv.id,
                id_pet: this.id_pet,
                tinh_trang: 0,
                gia: this.list_dv.gia,
                tien_coc: this.list_dv.gia * 25 / 100,
                ngay: this.selectedDate,
                gio: this.selectedTime,
            };
            apiClient
                .post('/api/lich-hen/them', data,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_client')
                        }
                    }
                )
                .then((res) => {
                    toaster.success("Đặt lịch thành công!");
                    this.toggleCalendar();
                })
                .catch((err) => {
                    console.error(err);

                    if (err.response && err.response.data && err.response.data.message) {
                        toaster.error(err.response.data.message); // Hiện thông báo từ backend
                    } else {
                        toaster.error("Có lỗi xảy ra khi đặt lịch.");
                    }
                });

        },
        isPastTime(khungGio) {
            if (!this.selectedDate) return false;

            const [startStr] = khungGio.split(" - "); // ví dụ: "8:00"
            const now = new Date();
            const selectedDate = new Date(this.selectedDate);

            // Nếu ngày không phải hôm nay => khung giờ chưa qua
            const isToday = now.toISOString().split("T")[0] === this.selectedDate;
            if (!isToday) return false;

            const [hours, minutes] = startStr.split(":");
            const slotTime = new Date(selectedDate);
            slotTime.setHours(parseInt(hours), parseInt(minutes), 0);

            return slotTime < now;
        },
        loadSlot(ngay) {
            apiClient.get('/api/lich-hen/thong-tin-slot', {
                params: { ngay }
            }).then(res => {
                if (res.data.status === 1) {
                    this.slotInfo = res.data.data;
                }
            });
        },
        loadPet() {
            const token = localStorage.getItem("token_client");
            if (!token) {
                console.warn("Thiếu token đăng nhập.");
                return;
            }

            // Gọi API /khach-hang/lay-du-lieu để lấy id khách hàng
            apiClient.get("/api/khach-hang/lay-du-lieu", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                const id_kh = res.data.data.id;
                // lưu lại vào localStorage để sử dụng sau nếu cần
                localStorage.setItem("id_khach_hang", id_kh);

                // Gọi tiếp API lấy thú cưng theo id_kh
                return apiClient.get(`/api/pets/${id_kh}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            }).then(res => {
                this.list_pet = res.data.pets;
            }).catch(err => {
                console.error("Lỗi khi lấy danh sách thú cưng:", err);
            });

        }
    },
};
</script>

<style>
.btn-hover:hover {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
}

.legend-box {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 6px;
}


@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';
</style>