<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between" style="background-color: darkblue;">
            <h4 class="text-white mt-3">ĐÁNH GIÁ</h4>
            <div>
                
                <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option value="0">Toàn bộ</option>
                        <option value="1">1 sao</option>
                        <option value="1">2 sao</option>
                        <option value="1">3 sao</option>
                        <option value="1">4 sao</option>
                        <option value="1">5 sao</option>
                    </select>
                    <label for="floatingSelect">Chọn sao</label>
                </div>
                <!-- <div class="input-group mt-2 ">
                    <input type="text" class="form-control" placeholder="search" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                    <button class="btn btn-secondary" type="button" id="button-addon2"><i
                            class="fa-solid fa-magnifying-glass"></i>Tìm</button>
                </div> -->
            </div>
        </div>
        <div class="card-body">
            <div class="table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center align-middle">#</th>
                            <th class="text-center align-middle">Mã đánh giá</th>
                            <th class="text-center align-middle">Mã khách hàng</th>
                            <th class="text-center align-middle">Nội dung</th>
                            <th class="text-center align-middle">Số sao</th>
                            <th class="text-center align-middle">Ngày tạo</th>
                            <th class="text-center align-middle">Tình trạng</th>
                            <th class="text-center align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center align-middle">1</td>
                            <td class="text-center align-middle">DG01</td>
                            <td class="text-center align-middle">KH01</td>
                            <td class="text-center align-middle">Dịch vụ tốt</td>
                            <td class="text-center align-middle">
                                <div>
                                    <div class="cursor-pointer">
                                        <i class="bx bxs-star text-warning"></i>
                                        <i class="bx bxs-star text-warning"></i>
                                        <i class="bx bxs-star text-warning"></i>
                                        <i class="bx bxs-star text-warning"></i>
                                        <i class="bx bxs-star text-secondary"></i>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center align-middle">11/11/2025</td>
                            <td class="text-center align-middle">
                                <button class="btn btn-success">Hiển thị</button>
                                <!-- <button class="btn btn-secondary">Ẩn</button> -->
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
</template>
<script>
export default {

}
</script>
<style></style>