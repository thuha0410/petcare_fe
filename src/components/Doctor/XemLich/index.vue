<template>
  <div>
    <!-- Hiển thị loading -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
      <p class="mt-2">Đang tải dữ liệu...</p>
    </div>

    <div v-else>
      <!-- Lịch hẹn hôm nay -->
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3 class="text-black mb-0" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">
            LỊCH HẸN HÔM NAY <span class="text-primary">({{ formatDate(current_date) }})</span>
          </h3>
          <span class="badge bg-primary" style="font-size: 16px;">{{ lich_hen_hom_nay.length }} lịch hẹn</span>
        </div>
        <div class="card-body">
          <div v-if="lich_hen_hom_nay.length === 0" class="text-center py-4">
            <i class="fa-regular fa-calendar-check fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Không có lịch hẹn nào hôm nay</h5>
          </div>
          <div v-else class="row">
            <div v-for="(item, index) in lich_hen_hom_nay" :key="index" class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border border-dark " :class="{
                'border-primary ': item.trang_thai === 1,
                'border-danger ': item.trang_thai === 0
              }">
                <div class="card-body">
                  <h5 class="card-title text-center mb-3">
                    <i class="fa-solid fa-clock me-2 text-primary"></i>
                    {{ item.khung_gio }}
                  </h5>
                  <p v-if="kiemTraTreGio(item)"  class="alert alert-warning alert-shake d-flex align-items-center mt-2">
                    <i class="fa-solid fa-2x fa-triangle-exclamation" style="color: #FFD43B;"></i>  Khách đến trễ {{
                    tinhSoPhutTre(item) }} phút
                  </p>
                  
                  <div class="card-text">
                    <p><i class="fa-solid fa-paw me-2 text-info"></i><strong>Tên pet:</strong> {{ item.ten_thu_cung }}
                    </p>

                    <p><i class="fa-solid fa-user me-2 text-warning"></i><strong>Khách hàng:</strong> {{
                      item.ten_khach_hang }}</p>
                    <p><i class="fa-solid fa-stethoscope me-2 text-success"></i><strong>Dịch vụ:</strong> {{
                      item.dich_vu }}</p>
                    <p><i class="fa-solid fa-tag me-2 text-primary"></i><strong class="me-2">Trạng thái:</strong>
                      <span v-if="item.trang_thai == 0" class="text-danger" style="font-size: 16px;">Chưa khám</span>
                      <span v-else class="text-success" style="font-size: 16px;">Đã khám</span>
                    </p>

                  </div>
                  <div class=" text-end">
                    <button class="btn btn-danger" v-on:click="khamNgay(item)">
                      <i class="fa-solid fa-stethoscope me-1"></i> Khám ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tất cả lịch hẹn -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-black mb-0" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
            TẤT CẢ LỊCH HẸN
          </h3>
        </div>

        <div class="card-body">
          <!-- Bộ lọc và tìm kiếm -->
          <div class="row g-3 align-items-end mb-4">
            <!-- Tìm kiếm -->
            <div class="col-lg-4 col-md-6">
              <label class="form-label">Tìm kiếm</label>
              <div class="input-group">
                <span class="input-group-text bg-primary text-white">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" class="form-control" v-model="search_term"
                  placeholder="Tên khách hàng, thú cưng hoặc SĐT..." />
                <button class="btn btn-primary" @click="searchAppointments">
                  Tìm kiếm
                </button>
              </div>
            </div>

            <!-- Lọc trạng thái -->
            <div class="col-lg-4 col-md-6">
              <label class="form-label">Lọc trạng thái</label>
              <div class="input-group">
                <span class="input-group-text bg-info text-white">
                  <i class="fa-solid fa-filter"></i>
                </span>
                <select class="form-select" v-model="status_filter">
                  <option value="">-- Tất cả trạng thái --</option>
                  <option value="0">Chưa khám</option>
                  <option value="1">Đã khám</option>
                </select>
                <button class="btn btn-info text-white" @click="filterAppointments">
                  Lọc
                </button>
              </div>
            </div>

            <!-- Lọc ngày -->
            <div class="col-lg-3 col-md-6">
              <label class="form-label">Lọc ngày</label>
              <div class="input-group">
                <span class="input-group-text bg-success text-white">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <input type="date" class="form-control" v-model="date_filter" />
                <button class="btn btn-success" @click="filterAppointments">
                  Lọc
                </button>
              </div>
            </div>

            <!-- Làm mới -->
            <div class="col-lg-1 col-md-6">
              <label class="form-label d-md-block d-none">&nbsp;</label>
              <button class="btn btn-secondary w-100" @click="resetFilters">
                <i class="fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
          </div>

          <!-- Bảng lịch hẹn -->
          <div class="table-responsive">
            <table class="table table-bordered table-hover text-center align-middle">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ngày</th>
                  <th scope="col">Khung giờ</th>
                  <th scope="col">Dịch vụ</th>
                  <th scope="col">Khách hàng</th>
                  <th scope="col">Thú cưng</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list_lich_hen" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatDate(item.ngay) }}</td>
                  <td>{{ item.khung_gio }}</td>
                  <td>{{ item.dich_vu }}</td>
                  <td>{{ item.ten_khach_hang }}</td>
                  <td>{{ item.ten_thu_cung }}</td>
                  <td>{{ item.so_dien_thoai }}</td>
                  <td>
                    <p v-if="item.trang_thai == 0" style="font-size: 16px;" class="text-danger fw-bold">Chờ duyệt</p>
                    <p v-else style="font-size: 16px;" class=" text-success fw-bold">Đã duyệt</p>
                  </td>

                </tr>
                <tr v-if="list_lich_hen.length === 0">
                  <td colspan="9" class="text-center py-4">
                    <i class="fa-solid fa-calendar-xmark fa-2x text-muted mb-2"></i>
                    <p class="text-muted">Không có dữ liệu lịch hẹn</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
