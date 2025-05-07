<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between text-nowrap ">
        <h3 class="" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif; color: darkblue;">HỒ SƠ
          BỆNH ÁN
        </h3>

        <button data-bs-toggle="modal" data-bs-target="#them" type="button"
          class="btn btn-outline-primary px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
      </div>
      <div class="card-body ">
        <div class="input-group mb-3">
          <input v-model="tim_kiem.noi_dung" @input="timkiem" type="text" class="form-control" placeholder="Tìm kiếm theo tên thú cưng hoặc chẩn đoán"
            aria-label="Tìm kiếm" aria-describedby="button-addon2">
          <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
              class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
        </div>
        <div class="table table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr class="text-center align-middle text-nowrap">
                <th>#</th>
                <th>Tên Thú Cưng</th>
                <th>Chủ Thú Cưng</th>
                <th>Số Điện Thoại</th>
                <th>Ngày khám</th>
                <th>Chẩn đoán</th>
                <th>Tình trạng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(value,index) in list_ho_so_benh_an" :key="index">
                <tr class="text-center align-middle text-nowrap">
                  <th>{{ index+1 }}</th>
                  <td>{{ value.ten_thu_cung }}</td>
                  <td>{{ value.ten_chu }}</td>
                  <td>{{ value.sdt }}</td>
                  <td>{{ formatDate(value.ngay_kham) }}</td>
                  <td>{{ value.chuan_doan }}</td>
                  <td>
                    <span @click="toggleStatus(value)" :class="['badge', value.tinh_trang ? 'bg-warning' : 'bg-success', 'cursor-pointer', 'status-badge']">
                      {{ value.tinh_trang ? 'Đang điều trị' : 'Đã khỏi' }}
                    </span>
                  </td>
                  <td>
                    <button @click="openUpdateModal(value)" data-bs-toggle="modal" data-bs-target="#sua" class="btn btn-success me-2">
                      <i class="fas fa-edit"></i> Cập nhật
                    </button>
                    <button @click="openDetailModal(value)" data-bs-toggle="modal" data-bs-target="#chiTiet" class="btn btn-info me-2">
                      <i class="fas fa-info-circle"></i> Chi tiết
                    </button>
                    <button @click="confirmDelete(value)" data-bs-toggle="modal" data-bs-target="#xoa" class="btn btn-danger me-2">
                      <i class="fas fa-trash"></i> Xóa
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Thêm mới -->
  <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">NHẬP THÔNG TIN HỒ SƠ BỆNH ÁN</h1>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Số điện thoại chủ thú cưng</label>
            <input v-model="ho_so_benh_an.sdt" class="form-control" type="text" placeholder="Nhập số điện thoại">
          </div>
          <div class="mb-3">
            <label class="form-label">Chẩn đoán</label>
            <textarea v-model="ho_so_benh_an.chuan_doan" class="form-control" rows="3" placeholder="Nhập chẩn đoán bệnh"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Tình trạng</label>
            <select v-model="ho_so_benh_an.tinh_trang" class="form-select">
              <option value="1">Đang điều trị</option>
              <option value="0">Đã khỏi</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="them" data-bs-dismiss="modal">Thêm</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cập nhật -->
  <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">CẬP NHẬT HỒ SƠ BỆNH ÁN</h1>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Chẩn đoán</label>
            <textarea v-model="update_ho_so_benh_an.chuan_doan" class="form-control" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">Tình trạng</label>
            <select v-model="update_ho_so_benh_an.tinh_trang" class="form-select">
              <option value="1">Đang điều trị</option>
              <option value="0">Đã khỏi</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="update" data-bs-dismiss="modal">Cập nhật</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Xóa -->
  <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">XÁC NHẬN XÓA</h1>
        </div>
        <div class="modal-body">
          <p>Bạn có chắc chắn muốn xóa hồ sơ bệnh án này?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="xoa" data-bs-dismiss="modal">Xóa</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Chi tiết -->
  <div class="modal fade" id="chiTiet" tabindex="-1" aria-labelledby="chiTietModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-info">
          <h1 class="modal-title fs-5 text-white" id="chiTietModalLabel">CHI TIẾT HỒ SƠ BỆNH ÁN</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-4">
            <div class="col-md-6">
              <h5 class="border-bottom pb-2">Thông tin thú cưng</h5>
              <p><strong>Tên thú cưng:</strong> {{ detail_ho_so_benh_an.ten_thu_cung }}</p>
              <p><strong>Tuổi:</strong> {{ detail_ho_so_benh_an.tuoi }} tuổi</p>
              <p><strong>Cân nặng:</strong> {{ detail_ho_so_benh_an.can_nang }} kg</p>
              <p><strong>Chủng loại:</strong> {{ detail_ho_so_benh_an.chung_loai }}</p>
              <p><strong>Giới tính:</strong> {{ detail_ho_so_benh_an.gioi_tinh_pet ? 'Đực' : 'Cái' }}</p>
            </div>
            <div class="col-md-6">
              <h5 class="border-bottom pb-2">Thông tin khám bệnh</h5>
              <p><strong>Ngày khám:</strong> {{ formatDate(detail_ho_so_benh_an.ngay_kham) }}</p>
              <p><strong>Bác sĩ khám:</strong> {{ detail_ho_so_benh_an.ten_bac_si }}</p>
              <p><strong>Chẩn đoán:</strong> {{ detail_ho_so_benh_an.chuan_doan }}</p>
              <p><strong>Tình trạng:</strong> 
                <span :class="['badge', detail_ho_so_benh_an.tinh_trang ? 'bg-warning' : 'bg-success']">
                  {{ detail_ho_so_benh_an.tinh_trang ? 'Đang điều trị' : 'Đã khỏi' }}
                </span>
              </p>
            </div>
          </div>
          
          <div class="row">
            <div class="col-12">
              <h5 class="border-bottom pb-2">Thông tin thuốc</h5>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Tên thuốc</th>
                      <th>Số lượng</th>
                      <th>Liều lượng</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(thuoc, index) in danh_sach_thuoc" :key="index">
                      <td>{{ thuoc.ten_thuoc }}</td>
                      <td>{{ thuoc.so_luong }}</td>
                      <td>{{ thuoc.lieu_luong }}</td>
                      <td>{{ thuoc.ghi_chu }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });
