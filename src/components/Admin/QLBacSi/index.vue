<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;" >QUẢN LÝ BÁC SĨ</h3>
            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle text-nowrap">
                            <th>#</th>
                            <th>Mã bác sĩ</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Hình ảnh</th>
                            <th>Email</th>
                            <th>Mô tả</th>
                            <th>Tình trạng</th>
                            <th>Mã chức vụ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle text-nowrap">
                            <th>1</th>
                            <td>BS01</td>
                            <td>Lương Văn Ái</td>
                            <td>Nam</td>
                            <td><img style="height: 100px; width: 100px;" class="rounded-circle img-fluid"
                                    src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/480622812_1706624816958426_3704596543729326136_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=E5N_sIxMOhAQ7kNvgFTpoay&_nc_oc=Adm2sTlxYVT7keslWnslehB7wNrWA85e6KRXtOpiPmL-cUUzLWIAJpz9eN3aecH4A-A&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=-4RSaBldRxE0GiOmyidt4g&oh=00_AYF1TupZHTnCZFBpzvZZOARw31PkIbJJewi_7K-JQaxdtQ&oe=67E9D5CA">
                            </td>
                            <td>tthello123@gmail.com</td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target="#mota" type="button"
                                    class="btn btn-outline-primary"><i class="bx bx-user me-0"></i>
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-success">Hoạt động</button>
                                <button class="btn btn-secondary">Nghỉ</button>
                            </td>
                            <td>CV01</td>
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