import axios from '../../../services/api';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      list_lich_hen: [],
      all_lich_hen: [],
      lich_hen_hom_nay: [],
      chi_tiet_lich_hen: {},
      doctor_info: {},
      loading: false,
      search_term: '',
      status_filter: '',
      date_filter: '',
      current_date: new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Ho_Chi_Minh'
      }),

    }
  },

  mounted() {
    this.getLichHen();

  },


  methods: {
    kiemTraTreGio(item) {
      const gioHen = item.khung_gio.split(' - ')[0];
      const [gio, phut] = gioHen.split(':');
      const thoiGianHen = new Date(`${item.ngay}T${gio.padStart(2, '0')}:${phut.padStart(2, '0')}:00`);
      const bayGio = new Date();

      return bayGio - thoiGianHen > 15 * 60000; // trễ > 15 phút
    },

    tinhSoPhutTre(item) {
      const gioHen = item.khung_gio.split(' - ')[0];
      const [gio, phut] = gioHen.split(':');
      const thoiGianHen = new Date(`${item.ngay}T${gio.padStart(2, '0')}:${phut.padStart(2, '0')}:00`);
      const bayGio = new Date();

      const tre = Math.floor((bayGio - thoiGianHen) / 60000);
      return tre > 0 ? tre : 0;
    },

    khamNgay(item) {
      axios.post('http://127.0.0.1:8000/api/ho-so-benh-an/tao-tu-lich', {
        id_lich: item.id,
        id_nv: item.id_nv, // hoặc lấy từ token nếu cần
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_admin')
        }
      })
        .then((res) => {
          if (res.data.status) {
            toaster.success('Đã tạo hồ sơ bệnh án');
            // Chuyển sang trang cập nhật chẩn đoán
            this.$router.push({
              path: '/doctor/xem-ho-so-benh-an',
              query: { highlight: res.data.id_hsba }
            });

          } else {
            toaster.error(res.data.message || 'Không thể tạo hồ sơ');
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response && error.response.data && error.response.data.message) {
            toaster.error(error.response.data.message);
          } else {
            toaster.error('Lỗi hệ thống khi tạo hồ sơ bệnh án');
          }
        });
    },

    getLichHen() {
      this.loading = true;
      axios.get('http://127.0.0.1:8000/api/doctor/lich-hen', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_admin')
        }
      })
        .then(res => {
          if (res.data && res.data.data) {
            this.list_lich_hen = res.data.data;
            this.all_lich_hen = res.data.data;
            // cho hiển thị lịch hẹn từ ngày hiện tại tới sau này
            this.list_lich_hen = this.all_lich_hen.filter(item => item.ngay >= this.current_date);
            // cho hiển thị lịch hẹn hôm nay
            this.lich_hen_hom_nay = this.list_lich_hen.filter(item => item.ngay === this.current_date.split(',')[0]);
          }
          this.loading = false;
        })
        .catch(error => {
          toaster.error("Không thể tải danh sách lịch hẹn");
          this.loading = false;
        });
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const parts = dateString.split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    },

    viewAppointmentDetail(appointment) {
      this.chi_tiet_lich_hen = appointment;
      const modal = new bootstrap.Modal(document.getElementById('xemchitiet'));
      modal.show();
    },


    searchAppointments() {
      if (!this.search_term.trim()) {
        this.getLichHen();
        return;
      }
      const searchTerm = this.search_term.toLowerCase();
      this.list_lich_hen = this.list_lich_hen.filter(item =>
        (item.ten_khach_hang && item.ten_khach_hang.toLowerCase().includes(searchTerm)) ||
        (item.ten_thu_cung && item.ten_thu_cung.toLowerCase().includes(searchTerm)) ||
        (item.so_dien_thoai && item.so_dien_thoai.includes(searchTerm))
      );
    },

    filterAppointments() {
      let filtered = this.all_lich_hen.filter(item => item.ngay >= this.current_date);

      if (this.status_filter) {
        filtered = filtered.filter(item =>
          item.trang_thai.toString() === this.status_filter
        );
      }

      if (this.date_filter) {
        filtered = filtered.filter(item =>
          item.ngay === this.date_filter
        );
      }

      this.list_lich_hen = filtered;
    }
  }
}
</script>
<style scoped>
/* Kiểu dáng chung */
.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding: 15px 20px;
}

