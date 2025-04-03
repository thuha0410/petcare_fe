<template>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
    <!-- banner -->

    <div class="row"
        style="display: flex;align-items: center;justify-content: center;text-align: center;padding: 50px 10%;background-color: #f9f9fc;">
        <div class="col-lg-6 text-center mt-5">
            <h1 class=" fw-bold"
                style="font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;font-size: 60px;color: darkblue;">
                DỊCH VỤ CHĂM SÓC <br>THÚ CƯNG TOÀN DIỆN</h1>
            <p style="font-size: 25px;">"Yêu thương trọn vẹn - chăm sóc tận tâm!"</p>
        </div>
        <div class="col-lg-6 text-end">
            <img src="https://cdn.shopify.com/s/files/1/0559/3713/8775/files/chewsolutions-dogimg-desktop.webp?v=1741973018"
                alt="">
        </div>
    </div>
    <marquee scrollamount="10" scrolldelay="100" class="text-white align-middle"
        style="background-color: darkblue; height: 40px;padding-top: 10px;padding-bottom: 10px;">
        Chúng tôi cung cấp dịch vụ chăm sóc thú cưng toàn diện, từ tắm rửa, cắt tỉa lông đến trông giữ và huấn luyện,
        đảm bảo thú cưng của bạn luôn khỏe mạnh và hạnh phúc.
    </marquee>
    <br>
    <!-- search -->
    <div class="container mt-2 d-flex justify-content-center">
    <div class="input-group" style="max-width: 600px; height: 50px;">
        <input type="text" class="form-control rounded-start-pill" placeholder="Tìm kiếm dịch vụ..." aria-label="Search">
        <button class="btn btn-primary rounded-end-pill" type="button">
            <i class="fas fa-search"></i> <!-- Biểu tượng kính lúp -->
        </button>
    </div>
</div>
<br><hr>
    <h3 class="text-center text-black fw-bold">CÁC DỊCH VỤ CHĂM SÓC THÚ CƯNG ĐỈNH CỦA CHÓP<i
            class="fa-solid fa-fire-flame-curved" style="color: #fd1c1c;"></i></h3>
    <br>
    <!--  -->
    <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <div class="card">
                <div class="row" style="padding: 20px;">
                    <div class="col-lg-3">
                        <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743344121/grooming-yorkshire_mszpdr.webp"
                            alt="" class="rounded-circle p-1 bg-primary" width="250">
                    </div>
                    <div class="col-lg-9">
                        <h3 class="fw-bold" style="color: darkblue;">DỊCH VỤ CẮT TỈA LÔNG CHÓ MÈO</h3>
                        <p style="font-size: 20px;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
                            aliquid inventore at,
                            debitis facere quia molestiae hic! Deleniti, sint vero, quisquam quae iusto aut impedit
                            minima aliquam ducimus ratione expedita!</p>
                        <p style="font-size: 25px;" class="text-danger fw-bold">Giá dao động:
                            <span>250.000-600.000</span> VND</p>
                        <router-link to="/client/chon-dich-vu">
                            <div class="text-end ">
                                <button class="btn btn-info btn-hover fw-bold">ĐẶT LỊCH NGAY</button>
                            </div>
                        </router-link>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-2"></div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.btn-hover:hover {
    background-color: #dc3545 !important;
    /* Đổi thành màu đỏ */
    border-color: #dc3545 !important;
}
</style>