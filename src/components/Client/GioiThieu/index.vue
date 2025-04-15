<template>
    <div class="container mt-5">
        <div class="hero fade-in">
            <div class="hero-text">
                <h1>
                    Niềm Vui Cho Thú Cưng<br />
                    Mỗi Ngày <i class="fa-solid fa-paw fa-bounce" style="color: #153874;"></i>
                </h1>
                <p>
                    PetCare mang đến dịch vụ chăm sóc & khám bệnh tốt nhất cho thú cưng của bạn. Đội ngũ bác sĩ và
                    chuyên gia thú y tận tâm luôn sẵn sàng hỗ trợ.
                </p>
                <img style="width: 30%; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1)"
                    src="https://cdn.shopify.com/s/files/1/0559/3713/8775/files/chewsolutions-dogimg-desktop.webp?v=1741973018"
                    alt="" />
                <router-link to="/client/xem-dich-vu">
                    <button type="button" class="btn btn-lg btn-outline-primary px-5 rounded-pill ms-5">
                        <i class="fa-solid fa-paw" style="color: #3770d2;"></i> Khám phá ngay
                    </button>
                </router-link>
            </div>
            <div>
                <img src="https://images.ctfassets.net/j4x7ugudy4uu/2bR3zpn3ItSPNeYSDzHOBT/a6c784ddd48eac4f34ae5f596c56ce67/NEW_MOOSE_3__1_-min.png"
                    class="img-fluid rounded-5" alt="Thú Cưng Hạnh Phúc" />
            </div>
        </div>
    </div>

    <div class="container mt-5">
        <div class="row text-center">
            <div class="col-md-4 fade-in">
                <div class="info-box">
                    <img class="img-fluid rounded-5 mb-2"
                        style="height: 250px; transition: all 0.3s ease; transform: scale(1);"
                        src="https://phongkhamthuyvinhlocvet.com/upload/news/nhung-dau-hieu-canh-bao-ban-nen-dua-thu-den-bac-si-thu-y-1-1-4230.jpg"
                        alt="" @mouseover="hoverImage($event)" @mouseleave="resetImage($event)" />
                    <h4 style="color: #002855">Chăm Sóc Y Tế</h4>
                    <p style="font-size: 15px">Dịch vụ khám & chữa bệnh với đội ngũ bác sĩ thú y chuyên nghiệp.</p>
                </div>
            </div>
            <div class="col-md-4 fade-in">
                <div class="info-box">
                    <img class="img-fluid rounded-5 mb-2"
                        style="height: 250px; transition: all 0.3s ease; transform: scale(1);"
                        src="https://phongkhamthuypetcute.com/wp-content/uploads/2024/08/133.jpg" alt=""
                        @mouseover="hoverImage($event)" @mouseleave="resetImage($event)" />
                    <h4 style="color: #002855">Thẩm Mỹ & Grooming</h4>
                    <p style="font-size: 15px">Dịch vụ tắm, cắt tỉa lông, làm đẹp cho thú cưng.</p>
                </div>
            </div>
            <div class="col-md-4 fade-in">
                <div class="info-box">
                    <img class="img-fluid rounded-5 mb-2"
                        style="height: 250px; transition: all 0.3s ease; transform: scale(1);"
                        src="https://kingspet.vn/wp-content/uploads/2024/01/nen-cho-cho-an-com-hay-hat3.webp" alt=""
                        @mouseover="hoverImage($event)" @mouseleave="resetImage($event)" />
                    <h4 style="color: #002855">Thức Ăn & Dinh Dưỡng</h4>
                    <p style="font-size: 15px">Cung cấp thực phẩm bổ dưỡng phù hợp với từng loài thú cưng.</p>
                </div>
            </div>
        </div>

        <div class="hero fade-in">
            <div class="hero-text">
                <h1>Lịch Sử Phát Triển <i class="fa-solid fa-paw" style="color: #153874;"></i></h1>
                <br />
                <h4>Hành trình đồng hành cùng thú cưng của bạn</h4>
                <br />
                <p>
                    Chúng tôi, Đức, Hà, Thảo, Ái và Đoàn, cùng nhau xây dựng trang web này với mong muốn tạo ra một
                    không gian trực tuyến đáng tin cậy, nơi những người yêu thú cưng có thể tìm thấy mọi thông tin và
                    dịch vụ cần thiết để chăm sóc tốt nhất cho những người bạn bốn chân của mình...
                </p>
            </div>
            <div>
                <img class="w-100" src="https://cityvet.vn/storage/general-1/intro.png" />
            </div>
        </div>
    </div>

    <h3 style="color: #002855;" class="text-center mb-3">MỘT SỐ HÌNH ẢNH TẠI PETCARE <i class="fa-solid fa-shield-heart" style="color: #0d3e63;"></i></h3>
    <div class="row position-relative">
        
        <div class="col-lg-4">
            <img class="img-fluid rounded-5 mb-2 fade-in"
                src="https://www.zoomingroomin.com/wp-content/uploads/2021/09/mobile-pet-grooming-franchise-gallery-11.jpg" alt="" />
        </div>
        <div class="col-lg-4">
            <img class="img-fluid rounded-5 mb-2 fade-in"
                src="https://www.petbarinc.com/wp-content/uploads/2023/05/dog-haircut.jpg" alt="" />
        </div>
        <div class="col-lg-4">
            <img class="img-fluid rounded-5 mb-2 fade-in"
                src="https://www.ekologia.pl/wp-content/uploads/2023/03/groomer-psi-fryzjer_1000x667-1.jpg" alt="" />
        </div>
        
    </div>
    

    <h3 style="color: #002855;" class="text-center mt-3">GIẤY CHỨNG NHẬN ĐẢM BẢO AN TOÀN <i class="fa-solid fa-shield-dog" style="color: #0d3e63;"></i></h3>
    <p class="text-center">Chúng tôi cam kết cung cấp dịch vụ chăm sóc thú cưng an toàn và chất lượng nhất.</p>

    <div  class="text-center mb-5">
        <img style="width: 1200px;" class="img-fluid rounded-3 mb-2 fade-in"
            src="https://luatsux.vn/wp-content/uploads/2022/07/luat-cap-chung-chi-hanh-nghe-y-duoc-quy-dinh-nhu-the-nao.png" alt="" />
    </div>

</template>

<script>
export default {
    mounted() {
        const elements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('appear');
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
    },
    methods: {
        hoverImage(event) {
            event.target.style.transform = "scale(1.1)";
        },
        resetImage(event) {
            event.target.style.transform = "scale(1)";
        }
    }
};
</script>

<style scoped>
body {
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png) no-repeat;
    background-size: cover;
}

.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
}

.hero-text {
    max-width: 50%;
}

.hero h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #002855;
}

.hero p {
    font-size: 1.2rem;
    color: #333;
}

.btn-main {
    background-color: #007bff;
    color: white;
    font-size: 1.2rem;
    padding: 10px 20px;
    border-radius: 10px;
    text-decoration: none;
}

.btn-main:hover {
    background-color: #0056b3;
    color: white;
}

.info-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-box:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

/* Hiệu ứng xuất hiện */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}

.fade-in.appear {
    opacity: 1;
    transform: translateY(0);
}
</style>