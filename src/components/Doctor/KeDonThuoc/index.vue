<template>
    <div class="container py-4">
      <h2 class="mb-4">Kê Đơn Thuốc</h2>
  
      <!-- Danh sách hồ sơ bệnh án -->
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="hs in benhAns" :key="hs.id_hsba">
          <div class="card h-100 border" @click="chonBenhAn(hs)"
               :class="{ 'border-primary shadow': selectedHSBA?.id_hsba === hs.id_hsba }"
               style="cursor: pointer;">
            <div class="card-body">
              <h5 class="card-title">🐾 Pet: {{ hs.pet.ten_pet }}</h5>
              <p class="card-text"><strong>Chẩn đoán:</strong> {{ hs.chan_doan }}</p>
              <p class="card-text"><small>📅 Ngày khám: {{ hs.ngay_kham }}</small></p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Hiển thị form kê đơn khi đã chọn bệnh án -->
      <div v-if="selectedHSBA" class="mt-5 border-top pt-4">
        <h4 class="mb-3">Chi tiết hồ sơ & Kê thuốc</h4>
  
        <div class="mb-3">
          <p><strong>🐾 Pet:</strong> {{ selectedHSBA.pet.ten_pet }}</p>
          <p><strong>🩺 Chẩn đoán:</strong> {{ selectedHSBA.chan_doan }}</p>
          <p><strong>👨‍⚕️ Bác sĩ:</strong> {{ selectedHSBA.bac_si?.ten_nv || '---' }}</p>
        </div>
  
        <div v-for="(item, index) in donThuoc" :key="index" class="row align-items-end g-3 mb-3">
          <div class="col-md-4">
            <label class="form-label">Thuốc</label>
            <select class="form-select" v-model="item.id_thuoc">
              <option disabled value="">-- Chọn thuốc --</option>
              <option v-for="thuoc in thuocs" :key="thuoc.id_thuoc" :value="thuoc.id_thuoc">
                {{ thuoc.ten_thuoc }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Số lượng</label>
            <input type="number" class="form-control" v-model="item.so_luong" min="1" />
          </div>
          <div class="col-md-4">
            <label class="form-label">Liều lượng</label>
            <input type="text" class="form-control" v-model="item.lieu_luong" placeholder="VD: 2 viên/ngày" />
          </div>
          <div class="col-md-1">
            <button class="btn btn-outline-danger" @click="xoaThuoc(index)">X</button>
          </div>
        </div>
  
        <button class="btn btn-secondary btn-sm" @click="themThuoc">+ Thêm thuốc</button>
        <br />
        <button class="btn btn-primary mt-3" @click="keDon">Kê đơn</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "KeDonThuoc",
    data() {
      return {
        benhAns: [
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 1,
            chan_doan: "Viêm da dị ứng",
            ngay_kham: "2025-04-01",
            pet: { id_pet: 1, ten_pet: "Milu" },
            bac_si: { id_bs: 3, ten_nv: "Bác sĩ Thảo" }
          },
          {
            id_hsba: 2,
            chan_doan: "Rối loạn tiêu hóa",
            ngay_kham: "2025-04-06",
            pet: { id_pet: 2, ten_pet: "Lucy" },
            bac_si: { id_bs: 2, ten_nv: "Bác sĩ Ái Đoàn" }
          }
          
        ],
        thuocs: [
          { id_thuoc: 1, ten_thuoc: "Kháng sinh A" },
          { id_thuoc: 2, ten_thuoc: "Thuốc nhỏ mắt B" },
          { id_thuoc: 3, ten_thuoc: "Vitamin C" }
        ],
        selectedHSBA: null,
        donThuoc: [{ id_thuoc: "", so_luong: 1, lieu_luong: "" }]
      }
    },
    methods: {
      chonBenhAn(hs) {
        this.selectedHSBA = hs
        this.donThuoc = [{ id_thuoc: "", so_luong: 1, lieu_luong: "" }]
      },
      themThuoc() {
        this.donThuoc.push({ id_thuoc: "", so_luong: 1, lieu_luong: "" })
      },
      xoaThuoc(index) {
        this.donThuoc.splice(index, 1)
      },
      keDon() {
        const id = this.selectedHSBA.id_hsba
        console.log("Đơn thuốc đã tạo:", {
          id_hsba: id,
          id_pet: this.selectedHSBA.pet.id_pet,
          id_bs: this.selectedHSBA.bac_si?.id_bs,
          thuocs: this.donThuoc
        })
        alert("✅ Đơn thuốc đã được lưu (sau này gửi API)")
  
        // Xoá hồ sơ bệnh án sau khi kê đơn
        this.benhAns = this.benhAns.filter(hs => hs.id_hsba !== id)
        this.selectedHSBA = null
      }
    }
  }
  </script>
  
  <style scoped>
  .card:hover {
    transform: translateY(-2px);
    transition: 0.2s ease-in-out;
    background-color: #f8f9fa;
  }
  .card.border-primary {
    border-width: 2px;
  }
  </style>