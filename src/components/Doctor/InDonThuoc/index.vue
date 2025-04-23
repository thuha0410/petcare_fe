<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f8f9fa;">
        <div class="container bg-white p-4 shadow rounded" style="max-width: 800px; font-family: 'Arial', sans-serif;">
            <div class="d-flex align-items-center mb-4">
                <img src="//www.meowbox.com/cdn/shop/files/website_one_box_can_0ae275e6-23ab-4bd5-9f22-d88841d55204.svg?v=1716102790&"
                    alt="PetCare Logo" style="height: 60px; margin-right: 15px;">
                <div>
                    <h5 class="mb-0 fw-bold" style="color: #0d6efd;">PHÒNG KHÁM THÚ CƯNG PETCARE</h5>
                    <p class="mb-0 ms-4" style="font-size: 14px;">Quan tâm đúng lúc - Thú cưng hạnh phúc</p>
                </div>
            </div>
            <h2 class="text-center fw-bold mb-4 text-primary">ĐƠN THUỐC</h2>

            <div class="mb-3">
                <p><strong>Họ tên bệnh nhân:</strong> Nguyễn Văn A</p>
                <p><strong>Ngày khám:</strong> 12/12/2022</p>
                <p><strong>Chuẩn đoán:</strong> Viêm hô hấp</p>
                <p><strong>Bác sĩ điều trị:</strong> Huỳnh Văn Đức</p>
            </div>

            <table class="table table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        <th>Liều lượng</th>
                        <th>Ghi chú</th> <!--Có thể trống-->
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Thuốc số</td>
                        <td>10</td>
                        <td>3 lần/ngày</td>
                        <td>Sau ăn sáng, trưa, tối</td> <!--Có thể trống-->
                    </tr>
                    <!-- Các dòng thuốc khác -->
                </tbody>
            </table>

            <div class="mt-5 row">
                <div class="col text-start">
                    <p><strong>Ngày in:</strong> 22/04/2025</p>
                </div>
                <div class="col text-end me-5">
                    <p><strong>Bác sĩ điều trị</strong></p>
                    <p class="me-3">(Ký tên)</p>
                    <br><br><br><br>
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