.card-body {
  padding: 20px;
}

/* Kiểu dáng cho các thẻ lịch hẹn */
.card h-100 {
  height: 100%;
  transition: transform 0.2s;
}

.card h-100:hover {
  transform: translateY(-5px);
}

/* Kiểu dáng cho các nút */
.btn {
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.2s;
}

.card-glow {
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.card-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 10px;
  padding: 2px;
  background: linear-gradient(135deg, #2c4b85, #5f94e8);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.btn-primary {
  background-color: #2c4b85;
  border-color: #2c4b85;
}

.btn-primary:hover {
  background-color: #1e3a6a;
  border-color: #1e3a6a;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

/* Kiểu dáng cho bảng */
.table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  padding: 12px;
}

.table td {
  padding: 12px;
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: rgba(44, 75, 133, 0.05);
}

/* Kiểu dáng cho badge */
.badge {
  padding: 6px 10px;
  font-weight: 500;
  border-radius: 4px;
}

/* Kiểu dáng cho input group */
.input-group {
  border-radius: 5px;
  overflow: hidden;
}

.input-group-text {
  border: none;
}

.form-control,
.form-select {
  border: 1px solid #ced4da;
  padding: 8px 12px;
}

.form-control:focus,
.form-select:focus {
  border-color: #2c4b85;
  box-shadow: 0 0 0 0.25rem rgba(44, 75, 133, 0.25);
}

/* Kiểu dáng cho modal */
.modal-content {
  border: none;
  border-radius: 10px;
}

.modal-header {
  padding: 15px 20px;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #dee2e6;
}

/* Hiệu ứng loading */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .card-header h3 {
    font-size: 20px !important;
  }

  .table th,
  .table td {
    padding: 8px;
    font-size: 0.9rem;
  }
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}
.alert-shake {
  animation: shake 0.3s ease-in-out;
}
</style>