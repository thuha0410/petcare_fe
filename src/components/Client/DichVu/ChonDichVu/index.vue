<template>
    <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-3">
            <div class="card rounded-3">
                <div class="card-header " style="background-color: darkblue;">
                    <h3 class="text-white">Thông tin cơ sở y tế</h3>
                </div>
                <div class="card-body">
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-building"></i> Phòng khám PetCare
                    </p>
                    <p class="ms-3" style="font-size: 15px;">03 Quang Trung, Hải Châu 1, Hải Châu, Đà Nẵng</p>
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-stethoscope"></i> Dịch vụ:</p>
                    <p class="ms-3" style="font-size: 15px;">Lorem ipsum dolor sit amet.</p>
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-sack-dollar"></i> Giá tiền:</p>
                    <p class="ms-3" style="font-size: 15px;">250.000</p>
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-calendar-days"></i> Ngày:</p>
                    <p class="ms-3" style="font-size: 15px;">20/05/2025</p>
                    <p class="fw-bold" style="font-size: 20px;"><i class="fa-solid fa-clock"></i> Giờ:</p>
                    <p class="ms-3" style="font-size: 15px;">8:00 pm </p>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="card">
                <div class="card-header" style="background-color: darkblue;">
                    <h3 class="text-white text-center">Vui lòng xác nhận dịch vụ</h3>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Tên dịch vụ </th>
                                <th class="text-center align-middle">Giá tiền</th>
                                <th class="text-center align-middle">Hành động </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center align-middle">1</td>
                                <td class="text-center align-middle">Lorem ipsum dolor sit amet consectetur adipisicing.
                                </td>
                                <td class="text-center align-middle">250.000</td>
                                <td class="text-center align-middle">
                                    <button class="btn btn-outline-secondary" data-bs-toggle="modal"
                                        data-bs-target="#info">Chi tiết</button>
                                    <router-link to="">
                                        <button class="btn btn-primary ms-2 btn-hover">Đặt khám ngay</button>
                                    </router-link>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="info" tabindex="-1" style="display: none;" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content" >
                            <div class="modal-header " style="background-color: #5268bc;">
                                <h5 class="modal-title text-white">Thông tin dịch vụ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-black">
                                <p>Thời gian nhận bệnh: <br>
                                    Thứ 2 đến thứ 7. <br>
                                    Buổi sáng: 7h30 - 11h30. 
                                    <br>Buổi chiều: 13h00 - 17h30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-1"></div>
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