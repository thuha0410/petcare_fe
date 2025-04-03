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
            <h1 class="text-white fw-bold">QUAN TÂM ĐÚNG LÚC, THÚ CƯNG HẠNH PHÚC!</h1>
            <p class="text-white">
                Chăm sóc sức khỏe toàn diện cho thú cưng với đội ngũ bác sĩ giàu kinh nghiệm.
                <br> Đặt lịch nhanh chóng, linh hoạt, không cần chờ đợi ✨
            </p>
            <button class="btn btn-primary btn-lg custom-btn">ĐẶT LỊCH NGAY</button>
            <p class="text-white mt-2">Hãy bảo vệ sức khỏe thú cưng ngay hôm nay!</p>
        </div>
    </div>
    <!-- list bac si -->
    <br>
    <!-- dat lich -->
    <div class="row ">
        <div class="col">
        </div>
        <div class="col">
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
            <div class="card card-hv radius-30" style="background-color: #e4edfb;">
                <div class="card-body ">
                    <div class="text-center">
                        <div class="widgets-icons rounded-circle mx-auto bg-light-danger text-danger mb-3">
                            <i class="fa-solid fa-paw" style="color: #648bce;"></i>
                        </div>
                        <h5 class="">Đặt lịch <br> chăm sóc </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">

        </div>
    </div>
    <br>
    <br><br>
    <!-- ds bac si -->
    <h3 class="text-center text-gray fw-bold">DANH SÁCH BÁC SĨ CỦA PHÒNG KHÁM</h3>
    <br>
    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4">
        <!-- template bac si -->
        <div class="col">
            <router-link to="/client/xem-bs">
                <div class="card card-hv radius-15">
                <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                        <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cute-dog-avatar-with-a-yellow-background-png-image_5205692.jpg"
                            width="110" height="110" class="rounded-circle shadow" alt="">
                        <h5 class="mb-0 mt-5">ThS BS Nguyễn Thảo</h5>
                        <p class="mb-3">Bác sĩ Đa khoa</p>
                        <hr>
                        <div>
                            <i class="fa-solid fa-dollar-sign"></i> <span>200.000 VND</span>
                        </div>
                        <br>
                        <div class="d-grid"> <a href="#" class="btn btn-outline-primary radius-15">Đặt lịch ngay</a>
                        </div>
                    </div>
                </div>
            </div>
            </router-link>
        </div>
        <div class="col">
            <div class="card card-hv radius-15">
                <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                        <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cute-dog-avatar-with-a-yellow-background-png-image_5205692.jpg"
                            width="110" height="110" class="rounded-circle shadow" alt="">
                        <h5 class="mb-0 mt-5">ThS BS Nguyễn Thảo</h5>
                        <p class="mb-3">Bác sĩ Đa khoa</p>
                        <hr>
                        <div>
                            <i class="fa-solid fa-dollar-sign"></i> <span>200.000 VND</span>
                        </div>
                        <br>
                        <div class="d-grid"> <a href="#" class="btn btn-outline-primary radius-15">Đặt lịch ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card card-hv radius-15">
                <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                        <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cute-dog-avatar-with-a-yellow-background-png-image_5205692.jpg"
                            width="110" height="110" class="rounded-circle shadow" alt="">
                        <h5 class="mb-0 mt-5">ThS BS Nguyễn Thảo</h5>
                        <p class="mb-3">Bác sĩ Đa khoa</p>
                        <hr>
                        <div>
                            <i class="fa-solid fa-dollar-sign"></i> <span>200.000 VND</span>
                        </div>
                        <br>
                        <div class="d-grid"> <a href="#" class="btn btn-outline-primary radius-15">Đặt lịch ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card card-hv radius-15">
                <div class="card-body text-center">
                    <div class="p-4 border radius-15">
                        <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cute-dog-avatar-with-a-yellow-background-png-image_5205692.jpg"
                            width="110" height="110" class="rounded-circle shadow" alt="">
                        <h5 class="mb-0 mt-5">ThS BS Nguyễn Thảo</h5>
                        <p class="mb-3">Bác sĩ Đa khoa</p>
                        <hr>
                        <div>
                            <i class="fa-solid fa-dollar-sign"></i> <span>200.000 VND</span>
                        </div>
                        <br>
                        <div class="d-grid"> <a href="#" class="btn btn-outline-primary radius-15">Đặt lịch ngay</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a class="text-center hover:text-dark" style="font-size: 25px;" href="">Xem thêm >></a>
    <br>
    <br>
    <!-- banner -->
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
                <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743317725/The_Art_of_Living_1_v4mew0.png"
                    class="d-block w-100" style="height: 600px;" alt="...">

            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743326113/The_Art_of_Living_4_ghy2i4.png"
                    class="d-block w-100" style="height: 600px;" alt="...">

            </div>
            <div class="carousel-item">
                <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743320674/The_Art_of_Living_3_tuykwx.png"
                    class="d-block w-100" style="height: 600px;" alt="...">

            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <br><br>
    <!-- introduce -->
    <div class="">
        <div class="card">
            <div class="card-header">
                <h3 class="text-black">3 ĐIỀU LUÔN CAM KẾT VỚI KHÁCH HÀNG <i class="fa-solid fa-heart"
                        style="color: #FFD43B;"></i></h3>
            </div>
            <div class="card-body">
                <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                    <div class="col">
                        <div class="card rounded-4" style="background-color: #4174a4;">
                            <div class="card-body ">
                                <div>
                                    <h5 class="card-title text-center text-white" style="font-size: 25px;">HẾT MÌNH VÌ
                                        CÔNG VIỆC <i class="fa-solid fa-hand-holding-heart" style="color: #FFD43B;"></i>
                                    </h5>
                                </div>
                                <p class="card-text text-white " style="font-size: 20px;">Chúng tôi làm việc hết mình
                                    với chữ tâm, trách nhiệm và sự yêu nghề.
                                    Thú cưng khỏe mạnh là niềm hạnh phúc của chúng tôi.</p>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card rounded-4" style="background-color: #4174a4;">
                            <div class="card-body">
                                <div>
                                    <h5 class="card-title text-center text-white" style="font-size: 25px;">GIÁ DỊCH VỤ
                                        RẺ NHẤT <i class="fa-solid fa-check" style="color: #07ed17;"></i></h5>
                                </div>
                                <p class="card-text text-white " style="font-size: 20px;">Chúng tôi cam kết đưa ra mức
                                    giá ưu đãi nhất trên thị trường để tất cả thú cưng đều có cơ hội được trải nghiệm
                                    dịch vụ của chúng tôi.</p>

                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card rounded-4" style="background-color: #4174a4;">
                            <div class="card-body">
                                <div>
                                    <h5 class="card-title text-center text-white" style="font-size: 25px;">CHẤT LƯỢNG
                                        HÀNG ĐẦU <i class="fa-solid fa-medal" style="color: #FFD43B;"></i></h5>
                                </div>
                                <p class="card-text text-white " style="font-size: 20px;">Chúng tôi không ngừng nâng cao
                                    phát triển trình độ kỹ năng của nhân sự để phục vụ thú cưng đem đến kết quả tốt
                                    nhất.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <hr>
    <!-- why chăm sóc-->
    <h2 class="text-center text-danger fw-bold">TẠI SAO CẦN CHĂM SÓC THÚ CƯNG ĐÚNG CÁCH?</h2>\
    <p class="text-black" style="font-size: 20px;">Thú cưng không chỉ là một vật nuôi mà còn là người bạn trung thành,
        mang lại niềm vui và sự gắn kết trong gia
        đình. Tuy nhiên, để bé cưng luôn khỏe mạnh và hạnh phúc, bạn cần quan tâm đến chế độ chăm sóc hàng ngày. Dưới
        đây là những lý do bạn không nên bỏ qua việc chăm sóc thú cưng đúng cách</p>
    <div class="">
        <div class="row">
            <div class="col-lg-6 text-end">
                <img class=""
                    src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743239937/step3-dogimg_oqzgd5.avif" alt="">
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                        <br><br>
                        <br>
                        <h3 style="font-size: 25px;color: blue;">Hạn Chế Các Bệnh <br> Truyền Nhiễm <i
                                class="fa-solid fa-stethoscope" style="color: #FFD43B;"></i></h3>
                        <p class="text-grey" style="font-size: 20px;">Một số bệnh ở thú cưng có thể lây sang con người,
                            đặc biệt là khi bé không được vệ sinh sạch sẽ hoặc chưa tiêm phòng đầy đủ. Các bệnh như giun
                            sán, vi khuẩn, nấm da,… có thể gây ảnh hưởng đến sức khỏe gia đình nếu không được kiểm soát.
                        </p>
                    </div>
                    <div class="col-lg-6"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6"></div>
                    <div class="col-lg-6">
                        <br><br>
                        <br>
                        <h3 style="font-size: 25px;color: blue;">Giữ Môi Trường Sống Sạch Sẽ <i
                                class="fa-solid fa-earth-americas" style="color: #FFD43B;"></i></h3>
                        <p class="text-grey" style="font-size: 20px;">Một thú cưng khỏe mạnh không chỉ tốt cho bản thân
                            bé mà còn giúp môi trường sống của bạn trong lành hơn. Nếu không được vệ sinh đúng cách, thú
                            cưng có thể mang vi khuẩn, ký sinh trùng vào nhà, ảnh hưởng đến sức khỏe của cả gia đình.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743240084/step2-dogimg_q7enhu.webp"
                    alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 text-end">
                <img class=""
                    src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743342635/step1-dogimg_hevd4u.webp" alt="">
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-6">
                        <br><br>
                        <br>
                        <h3 style="font-size: 25px;color: blue;">Giảm Stress Và Cải Thiện Tâm Trạng <i
                                class="fa-solid fa-stethoscope" style="color: #FFD43B;"></i></h3>
                        <p class="text-grey" style="font-size: 20px;">Thú cưng có thể cảm nhận được tình cảm và sự quan
                            tâm từ chủ nhân. Khi được chăm sóc tốt, chúng sẽ luôn vui vẻ, đáng yêu, từ đó cũng giúp bạn
                            cảm thấy hạnh phúc hơn. Nhiều nghiên cứu khoa học đã chứng minh rằng việc nuôi thú cưng giúp
                            giảm căng thẳng, cải thiện tâm trạng và thậm chí giúp con người sống lâu hơn.</p>
                    </div>
                    <div class="col-lg-6"></div>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <!-- bảng giá cắt tỉa lông -->
    <div class="">
        <div class="card rounded-5" style="background-color: #2d59a4;">
            <div class="card-header">
                <h3 class="fw-bold text-white"><i class="fa-solid fa-dollar-sign" style="color: #3aec22;"></i> BẢNG GIÁ
                    DỊCH VỤ CẮT TỈA LÔNG CHÓ MÈO TRỌN GÓI</h3>
            </div>
            <div class="card-body">
                <p class="text-white " style="font-size: 20px;"><span class="fw-bold">Bảng giá cắt lông chó mèo đã bao
                        gồm:</span> Dịch vụ tắm cho chó mèo trọn gói, sấy khô, chải lông rụng, cắt
                    dũa móng, vệ sinh tai mà không phát sinh thêm bất cứ phụ phí nào khác. Giá dịch vụ thực tế dựa theo
                    hiện trạng kích cỡ, trọng lượng và nhu cầu phát sinh thêm của khách hàng.</p>
                <br>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4">
                    <div class="col">
                        <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743344121/grooming-yorkshire_mszpdr.webp" class="card-img-top" alt="...">
                        <br><br><br>
                        <p class="text-white text-center" style="font-size: 20px;">Thú cưng có trọng lượng dưới <span class="fw-bold">2kg</span></p>
                        <p class="fw-bold text-center text-white" style="font-size: 45px;">250K</p>
                    </div>
                    <div class="col">
                        <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743344121/grooming-pom_l1hwhn.jpg" class="card-img-top" alt="...">
                        <br><br><br>
                        <p class="text-white text-center" style="font-size: 20px;">Thú cưng có trọng lượng dưới <span class="fw-bold">5kg</span></p>
                        <p class="fw-bold text-center text-white" style="font-size: 45px;">350K</p>
                    </div>
                    <div class="col">
                        <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743344120/grooming-poodle_ufiqo3.jpg" class="card-img-top" alt="...">
                        <br><br><br>
                        <p class="text-white text-center" style="font-size: 20px;">Thú cưng có trọng lượng dưới <span class="fw-bold">10kg</span></p>
                        <p class="fw-bold text-center text-white" style="font-size: 45px;">500K</p>
                    </div>
                    <div class="col">
                        <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743344120/grooming-husky_l9o0iy.jpg" class="card-img-top" alt="...">
                        <br><br><br>
                        <p class="text-white text-center" style="font-size: 20px;">Thú cưng có trọng lượng dưới <span class="fw-bold">20kg</span></p>
                        <p class="fw-bold text-center text-white" style="font-size: 45px;">650K</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-link to="/client/xem-dich-vu">
        <div class="text-center">
            <a class="" style="font-size: 25px;" href="">Xem thêm dịch vụ <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </router-link>
</template>
<script>
export default {

}
</script>
<style>
.custom-btn:hover {
    background-color: #dc3545 !important;
    /* Đổi thành màu đỏ */
    border-color: #dc3545 !important;
}

.card-hv:hover {
    border: 2px solid #007bff !important;
    /* Viền màu xanh */
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    /* Hiệu ứng đổ bóng */
}
</style>