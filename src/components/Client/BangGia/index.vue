<template>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Great+Vibes&display=swap"
        rel="stylesheet">

    <body>
        <div class="background-container">
            <h1>BẢNG GIÁ</h1>
            <h3>Spa & Grooming</h3>
            <div class="container" style="    display: grid;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    gap: 50px;">
                <!-- GÓI CẮT TỈA CƠ BẢN -->
                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Gói Cắt tỉa cơ bản</h2>
                    <div class="badge new">NEW</div>
                    <p style="font-size: 20px;" class="text-center">Tắm + Cắt tỉa gọn + Vệ sinh Tai, Móng và Răng miệng</p>
                    <div class="care-grid">
                        <div class="care-col">
                            <strong>Dành cho Chó</strong>
                            <p>Dưới 2kg: 230.000</p>
                            <p>2 - 4kg: 270.000</p>
                            <p>5 - 9kg: 320.000</p>
                            <p>10 - 14kg: 390.000</p>
                            <p>15 - 20kg: 420.000</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <strong>Dành cho Mèo</strong>
                            <p>Dưới 2kg: 400.000</p>
                            <p>2 - 5kg: 500.000</p>
                        </div>
                    </div>
                </div>
                <!-- GÓI ĐẸP TOÀN DIỆN -->
                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Gói Đẹp Toàn Diện</h2>
                    <div class="badge hot">HOT</div>
                    <p style="font-size: 20px;" class="text-center">Tắm + Cắt tỉa gọn + Vệ sinh Tai, Móng và Răng miệng</p>
                    <div class="care-grid">

                        <div class="care-col">
                            <strong>Dành cho Chó</strong>
                            <p>Dưới 2kg: 350.000</p>
                            <p>2 - 4kg: 390.000</p>
                            <p>5 - 9kg: 490.000</p>
                            <p>10 - 14kg: 590.000</p>
                            <p>15 - 20kg: 650.000</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <strong>Dành cho Mèo</strong>
                            <p>Dưới 2kg: 400.000</p>
                            <p>2 - 5kg: 500.000</p>
                        </div>
                    </div>
                </div>

                <!-- GÓI TẮM CƠ BẢN -->

                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Gói Tắm Cơ Bản</h2>
                    <div class="care-grid">
                        <div class="care-col">
                            <strong>Dành cho Chó</strong>
                            <p>Dưới 2kg: 70.000</p>
                            <p>2 - 4kg: 100.000</p>
                            <p>5 - 9kg: 150.000</p>
                            <p>10 - 14kg: 200.000</p>
                            <p>15 - 20kg: 250.000</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <strong>Dành cho Mèo</strong>
                            <p>Dưới 2kg: 100.000</p>
                            <p>2 - 5kg: 150.000</p>
                        </div>
                    </div>
                </div>

                <!-- GÓI TẮM COMBO -->
                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Gói Tắm Combo</h2>
                    <div class="care-grid">
                        <div class="care-col">
                            <strong>Dành cho Chó</strong>
                            <p>Dưới 2kg: 130.000</p>
                            <p>2 - 4kg: 170.000</p>
                            <p>5 - 9kg: 220.000</p>
                            <p>10 - 14kg: 270.000</p>
                            <p>15 - 20kg: 320.000</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <strong>Dành cho Mèo</strong>
                            <p>Dưới 2kg: 150.000</p>
                            <p>2 - 5kg: 190.000</p>
                            <p>Trên 5kg: 230.000</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Gói Sạch Toàn Thân</h2>
                    <p style="font-size: 20px;" class="text-center">Tắm + Cạo lông + Vệ sinh Tai, Móng và Răng miệng</p>
                    <div class="care-grid">

                        <div class="care-col">
                            <strong>Dành cho Chó</strong>
                            <p>Dưới 2kg: 250.000</p>
                            <p>2 - 4kg: 320.000</p>
                            <p>5 - 9kg: 390.000</p>
                            <p>10 - 14kg: 490.000</p>
                            <p>15 - 20kg: 550.000</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <strong>Dành cho Mèo</strong>
                            <p>Dưới 2kg: 300.000</p>
                            <p>2 - 5kg: 350.000</p>
                        </div>
                    </div>
                </div>

                <!-- CHĂM SÓC LẺ -->
                <div class="card">
                    <h2 class="text-center" style=" font-size: 40px; color: #a36a3c;">Chăm sóc lẻ</h2>
                    <div class="care-grid">
                        <div class="care-col">
                            <p><strong>Gỡ rối lông: </strong> (tuỳ mức độ) 50 </p>
                            <p><strong>Cắt / Mài móng: </strong>50</p>
                            <p><strong>Vệ sinh Tai: </strong>50</p>
                            <p><strong>Cạo lông vệ sinh: </strong>50</p>
                            <p><strong>Bàn chân / Mông / Bụng</strong>50</p>
                        </div>
                        <div class="divider"></div>
                        <div class="care-col">
                            <p><strong>Tắm trắng cho bé: </strong>50</p>
                            <p> <strong>Điều trị Ve rận:</strong>50</p>
                            <p><strong>Viêm tai / Rận tai: </strong>50</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </body>
</template>
<script>
export default {

}
</script>
<style scoped>
body {
    font-family: 'Segoe UI', sans-serif;
    background: #fef6f3;
    color: #3e2e2b;
    margin: 0;
    padding: 20px;
    background-color: #f5f7fa;
    background: url(https://cityvet.vn/storage/general-1/br-1.png ) no-repeat;
    background-size: cover;
}

h1 {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 10px;
    color: #e3e0de;
}

h3 {
    text-align: center;
    font-family: 'Great Vibes', cursive;
    font-size: 90px;
    color: #a36a3c;
    margin-bottom: 10px;
}

.background-container {
    background-image: url('https://khoinguonsangtao.vn/wp-content/uploads/2021/09/background-xanh-duong-dam.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 70px 30px;
    border-radius: 20px;
}

.card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    width: 600px;
    height: 350px;
    margin: 5px;
    font-family: 'Segoe UI', sans-serif;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

}

.card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    margin-bottom: 10px;
}

.care-grid {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 20px;
    gap: 60px;
}

.care-col p {
    margin: 10px 0;
    line-height: 1.5;
    font-size: 18px;
}

.care-col strong {
    color: #b3543c;
}

.badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: bold;
}

.new {
    background-color: #c1f7c1;
    color: #106910;
}

.hot {
    background-color: #ffbaba;
    color: #a10000;
}

.divider {
    width: 1px;
    height: 150px;
    background-color: #b47d68;
    margin-top: 15px;
}
</style>
