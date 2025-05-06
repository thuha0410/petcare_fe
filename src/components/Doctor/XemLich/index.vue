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
          <span class="badge bg-primary">{{ lich_hen_hom_nay.length }} lịch hẹn</span>
        </div>
        <div class="card-body">
          <div v-if="lich_hen_hom_nay.length === 0" class="text-center py-4">
            <i class="fa-regular fa-calendar-check fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Không có lịch hẹn nào hôm nay</h5>
          </div>
          <div v-else class="row">
            <div v-for="(item, index) in lich_hen_hom_nay" :key="index" class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100" :class="{
                'border-primary bg-primary bg-opacity-10': item.trang_thai === 1,
                'border-success bg-success bg-opacity-10': item.trang_thai === 2,
                'border-danger bg-danger bg-opacity-10': item.trang_thai === 0
              }">
                <div class="card-body">
                  <h5 class="card-title text-center mb-3">
                    <i class="fa-solid fa-clock me-2 text-primary"></i>
                    {{ item.khung_gio }}
                  </h5>
                  <div class="card-text">
                    <p><i class="fa-solid fa-paw me-2 text-info"></i><strong>Tên pet:</strong> {{ item.ten_thu_cung }}</p>
                    <p><i class="fa-solid fa-user me-2 text-warning"></i><strong>Khách hàng:</strong> {{ item.ten_khach_hang }}</p>
                    <p><i class="fa-solid fa-stethoscope me-2 text-success"></i><strong>Dịch vụ:</strong> {{ item.dich_vu }}</p>
                    <p><i class="fa-solid fa-tag me-2 text-primary"></i><strong>Trạng thái:</strong>
                      <span v-if="item.trang_thai === 2" class="badge bg-success">Đã xác nhận</span>
                      <span v-else-if="item.trang_thai === 1" class="badge bg-warning text-dark">Chưa xác nhận</span>
                      <span v-else class="badge bg-danger">Đã huỷ</span>
                    </p>
                  </div>
                  <div class="text-center mt-3">
                    <button class="btn btn-primary" @click="viewAppointmentDetail(item)">
                      <i class="fa-solid fa-eye me-1"></i> Xem chi tiết
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
                <input
                  type="text"
                  class="form-control"
                  v-model="search_term"
                  placeholder="Tên khách hàng, thú cưng hoặc SĐT..."
                />
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
                  <option value="2">Đã xác nhận</option>
                  <option value="1">Chưa xác nhận</option>
                  <option value="0">Đã hủy</option>
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
                <input
                  type="date"
                  class="form-control"
                  v-model="date_filter"
                />
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
                  <th scope="col">Thao tác</th>
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
                    <span v-if="item.trang_thai === 2" class="badge bg-success">Đã xác nhận</span>
                    <span v-else-if="item.trang_thai === 1" class="badge bg-warning text-dark">Chưa xác nhận</span>
                    <span v-else class="badge bg-danger">Đã huỷ</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-primary me-1" @click="viewAppointmentDetail(item)">
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <button v-if="item.trang_thai === 1" class="btn btn-sm btn-success me-1" @click="updateAppointmentStatus(item.id, 2)">
                      <i class="fa-solid fa-check"></i>
                    </button>
                    <button v-if="item.trang_thai === 1" class="btn btn-sm btn-danger" @click="updateAppointmentStatus(item.id, 0)">
                      <i class="fa-solid fa-times"></i>
                    </button>
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

      <!-- Modal chi tiết lịch hẹn -->
      <div class="modal fade" id="xemchitiet" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-3 shadow">
            <div class="modal-header" :class="{
              'bg-warning text-dark': chi_tiet_lich_hen.trang_thai === 1,
              'bg-success text-white': chi_tiet_lich_hen.trang_thai === 2,
              'bg-danger text-white': chi_tiet_lich_hen.trang_thai === 0
            }">
              <h5 class="modal-title">
                <i class="fa-solid fa-calendar-check me-2"></i>
                CHI TIẾT LỊCH HẸN
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 p-3 rounded" :class="{
                'bg-warning bg-opacity-10': chi_tiet_lich_hen.trang_thai === 1,
                'bg-success bg-opacity-10': chi_tiet_lich_hen.trang_thai === 2,
                'bg-danger bg-opacity-10': chi_tiet_lich_hen.trang_thai === 0
              }">
                <h5 class="text-center">
                  <span v-if="chi_tiet_lich_hen.trang_thai === 2" class="badge bg-success">Đã xác nhận</span>
                  <span v-else-if="chi_tiet_lich_hen.trang_thai === 1" class="badge bg-warning text-dark">Chưa xác nhận</span>
                  <span v-else class="badge bg-danger">Đã huỷ</span>
                </h5>
              </div>

              <p><i class="fa-solid fa-paw me-2 text-info"></i> <strong>Tên pet:</strong> {{ chi_tiet_lich_hen.ten_thu_cung }}</p>
              <p><i class="fa-solid fa-user me-2 text-warning"></i> <strong>Khách hàng:</strong> {{ chi_tiet_lich_hen.ten_khach_hang }}</p>
              <p><i class="fa-solid fa-calendar-days me-2 text-success"></i> <strong>Ngày:</strong> {{ formatDate(chi_tiet_lich_hen.ngay) }}</p>
              <p><i class="fa-solid fa-clock me-2 text-primary"></i> <strong>Khung giờ:</strong> {{ chi_tiet_lich_hen.khung_gio }}</p>
              <p><i class="fa-solid fa-stethoscope me-2 text-danger"></i> <strong>Dịch vụ:</strong> {{ chi_tiet_lich_hen.dich_vu }}</p>
              <p><i class="fa-solid fa-phone me-2 text-secondary"></i> <strong>Số điện thoại:</strong> {{ chi_tiet_lich_hen.so_dien_thoai }}</p>

              <div v-if="chi_tiet_lich_hen.ghi_chu" class="mt-3 p-3 bg-light rounded">
                <h6><i class="fa-solid fa-comment-dots me-2 text-primary"></i> <strong>Ghi chú:</strong></h6>
                <p class="mb-0">{{ chi_tiet_lich_hen.ghi_chu }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button v-if="chi_tiet_lich_hen.trang_thai === 1" class="btn btn-success" @click="updateAppointmentStatus(chi_tiet_lich_hen.id, 2)">
                <i class="fa-solid fa-check me-1"></i> Xác nhận
              </button>
              <button v-if="chi_tiet_lich_hen.trang_thai === 1" class="btn btn-danger" @click="updateAppointmentStatus(chi_tiet_lich_hen.id, 0)">
                <i class="fa-solid fa-times me-1"></i> Hủy lịch
              </button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                <i class="fa-solid fa-xmark me-1"></i> Đóng
              </button>
            </div>
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
      lich_hen_hom_nay: [],
      chi_tiet_lich_hen: {},
      doctor_info: {},
      loading: false,
      search_term: '',
      status_filter: '',
      date_filter: '',
      current_date: new Date().toISOString().split('T')[0],
    }
  },

  mounted() {
    
  },

  methods: {
    
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

.form-control, .form-select {
  border: 1px solid #ced4da;
  padding: 8px 12px;
}

.form-control:focus, .form-select:focus {
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

  .table th, .table td {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>