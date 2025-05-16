<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 class="text-black fw-bold mb-0">DANH SÁCH PHIẾU NHẬP THUỐC</h4>
      <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalTaoPhieu">
        <i class="fa fa-plus"></i> Tạo phiếu mới
      </button>
    </div>

    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="text-center table-light">
            <tr>
              <th>STT</th>
              <th>Kho</th>
              <th>Nhà cung cấp</th>
              <th>Ngày nhập</th>
              <th>Số dòng thuốc</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in listPhieu" :key="index" class="text-center align-middle">
              <td>{{ index + 1 }}</td>
              <td>{{ value.kho?.ten_kho || "[N/A]" }}</td>
              <td>{{ value.ncc?.ten_ncc || "[N/A]" }}</td>
              <td>{{ value.ngay_nhap }}</td>
              <td>{{ value.chi_tiet?.length || 0 }}</td>
              <td><button class="btn btn-info btn-sm">Chi tiết</button></td>
            </tr>
            <tr v-if="listPhieu.length === 0">
              <td colspan="6" class="text-center fst-italic text-muted">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal tạo phiếu -->
    <div class="modal fade" id="modalTaoPhieu" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Tạo phiếu nhập thuốc</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">Kho nhập</label>
                <select v-model="phieuNhap.id_kho" class="form-select" :class="{
                  'is-invalid': highlightWarning && !phieuNhap.id_kho,
                }">
                  <option disabled value="">-- Chọn kho --</option>
                  <option v-for="k in listKho" :key="k.id" :value="k.id">
                    {{ k.ten_kho }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Nhà cung cấp</label>
                <select v-model="phieuNhap.id_ncc" class="form-select" :class="{
                  'is-invalid': highlightWarning && !phieuNhap.id_ncc,
                }">
                  <option disabled value="">-- Chọn nhà cung cấp --</option>
                  <option v-for="n in listNCC" :key="n.id" :value="n.id">
                    {{ n.ten_ncc }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Ngày nhập</label>
                <input type="date" v-model="phieuNhap.ngay_nhap" class="form-control" />
              </div>
            </div>

            <h6 class="fw-bold">Danh sách thuốc</h6>
            <table class="table table-bordered">
              <thead class="text-center table-light">
                <tr>
                  <th>Thuốc</th>
                  <th>Số lượng</th>
                  <th>Giá nhập</th>
                  <th>Hạn sử dụng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in chiTiet" :key="index" class="text-center align-middle">
                  <td>
                    <select v-model="item.id_thuoc" class="form-select">
                      <option disabled value="">-- Chọn thuốc --</option>
                      <option v-for="thuoc in listThuoc" :key="thuoc.id" :value="thuoc.id"
                        :disabled="isThuocDaChon(thuoc.id, index)">
                        {{ thuoc.ten_thuoc }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <input type="number" v-model.number="item.so_luong" min="1" class="form-control"
                      @input="triggerUpdate" />
                  </td>
                  <td>
                    <input type="number" v-model.number="item.gia_nhap" min="1" class="form-control"
                      @input="triggerUpdate" />
                  </td>
                  <td>
                    <input type="date" v-model="item.han_su_dung" class="form-control" />
                  </td>
                  <td>
                    {{
                      (
                        Number(item.so_luong) * Number(item.gia_nhap)
                      ).toLocaleString()
                    }}
                  </td>
                  <td>
                    <button class="btn btn-danger btn-sm" @click="xoaDong(index)">
                      Xoá
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-end fw-bold">Tổng tiền:</td>
                  <td colspan="2" class="fw-bold text-danger">
                    {{ tinhTongTien().toLocaleString() }} VND
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex justify-content-between">
              <button class="btn btn-secondary" v-on:click="themDong()">
                + Thêm dòng thuốc
              </button>
              <button class="btn btn-success" @click="luuPhieuNhap">
                Lưu phiếu nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      listPhieu: [],
      listKho: [],
      listNCC: [],
      listThuoc: [],
      phieuNhap: {
        id_kho: "",
        id_ncc: "",
        ngay_nhap: new Date().toISOString().slice(0, 10),
      },
      chiTiet: [{ id_thuoc: "", so_luong: 1, gia_nhap: 0, han_su_dung: "" }],
      highlightWarning: false,
    };
  },
  mounted() {
    this.loaddataKhoNCCThuoc();
    this.loadPhieuNhap();
  },
  methods: {
    loaddataKhoNCCThuoc() {
      axios
        .get("http://127.0.0.1:8000/api/phieu-nhap/load-kho-ncc-thuoc",
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token_admin')
            }
          }
        )
        .then((res) => {
          this.listKho = res.data.kho;
          this.listNCC = res.data.ncc;
          this.listThuoc = res.data.thuoc;
        });
    },
    loadPhieuNhap() {
      axios.get("http://127.0.0.1:8000/api/phieu-nhap",
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
          }
        }
      ).then((res) => {
        this.listPhieu = res.data.data;
      });
    },
    themDong() {
      const newItem = {
        id_thuoc: "",
        so_luong: 1,
        gia_nhap: 0,
        han_su_dung: "",
      };
      this.chiTiet = [...this.chiTiet, newItem]; // Cách Vue thích hơn push
      console.log(this.chiTiet);
    },
    xoaDong(index) {
      this.chiTiet.splice(index, 1);
      toaster.success("Đã xóa thuốc khỏi phiếu!");
    },
    tinhTongTien() {
      return this.chiTiet.reduce((tong, item) => {
        const sl = Number(item.so_luong || 0);
        const gia = Number(item.gia_nhap || 0);
        return tong + sl * gia;
      }, 0);
    },
    isThuocDaChon(id, currentIndex) {
      return this.chiTiet.some(
        (item, idx) => idx !== currentIndex && item.id_thuoc === id
      );
    },
    luuPhieuNhap() {
      if (!this.phieuNhap.id_kho || !this.phieuNhap.id_ncc) {
        this.highlightWarning = true;
        toaster.warning("Vui lòng chọn đầy đủ kho và nhà cung cấp.");
        return;
      }

      if (this.chiTiet.length === 0) {
        toaster.error("Vui lòng thêm ít nhất một dòng thuốc!");
        return;
      }

      const ids = this.chiTiet.map((i) => i.id_thuoc);
      const hasDuplicate = ids.length !== new Set(ids).size;
      if (hasDuplicate) {
        toaster.error("Không được chọn trùng thuốc trong phiếu!");
        return;
      }

      for (let i = 0; i < this.chiTiet.length; i++) {
        const item = this.chiTiet[i];
        if (
          !item.id_thuoc ||
          !item.so_luong ||
          !item.gia_nhap ||
          !item.han_su_dung
        ) {
          toaster.error(`Dòng ${i + 1}: thiếu thông tin!`);
          return;
        }

        if (item.so_luong <= 0 || item.gia_nhap <= 0) {
          toaster.error(`Dòng ${i + 1}: Số lượng và giá phải > 0`);
          return;
        }

        const hsd = new Date(item.han_su_dung);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (hsd <= today) {
          toaster.error(`Dòng ${i + 1}: Hạn sử dụng phải sau hôm nay`);
          return;
        }
      }

      const data = {
        ...this.phieuNhap,
        chi_tiet: this.chiTiet,
      };

      axios
        .post("http://127.0.0.1:8000/api/phieu-nhap/tao", data,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token_admin')
            }
          }
        )
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            document.getElementById("modalTaoPhieu").click();
            this.loadPhieuNhap();
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((err) => {
          toaster.error("Lỗi: " + err.message);
        });
    },
  },
};
</script>

<style scoped></style>