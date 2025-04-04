<template>
     <!-- Video Background -->
     <div class="video-container" style="overflow: hidden;width: 100%; position: relative; height: 50vh;">
        <video autoplay loop muted playsinline class="video-background"
            style="position:absolute;top: 50%;left: 50%;min-width: 100%; min-height: 100%;transform: translate(-50%, -50%);">
            <source
                src="https://res.cloudinary.com/prettylitter/video/upload/v1708552338/videos/PL_2024_1920x1080_V2.mp4"
                type="video/mp4" />

        </video>

        <!-- Nội dung chữ hiển thị trên video -->
        <div class="overlay-content "
            style="position: absolute;top: 50%; left: 50%;transform: translate(-50%, -50%); text-align: center;width: 80%;">
            <h1 class="text-white fw-bold">ĐẶT LỊCH NGAY HÔM NAY!</h1>
            <p class="text-white">
                Chăm sóc sức khỏe toàn diện cho thú cưng với đội ngũ bác sĩ giàu kinh nghiệm.
                <br> Đặt lịch nhanh chóng, linh hoạt, không cần chờ đợi ✨
            </p>
            <p class="text-white mt-2">Hãy bảo vệ sức khỏe thú cưng ngay hôm nay!</p>
        </div>
    </div>
     <br>
     <h1 style="color: #002855" class=" fw-bold text-center">CHỌN ĐẶT LỊCH THEO CÁC DỊCH VỤ SAU <i class="fa-solid fa-paw " style="color: #153874;"></i></h1>
     <br>
        <!-- dat lich -->
     <div class="row ">
        <div class="col">
        </div>
        <div class="col">
            <router-link to="/client/dat-lich-theo-bac-si">
                <div class="card card-hv radius-30" style="background-color: #e4edfb;">
                    <div class="card-body ">
                        <div class="text-center">
                            <div class="widgets-icons rounded-circle mx-auto bg-light-danger text-danger mb-3">
                                <i class="fa-solid fa-user-doctor" style="color: #3066c5;"></i>
                            </div>
                            <h5 class="">Đặt khám <br> theo bác sĩ</h5>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="col">
            <router-link to="/client/dat-lich-tiem-chung">
                <div class="card card-hv radius-30" style="background-color: #e4edfb;">
                <div class="card-body ">
                    <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-danger text-danger mb-3">
                            <i class="fa-solid fa-syringe" style="color: #2d59a4;"></i>
                        </div>
                        <h5 class="">Đặt lịch <br> tiêm chủng</h5>
                    </div>
                </div>
            </div>
            </router-link>
        </div>
        <div class="col">
           <router-link to="">
            <div class="card card-hv radius-30" style="  background-color: #e4edfb;">
                <div class="card-body ">
                    <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-danger text-danger mb-3">
                            <i class="fa-solid fa-paw" style="color: #648bce;"></i>
                        </div>
                        <h5 class="">Đặt lịch <br> chăm sóc </h5>
                    </div>
                </div>
            </div>
           </router-link>
        </div>
        <div class="col">

        </div>
    </div>
     
</template>
<script>
export default {

}
</script>
<style>
body {
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png ) no-repeat;
    background-size: cover;
}
</style>