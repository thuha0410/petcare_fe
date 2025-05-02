<template>
    <hr>
    <div class="container mt-5">
        <div class="card p-4 shadow-sm" style="background-color: #e9f0fc; border-radius: 16px; border: none;">
            <!-- Tiêu đề -->
            <h4 style="color: #1F365E;" class="mb-4 fw-bold d-flex align-items-center">
                <i class="fa-solid fa-comment-dots me-2"></i>
                Đánh giá dịch vụ ngay
            </h4>

            <!-- Thông tin người dùng -->
            <div class="d-flex align-items-center mb-3">
                <i style="color: #1F365E;" class="fa-solid fa-circle-user fa-2x me-3"></i>
                <label class="mb-0 fs-5 text-dark">Tên người dùng</label>
            </div>

            <!-- Ô nhập bình luận -->
            <div class="mb-4">
                <textarea class="form-control" rows="4" v-model="comment" placeholder="Nhập bình luận của bạn..."
                    style="resize: none; border-radius: 12px;"></textarea>
            </div>

            <!-- Nút gửi -->
            <p class="text-end"><button v-on:click="them()" style="width: 130px;" class="btn btn-primary">Gửi đánh giá</button></p>
            <!-- Danh sách đánh giá đã gửi
    </div> -->
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
export default {
    data() {
        return {
            danh_gia: []
        }
    },
    methods: {
        them() {
            axios
                .post('http://127.0.0.1:8000/api/danh-gia/them', this.danh_gia)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.dich_vu = {
                            'id_kh':"",
                            'noi_dung':"",
                            'ngay_tao':"",
                            'tinh_trang':"",
                        }
                    } else {
                        toaster.error('Thêm mới đánh giá thất bại')
                    }
                })
                .catch((res) => {
                    toaster.error(res.response.data.message);
                })

        },
    },

}
</script>
<style></style>