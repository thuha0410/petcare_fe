<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between text-nowrap ">
        <h3 class="" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif; color: darkblue;">KÊ
          ĐƠN THUỐC
        </h3>
      </div>
      <div class="card-body ">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
            aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
              class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
        </div>
        <div class="table table-responsive ">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr class="text-center align-middle text-nowrap">
                <th>#</th>
                <th>ID Hồ Sơ Bệnh Án</th>
                <th>Tên Bác Sĩ điều trị</th>
                <th>Ngày khám</th>
                <th>Chuẩn đoán</th>
                <th>Thuốc kê đơn</th>
                <th>Số lượng</th>
                <th>Liều lượng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center align-middle text-nowrap">
                <th>1</th>
                <td>Hồ Sơ 01</td>
                <td>Huỳnh Văn Đức</td>
                <td>12/12/2022</td>
                <td>Viêm hô hấp</td>
                <td>Thuốc sổ</td>
                <td>10</td>
                <td>3 lần/ngày</td>
                <td>
                  <button data-bs-toggle="modal" data-bs-target="#kethuoc" class="btn btn-success me-2">Kê
                    thuốc</button>
                  <button data-bs-toggle="modal" data-bs-target="#indon" class="btn btn-primary">In đơn</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="kethuoc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">KÊ ĐƠN THUỐC
          </h1>
        </div>
        <div class="modal-body" style="max-height: 500px; overflow-y: auto;">
          <div v-for="(thuoc, index) in danhSachThuoc" :key="index" class="thuoc-item mb-3">
            <label>Thuốc</label>
            <select v-model="thuocNhap.id_thuoc" class="form-select">
              <option disabled value="">-- Chọn thuốc --</option>
              <option v-for="thuoc in listThuoc" :key="thuoc.id" :value="thuoc.id">
                {{ thuoc.ten_thuoc }}
              </option>
            </select>
            <label>Số lượng</label>
            <input class="form-control mb-2" type="number" v-model="thuoc.soluong" placeholder="Số lượng">
            <label>Liều lượng</label>
            <input class="form-control" type="text" v-model="thuoc.lieuluong" placeholder="Liều lượng">
            <button class="btn btn-sm btn-danger mt-2" @click="xoaThuoc(index)"
              v-if="danhSachThuoc.length > 1">Xoá</button>
          </div>
          <button class="btn btn-outline-success btn-sm mt-2" @click="themThuoc">+ Thêm thuốc</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Kê đơn</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="indon" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!
          </h1>
        </div>
        <div class="modal-body">
          <span style="font-size: 18px; color: #000000;">Bạn có muốn in đơn thuốc này không ?</span>
        </div>
        <div class="modal-footer">
          <a
    :href="$router.resolve('/doctor/in-don-thuoc').href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
      In
    </button>
  </a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "KeDonThuocModal",
  data() {
    return {
      danhSachThuoc: [
        { ten: "", soluong: "", lieuluong: "" }
      ],
      listThuoc: [],
      tim_kiem: {
        noi_dung: ''
      },
      thuocNhap: {

      }
    };

  },
  mounted() {
    this.loaddataThuoc();
  },
  methods: {
    themThuoc() {
      this.danhSachThuoc.push({ ten: "", soluong: "", lieuluong: "" });
    },
    xoaThuoc(index) {
      this.danhSachThuoc.splice(index, 1);
    },
    loaddataThuoc() {
      axios
        .get('http://127.0.0.1:8000/api/don-thuoc/load-thuoc')
        .then(res => {
          this.listThuoc = res.data.thuoc;
        });
    },
  }
};
</script>
<style></style>