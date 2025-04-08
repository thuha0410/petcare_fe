<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                NHÀ CUNG CẤP</h3>
            
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i> Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Mã nhà cung cấp</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle text-nowrap">
                            <th>1</th>
                            <td>NCC 01</td>
                            <td>Lương Văn Ái</td>
                            <td>tthello123@gmail.com</td>
                            <td>0934760123</td>
                            <td>Đà Nẵng</td>
                            <td>
                                <button class="btn btn-success">Hoạt động</button>
                                <button class="btn btn-warning">Ngưng hoạt động</button>
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
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Mã nhà cung cấp</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên nhà cung cấp</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Số điện thoại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Địa chỉ</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Ngưng hoạt động</option>
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
                    <label for="">Mã nhà cung cấp</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tên nhà cung cấp</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Số điện thoại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Địa chỉ</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Ngưng hoạt động</option>
                        <option value="1">Hoạt động</option>
                    </select>
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