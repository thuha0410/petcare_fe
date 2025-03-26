<template>
    <div>
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-3">
                <div style="width: 1000px;" class="card">
                <div class="card-header">
                    <h3>THÔNG TIN CÁ NHÂN</h3>
                </div>
                <div class="card-body">
                    <div class="text-center align middle">
                        <img style="height: 200px;" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="">
                        
                    </div>
                    <div class="text-center align middle">
                        <button class="btn btn-secondary">Change image</button> 
                    </div>  
                    <div class="row">
                        <div class="col-lg-6">
                        <label class="mt-2" for="">Username</label>
                        <input class="form-control" type="text">
                        <label class="mt-2" for="">Họ</label>
                        <input class="form-control" type="text">
                        <label class="mt-2" for="">Ngày sinh</label>
                        <input class="form-control" type="date">
                    </div>
                    <div class="col-lg-6">
                        <label class="mt-2" for="">Password</label>
                        <input class="form-control" type="password">
                        <label class="mt-2" for="">Tên</label>
                        <input class="form-control" type="text">
                        <label class="mt-2" for="">Quê quán</label>
                        <select class="form-control" name="" id="">
                            <option value="0">---</option>
                            <option value="1">Đà Nẵng</option>
                            <option value="1">Quảng Nam</option>
                        </select>
                    </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-primary">Lưu</button>
                </div>
            </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>