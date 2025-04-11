<template>
    <div class="row">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h3>Quản lý hóa đơn</h3>
            </div>
            <div class="card-body">
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th>#</th>
                            <th>ID Hóa đơn</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày xuất hóa đơn</th>
                            <th>ID pet</th>
                            <th>Phương thức</th>
                            <th>Tổng tiền</th>
                            <th>Tình trạng</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle">
                                <th>1</th>
                                <td>HD01</td>
                                <td>Lê Văn Đạt</td>
                                <td>2025-04-05</td>
                                <td>PET01</td>
                                <td>Cash</td>   
                                <td>1.200.000VNĐ</td>
                                <td>
                                    <button class="btn btn-success">Inactive</button>
                                    <button class="btn btn-warning">Active</button>
                                </td>              
                                <td class="text-center align-middle">
                                    <button  data-bs-toggle="modal"
                                        data-bs-target="#sua" class="btn btn-primary">Sửa</button>
                                    <button class="btn btn-danger"
                                        data-bs-toggle="modal" data-bs-target="#xoa">Xóa</button>
                                </td>
                            </tr>
                    </tbody>
                </table>
                <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Bạn mún xóa tht hã?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button v-on:click="xoa()" type="button" data-bs-dismiss="modal"
                                    class="btn btn-primary">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Them thong tin nhan vien</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label class="mt-2" for="">ID hóa đơn</label>
                                <input class="form-control" type="text">
                                <label class="mt-2" for="">Tên khách hàng</label>
                                <input class="form-control" type="text">
                                <label class="mt-2" for="">Ngày tháng</label>
                                <input class="form-control" type="text">
                                <label class="mt-2" for="">ID thú cưng</label>
                                <input class="form-control" type="text">
                                <label class="mt-2" for="">Phương thức</label>
                                <select class="form-control" name="" id="">
                                    <option value="0">Cash</option>
                                    <option value="1">Online banking</option>
                                </select>
                                <label class="mt-2" for="">Tổng tiền</label>
                                <input class="form-control"  type="text">
                                <label class="mt-2" for="">Tình trạng</label>
                                <select class="form-control" name="" id="">
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>
                                </select>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button v-on:click="sua()" type="button" data-bs-dismiss="modal"
                                    class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
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