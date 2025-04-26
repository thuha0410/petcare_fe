<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between text-nowrap ">
        <h3 class="" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif; color: darkblue;">HỒ SƠ BỆNH ÁN
        </h3>

        <button data-bs-toggle="modal" data-bs-target="#them" type="button"
          class="btn btn-outline-primary px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
      </div>
      <div class="card-body ">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
            aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
              class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
        </div>
        <div class="table table-responsive">
          <table class="table table-bordered table-striped table-hover">
            <thead>
              <tr class="text-center align-middle text-nowrap">
                <th>#</th>
                <th>ID Pet</th>
                <th>Tên Chủ Pet</th>
                <th>Số Điện Thoại</th>
                <th>Tên Bác Sĩ điều trị</th>
                <th>Ngày khám</th>
                <th>Chuẩn đoán</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center align-middle text-nowrap">
                <th>1</th>
                <td>Pet 01</td> <!--Khi mà thêm thì chỉ cần nhập số điện thoại khách hàng thì nó tự tạo id pet-->
                <td>Phạm Thị Thu Hà</td>
                <td>0902012312</td>
                <td>Huỳnh Văn Đức</td>
                <td>12/12/2022</td>
                <td>Viêm hô hấp</td>
                <td>
                  <button data-bs-toggle="modal" data-bs-target="#sua" class="btn btn-success me-2">Chuẩn đoán</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN HỒ SƠ BỆNH ÁN</h1>
        </div>
        <div class="modal-body">
          <label for="">Tên Chủ Pet</label>
          <input class="form-control mb-2" type="text">
          <label for="">Số Điện Thoại</label>
          <input class="form-control mb-2" type="text">
          <label for="">Tên Bác Sĩ điều trị</label>
          <input class="form-control mb-2" type="text">
          <!-- ko gần ghi mà khi nhấn vào là hắn tự gắn tên bác sĩ tạo, nếu mà nhập id pet thì lỡ trùng thì sao? -->
          <label for="">Ngày Khám</label>
          <input class="form-control mb-2" type="text">
          <label for="">Chuẩn đoán</label>
          <input class="form-control mb-2" type="text">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header bg-success ">
          <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CHUẨN ĐOÁN
          </h1>
        </div>
        <div class="modal-body">
          <label for="">Chuẩn đoán</label>
          <input class="form-control mb-2" type="text">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cập nhật</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>
<style></style>