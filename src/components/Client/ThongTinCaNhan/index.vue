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
                            src="https://png.pngtree.com/png-vector/20220527/ourlarge/pngtree-unknown-person-icon-avatar-question-png-image_4760937.png" />
                    </div>

                    <!-- Thông tin cá nhân -->
                    <div class="col-lg-8 flex-column justify-content-start align-items-start">
                        <div class="row">
                            <div class="col-lg-6">
                                <h3 style="margin-top: 0; font-weight: bold; margin-bottom: 20px; color: white;">Thông
                                    tin cá
                                    nhân</h3>
                            </div>
                            <div class="col-lg-6 text-end">
                                <button @click="sua_kh = { ...user }" data-bs-toggle="modal"
                                    data-bs-target="#capnhatttcn" title="Cập nhật thông tin cá nhân"
                                    class="btn text-nowrap"
                                    style="margin-left: auto; background-color: white; color: #2c4b85; padding: 6px 24px; border-radius: 6px;">
                                    <i class="fa-solid fa-user-pen"></i>
                                </button>
                                <button data-bs-toggle="modal" title="Đổi mật khẩu" data-bs-target="#doimatkhau"
                                    class="ms-2 btn text-nowrap"
                                    style="margin-left: auto; background-color: white; color: #2c4b85; padding: 6px 24px; border-radius: 6px;">
                                    <i class="fa-solid fa-key"></i>
                                </button>
                            </div>
                        </div>

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


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Phần lịch hẹn đã đặt -->
    <div class="row mt-5">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <h2 class="text-center fw-bold" style="color: darkblue;">Lịch hẹn đã đặt <i class="fa-solid fa-calendar-check" style="color: darkblue;"></i></h2>
            <br>
            <div class="card shadow" style="border-radius: 16px;">
                <div class="card-header" style="background-color: #2c4b85; color: white; border-radius: 16px 16px 0 0;">
                    <h4 class="mb-0">Danh sách lịch hẹn</h4>
                </div>
                <div class="card-body">
                    <div v-if="lichHenList.length === 0" class="text-center p-4">
                        <p class="text-muted">Bạn chưa có lịch hẹn nào</p>
                    </div>
                    <div v-else class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Dịch vụ</th>
                                    <th>Thú cưng</th>
                                    <th>Ngày hẹn</th>
                                    <th>Giờ hẹn</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Thanh toán</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in lichHenList" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.ten_dv }}</td>
                                    <td>{{ item.ten_pet }}</td>
                                    <td>{{ item.ngay }}</td>
                                    <td>{{ item.gio }}</td>
                                    <td>{{ formatCurrency(item.gia) }}</td>
                                    <td>
                                        <span :class="getStatusClass(item.tinh_trang)">
                                            {{ getStatusText(item.tinh_trang) }}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            v-if="canPayOnline(item)" 
                                            @click="thanhToanVNPay(item)"
                                            class="btn btn-success btn-sm">
                                            <i class="fa-solid fa-credit-card me-1"></i> Thanh toán ngay
                                        </button>
                                        <span v-else-if="item.tinh_trang === '1'" class="badge bg-success">Đã thanh toán</span>
                                        <span v-else class="text-muted">-</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-2"></div>
    </div>
    
    <div class="row ">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <h2 class="text-center fw-bold mt-5" style="color: darkblue;">Thú cưng của tôi <i
                    class="fa-solid fa-paw fa-bounce" style="color: darkblue;"></i></h2>
            <br>
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div v-for="(value, index) in danh_sach_pet" :key="index" class="card shadow"
                        style="border-radius: 16px; background-color: #e6f2ff;">
                        <div class="text-end " style="background-color: white;">
                            <button v-on:click="Object.assign(xoa_pet, value)" data-bs-toggle="modal"
                                data-bs-target="#xoa" class="btn "><i class="fa-solid fa-circle-xmark  "
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
                            <button v-on:click="Object.assign(update_pet, value)" data-bs-toggle="modal"
                                data-bs-target="#capnhatttp" class="btn btn-outline-primary px-4 rounded-pill">Cập
                                nhật</button>
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

    <!-- Modal đổi mật khẩu -->
    <div class="modal fade" id="doimatkhau" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">ĐỔI MẬT KHẨU</h1>
                </div>
                <div class="modal-body">
                    <label>Mật khẩu cũ</label>
                    <input v-model="matkhau.mat_khau_cu" class="form-control mb-2" type="password" />

                    <label>Mật khẩu mới</label>
                    <input v-model="matkhau.mat_khau_moi" class="form-control mb-2" type="password" />

                    <label>Xác nhận mật khẩu mới</label>
                    <input v-model="matkhau.xac_nhan_mat_khau" class="form-control mb-2" type="password" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal" v-on:click="doiMatKhau()">Đổi mật khẩu</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modalxoa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="background-color: red;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">Thông báo!!</h1>
                </div>
                <div class="modal-body text-dark">
                    Bạn có chắc chắn muốn xóa <b>{{ xoa_pet.ten_pet }}</b> không?
                </div>
                <div class="modal-footer">
                    <button v-on:click="xoapet()" type="button" class="btn" style="background-color: red; color: white;"
                        data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal them pet -->
    <div class="modal fade" id="them" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
                        <i class="fa-solid fa-paw me-2"></i>THÊM THÚ CƯNG MỚI
                    </h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Tên thú cưng: <span class="text-danger">*</span></label>
                                <input v-model="pet.ten_pet" class="form-control" type="text"
                                    placeholder="Nhập tên thú cưng" required />
                                <small class="text-muted">Tên gọi của thú cưng của bạn</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Chủng loại: <span class="text-danger">*</span></label>
                                <select v-model="pet.chung_loai" class="form-select">
                                    <option value="">-- Chọn loại thú cưng --</option>
                                    <option value="0">Chó</option>
                                    <option value="1">Mèo</option>
                                </select>
                                <small class="text-muted">Loại thú cưng của bạn</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Giới tính: <span class="text-danger">*</span></label>
                                <select v-model="pet.gioi_tinh" class="form-select">
                                    <option value="">-- Chọn giới tính --</option>
                                    <option value="0">Đực</option>
                                    <option value="1">Cái</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Hình ảnh:</label>
                                <input v-model="pet.hinh_anh" class="form-control" type="text"
                                    placeholder="Nhập URL hình ảnh" />
                                <small class="text-muted">Đường dẫn URL đến hình ảnh thú cưng</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tuổi: <span class="text-danger">*</span></label>
                                <input v-model="pet.tuoi" class="form-control" type="number" min="0"
                                    placeholder="Nhập tuổi" required />
                                <small class="text-muted">Tuổi của thú cưng (tính theo năm)</small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Cân nặng (kg): <span class="text-danger">*</span></label>
                                <input v-model="pet.can_nang" class="form-control" type="number" min="0" step="0.1"
                                    placeholder="Nhập cân nặng" required />
                                <small class="text-muted">Cân nặng của thú cưng tính bằng kg</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fa-solid fa-times me-1"></i> Hủy
                    </button>
                    <button v-on:click="thempet()" type="button" class="btn"
                        style="background-color: #2c4b85; color: white;" data-bs-dismiss="modal">
                        <i class="fa-solid fa-plus me-1"></i> Thêm thú cưng
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal update client -->
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
                    <input v-model="sua_kh.email" class="form-control mb-2" type="text" readonly
                        style="background-color: #f8f9fa;" />

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
    <!-- modal update pet -->
    <div class="modal fade" id="capnhatttp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #2c4b85;">
                    <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">CẬP NHẬT THÔNG TIN PET</h1>
                </div>
                <div class="modal-body">
                    <label>Tên pet:</label>
                    <input v-model="update_pet.ten_pet" class="form-control mb-2" type="text" />

                    <label>Hình ảnh:</label>
                    <input v-model="update_pet.hinh_anh" class="form-control mb-2" type="text" />

                    <label>Chủng loại:</label>
                    <select v-model="update_pet.chung_loai" class="form-control mb-2 form-select">
                        <option value="0">Chó</option>
                        <option value="1">Mèo</option>
                    </select>

                    <label>Giới tính:</label>
                    <select v-model="update_pet.gioi_tinh" class="form-control form-select" name="" id="">
                        <option value="0">Đực</option>
                        <option value="1">Cái</option>
                    </select>

                    <label>Tuổi:</label>
                    <input v-model="update_pet.tuoi" class="form-control mb-2" type="text" />

                    <label>Cân nặng:</label>
                    <input v-model="update_pet.can_nang" class="form-control mb-2" type="text" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn" style="background-color: #2c4b85; color: white;"
                        data-bs-dismiss="modal" v-on:click="updatepet()">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import apiClient from "@/services/apiClient";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            loading: true,
            user: {
                ho_va_ten: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                tinh_trang: '',
                hinh_anh: '',
                created_at: '',
                updated_at: ''
            },
            sua_kh: {},
            pet: {
                ten_pet: '',
                chung_loai: '',
                gioi_tinh: '',
                tuoi: '',
                hinh_anh: '',
                can_nang: ''

            },
            update_pet: {},
            xoa_pet: {},
            danh_sach_pet: [],
            matkhau: {
                mat_khau_cu: '',
                mat_khau_moi: '',
                xac_nhan_mat_khau: ''
            },
            lichHenList: [], // Danh sách lịch hẹn
        };
    },
    mounted() {
        this.getUserInfo();
        window.scrollTo(0, 0);
        this.getLichHen(); // Load lịch hẹn khi component mount
    },
    methods: {
        getLichHen() {
            const token = localStorage.getItem("token_client");
            if (!token) {
                return;
            }
            
            apiClient.get("/api/lich-hen/danh-sach-lich-hen", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(res => {
                if (res.data.status === 1) {
                    this.lichHenList = res.data.data;
                } else {
                    toaster.error(res.data.message || "Không thể tải lịch hẹn");
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
                toaster.error("Có lỗi xảy ra khi tải danh sách lịch hẹn");
            });
        },
        
        getStatusText(status) {
            const statusMap = {
                '0': 'Chờ xác nhận',
                '1': 'Đã xác nhận',
                '2': 'Đã hoàn thành',
                '3': 'Đã hủy'
            };
            return statusMap[status] || 'Không xác định';
        },
        
        getStatusClass(status) {
            const classMap = {
                '0': 'badge bg-warning',
                '1': 'badge bg-primary',
                '2': 'badge bg-success',
                '3': 'badge bg-danger'
            };
            return classMap[status] || '';
        },
        
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND',
                maximumFractionDigits: 0
            }).format(value);
        },
        
        canPayOnline(lichHen) {
            // Chỉ cho phép thanh toán nếu lịch hẹn chưa được thanh toán và đã xác nhận
            return lichHen.tinh_trang === '0' || (lichHen.tinh_trang === '1' && !lichHen.da_thanh_toan);
        },
        
        thanhToanVNPay(lichHen) {
            apiClient.post('/api/vnpay/tao-url-thanh-toan', {
                id_lich_hen: lichHen.id,
                so_tien: lichHen.gia,
                noi_dung: `Thanh toán đặt lịch: ${lichHen.ten_dv} - ${lichHen.ten_pet}`
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token_client')
                }
            })
            .then(res => {
                if (res.data.status === 1 && res.data.payment_url) {
                    // Chuyển hướng đến trang thanh toán VNPay
                    window.location.href = res.data.payment_url;
                } else {
                    toaster.error(res.data.message || "Không thể tạo liên kết thanh toán");
                }
            })
            .catch(error => {
                console.error("Lỗi khi tạo URL thanh toán:", error);
                toaster.error("Có lỗi xảy ra khi tạo liên kết thanh toán");
            });
        },
        doiMatKhau() {
            apiClient.post('/api/khach-hang/doi-mat-khau-tcn', this.matkhau)
                .then(res => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        this.matkhau.mat_khau_cu = '';
                        this.matkhau.mat_khau_moi = '';
                        this.matkhau.xac_nhan_mat_khau = '';
                        localStorage.removeItem('token_client');
                        setTimeout(() => {
                            this.$router.push('/client/dang-nhap-dang-ky');
                        }, 1000);
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.errors;
                        for (let field in errors) {
                            errors[field].forEach(err => {
                                toaster.error(err);
                            });
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi máy chủ.');
                    }
                });
        },
        getUserInfo() {
            const token = localStorage.getItem("token_client");
            if (!token) {
                this.loading = false;
                this.$router.push("/client/dang-nhap-dang-ky");
                return;
            }
            apiClient.get("/api/khach-hang/lay-du-lieu")
                .then((res) => {
                    if (res.data.status === 1) {
                        const user = res.data.data;
                        this.user = {
                            id: user.id,
                            ho_va_ten: user.ho_va_ten,
                            email: user.email,
                            so_dien_thoai: user.so_dien_thoai,
                            ngay_sinh: user.ngay_sinh,
                            tinh_trang: user.tinh_trang,
                            hinh_anh: user.hinh_anh,
                            created_at: user.created_at,
                            updated_at: user.updated_at
                        };
                        this.getPets(user.id);
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        const status = error.response.status;

                        if (status === 401) {
                            localStorage.removeItem("token_client");
                            this.$router.push("/client/dang-nhap-dang-ky");
                        } else if (status === 422 && error.response.data.errors) {
                            const errors = error.response.data.errors;
                            for (let field in errors) {
                                errors[field].forEach(err => {
                                    toaster.error(err);
                                });
                            }
                        } else if (error.response.data?.message) {
                            toaster.error(error.response.data.message);
                        } else {
                            toaster.error("Lỗi không xác định từ máy chủ.");
                        }
                    } else {
                        toaster.error("Không kết nối được tới máy chủ.");
                    }
                })

                .finally(() => {
                    this.loading = false;
                });
        },
        updatepet() {
            apiClient.post('/api/khach-hang/update-pet', this.update_pet)
                .then(res => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        this.getPets(this.user.id);
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.errors;
                        for (let field in errors) {
                            errors[field].forEach(err => {
                                toaster.error(err);
                            });
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi máy chủ.');
                    }
                });
        },
        xoapet() {
            if (!this.xoa_pet || !this.xoa_pet.id) {
                toaster.error('Không tìm thấy thú cưng cần xoá.');
                return;
            }
            apiClient.post('/api/khach-hang/xoa-pet', this.xoa_pet)
                .then(res => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        this.getPets(this.user.id);
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(() => {
                    toaster.error('Đã xảy ra lỗi khi xóa pet.');
                });
        },
        thempet() {
            apiClient.post('/api/khach-hang/them-pet', this.pet)
                .then(res => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        this.getPets(this.user.id);
                        this.pet = {
                            ten_pet: '',
                            chung_loai: '',
                            gioi_tinh: '',
                            tuoi: '',
                            hinh_anh: '',
                            can_nang: ''
                        };
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.errors;
                        for (let field in errors) {
                            errors[field].forEach(err => {
                                toaster.error(err);
                            });
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi máy chủ.');
                    }
                });
        },
        getPets(id_kh) {
            const token = localStorage.getItem("token_client");
            if (!token) {
                this.$router.push("/client/dang-nhap-dang-ky");
                return;
            }
            apiClient.get(`/api/pets/${id_kh}`)
                .then((res) => {
                    this.danh_sach_pet = res.data.pets;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem("token_client");
                        this.$router.push("/client/dang-nhap-dang-ky");
                    } else {
                        toaster.error("Có lỗi xảy ra khi lấy danh sách thú cưng");
                    }
                });
        },
        sua() {
            apiClient.post('/api/khach-hang/sua', this.sua_kh)
                .then((res) => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message);
                        this.getUserInfo();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        let errors = error.response.data.errors;
                        for (let field in errors) {
                            errors[field].forEach(err => {
                                toaster.error(err);
                            });
                        }
                    } else {
                        toaster.error('Đã xảy ra lỗi máy chủ.');
                    }
                });
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

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css';

.table th, .table td {
    vertical-align: middle;
}

.badge {
    font-size: 0.85rem;
    padding: 0.35em 0.65em;
}
</style>