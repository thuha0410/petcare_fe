<template>
    <div class="row">
        <img src="C:\xampp\htdocs\petcare_fe\src\assets\image\background\bg1.png" alt="">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>Đánh giá của bạn</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-9">
                            <label for="">Tên người dùng</label>
                            <input class="form-control" style="width: 430px;" type="text">
                        </div>
                        <div class="col-lg-3">
                            <label for="">Số sao</label>
                            <select class="form-select form-control text-center align-middle" style="width: 120px;">
                                <option value="1">1 sao</option>
                                <option value="2">2 sao</option>
                                <option value="3">3 sao</option>
                                <option value="4">4 sao</option>
                                <option value="5">5 sao</option>
                            </select>
                        </div>
                    </div>
                    <label for="">Nội dung</label>
                    <textarea class="form-control"></textarea>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-secondary">Đăng</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card ">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <img style="width: 150px;"
                                src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                alt="">
                        </div>
                        <div class="col-lg-10">
                            <div>
                                <label for="">Tên người dùng</label>
                            </div>
                            <div>
                                <label for="">Ngày tháng</label>
                            </div>
                            <div>
                                <label for="">
                                    <div>
                                        <div class="cursor-pointer">
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-warning"></i>
                                            <i class="bx bxs-star text-secondary"></i>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label for="">Nội dung</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    Bạn có thấy đánh giá này hữu ích?
                    <button class="btn btn-success"><i class="fa-solid fa-thumbs-up"></i>1</button>
                    <button class="btn btn-danger"><i class="fa-solid fa-thumbs-down"></i>2</button>
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
    background-color: #ffedd4;
    color: white;
}
body{
    background-color: #ffedd4;
}
</style>