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
                            src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg" />
                    </div>

                    <!-- Thông tin cá nhân -->
                    <div class="col-lg-8 d-flex flex-column justify-content-start align-items-start">
                        <h3 style="margin-top: 0; font-weight: bold; margin-bottom: 20px; color: white;">Thông tin cá
                            nhân</h3>
                        <div class="row">
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Họ và Tên:</strong> {{ user.ho_va_ten }}
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Email:</strong> {{ user.email }}
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Số điện thoại:</strong> {{ user.so_dien_thoai }}
                            </div>
                            <div style="font-size: 16px; margin-bottom: 12px;">
                                <strong>Ngày sinh:</strong> {{ user.ngay_sinh }}
                            </div>

                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3" style="width: 100%;">
                            <p class="text-success m-0">
                                <i class="fa-solid fa-shield-cat"></i> PetCare
                            </p>
                            <button @click="sua_kh = { ...user }" data-bs-toggle="modal" data-bs-target="#capnhatttcn"
                                class="btn text-nowrap"
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
                    <div v-for="(value, index) in danh_sach_pet" :key="index" class="card shadow"
                        style="border-radius: 16px; background-color: #e6f2ff;">
                        <div class="text-end " style="background-color: white;">
                            <button data-bs-toggle="modal" data-bs-target="#xoa" class="btn "><i
                                    class="fa-solid fa-circle-xmark  "
                                    style="color: #ff0000; font-size: 25px;"></i></button>
                        </div>
                        <div class="card-header bg-white d-flex justify-content-center border-0 pt-4">
                            <img :src="value.hinh_anh" class="img-fluid rounded-circle shadow-sm"
                                style="width: 120px; height: 120px; object-fit: cover;">
                        </div>
                        <div class="card-body text-center text-dark">
                            <h4 class="mb-3 text-primary">{{ value.ten_pet }}</h4>
                            <div class="d-flex justify-content-around px-4 mb-2">
                                <span><strong>Chủng loại:</strong> {{ chuyenChungLoai(value.chung_loai) }}</span>
                                <span><strong>Giới tính:</strong> {{ chuyenGioiTinh(value.gioi_tinh) }}</span>
                            </div>
                            <div class="d-flex justify-content-around px-4">
                                <span><strong>Tuổi:</strong>{{ value.tuoi }}</span>
                                <span><strong>Cân nặng:</strong>{{ value.can_nang }}</span>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent text-center border-0 pb-4">
                            <button data-bs-toggle="modal" data-bs-target="#capnhatttp"
                                class="btn btn-outline-primary px-4 rounded-pill">Cập nhật</button>
                        </div>
                    </div>
                    <div class="text-center">
                        <button data-bs-toggle="modal" data-bs-target="#them"
                            style="background-color: #2c4b85; color: white;" class="btn px-4 rounded-pill ">+ Thêm
                            pet</button>
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
                    <input v-model="sua_kh.ho_va_ten" class="form-control mb-2" type="text" />
                    <label>Email</label>
                    <input v-model="sua_kh.email" class="form-control mb-2" type="text" />
                    <label>Số điện thoại</label>
                    <input v-model="sua_kh.so_dien_thoai" class="form-control mb-2" type="text" />
                    <label>Ngày sinh</label>
                    <input v-model="sua_kh.ngay_sinh" class="form-control mb-2" type="date" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal" v-on:click="sua()">Cập nhật</button>
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
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            user: {
                ho_va_ten: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: ''
            },
            sua_kh: {
            },
            danh_sach_pet: []
        };
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            const token = localStorage.getItem("token_client");
            if (!token) {
                console.warn("Không tìm thấy token.");
                return;
            }
            axios
                .get("http://127.0.0.1:8000/api/user/info", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    const user = res.data;
                    this.user = {
                        id: user.id,
                        ho_va_ten: user.ho_va_ten,
                        email: user.email,
                        so_dien_thoai: user.so_dien_thoai,
                        ngay_sinh: user.ngay_sinh
                    };
                    this.getPets(user.id);
                })
                .catch((err) => {
                    console.error("Lỗi khi lấy thông tin người dùng:", err);
                });
        },
        getPets(id_kh) {
            const token = localStorage.getItem("token_client");
            if (!token) {
                console.warn("Không tìm thấy token.");
                return;
            }
            axios
                .get(`http://127.0.0.1:8000/api/pets/${id_kh}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    this.danh_sach_pet = res.data.pets; // Lưu danh sách thú cưng vào data
                })
                .catch((err) => {
                    console.error("Lỗi khi lấy danh sách thú cưng:", err);
                });
        },
        sua() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/sua', this.sua_kh,
                    // {
                    //     headers: {
                    //         Authorization: 'Bearer ' + localStorage.getItem('token_client')
                    //     }
                    // }
                )
                .then(
                    (res) => {
                        if (res.data.status == 1)
                            toaster.success(res.data.message)
                        this.getUserInfo();
                    }
                )
        },
        chuyenGioiTinh(gt) {
            return gt == 0 ? 'Đực' : 'Cái';
        },
        chuyenChungLoai(cl) {
            return cl == 0 ? 'Chó' : 'Mèo';
        }
    }
};
</script>