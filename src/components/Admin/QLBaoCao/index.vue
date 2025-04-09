<template >
    <div class="row">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <div>
                    <h3>QUẢN LÝ BÁO CÁO</h3>
                </div>
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option value="0">Toàn bộ</option>
                        <option value="1">Tháng 1</option>
                        <option value="1">Tháng 2</option>
                        <option value="1">Tháng 3</option>
                        <option value="1">Tháng 4</option>
                        <option value="1">Tháng 5</option>
                        <option value="1">Tháng 6</option>
                        <option value="1">Tháng 7</option>
                        <option value="1">Tháng 8</option>
                        <option value="1">Tháng 9</option>
                        <option value="1">Tháng 10</option>
                        <option value="1">Tháng 11</option>
                        <option value="1">Tháng 12</option>
                    </select>
                    <label for="floatingSelect">Chọn tháng</label>
                </div>
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
                            <th>Ngày xuất</th>
                            <th>Tổng tiền</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center align-middle">
                            <th>1</th>
                            <td>HD01</td>
                            <td>26/03/2025</td>
                            <td>1.200.000vnđ</td>
                            <td class="text-center align-middle">
                                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#xoa">Xóa</button>
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style>
    .custom-color {
        color: #fff5e1;
    }
    .custom-bg {
        background-color: #ff8a65; 
        color: white;
    }
</style>