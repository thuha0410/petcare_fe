<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;" >DANH SÁCH PET</h3>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Mã pet</th>
                            <th>Tên pet</th>
                            <th>Tên khách hàng</th>
                            <th>Chủng loại</th>
                            <th>Giới tính</th>
                            <th>Tuổi</th>
                            <th>Cân nặng</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle text-nowrap">
                            <th>1</th>
                            <td>P01</td>
                            <td>ádfghj</td>
                            <td>ádfghj</td>
                            <td>Mèo</td>
                            <td>Đực</td>
                            <td>15</td>
                            <td>20kg</td>
                            <td>
                                <button class="btn btn-success">Hoạt động</button>
                                <button class="btn btn-secondary">Nghỉ</button>
                            </td> 
                            <td>
                                <button data-bs-toggle="modal" data-bs-target="#capnhat" style="width:100px ;"
                                    class="btn btn-primary me-2">Cập nhật</button>
                                <button data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px ;"
                                    class="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">MÔ TẢ</h1>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thoát</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Mã pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên pet</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên khách hàng</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Chủng loại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Giới tính</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Đực</option>
                        <option value="1">Cái</option>
                    </select>
                    <label for="">Tuổi</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Cân nặng</label>
                    <input class="form-control mb-2" type="password">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Nghỉ</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xlg">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Mã bác sĩ</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Họ và tên</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Giới tính</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    <label for="">Hình ảnh</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Password</label>
                    <input class="form-control mb-2" type="password">
                    <label for="">Tiền khám</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Mô tả</label>
                    <textarea class="form-control mb-2" name="" id="" cols="10" rows="10"></textarea>
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Nghỉ</option>
                        <option value="1">Hoạt động</option>
                    </select>
                    <label for="">Mã chức vụ</label>
                    <input class="form-control mb-2" type="text">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>