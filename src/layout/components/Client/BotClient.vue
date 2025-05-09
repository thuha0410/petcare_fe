<template>
    <hr>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <div class="card p-4 shadow-sm"
                    style="background-color: #e9f0fc; border-radius: 16px; border: none; height: 400px;">
                    <!-- Tiêu đề -->
                    <h4 style="color: #1F365E;" class="mb-4 fw-bold d-flex align-items-center">
                        <i class="fa-solid fa-comment-dots me-2"></i>
                        Đánh giá dịch vụ ngay
                    </h4>

                    <!-- Thông tin người dùng -->
                    <div class="d-flex align-items-center mb-3">
                        <i style="color: #1F365E;" class="fa-solid fa-circle-user fa-2x me-3"></i>
                        <p class="mb-0 fs-5 text-dark">{{ khach_hang.ho_va_ten || 'Tên người dùng' }}</p>
                    </div>

                    <!-- Ô nhập bình luận -->
                    <div class="mb-4">
                        <textarea class="form-control" rows="4" v-model="comment"
                            placeholder="Nhập bình luận của bạn..."
                            style="resize: none; border-radius: 12px; height: 200px;"></textarea>
                    </div>

                    <!-- Nút gửi -->
                    <p class="text-end"><button v-on:click="them()" style="width: 130px;" class="btn btn-primary">Gửi
                            đánh
                            giá</button></p>
                    <!-- Danh sách đánh giá đã gửi
    </div> -->
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card p-4 shadow-sm" style="background-color: #e9f0fc; border-radius: 16px; border: none;">
                    <h4 style="color: #1F365E;" class="mb-4 fw-bold d-flex align-items-center">
                        <i class="fa-solid fa-comment-dots me-2"></i>
                        Đánh giá dịch vụ gần đây
                    </h4>

                    <div class="scroll-wrapper d-flex gap-3">
                        <div v-for="(value, index) in ds_danh_gia" :key="index" class="card shadow-sm"
                            style="min-width: 300px; border-radius: 12px;">
                            <div class="card-body">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="fa-solid fa-user-circle fa-lg me-2" style="color: #1F365E;"></i>
                                    <strong class="text-dark">{{ value.ho_va_ten || 'Ẩn danh' }}</strong>
                                </div>
                                <p class="mb-1 text-muted" style="font-size: 0.9rem;">{{ value.ngay_tao }}</p>
                                <p class="mb-0">{{ value.noi_dung }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bd-footer py-4 py-md-5 mt-5 bg-body-tertiary" style="background-color: #1F365E;">

        <div class="container">
            <span style="height: 3px; background: #fff; width: 100%;"></span>
            <div class="row">
                <div class="col-lg-3 text-center">
                    <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743171877/infodiachi-0789-42020_i1eyu0.png"
                        alt="">
                    <br>
                    <br>
                    <p class="text-white">DH Duy Tan, Da Nang
                        <br>
                        03 Quang Trung, Hải Châu 1, Hải Châu, Đà Nẵng
                    </p>
                </div>
                <div class="col-lg-3 text-center">
                    <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743171935/infophone-8934_bvmxjv.png"
                        alt="">
                    <br>
                    <br>
                    <p class="text-white">Số điện thoại liên hệ
                        <br>
                        0964810993
                    </p>
                </div>
                <div class="col-lg-3 text-center">
                    <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743171939/infoemail-2995_efjjyr.png"
                        alt="">
                    <br>
                    <br>
                    <p class="text-white">Email
                        <br>
                        Phamthithuha3112@gmail.com
                    </p>
                </div>
                <div class="col-lg-3 text-center">
                    <img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743172751/infoclock-8778_in3dcy.png"
                        alt="">
                    <br>
                    <br>
                    <p class="text-white">Thời gian mở cửa
                        <br>
                        Từ thứ 2 đến thứ 7 (8:00am - 10:00pm)
                    </p>
                </div>
                <div>
                    <span class="" style="width: 5px; color: white;"></span>
                </div>
            </div>
            <div class="text-center">
                <a href=""><img class="me-2"
                        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743173438/mxh4-3297_iyrhib.png"
                        alt=""></a>
                <a href=""><img class="me-2"
                        src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743173438/mxh1-3804_cpynwo.png"
                        alt=""></a>
                <a href=""><img src="https://res.cloudinary.com/dd1p908gm/image/upload/v1743173438/mxh5-2248_z6adrr.png"
                        alt=""></a>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            ds_danh_gia: [],
            khach_hang: {},
            comment: "",
        }
    },
    mounted() {
        this.load();
        this.loadDG();
        this.loadKH();
    },
    methods: {
        them() {
            if (!this.khach_hang.id) {
                toaster.error("Bạn cần đăng nhập để gửi đánh giá.");
                return;
            }

            const data = {
                id_kh: this.khach_hang.id,
                noi_dung: this.comment,
                ngay_tao: new Date().toISOString().split('T')[0],
                tinh_trang: 1,
            };

            axios.post("http://127.0.0.1:8000/api/danh-gia/them2", data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token_client')
                }
            }).then((res) => {
                if (res.data.status) {
                    toaster.success('Đánh giá thành công!');
                    this.comment = "";
                    this.ds_danh_gia.unshift({
                        ho_va_ten: this.khach_hang.ho_va_ten || 'Ẩn danh',
                        ngay_tao: new Date().toISOString().split('T')[0],
                        noi_dung: data.noi_dung
                    });
                } else {
                    toaster.error('Thêm mới đánh giá thất bại');
                }
            }).catch((err) => {
                toaster.error(err.response?.data?.message || "Lỗi gửi đánh giá");
            });
        },

        loadDG() {
            axios
                .get('http://127.0.0.1:8000/api/danh-gia/load2', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_client')
                    }
                })
                .then((res) => {
                    this.ds_danh_gia = res.data.data.sort((a, b) => {
                        return new Date(b.id) - new Date(a.id);
                    });
                });
        },
        load() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lay-du-lieu",
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_client')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == 1) {
                        this.khach_hang = res.data.data;
                    }
                })
                .catch(() => {
                    this.khach_hang = {};
                });
        },
        loadKH() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/load',
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_client')
                        }
                    }
                )
                .then((res) => {
                    this.khach_hang = res.data.data
                })
        },
    }
}
</script>
<style>
.scroll-wrapper {
    display: flex;
    flex-direction: column;
    /* Chuyển từ cuộn ngang sang cuộn dọc */
    overflow-y: auto;
    /* Cho phép cuộn dọc */
    max-height: 400px;
    /* Chiều cao cố định của vùng cuộn, bạn có thể thay đổi */
}

.scroll-wrapper::-webkit-scrollbar {
    width: 8px;
    /* Chiều rộng thanh cuộn dọc */
}

.scroll-wrapper::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}
</style>