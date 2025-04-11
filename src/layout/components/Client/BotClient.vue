<template>
    <div class="container">
        <div class="card p-4 my-4 shadow">
            <h3 class="mb-3">ĐÁNH GIÁ DỊCH VỤ NGAY <i class="fa-solid fa-comment" style="color: #2c60ba;"></i></h3>
            <!-- Hiển thị tên người dùng -->
            <div class="mb-2">
                <i class="fa-solid fa-circle-user me-2 fa-2x" style="color: #2963c7;"></i>
                <label class="text-black" style="font-size: 18px;" for="">Tên người dùng</label>
            </div>
            <!-- Nhập bình luận -->
            <div class="mb-3">
                <textarea class="form-control" rows="3" v-model="comment"
                    placeholder="Nhập bình luận của bạn..."></textarea>
            </div>
            <!-- Nút gửi -->
            <p class="text-end"><button style="width: 130px;" class="btn btn-primary">Gửi đánh giá</button></p>
            <!-- Danh sách đánh giá đã gửi
    <div v-if="reviews.length" class="mt-4">
      <h5>Đánh giá gần đây:</h5>
      <div
        v-for="(rev, index) in reviews"
        :key="index"
        class="border-top pt-2 mt-2"
      >
        <strong>{{ rev.username }}</strong>
        <div>
          <span v-for="star in 5" :key="star">
            <i
              :class="star <= rev.rating ? 'text-warning fas fa-star' : 'text-muted far fa-star'"
            ></i>
          </span>
        </div>
        <p class="mb-0">{{ rev.comment }}</p>
      </div>
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

}
</script>
<style></style>