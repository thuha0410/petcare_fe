<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">LỊCH HẸN
          HÔM NAY <span>(02/05/2025)</span>
        </h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4">
            <div class="card " style="background-color: #5277b7;">
              <div class="card-body">
                <h3 class="text-center text-white"> <i class="fa-solid fa-calendar-days" style="color: #63E6BE;"></i> 9h
                  - 11h</h3>
                <div class="">
                  <p class="text-white"><span class="font-semibold"><i class="fa-solid fa-paw"></i>Tên pet:</span> Milo
                  </p>
                  <p class="text-white"><span class="font-semibold"><i class="fa-solid fa-user"
                        style="color: #FFD43B;"></i> Khách hàng:</span> Nguyễn Văn A</p>
                  <p class="text-white"><span class="font-semibold"><i class="fa-solid fa-syringe"
                        style="color: #74C0FC;"></i> Dịch vụ:</span> Khám sức khỏe</p>
                  <p class="text-white"><span class="font-semibold">🔄 Trạng thái:</span>
                    <span class="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-1">Chưa
                      khám</span>
                  </p>
                  <br />
                  <div class="text-center">
                    <button class="btn btn-white " data-bs-toggle="modal" data-bs-target="#xemchitiet">Xem chi
                      tiết</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal xem chi tiet -->
    <div class="modal fade" id="xemchitiet" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-header">
            <h5 class="modal-title">CHI TIẾT LỊCH HẸN</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div class="modal-body">
            <p><i class="fa-solid fa-paw"></i> <strong>Tên pet:</strong> Milo</p>
            <p><i class="fa-solid fa-user" style="color: #FFD43B;"></i> <strong>Khách hàng:</strong> Nguyễn Văn A</p>
            <p><i class="fa-solid fa-calendar-days" style="color: #63E6BE;"></i> <strong>Ngày:</strong> 02/05/2025</p>
            <p>⏰ <strong>Khung giờ:</strong> 9h - 11h</p>
            <p><i class="fa-solid fa-syringe" style="color: #74C0FC;"></i> <strong>Dịch vụ:</strong> Khám sức khỏe</p>
            <p>🔄 <strong>Trạng thái:</strong> <span class="text-danger">Đã hủy</span></p>
            <p>📞 <strong>Số điện thoại:</strong> 0987654321</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  <br>
  <div class="card">
    <div class="card-header">
      <h3 class="text-black" style="font-size: 25px; font-weight: bold; font-family: 'Tahoma', sans-serif;">
        TẤT CẢ LỊCH HẸN
      </h3>
    </div>

    <div class="card-body"> <!-- 👈 THÊM VÀO -->
      <div class="row g-3 align-items-end mb-3">
        <!-- Tìm kiếm -->
        <div class="col-lg-3 col-md-6">
          <label class="form-label">Tìm kiếm</label>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Nhập nội dung tìm kiếm..." />
            <button class="btn btn-outline-secondary">
              <i class="fa-solid fa-magnifying-glass"></i> Tìm
            </button>
          </div>
        </div>

        <!-- Lọc trạng thái -->
        <div class="col-lg-3 col-md-6">
          <label class="form-label">Lọc trạng thái</label>
          <div class="input-group">
            <select class="form-select">
              <option value="">-- Tất cả trạng thái --</option>
              <option value="2">Đã xác nhận</option>
              <option value="1">Chưa xác nhận</option>
              <option value="0">Đã hủy</option>
            </select>
            <button class="btn btn-dark">Lọc</button>
          </div>
        </div>

        <!-- Lọc ngày -->
        <div class="col-lg-2 col-md-6">
          <label class="form-label">Lọc ngày</label>
          <div class="input-group">
            <input type="date" class="form-control" />
            <button class="btn btn-dark">Lọc</button>
          </div>
        </div>
      </div>

      <!-- 👇 BẢNG -->
      <div class="table-responsive">
        <table class="table table-bordered table-hover text-center w-100 align-middle">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Ngày</th>
              <th>Khung giờ</th>
              <th>Dịch vụ</th>
              <th>Tên khách hàng</th>
              <th>Tên thú cưng</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list_lich_hen" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.ngay }}</td>
              <td>{{ item.khung_gio }}</td>
              <td>{{ item.dich_vu }}</td>
              <td>{{ item.ten_khach_hang }}</td>
              <td>{{ item.ten_thu_cung }}</td>
              <td>{{ item.so_dien_thoai }}</td>
              <td>
                <span v-if="item.trang_thai === 2" class="badge bg-success">Đã xác nhận</span>
                <span v-else-if="item.trang_thai === 1" class="badge bg-warning text-dark">Chưa xác nhận</span>
                <span v-else class="badge bg-danger">Đã huỷ</span>
              </td>
            </tr>
            <tr v-if="list_lich_hen.length === 0">
              <td colspan="8" class="text-muted">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> <!-- 👈 KẾT THÚC card-body -->
  </div>

</template>
<script>
export default {
  data() {
    return {
      list_lich_hen: [],
      chi_tiet_lich_hen: {},
    }
  },
}
</script>
<style></style>