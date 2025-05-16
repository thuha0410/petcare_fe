<template>
  <div class="card">
    <div class="card-header bg-white d-flex justify-content-between align-items-center">
      <h3 class="m-0" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif; color: darkblue;">
        HỒ SƠ BỆNH ÁN
      </h3>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalThemHoSo">
        <i class="fas fa-plus me-1"></i> Thêm mới hồ sơ bệnh án
      </button>
    </div>

    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-4">
          <div class="input-group">
            <select v-model="selectedBacSi" class="form-select" @change="locTheoBacSi">
              <option disabled value="">-- Chọn bác sĩ --</option>
              <option v-for="bacSi in danhSachBacSi" :key="bacSi.id" :value="bacSi.id">
                {{ bacSi.ten_nv }}
              </option>
            </select>
            <button @click="resetFilter" class="btn btn-outline-secondary" type="button">
              <i class="fas fa-times"></i> Xóa bộ lọc
            </button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm theo tên thú cưng"
              aria-label="Tìm kiếm" aria-describedby="button-addon2">
            <button v-on:click="timkiem" class="btn btn-outline-secondary text-dark" type="button" id="button-addon2">
              <i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i> Tìm
            </button>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr class="text-center align-middle text-nowrap">
              <th>#</th>
              <th>Tên thú cưng</th>
              <th>Tên chủ</th>
              <th>Số điện thoại</th>
              <th>Bác sĩ</th>
              <th>Ngày khám</th>
              <th>Chẩn đoán</th>
              <th>Tình trạng</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(value, index) in list_ho_so_benh_an" :key="index">
              <tr class="text-center align-middle text-nowrap">
                <th>{{ index + 1 }}</th>
                <td>{{ value.ten_thu_cung }}</td>
                <td>{{ value.ten_chu }}</td>
                <td>{{ value.sdt }}</td>
                <td>{{ value.ten_bac_si }}</td>
                <td>{{ formatDate(value.ngay_kham) }}</td>
                <td>{{ value.chuan_doan }}</td>
                <td>
                  <button v-if="value.tinh_trang == 1" class="btn btn-warning btn-sm" @click="toggleStatus(value)">
                    Đang điều trị
                  </button>
                  <button v-else class="btn btn-success btn-sm" disabled>
                    Đã khỏi
                  </button>
                </td>
                <td class="text-center">
                  <button v-if="value.tinh_trang == 1" @click="openUpdateModal(value)" data-bs-toggle="modal"
                    data-bs-target="#sua" class="btn btn-success me-2">
                    <i class="fas fa-edit"></i> Cập nhật
                  </button>
                  <button @click="openDetailModal(value)" data-bs-toggle="modal" data-bs-target="#chiTiet"
                    class="btn btn-info me-2">
                    <i class="fas fa-info-circle"></i> Chi tiết
                  </button>
                  <button @click="confirmDelete(value)" data-bs-toggle="modal" data-bs-target="#xoa"
                    class="btn btn-danger me-2">
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
  <!-- Modal Thêm mới Hồ sơ bệnh án -->
  <div class="modal fade" id="modalThemHoSo" tabindex="-1" aria-labelledby="modalThemHoSoLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="modalThemHoSoLabel">Thêm mới hồ sơ bệnh án</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Lựa chọn loại khách hàng -->
          <div class="mb-3">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="customerType" id="existingCustomer" value="existing"
                v-model="customerType">
              <label class="form-check-label" for="existingCustomer">Khách hàng đã có</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="customerType" id="newCustomer" value="new"
                v-model="customerType">
              <label class="form-check-label" for="newCustomer">Khách hàng mới</label>
            </div>
          </div>

          <!-- Bước 1: Khách hàng -->
          <h6 class="fw-bold">1. Thông tin khách hàng</h6>

          <!-- Nếu là khách hàng đã có -->
          <div v-if="customerType === 'existing'" class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">Chọn khách hàng</label>
              <select v-model="selectedCustomerId" @change="loadCustomerPets" class="form-select">
                <option value="">-- Chọn khách hàng --</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.ho_va_ten }} ({{ customer.so_dien_thoai }})
                </option>
              </select>
            </div>
          </div>

          <!-- Nếu là khách hàng mới -->
          <div v-if="customerType === 'new'" class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">Tên khách hàng</label>
              <input v-model="newRecord.ten_khach" type="text" class="form-control" />
            </div>
            <div class="col-md-6">
              <label class="form-label">Số điện thoại</label>
              <input v-model="newRecord.sdt" type="text" class="form-control" />
            </div>
          </div>

          <!-- Bước 2: Thú cưng -->
          <h6 class="fw-bold">2. Thông tin thú cưng</h6>

          <!-- Nếu là khách hàng đã có -->
          <div v-if="customerType === 'existing'" class="row mb-3">
            <div class="col-md-12">
              <label class="form-label">Chọn thú cưng</label>
              <select v-model="selectedPetId" @change="selectPet" class="form-select" :disabled="!selectedCustomerId">
                <option value="">-- Chọn thú cưng --</option>
                <option v-for="pet in customerPets" :key="pet.id" :value="pet.id">
                  {{ pet.ten_pet }} ({{ pet.chung_loai === 0 ? 'Chó' : 'Mèo' }})
                </option>
              </select>
            </div>
          </div>

          <!-- Nếu là khách hàng mới hoặc là thú cưng mới -->
          <div v-if="customerType === 'new'" class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">Tên thú cưng</label>
              <input v-model="newRecord.ten_thu_cung" type="text" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Giống loài</label>
              <select v-model="newRecord.chung_loai" class="form-select">
                <option value="0">Chó</option>
                <option value="1">Mèo</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Giới tính</label>
              <select v-model="newRecord.gioi_tinh_pet" class="form-select">
                <option :value="1">Đực</option>
                <option :value="0">Cái</option>
              </select>
            </div>
          </div>

          <!-- Bước 3: Hồ sơ bệnh án -->
          <h6 class="fw-bold">3. Thông tin bệnh án</h6>
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label">Ngày khám</label>
              <input v-model="newRecord.ngay_kham" type="date" class="form-control" />
            </div>
            <div class="col-md-4">
              <label class="form-label">Bác sĩ</label>
              <select v-model="newRecord.id_bac_si" class="form-select">
                <option disabled value="">-- Chọn bác sĩ--</option>
                <option v-for="bs in danhSachBacSi" :key="bs.id" :value="bs.id">
                  {{ bs.ten_nv }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Tình trạng</label>
              <select v-model="newRecord.tinh_trang" class="form-select">
                <option :value="1">Đang điều trị</option>
                <option :value="0">Đã khỏi</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Chẩn đoán</label>
            <textarea v-model="newRecord.chuan_doan" class="form-control" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitThemHoSo">Lưu</button>
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
  <!-- Modal xác nhận đổi trạng thái -->
  <div class="modal fade" id="modalXacNhanTrangThai" tabindex="-1" aria-labelledby="modalTrangThaiLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-warning text-dark">
          <h5 class="modal-title" id="modalTrangThaiLabel">Xác nhận đổi trạng thái</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body">
          <p style="font-size: 16px;">Bạn có chắc chắn muốn <strong>đổi trạng thái</strong> hồ sơ bệnh án này?</p>
          <p class="text-muted small mb-0" style="font-size: 14px;">Sau khi đổi, hệ thống sẽ tạo hóa đơn tương ứng nếu
            điều trị đã kết thúc.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-warning" @click="xacNhanDoiTrangThai">Đồng ý</button>
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
              <p><strong>Chủng loại:</strong> {{ detail_ho_so_benh_an.chung_loai === 0 ? 'Chó' : 'Mèo' }}</p>
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(thuoc, index) in danh_sach_thuoc" :key="index">
                      <td>{{ thuoc.ten_thuoc }}</td>
                      <td>{{ thuoc.so_luong }}</td>
                      <td>{{ thuoc.lieu_luong }}</td>
                    </tr>
                    <tr v-if="!danh_sach_thuoc.length">
                      <td colspan="3" class="text-center">Không có thông tin thuốc</td>
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
  data() {
    return {
      hoSoDangDoiTrangThai: null,
      newRecord: {
        ten_khach: '',
        sdt: '',
        ten_thu_cung: '',
        chung_loai: '0',
        gioi_tinh_pet: '1',
        ngay_kham: '',
        id_bac_si: '',
        tinh_trang: 1,
        chuan_doan: ''
      },
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
      selectedBacSi: '',
      danhSachBacSi: [],
      customerType: 'existing',
      selectedCustomerId: '',
      customerPets: [],
      selectedPetId: '',
      customers: [],
      selectedPetInfo: null
    }
  },
  methods: {
    submitThemHoSo() {
      // Validate form based on customer type
      if (this.customerType === 'existing') {
        if (!this.selectedCustomerId) {
          toaster.error('Vui lòng chọn khách hàng');
          return;
        }
        if (!this.selectedPetId) {
          toaster.error('Vui lòng chọn thú cưng');
          return;
        }
        if (!this.newRecord.id_bac_si) {
          toaster.error('Vui lòng chọn bác sĩ');
          return;
        }
        if (!this.newRecord.ngay_kham) {
          toaster.error('Vui lòng chọn ngày khám');
          return;
        }

        // Prepare data for existing customer
        const data = {
          id_kh: this.selectedCustomerId,
          id_pet: this.selectedPetId,
          id_bac_si: this.newRecord.id_bac_si,
          ngay_kham: this.newRecord.ngay_kham,
          tinh_trang: this.newRecord.tinh_trang,
          chuan_doan: this.newRecord.chuan_doan,
          is_existing_customer: true
        };

        axios.post('http://127.0.0.1:8000/api/ho-so-benh-an/them', data)
          .then((res) => {
            if (res.data.status) {
              toaster.success('Thêm hồ sơ bệnh án thành công');
              this.load();
              const modal = bootstrap.Modal.getInstance(document.getElementById('modalThemHoSo'));
              if (modal) modal.hide();
              this.resetNewRecordForm();
            } else {
              toaster.error(res.data.message || 'Thêm thất bại');
            }
          })
          .catch((err) => {
            toaster.error('Lỗi khi thêm hồ sơ: ' + err.message);
          });
      } else {
        // Validate form for new customer
        if (!this.newRecord.ten_khach) {
          toaster.error('Vui lòng nhập tên khách hàng');
          return;
        }
        if (!this.newRecord.sdt) {
          toaster.error('Vui lòng nhập số điện thoại');
          return;
        }
        if (!this.newRecord.ten_thu_cung) {
          toaster.error('Vui lòng nhập tên thú cưng');
          return;
        }
        if (!this.newRecord.id_bac_si) {
          toaster.error('Vui lòng chọn bác sĩ');
          return;
        }
        if (!this.newRecord.ngay_kham) {
          toaster.error('Vui lòng chọn ngày khám');
          return;
        }

        // Send data for new customer
        axios.post('http://127.0.0.1:8000/api/ho-so-benh-an/them', {
          ...this.newRecord,
          is_existing_customer: false
        })
          .then((res) => {
            if (res.data.status) {
              toaster.success('Thêm hồ sơ bệnh án thành công');
              this.load();
              const modal = bootstrap.Modal.getInstance(document.getElementById('modalThemHoSo'));
              if (modal) modal.hide();
              this.resetNewRecordForm();
            } else {
              toaster.error(res.data.message || 'Thêm thất bại');
            }
          })
          .catch((err) => {
            toaster.error('Lỗi khi thêm hồ sơ: ' + err.message);
          });
      }
    },
    resetNewRecordForm() {
      this.newRecord = {
        ten_khach: '',
        sdt: '',
        ten_thu_cung: '',
        chung_loai: '0',
        gioi_tinh_pet: '1',
        ngay_kham: '',
        id_bac_si: '',
        tinh_trang: 1,
        chuan_doan: ''
      };
      this.selectedCustomerId = '';
      this.selectedPetId = '';
      this.customerPets = [];
      this.selectedPetInfo = null;
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
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
      };
    },
    toggleStatus(record) {
      if (record.tinh_trang === 0) {
        toaster.warning('Hồ sơ đã hoàn tất điều trị và không thể thay đổi lại trạng thái.');
        return;
      }

      this.hoSoDangDoiTrangThai = record;
      const modal = new bootstrap.Modal(document.getElementById('modalXacNhanTrangThai'));
      modal.show();
    },
    xacNhanDoiTrangThai() {
      if (!this.hoSoDangDoiTrangThai) return;

      const newStatus = this.hoSoDangDoiTrangThai.tinh_trang === 1 ? 0 : 1;
      axios.post('http://127.0.0.1:8000/api/ho-so-benh-an/update', {
        id: this.hoSoDangDoiTrangThai.id,
        tinh_trang: newStatus
      })
        .then((res) => {
          if (res.data.status) {
            toaster.success('Đổi trạng thái thành công');
            this.load();
          } else {
            toaster.error(res.data.message || 'Cập nhật thất bại');
          }

          const modal = bootstrap.Modal.getInstance(document.getElementById('modalXacNhanTrangThai'));
          if (modal) modal.hide();

          this.hoSoDangDoiTrangThai = null;
        })
        .catch((err) => {
          toaster.error('Lỗi khi cập nhật trạng thái');
        });
    },

    openDetailModal(record) {
      this.detail_ho_so_benh_an = {}; // reset
      this.danh_sach_thuoc = [];
      axios
        .get(`http://127.0.0.1:8000/api/ho-so-benh-an/chi-tiet/${record.id}`)
        .then((res) => {
          if (res.data.status) {
            this.detail_ho_so_benh_an = res.data.ho_so;
            this.danh_sach_thuoc = res.data.thuoc;
          } else {
            toaster.error('Không thể lấy thông tin chi tiết');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi lấy thông tin chi tiết: ' + error.message);
        });
    },
    loadDanhSachBacSi() {
      axios
        .get('http://127.0.0.1:8000/api/nhan-vien/load-bac-si')
        .then((res) => {
          if (res.data.status) {
            this.danhSachBacSi = res.data.data;
          } else {
            toaster.error('Lỗi khi tải danh sách bác sĩ');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi tải danh sách bác sĩ: ' + error.message);
        });
    },
    locTheoBacSi() {
      if (!this.selectedBacSi) {
        this.load();
        return;
      }

      axios
        .get(`http://127.0.0.1:8000/api/ho-so-benh-an/loc-theo-bac-si/${this.selectedBacSi}`)
        .then((res) => {
          if (res.data.status) {
            this.list_ho_so_benh_an = res.data.data;
            toaster.success('Đã lọc theo bác sĩ');
          } else {
            toaster.error('Lỗi khi lọc theo bác sĩ');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi lọc theo bác sĩ: ' + error.message);
        });
    },
    resetFilter() {
      this.selectedBacSi = '';
      this.load();
      toaster.success('Đã xóa bộ lọc');
    },
    loadCustomerPets() {
      this.selectedPetId = '';
      this.customerPets = [];
      this.selectedPetInfo = null;

      if (!this.selectedCustomerId) return;

      axios
        .get(`http://127.0.0.1:8000/api/pet/load-by-customer/${this.selectedCustomerId}`)
        .then((res) => {
          if (res.data.status) {
            this.customerPets = res.data.data;
          } else {
            toaster.error('Lỗi khi tải danh sách thú cưng');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi tải danh sách thú cưng: ' + error.message);
        });
    },
    selectPet() {
      if (!this.selectedPetId) return;

      // Find the selected pet from customerPets
      const selectedPet = this.customerPets.find(pet => pet.id == this.selectedPetId);
      if (selectedPet) {
        this.selectedPetInfo = selectedPet;
      }
    },
    loadCustomers() {
      axios
        .get('http://127.0.0.1:8000/api/khach-hang/load',)
        .then((res) => {
          console.log('Khach hang response:', res.data);
          if (res.data.status) {
            this.customers = res.data.data;
          } else {
            toaster.error('Lỗi khi tải danh sách khách hàng');
          }
        })
        .catch((error) => {
          toaster.error('Lỗi khi tải danh sách khách hàng: ' + error.message);
        });
    },
  },
  mounted() {
    this.load();
    this.loadDanhSachBacSi();
    this.loadCustomers();

    // Set today's date as default for ngay_kham
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.newRecord.ngay_kham = `${year}-${month}-${day}`;
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.card-body {
  padding: 20px;
}

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.table th {
  background-color: #f8f9fa;
  white-space: nowrap;
}

.table td {
  white-space: nowrap;
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

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}
</style>