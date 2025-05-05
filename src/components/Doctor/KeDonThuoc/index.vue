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
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Bác sĩ</th>
                    <th>Tên pet</th>
                    <th>Ngày kê</th>
                    <th>Tình trạng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="don in danh_sach_don" :key="don.id">
                    <td>{{ don.id }}</td>
                    <td>{{ don.ten_khach_hang || don.khach_hang?.ho_va_ten }}</td>
                    <td>{{ don.ten_bac_si || don.nhan_vien?.ten_nv }}</td>
                    <td>{{ don.ten_pet }}</td>
                    <td>{{ formatDate(don.created_at) }}</td>
                    <td>{{ don.tinh_trang || 'Chưa cập nhật' }}</td>
                    <td>
                      <button class="btn btn-info btn-sm" @click="xemChiTiet(don)">
                        <i class="fa-solid fa-eye"></i> Xem chi tiết
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      filteredPets: []
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
    xemChiTiet(don) {
      // Có thể mở modal hoặc hiển thị chi tiết đơn thuốc ở đây nếu muốn
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
</style>