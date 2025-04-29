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
                <select v-model="don_thuoc.id_khach_hang" class="form-control">
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

            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Thuốc</th>
                    <th>Số lượng</th>
                    <th>Cách dùng</th>
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
                      <input type="text" v-model="item.cach_dung" class="form-control" placeholder="Cách dùng">
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
  </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      don_thuoc: {
        id_khach_hang: '',
        id_nhan_vien: '',
      },
      chi_tiet: [],
      thuocs: [],
      khach_hang: [],
      nhan_vien: []
    };
  },
  created() {
    this.loadThuoc();
    this.loadKhachHang();
    this.loadNhanVien();
  },
  methods: {
    async loadThuoc() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/don-thuoc/load-thuoc');
        this.thuocs = response.data.thuoc;
      } catch (error) {
        console.error('Error loading thuoc:', error);
        toaster.error('Lỗi khi tải danh sách thuốc');
      }
    },
    async loadKhachHang() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/khach-hang/load');
        this.khach_hang = response.data.data;
      } catch (error) {
        console.error('Error loading khach hang:', error);
        toaster.error('Lỗi khi tải danh sách khách hàng');
      }
    },
    async loadNhanVien() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/nhan-vien/load-bac-si');
        console.log('Response from loadBacSi:', response.data);
        if (response.data.status) {
          this.nhan_vien = response.data.data;
        } else {
          toaster.error(response.data.message || 'Lỗi khi tải danh sách bác sĩ');
        }
      } catch (error) {
        console.error('Error loading nhan vien:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
          
          if (error.response.status === 401) {
            toaster.error('Bạn cần đăng nhập để truy cập chức năng này');
          } else if (error.response.status === 403) {
            toaster.error('Bạn không có quyền truy cập chức năng này');
          } else {
            toaster.error(error.response.data?.message || 'Lỗi khi tải danh sách bác sĩ');
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          toaster.error('Không thể kết nối đến máy chủ');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          toaster.error('Lỗi khi tải danh sách bác sĩ: ' + error.message);
        }
      }
    },
    themChiTiet() {
      this.chi_tiet.push({
        id_thuoc: '',
        so_luong: 1,
        cach_dung: ''
      });
    },
    xoaChiTiet(index) {
      this.chi_tiet.splice(index, 1);
    },
    async luuDonThuoc() {
      try {
        if (!this.don_thuoc.id_khach_hang || !this.don_thuoc.id_nhan_vien) {
          toaster.error('Vui lòng chọn khách hàng và bác sĩ');
          return;
        }

        if (this.chi_tiet.length === 0) {
          toaster.error('Vui lòng thêm ít nhất một loại thuốc');
          return;
        }

        const response = await axios.post('http://127.0.0.1:8000/api/don-thuoc/them', {
          ...this.don_thuoc,
          chi_tiet: this.chi_tiet
        });

        if (response.data.status === 1) {
          toaster.success(response.data.message);
          this.resetForm();
        } else {
          toaster.error(response.data.message);
        }
      } catch (error) {
        console.error('Error saving don thuoc:', error);
        toaster.error('Lỗi khi lưu đơn thuốc');
      }
    },
    resetForm() {
      this.don_thuoc = {
        id_khach_hang: '',
        id_nhan_vien: '',
      };
      this.chi_tiet = [];
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
</style>