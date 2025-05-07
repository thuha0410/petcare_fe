<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Kê đơn thuốc</h3>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <label>Khách hàng</label>
                <select v-model="don_thuoc.id_hsba" class="form-control">
                  <option v-for="kh in khach_hang" :key="kh.id" :value="kh.id">
                    {{ kh.ho_va_ten }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Bác sĩ</label>
                <select v-model="don_thuoc.id_nhan_vien" class="form-control">
                  <option v-for="nv in nhan_vien" :key="nv.id" :value="nv.id">
                    {{ nv.ten_nv }} - {{ nv.chuc_vu?.ten_chuc_vu }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label>Pet của khách hàng</label>
                <select v-model="don_thuoc.id_pet" class="form-control" :disabled="filteredPets.length === 0">
                  <option v-for="pet in filteredPets" :key="pet.id" :value="pet.id">
                    {{ pet.ten_pet }}
                  </option>
                </select>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Thuốc</th>
                    <th>Số lượng</th>
                    <th>Liều lượng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in chi_tiet" :key="index">
                    <td>
                      <select v-model="item.id_thuoc" class="form-control">
                        <option v-for="thuoc in thuocs" :key="thuoc.id" :value="thuoc.id">
                          {{ thuoc.ten_thuoc }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <input type="number" v-model="item.so_luong" class="form-control" min="1">
                    </td>
                    <td>
                      <input type="text" v-model="item.lieu_luong" class="form-control" placeholder="Liều lượng">
                    </td>
                    <td>
                      <button class="btn btn-danger" @click="xoaChiTiet(index)">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button class="btn btn-primary mt-3" @click="themChiTiet">
              <i class="fa-solid fa-plus"></i> Thêm thuốc
            </button>

            <div class="text-right mt-3">
              <button class="btn btn-success" @click="luuDonThuoc">
                <i class="fa-solid fa-save"></i> Lưu đơn thuốc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table to display saved prescriptions -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Danh sách đơn thuốc</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="thead-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Bác sĩ</th>
                    <th>Tên pet</th>
                    <th>Ngày kê</th>
                    <th>Tình trạng</th>
                    <th class="text-center" style="width: 200px">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="don in danh_sach_don" :key="don.id">
                    <td>{{ don.id }}</td>
                    <td>{{ don.ten_khach_hang }}</td>
                    <td>{{ don.ten_bac_si }}</td>
                    <td>{{ don.ten_pet }}</td>
                    <td>{{ formatDate(don.created_at) }}</td>
                    <td>{{ don.tinh_trang || 'Chưa cập nhật' }}</td>
                    <td class="text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <button class="btn btn-info btn-sm" @click="xemChiTiet(don)">
                          <i class="fa-solid fa-eye"></i> Xem chi tiết
                        </button>
                        <button class="btn btn-danger btn-sm" @click="xoaDonThuoc(don.id)">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal hiển thị chi tiết đơn thuốc -->
    <div class="modal" :class="{ 'show': showModal }" tabindex="-1" role="dialog" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fa-solid fa-prescription-bottle-medical me-2"></i>
              Chi tiết đơn thuốc
            </h5>
          </div>
          <div class="modal-body">
            <div v-if="chiTietDonThuoc && chiTietDonThuoc.length > 0">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 60px">STT</th>
                      <th class="text-center" style="width: 100px">Mã thuốc</th>
                      <th>Tên thuốc</th>
                      <th class="text-center" style="width: 100px">Số lượng</th>
                      <th>Liều lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in chiTietDonThuoc" :key="item.id_ctthuoc">
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-center">{{ item.id_thuoc }}</td>
                      <td>{{ item.ten_thuoc }}</td>
                      <td class="text-center">{{ item.so_luong }}</td>
                      <td>{{ item.lieu_luong }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else class="text-center py-4">
              <i class="fa-solid fa-circle-exclamation text-warning mb-2" style="font-size: 2rem"></i>
              <p class="mb-0">Không có thông tin chi tiết đơn thuốc</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              <i class="fa-solid fa-xmark me-1"></i>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop -->
    <div class="modal-backdrop" v-if="showModal" @click="closeModal"></div>
  </div>
</template>

<script>
import api from '@/services/api';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      don_thuoc: {
        id_hsba: '',
      },
      chi_tiet: [],
      thuocs: [],
      khach_hang: [],
      nhan_vien: [],
      danh_sach_don: [],
      pets: [],
      filteredPets: [],
      chiTietDonThuoc: [],
      showModal: false,
      currentDonThuocId: null
    };
  },
  created() {
    this.loadThuoc();
    this.loadKhachHang();
    this.loadNhanVien();
    this.loadDanhSachDon();
    this.loadPets();
  },
  methods: {
    async loadThuoc() {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/don-thuoc/load-thuoc');
        this.thuocs = response.data.thuoc;
      } catch (error) {
        toaster.error('Lỗi khi tải danh sách thuốc');
      }
    },
    async loadKhachHang() {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/khach-hang/load');
        this.khach_hang = response.data.data;
      } catch (error) {
        toaster.error('Lỗi khi tải danh sách khách hàng');
      }
    },
    async loadNhanVien() {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/nhan-vien/load-bac-si');
        if (response.data.status) {
          this.nhan_vien = response.data.data;
        } else {
          toaster.error(response.data.message || 'Lỗi khi tải danh sách bác sĩ');
        }
      } catch (error) {
        toaster.error('Lỗi khi tải danh sách bác sĩ');
      }
    },
    async loadDanhSachDon() {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/don-thuoc/danh-sach');
        if (response.data.status) {
          this.danh_sach_don = response.data.data;
        } else {
          toaster.error(response.data.message || 'Lỗi khi tải danh sách đơn thuốc');
        }
      } catch (error) {
        toaster.error('Lỗi khi tải danh sách đơn thuốc');
      }
    },
    async loadPets() {
      try {
        const response = await api.get('http://127.0.0.1:8000/api/pet/load');
        this.pets = response.data.data;
      } catch (error) {
        toaster.error('Lỗi khi tải danh sách pet');
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    async xemChiTiet(don) {
      try {
        this.currentDonThuocId = don.id;
        const response = await api.get(`http://127.0.0.1:8000/api/don-thuoc/chi-tiet/${don.id}`);
        if (response.data.status) {
          this.chiTietDonThuoc = response.data.data;
          this.showModal = true;
          document.body.classList.add('modal-open');
        } else {
          toaster.error(response.data.message || 'Lỗi khi tải chi tiết đơn thuốc');
        }
      } catch (error) {
        console.error('Lỗi khi tải chi tiết đơn thuốc:', error);
        toaster.error('Lỗi khi tải chi tiết đơn thuốc. Vui lòng thử lại sau.');
      }
    },
    async xoaDonThuoc(id) {
      if (!confirm('Bạn có chắc chắn muốn xóa đơn thuốc này?')) {
        return;
      }
      try {
        const response = await api.post('http://127.0.0.1:8000/api/don-thuoc/xoa', {
          id: id
        });
        if (response.data.status) {
          toaster.success('Xóa đơn thuốc thành công');
          // Cập nhật lại danh sách
          this.danh_sach_don = this.danh_sach_don.filter(don => don.id !== id);
          // Nếu đang xem chi tiết đơn thuốc bị xóa thì đóng modal
          if (this.currentDonThuocId === id) {
            this.closeModal();
          }
        } else {
          toaster.error(response.data.message || 'Lỗi khi xóa đơn thuốc');
        }
      } catch (error) {
        console.error('Lỗi khi xóa đơn thuốc:', error);
        toaster.error('Lỗi khi xóa đơn thuốc. Vui lòng thử lại sau.');
      }
    },
    closeModal() {
      this.showModal = false;
      this.chiTietDonThuoc = [];
      this.currentDonThuocId = null;
      document.body.classList.remove('modal-open');
    },
    themChiTiet() {
      this.chi_tiet.push({
        id_thuoc: '',
        so_luong: 1,
        lieu_luong: ''
      });
    },
    xoaChiTiet(index) {
      this.chi_tiet.splice(index, 1);
    },
    async luuDonThuoc() {
      try {
        if (!this.don_thuoc.id_hsba) {
          toaster.error('Vui lòng chọn hồ sơ bệnh án');
          return;
        }
        if (this.chi_tiet.length === 0) {
          toaster.error('Vui lòng thêm ít nhất một loại thuốc');
          return;
        }

        const response = await api.post('http://127.0.0.1:8000/api/don-thuoc/them', {
          ...this.don_thuoc,
          chi_tiet: this.chi_tiet
        });
        if (response.data.status === 1) {
          toaster.success(response.data.message);
          if (response.data.data) {
            this.danh_sach_don.unshift(response.data.data);
          } else {
            this.loadDanhSachDon();
          }
          this.resetForm();
        } else {
          toaster.error(response.data.message);
        }
      } catch (error) {
        toaster.error('Lỗi khi lưu đơn thuốc');
      }
    },
    resetForm() {
      this.don_thuoc = {
        id_hsba: '',
      };
      this.chi_tiet = [];
    }
  },
  watch: {
    'don_thuoc.id_hsba'(newVal) {
      this.filteredPets = this.pets.filter(pet => String(pet.id_kh) === String(newVal));
      this.don_thuoc.id_pet = '';
    }
  },
  mounted() {
    $('#chiTietModal').on('hidden.bs.modal', () => {
      this.chiTietDonThuoc = [];
    });
  }
};
</script>

<style scoped>
.card {
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.card-title {
  margin: 0;
  color: #333;
}

.table th {
  background-color: #f8f9fa;
}

.btn {
  margin-right: 5px;
}

.form-control {
  border-radius: 4px;
}

select.form-control {
  cursor: pointer;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal-content {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  border-radius: 8px 8px 0 0;
  padding: 1rem;
}

.modal-title {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-radius: 0 0 8px 8px;
  padding: 1rem;
}

.table {
  margin-bottom: 0;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #dee2e6;
}

.table td {
  vertical-align: middle;
  color: #2c3e50;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.btn {
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 4px;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.close {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.5;
  background: none;
  border: none;
  padding: 0;
  margin: -1rem -1rem -1rem auto;
}

.close:hover {
  opacity: 0.75;
}

.modal-open {
  overflow: hidden;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.gap-2 {
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  min-width: 90px;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: #fff;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
  color: #fff;
}
</style>