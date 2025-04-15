<template>
    <div class="container py-4">
      <h2 class="mb-4">Hồ Sơ Bệnh Án</h2>
  
      <!-- Bộ lọc bác sĩ -->
      <div class="row mb-4 align-items-end">
        <div class="col-md-6">
          <label class="form-label">Bác sĩ</label>
          <select class="form-select" v-model="filterBacSi">
            <option value="">Tất cả</option>
            <option v-for="bs in bacSis" :key="bs.id_bs" :value="bs.id_bs">{{ bs.ten_nv }}</option>
          </select>
        </div>
        <div class="col-md-6 text-end">
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#them">
            + Thêm hồ sơ
          </button>
        </div>
      </div>
  
      <!-- Danh sách hồ sơ bệnh án -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="hs in filteredBenhAns" :key="hs.id_hsba">
          <div class="card h-100 shadow-sm border rounded-4">
            <div class="card-body">
              <h5 class="card-title">🐾 Pet: {{ hs.pet.ten_pet }}</h5>
              <p class="card-text"><strong>Bác sĩ:</strong> {{ hs.bac_si.ten_nv }}</p>
              <p class="card-text"><strong>Ngày khám:</strong> {{ hs.ngay_kham }}</p>
              <p class="card-text"><strong>Chẩn đoán:</strong> {{ hs.chan_doan }}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-end">
              <button class="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#sua" >Sửa</button>
              <button class="btn btn-danger btn-sm" @click="xoaBenhAn(hs.id_hsba)">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     <!-- Modal -->
  <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"><h4>THÊM HỒ SƠ BỆNH ÁN</h4></h1>
        </div>
        <div class="modal-body">
            <div class="mb-3">
              <label>Chọn Pet</label>
              <select v-model="form.id_pet" class="form-select">
                <option disabled value="">-- Chọn pet --</option>
                <option v-for="pet in pets" :key="pet.id_pet" :value="pet.id_pet">{{ pet.ten_pet }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Bác sĩ phụ trách</label>
              <select v-model="form.id_bs" class="form-select">
                <option disabled value="">-- Chọn bác sĩ --</option>
                <option v-for="bs in bacSis" :key="bs.id_bs" :value="bs.id_bs">{{ bs.ten_nv }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Ngày khám</label>
              <input type="date" v-model="form.ngay_kham" class="form-control">
            </div>
            <div class="mb-3">
              <label>Chẩn đoán</label>
              <input type="text" v-model="form.chan_doan" class="form-control" placeholder="VD: Viêm tai, tiêu chảy...">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="luuBenhAn" >Thêm</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"><h4>SỬA HỒ SƠ</h4></h1>
        </div>
        <div class="modal-body">
            <div class="mb-3">
              <label>Chọn Pet</label>
              <select v-model="form.id_pet" class="form-select">
                <option disabled value="">-- Chọn pet --</option>
                <option v-for="pet in pets" :key="pet.id_pet" :value="pet.id_pet">{{ pet.ten_pet }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Bác sĩ phụ trách</label>
              <select v-model="form.id_bs" class="form-select">
                <option disabled value="">-- Chọn bác sĩ --</option>
                <option v-for="bs in bacSis" :key="bs.id_bs" :value="bs.id_bs">{{ bs.ten_nv }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Ngày khám</label>
              <input type="date" v-model="form.ngay_kham" class="form-control">
            </div>
            <div class="mb-3">
              <label>Chẩn đoán</label>
              <input type="text" v-model="form.chan_doan" class="form-control" placeholder="VD: Viêm tai, tiêu chảy...">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="editBenhAn(hs)" >Cập Nhật</button>
          <button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        benhAns: [],
        pets: [],
        bacSis: [],
        filterBacSi: "",
        showModal: false,
        isEditing: false,
        form: {
          id_hsba: null,
          id_pet: "",
          id_bs: "",
          ngay_kham: "",
          chan_doan: ""
        }
      };
    },
    computed: {
      filteredBenhAns() {
        return this.filterBacSi
          ? this.benhAns.filter(hs => hs.bac_si.id_bs === this.filterBacSi)
          : this.benhAns;
      }
    },
    methods: {
      loadData() {
        this.bacSis = [
          { id_bs: 1, ten_nv: "BS Nguyễn Văn A" },
          { id_bs: 2, ten_nv: "BS Trần Ái Đoàn" }
        ];
        this.pets = [
          { id_pet: 301, ten_pet: "Milu" },
          { id_pet: 302, ten_pet: "Lucy" }
        ];
        this.benhAns = [
          {
            id_hsba: 1,
            pet: this.pets[0],
            bac_si: this.bacSis[0],
            ngay_kham: "2025-04-01",
            chan_doan: "Viêm đường ruột"
          }
        ];
      },
      editBenhAn(hs) {
        this.form = {
          ...hs,
          id_pet: hs.pet.id_pet,
          id_bs: hs.bac_si.id_bs
        };
        this.isEditing = true;
        this.showModal = true;
      },
      xoaBenhAn(id) {
        this.benhAns = this.benhAns.filter(h => h.id_hsba !== id);
      },
      luuBenhAn() {
        const pet = this.pets.find(p => p.id_pet === this.form.id_pet);
        const bs = this.bacSis.find(b => b.id_bs === this.form.id_bs);
        if (this.isEditing) {
          const index = this.benhAns.findIndex(h => h.id_hsba === this.form.id_hsba);
          this.benhAns[index] = {
            ...this.form,
            pet,
            bac_si: bs
          };
        } else {
          const newId = this.benhAns.length + 1;
          this.benhAns.push({
            ...this.form,
            id_hsba: newId,
            pet,
            bac_si: bs
          });
        }
        this.closeModal();
      },
      resetForm() {
        this.form = {
          id_hsba: null,
          id_pet: "",
          id_bs: "",
          ngay_kham: "",
          chan_doan: ""
        };
      }
    },
    mounted() {
      this.loadData();
    }
  };
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  