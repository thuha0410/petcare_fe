<template>
    <div class="row justify-content-center mt-5">
        <div class="col-lg-10">
            <div class="card shadow-lg"
                style="background-color: #2c4b85; border-radius: 16px; color: white; padding: 20px;">
                <div class="row align-items-center p-4">
                    <!-- Ảnh đại diện -->
                    <div class="col-lg-4 d-flex flex-column align-items-center text-center"
                        style="background-color: #2c4b85; padding: 20px 0; border-radius: 16px;">
                        <img class="img-fluid rounded-circle border border-white border-4 mb-3"
                            style="height: 180px; width: 180px; object-fit: cover;"
                            src="https://th.bing.com/th/id/OIP.NyRkmREmV5XyFnRoE-t7JgHaFj?rs=1&pid=ImgDetMain" />
                    </div>

                    <!-- Thông tin cá nhân -->
                    <div class="col-lg-8 d-flex flex-column justify-content-start align-items-start">
                        <h3 style="margin-top: 0; font-weight: bold; margin-bottom: 20px; color: white;">Thông tin cá
                            nhân</h3>
                        <div class="row">
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Họ và Tên:</strong> Beyouncé
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Email:</strong> Beyonce@gmail.com
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Số điện thoại:</strong> 123123123
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Ngày sinh:</strong> 12/12/2021
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3" style="width: 100%;">
                            <p class="text-success m-0">
                                <i class="fa-solid fa-shield-cat"></i> PetCare
                            </p>
                            <button data-bs-toggle="modal" data-bs-target="#capnhatttcn" class="btn text-nowrap"
                                style="margin-left: auto; background-color: white; color: #2c4b85; padding: 6px 24px; border-radius: 6px;">
                                Cập nhật thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row ">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <h2 class="text-center fw-bold" style="color: darkblue;">Thú cưng của tôi <i
                    class="fa-solid fa-paw fa-bounce" style="color: darkblue;"></i></h2>
            <br>
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="card shadow" style="border-radius: 16px; background-color: #e6f2ff;">
                        <div class="text-end " style="background-color: white;">
                            <button data-bs-toggle="modal" data-bs-target="#xoa" class="btn "><i class="fa-solid fa-circle-xmark  " style="color: #ff0000; font-size: 25px;"></i></button>
                        </div>
                        <div class="card-header bg-white d-flex justify-content-center border-0 pt-4">
                            <img src="https://th.bing.com/th/id/OIP.NpI3mBvnVzWC3RNI3qGT8gHaE8?rs=1&pid=ImgDetMain"
                                class="img-fluid rounded-circle shadow-sm"
                                style="width: 120px; height: 120px; object-fit: cover;">
                        </div>
                        <div class="card-body text-center text-dark">
                            <h4 class="mb-3 text-primary">Butin</h4>
                            <div class="d-flex justify-content-around px-4 mb-2">
                                <span><strong>Chủng loại:</strong> Chó</span>
                                <span><strong>Giới tính:</strong> Đực</span>
                            </div>
                            <div class="d-flex justify-content-around px-4">
                                <span><strong>Tuổi:</strong> 2 tuổi</span>
                                <span><strong>Cân nặng:</strong> 3kg</span>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent text-center border-0 pb-4">
                            <button data-bs-toggle="modal" data-bs-target="#capnhatttp"
                                class="btn btn-outline-primary px-4 rounded-pill">Cập nhật</button>
                        </div>
                    </div>
                    <div class="text-center">
                        <button data-bs-toggle="modal" data-bs-target="#them" style="background-color: #2c4b85; color: white;" class="btn px-4 rounded-pill ">+ Thêm pet</button>
                    </div>
                </div>
                <div class="col-lg-2"></div>
            </div>
        </div>
        <div class="col-lg-2">
       
        </div>
    </div>
    <!-- Modal cập nhật -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="background-color: red;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Thông báo!!</h1>
                </div>
                <div class="modal-body text-dark">
                    Bạn có chắc chắn muốn xóa không?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: red; color: white;"
                        data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">NHẬP THÔNG TIN PET</h1>
                </div>
                <div class="modal-body">
                    <label>Tên pet:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Hình ảnh:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Chủng loại:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Giới tính:</label>
                    <select class="form-control" name="" id="">
                        <option value="0">Đực</option>
                        <option value="0">Cái</option>
                    </select>

                    <label>Tuổi:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Cân nặng:</label>
                    <input class="form-control mb-2" type="text" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal">Thêm</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhatttcn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">NHẬP THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label>Họ và Tên</label>
                    <input class="form-control mb-2" type="text" />
                    <label>Email</label>
                    <input class="form-control mb-2" type="text" />
                    <label>Password</label>
                    <input class="form-control mb-2" type="text" />
                    <label>Số điện thoại</label>
                    <input class="form-control mb-2" type="text" />
                    <label>Ngày sinh</label>
                    <input class="form-control mb-2" type="text" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhatttp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">CẬP NHẬT THÔNG TIN PET</h1>
                </div>
                <div class="modal-body">
                    <label>Tên pet:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Hình ảnh:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Chủng loại:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Giới tính:</label>
                    <select class="form-control" name="" id="">
                        <option value="0">Đực</option>
                        <option value="0">Cái</option>
                    </select>

                    <label>Tuổi:</label>
                    <input class="form-control mb-2" type="text" />

                    <label>Cân nặng:</label>
                    <input class="form-control mb-2" type="text" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

};
</script>