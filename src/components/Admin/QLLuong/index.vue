<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header" style="background-color: darkblue;">
                    <h4 class="text-white">NHẬP THÔNG TIN</h4>
                </div>
                <div class="card-body">
                    <label for="">Mã lương</label>
                    <input class="form-control" type="text">
                    <label for="">Tên bác sĩ</label>
                    <input class="form-control" type="text">
                    <label for="">Tiền lương</label>
                    <input class="form-control" type="text">
                    <label for="">Ngày thanh toán</label>
                    <input class="form-control" type="date">
                    <label for="">Tiền thưởng</label>
                    <input class="form-control" type="text">
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-outline-primary">Hoàn tất</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">

            <div class="card">
                <div class="card-header" style="background-color: darkblue;">
                    <h4 class="text-white">LƯƠNG</h4>
                    <div class="input-group mb-3">
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
                                    <th class="text-center align-middle">Mã lương</th>
                                    <th class="text-center align-middle">Tên bác sĩ</th>
                                    <th class="text-center align-middle">Tiền lương</th>
                                    <th class="text-center align-middle">Ngày thanh toán</th>
                                    <th class="text-center align-middle">Tiền thưởng</th>
                                    <th class="text-center align-middle">Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center align-middle">1</td>
                                    <td class="text-center align-middle">L01</td>
                                    <td class="text-center align-middle">BS01</td>
                                    <td class="text-center align-middle">7.000.000</td>
                                    <td class="text-center align-middle">01/02/2025</td>
                                    <td class="text-center align-middle">500.000</td>
                                    <td class="text-center align-middle">
                                        <button class="btn btn-success">Đã thanh toán</button>
                                        <!-- <button class="btn btn-secondary">Chưa thanh toán</button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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