export default {
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    load() {
      axios
        .get('http://127.0.0.1:8000/api/ho-so-benh-an/load')
        .then((res) => {
          if (res.data.status) {
            this.list_ho_so_benh_an = res.data.data;
          } else {
            toaster.error('Lỗi khi tải dữ liệu');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi tải dữ liệu: ' + error.message);
        })
    },
    them() {
      if (!this.ho_so_benh_an.sdt || !this.ho_so_benh_an.chuan_doan) {
        toaster.error('Vui lòng điền đầy đủ thông tin');
        return;
      }

      axios
        .post('http://127.0.0.1:8000/api/ho-so-benh-an/them', this.ho_so_benh_an)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message)
            this.load()
            this.resetForm()
          } else {
            toaster.error(res.data.message || 'Thêm mới thất bại')
          }
        })
        .catch((error) => {
          toaster.error(error.response?.data?.message || 'Lỗi khi thêm mới');
        })
    },
    openUpdateModal(record) {
      this.update_ho_so_benh_an = { ...record };
    },
    update() {
      if (!this.update_ho_so_benh_an.chuan_doan) {
        toaster.error('Vui lòng nhập chẩn đoán');
        return;
      }

      axios
        .post('http://127.0.0.1:8000/api/ho-so-benh-an/update', this.update_ho_so_benh_an)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message)
            this.load()
          } else {
            toaster.error(res.data.message || 'Cập nhật không thành công')
          }
        })
        .catch((error) => {
          toaster.error(error.response?.data?.message || 'Lỗi khi cập nhật');
        })
    },
    confirmDelete(record) {
      this.del_ho_so_benh_an = { ...record };
    },
    xoa() {
      axios
        .post('http://127.0.0.1:8000/api/ho-so-benh-an/xoa', this.del_ho_so_benh_an)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message)
            this.load()
          } else {
            toaster.error(res.data.message || 'Xóa thất bại')
          }
        })
        .catch((error) => {
          toaster.error(error.response?.data?.message || 'Lỗi khi xóa');
        })
    },
    timkiem() {
      if (!this.tim_kiem.noi_dung) {
        this.load();
        return;
      }

      axios
        .post('http://127.0.0.1:8000/api/ho-so-benh-an/tim-kiem', this.tim_kiem)
        .then((res) => {
          if (res.data.status) {
            this.list_ho_so_benh_an = res.data.data;
          } else {
            toaster.error('Không tìm thấy kết quả');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi tìm kiếm: ' + error.message);
        })
    },
    resetForm() {
      this.ho_so_benh_an = {
        sdt: '',
        chuan_doan: '',
        tinh_trang: '1'
      };
    },
    toggleStatus(record) {
      const newStatus = !record.tinh_trang;
      const data = {
        id: record.id,
        tinh_trang: newStatus
      };

      axios
        .post('http://127.0.0.1:8000/api/ho-so-benh-an/update', data)
        .then((res) => {
          if (res.data.status) {
            toaster.success('Cập nhật tình trạng thành công');
            this.load();
          } else {
            toaster.error(res.data.message || 'Cập nhật không thành công');
          }
        })
        .catch((error) => {
          toaster.error(error.response?.data?.message || 'Lỗi khi cập nhật');
        });
    },
    openDetailModal(record) {
      this.detail_ho_so_benh_an = { ...record };
      // Gọi API lấy danh sách thuốc
      axios
        .get(`http://127.0.0.1:8000/api/ho-so-benh-an/chi-tiet/${record.id}`)
        .then((res) => {
          if (res.data.status) {
            this.detail_ho_so_benh_an = res.data.data;
          
          } else {
            toaster.error('Không thể lấy thông tin chi tiết');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi lấy thông tin chi tiết: ' + error.message);
        });
    }
  },
  mounted() {
    this.load()
  },
  data() {
    return {
      ho_so_benh_an: {
        sdt: '',
        chuan_doan: '',
        tinh_trang: '1'
      },
      list_ho_so_benh_an: [],
      del_ho_so_benh_an: {},
      update_ho_so_benh_an: {},
      tim_kiem: {
        noi_dung: ''
      },
      detail_ho_so_benh_an: {},
      danh_sach_thuoc: [],
    }
  },
};
</script>

<style scoped>
.status-badge {
    padding: 8px 16px;
    font-size: 0.9em;
    font-weight: 500;
    border-radius: 4px;
    min-width: 120px;
    display: inline-block;
    text-align: center;
    transition: all 0.3s ease;
}

.status-badge:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bg-warning {
    background-color: #ffc107 !important;
    color: #000;
}

.bg-success {
    background-color: #28a745 !important;
    color: #fff;
}

.cursor-pointer {
    cursor: pointer;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.btn i {
  margin-right: 5px;
}

.modal-lg {
    max-width: 800px;
}

.border-bottom {
    border-bottom: 2px solid #dee2e6;
    margin-bottom: 1rem;
}

.table th {
    background-color: #f8f9fa;
}
</style>