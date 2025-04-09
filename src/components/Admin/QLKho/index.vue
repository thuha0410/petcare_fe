<template>
    <div class="row">
        <div class="col-lg-3">
            <div class="card">
                <div style="background-color: darkblue; " class="card-header d-flex justify-content-between">
                    <h4 style="color: white;">KHO</h4>
                    <div class="text-end mt-2">
                        <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                        class="btn btn-secondary radius-20"><i class="fa-solid fa-square-plus"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <button class="btn btn-warning">Kho 1</button>
                    <button class="btn btn-warning ms-2">Kho 2</button>
                    <button class="btn btn-warning ms-2">Kho 3</button>
                </div>
                
            </div>
        </div>
        <div class="col-lg-9">
            <div class="card">
                <div style="background-color: darkblue; " class="card-header ">
                    <h4 style="color: white;">THÔNG TIN KHO</h4>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="search" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-secondary" type="button" id="button-addon2"><i
                                class="fa-solid fa-magnifying-glass"></i>Tìm</button>
                    </div>
                    
                </div>
                <div class="card-body">
                    <div class="table table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle">#</th>
                                    <th class="text-center align-middle">Mã thuốc</th>
                                    <th class="text-center align-middle">Tên thuốc</th>
                                    <th class="text-center align-middle">Đơn vị</th>
                                    <th class="text-center align-middle">Số lượng</th>
                                    <th class="text-center align-middle">Đơn giá</th>
                                    <th class="text-center align-middle">Mô tả</th>
                                    <th class="text-center align-middle">Hạn sử dụng</th>
                                    <th class="text-center align-middle">Mã kho</th>
                                    <th class="text-center align-middle">Trạng thái</th>
                                    <th class="text-center align-middle">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center align-middle">1</td>
                                    <td class="text-center align-middle">LK01</td>
                                    <td class="text-center align-middle">Thuốc dạ dày</td>
                                    <td class="text-center align-middle">vĩ</td>
                                    <td class="text-center align-middle">2</td>
                                    <td class="text-center align-middle">70.000</td>
                                    <td class="text-center align-middle">viêm dạ dày HP</td>
                                    <td class="text-center align-middle">01/01/2025</td>
                                    <td class="text-center align-middle">KH01</td>
                                    <td class="text-center align-middle">
                                        <button class="btn btn-success">Còn hạn</button>
                                        <!-- <button class="btn btn-secondary">Hết hạn</button> -->
                                    </td>
                                    <td class="text-center align-middle">
                                        <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">NHẬP THÔNG TIN THUỐC</h1>
                </div>
                <div class="modal-body">
                    <label for="">Chọn kho</label>
                    <select class="form-control" name="" id="">
                        <option value="">Kho 1</option>
                        <option value="">Kho 2</option>
                        <option value="">Kho 3</option>
                    </select>
                    <label for="">Mã thuốc</label>
                    <input class="form-control" type="text">
                    <label for="">Tên thuốc</label>
                    <input class="form-control" type="text">
                    <label for="">Đơn vị</label>
                    <select class="form-control" name="" id="">
                        <option value="">viên</option>
                        <option value="">vĩ</option>
                        <option value="">hộp</option>
                    </select>
                    <label for="">Số lượng</label>
                    <input class="form-control" type="text">
                    <label for="">Đơn giá</label>
                    <input class="form-control" type="text">
                    <label for="">Mô tả</label>
                    <textarea class="form-control" name="" id="" rows="5"></textarea>
                    <label for="">Hạn sử dụng</label>
                    <input class="form-control" type="date">
                    <label for="">Mã kho</label>
                    <input class="form-control" type="text">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm</button>
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