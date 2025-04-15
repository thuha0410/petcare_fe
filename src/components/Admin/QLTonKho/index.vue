<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap ">
            <h3 class="text-dark" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                TỒN KHO</h3>

            <button data-bs-toggle="modal" data-bs-target="#them" type="button"
                class="btn btn-outline-dark px-5 radius-30"><i class="bx bx-cloud-upload mr-1"></i>Thêm mới</button>
        </div>
        <div class="card-body ">
            <div class="input-group mb-3">
                <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button"
                    id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-responsive">
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên kho</th>
                            <th>Tên thuốc</th>
                            <th>Giá nhập</th>
                            <th>Số lượng tồn</th>
                            <th>Hạn sử dụng</th>
                            <th>Ngày nhập</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in list_ton_kho" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kho?.ten_kho || '[N/A]' }}</td>
                            <td>{{ item.thuoc?.ten_thuoc || '[N/A]' }}</td>
                            <td>{{ item.gia_nhap.toLocaleString() }} VND</td>
                            <td>{{ item.so_luong_ton_kho }}</td>
                            <td>{{ item.han_su_dung }}</td>
                            <td>{{ item.ngay_nhap }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            list_ton_kho: [],
            update_ton_kho: {},
            del_ton_kho: {},
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
}
</script>
<style></style>