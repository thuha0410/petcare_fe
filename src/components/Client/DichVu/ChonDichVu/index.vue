<template>
    <div class="row">
        <div class="col-lg-1"></div>

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

        <div class="col-lg-7">
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
                    <button v-for="(value, index) in availableTimes.filter(g => g.tinh_trang == 0)" :key="index" class="btn m-2"
                        :disabled="isFull(value.id) || isPastTime(value.khung_gio)" @click="selectTime(value)" :class="{
                            'btn-danger': isFull(value.id),
                            'btn-warning': isPastTime(value.khung_gio) && !isFull(value.id),
                            'btn-primary': selectedTime === value.khung_gio,
                            'btn-outline-primary': !isFull(value.id) && !isPastTime(value.khung_gio) && selectedTime !== value.khung_gio
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
                    <button class="btn btn-success mt-2" @click="xacNhanLichHenFinal()" :disabled="!selectedTime">
                        Xác nhận lịch hẹn
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-1"></div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="confirmModalLabel">Xác nhận thông tin đặt lịch</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Dịch vụ:</strong> {{ list_dv.ten_dv }}</p>
                    <p><strong>Giá:</strong> {{ list_dv.gia }} VNĐ</p>
                    <p><strong>Tiền cọc:</strong> {{ tienCoc }} VNĐ</p>
                    <p><strong>Pet:</strong> {{list_pet.find(p => p.id === id_pet)?.ten_pet || '...'}}</p>
                    <p><strong>Ngày:</strong> {{ selectedDate }}</p>
                    <p><strong>Giờ:</strong> {{ selectedTime }}</p>
                    <p><strong>Phương thức thanh toán:</strong> PayPal</p>
                    <div class="alert alert-info mt-3">
                        <small>Bạn sẽ được chuyển đến màn hình thanh toán PayPal sau khi xác nhận. Vui lòng hoàn tất thanh toán tiền cọc để xác nhận lịch hẹn.</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-success" @click="processPayment()">Tiếp tục thanh toán</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="info" tabindex="-1" aria-labelledby="chiTietLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="confirmModalLabel">Chi tiết dịch vụ</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Dịch vụ:</strong> {{ list_dv.ten_dv }}</p>
                    <p><strong>Loại dịch vụ:</strong>
                        {{
                            list_dv.id_loaidv === 1 ? 'Tiêm chủng' :
                                list_dv.id_loaidv === 2 ? 'Spa' :
                                    list_dv.id_loaidv === 3 ? 'Gửi thú cưng' :
                                        list_dv.id_loaidv === 4 ? 'Khám bệnh' :
                                            'Không xác định'
                        }}
                    </p>
                    <p><strong>Mô tả:</strong> {{ list_dv.mo_ta }}</p>
                    <p><strong>Giá tiền:</strong> {{ list_dv.gia }}</p>
                    <img class="img-fluid" :src="list_dv.hinh_anh" alt="">
                    <p class="mt-2"><strong>Phù hơp cân nặng:</strong> {{ list_dv.can_nang_min }} - {{
                        list_dv.can_nang_max }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- PayPal Payment Modal -->
    <div class="modal fade" id="paypalModal" tabindex="-1" aria-labelledby="paypalModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content shadow-lg border-0 rounded-4">
                <div class="modal-header bg-primary text-white py-3 px-4">
                    <h4 class="modal-title fw-bold" id="paypalModalLabel">
                        <i class="fa-solid fa-wallet me-2"></i>Thanh toán tiền cọc
                    </h4>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <div class="text-center mb-4">
                        <h5 class="fw-bold text-secondary fs-4">Thông tin dịch vụ</h5>
                        <p class="fs-5 mb-2"><strong>Tên dịch vụ:</strong> {{ list_dv.ten_dv }}</p>
                        <p class="fs-5 mb-2"><strong>Giá dịch vụ:</strong> <span class="text-success fw-bold">{{
                            list_dv.gia }} VNĐ</span></p>
                        <p class="fs-5 mb-2"><strong>Tiền cọc (25%):</strong> <span class="text-danger fw-bold">{{
                            tienCoc }} VNĐ</span></p>
                        <div class="alert alert-secondary p-3 mt-3">
                            <h6 class="fw-bold">Chi tiết lịch hẹn:</h6>
                            <p class="mb-1"><strong>Thú cưng:</strong> {{list_pet.find(p => p.id === id_pet)?.ten_pet || '...'}}</p>
                            <p class="mb-1"><strong>Ngày khám:</strong> {{ selectedDate }}</p>
                            <p class="mb-1"><strong>Giờ khám:</strong> {{ selectedTime }}</p>
                        </div>
                        <div class="border-top pt-3">
                            <p class="text-muted fst-italic fs-6">Vui lòng thanh toán tiền cọc để hoàn tất đặt lịch.</p>
                        </div>
                    </div>
                    <div id="paypal-button-container" class="d-flex justify-content-center"></div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import apiClient from '../../../../services/apiClient';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    components: { FullCalendar },
    data() {
        return {
            giaGoc: 0,
            tienCoc: 0,
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
                validRange: {
                    start: new Date(),
                    end: (() => {
                        const today = new Date();
                        const future = new Date(today);
                        future.setDate(today.getDate() + 51);
                        return future.toISOString().split('T')[0];
                    })()
                },
            },
            list_pet: [],
            id_pet: '',
            slotInfo: {},
            paypalLoaded: false,
            isProcessingPayment: false,
            appointmentData: null
        };
    },

    mounted() {
        // Nếu truy cập từ chatbot, kiểm tra đăng nhập bằng POST
        if (this.$route.query.from === 'chatbot') {
            this.$apiClient = this.$apiClient || require('../../../../services/apiClient').default;
            this.$apiClient.post('/api/khach-hang/Kiem-tra-dang-nhap', {})
                .then(res => {
                    // Nếu cần xử lý gì thêm khi đăng nhập hợp lệ, thêm ở đây
                })
                .catch(err => {
                    // Nếu không hợp lệ, chuyển về trang đăng nhập
                    this.$router.push('/client/dang-nhap-dang-ky');
                });
        }
        this.loadDichVu();
        this.loadLich();
        this.loadPet();
        window.scrollTo(0, 0);
        this.loadPayPalScript();
        
        // Add modal event listeners
        const confirmModal = document.getElementById('confirmModal');
        if (confirmModal) {
            confirmModal.addEventListener('hidden.bs.modal', () => {
                this.$forceUpdate();
            });
        }
        
        const paypalModal = document.getElementById('paypalModal');
        if (paypalModal) {
            paypalModal.addEventListener('hidden.bs.modal', () => {
                this.$forceUpdate();
            });
        }
    },
    methods: {
        loadPayPalScript() {
            // Load PayPal script if not already loaded
            if (!document.querySelector('script[src*="paypal"]')) {
                const script = document.createElement('script');
                script.src = "https://www.paypal.com/sdk/js?client-id=Aa_Kfwz45T3UyBv2Zmb0xsyK0VhxtgY-uWbHde6JhW4YcM4LJ7VzeR89EHzqIiBqJveqD1J3h7VWZQNv&currency=USD";
                script.addEventListener('load', this.setupPayPal);
                document.body.appendChild(script);
            } else if (!this.paypalLoaded) {
                this.setupPayPal();
            }
        },

        setupPayPal() {
            this.paypalLoaded = true;
            // PayPal will be initialized when the modal is shown
        },

        initializePayPalButtons() {
            if (!window.paypal || this.isProcessingPayment) return;

            // Clear existing buttons
            const container = document.getElementById('paypal-button-container');
            if (container) container.innerHTML = '';

            // Convert VND to USD for PayPal (approximate conversion for demo)
            const amountUSD = (this.tienCoc / 23000).toFixed(2);

            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amountUSD,
                                currency_code: 'USD'
                            },
                            description: `Đặt cọc dịch vụ: ${this.list_dv.ten_dv}`
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    this.isProcessingPayment = true;

                    // Capture the payment
                    return actions.order.capture().then(details => {
                        // Call API to create appointment after successful payment
                        this.createAppointment(details.id);
                    });
                },
                onCancel: () => {
                    toaster.error("Thanh toán đã bị hủy");
                    this.isProcessingPayment = false;
                },
                onError: (err) => {
                    console.error("Lỗi thanh toán:", err);
                    toaster.error("Có lỗi xảy ra trong quá trình thanh toán");
                    this.isProcessingPayment = false;
                }
            }).render('#paypal-button-container');
        },

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
                    this.giaGoc = res.data.data.gia;
                    this.tienCoc = Math.round(this.giaGoc * 0.25);
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
            
            // Force component re-render to update button styling
            this.$forceUpdate();
        },

        handleDateClick(info) {
            const selected = new Date(info.dateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 50);

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
        xacNhanLichHenFinal() {
            if (!this.selectedDate || !this.selectedTime) return;

            if (!this.id_pet) {
                toaster.error("Vui lòng chọn thú cưng cần khám để đặt lịch!");
                return;
            }

            const id_kh = localStorage.getItem("id_khach_hang");
            if (!id_kh) {
                alert("Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.");
                return;
            }
            
            // Prepare data for appointment
            this.appointmentData = {
                id_lich: this.id_lich,
                id_kh: id_kh,
                id_dv: this.list_dv.id,
                id_pet: this.id_pet,
                tinh_trang: "0",
                gia: this.list_dv.gia,
                tien_coc: this.tienCoc,
                ngay: this.selectedDate,
                gio: this.selectedTime,
                payment_method: "paypal"
            };
            
            // Force component re-render to ensure time slot highlighting persists
            this.$forceUpdate();
            
            // Show confirmation modal instead of directly processing payment
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
        },

        // New method to process payment after confirmation
        processPayment() {
            if (!this.appointmentData) {
                toaster.error("Dữ liệu đặt lịch không hợp lệ");
                return;
            }

            // Close confirmation modal
            const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            if (confirmModal) confirmModal.hide();

            // Show PayPal modal
            const paypalModal = new bootstrap.Modal(document.getElementById('paypalModal'));
            paypalModal.show();

            // Initialize PayPal buttons when modal is shown
            document.getElementById('paypalModal').addEventListener('shown.bs.modal', () => {
                this.initializePayPalButtons();
            });
        },

        xacNhanLichHen() {
            // This method is now just a legacy method for compatibility
            // Actual functionality moved to processPayment()
            this.processPayment();
        },
        
        createAppointment(paymentId) {
            if (!this.appointmentData) {
                toaster.error("Dữ liệu đặt lịch không hợp lệ");
                return;
            }

            // Add payment information
            const data = {
                ...this.appointmentData,
                payment_id: paymentId
            };

            apiClient
                .post('/api/lich-hen/them', data, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_client')
                    }
                })
                .then((res) => {
                    // Close the confirmModal if it exists
                    const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
                    if (confirmModal) confirmModal.hide();
                    
                    // Close the paypal modal
                    const modalElement = document.getElementById('paypalModal');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();

                    // Show success messages
                    toaster.success("Thanh toán thành công!");
                    setTimeout(() => {
                        toaster.success("Đặt lịch khám thành công!");
                    }, 300);
                    
                    this.toggleCalendar();
                    this.isProcessingPayment = false;
                })
                .catch((err) => {
                    console.error(err);
                    this.isProcessingPayment = false;

                    if (err.response && err.response.data && err.response.data.message) {
                        toaster.error(err.response.data.message);
                    } else {
                        toaster.error("Có lỗi xảy ra khi đặt lịch.");
                    }
                });
        },


        isPastTime(khungGio) {
            if (!this.selectedDate) return false;

            const [startStr] = khungGio.split(" - ");
            const now = new Date();
            const selectedDate = new Date(this.selectedDate);

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
            apiClient.get("/api/khach-hang/lay-du-lieu", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                const id_kh = res.data.data.id;
                localStorage.setItem("id_khach_hang", id_kh);

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
        },
    },
    watch: {
        id_pet(value) {
            const selectedPet = this.list_pet.find(pet => pet.id === value);
            if (!selectedPet) return;

            const canNang = selectedPet.can_nang;
            const { can_nang_min, can_nang_max } = this.list_dv;

            // Kiểm tra cân nặng nếu có giới hạn
            const needWeightCheck = can_nang_min != null && can_nang_max != null;

            if (needWeightCheck) {
                if (canNang < can_nang_min || canNang > can_nang_max) {
                    toaster.error(`Thú cưng này không phù hợp với dịch vụ (cân nặng yêu cầu: ${can_nang_min}kg - ${can_nang_max}kg).`);
                    this.id_pet = '';
                    return;
                }
            }

            // Luôn giữ giá gốc và tính tiền cọc
            this.list_dv.gia = this.giaGoc;
            this.tienCoc = Math.round(this.list_dv.gia * 0.25);
            if (this.list_dv.id_loaidv === 2) {
                let heSo = 1;
                if (canNang > 30) {
                    heSo = 1.6;
                } else if (canNang > 20) {
                    heSo = 1.4;
                } else if (canNang > 10) {
                    heSo = 1.2;
                }
                this.list_dv.gia = Math.round(this.giaGoc * heSo);
                this.tienCoc = Math.round(this.list_dv.gia * 0.25);
            } else {
                this.list_dv.gia = this.giaGoc;
                this.tienCoc = Math.round(this.list_dv.gia * 0.25);
            }
        },
        
        // Add watcher for selectedTime to ensure UI updates
        selectedTime() {
            this.$forceUpdate();
        }
    }
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';

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
</style>