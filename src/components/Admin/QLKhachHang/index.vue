<template>

    <div class="card">
        <div class="card-header">
            <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH
                SÁCH KHÁCH HÀNG</h3>
        </div>
        <div class="card-body">
            <div class="input-group mb-3">
                <input v-model="tim_kiem.noi_dung" type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
                <button v-on:click="timkiem()" class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i
                        class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
            <div class="table table-resposive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>#</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Ngày sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_khach_hang" :key="index">
                            <tr class="text-center align-middle">
                                <th>{{ index + 1 }}</th>
                                <td>{{ value.ho_va_ten }}</td>
                                <td>{{ value.so_dien_thoai }}</td>
                                <td>{{ value.email }}</td>
                                <td>{{ value.ngay_sinh }}</td>
                            </tr>
                        </template>
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
    methods: {
        load() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/load')
                .then((res) => {
                    this.list_khach_hang = res.data.data
                })
        },
        timkiem() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/tim-kiem', this.tim_kiem)
                .then((res) => {
                    this.list_khach_hang = res.data.data
                })
        },
    },
    mounted() {
        this.load()
    },
    data() {
        return {
            khach_hang: {
                'ho_va_ten': '',
                'email': '',
                'password': '',
                'so_dien_thoai': '',
                'ngay_sinh': '',
            },
            list_khach_hang: [],
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
}
</script>
<style>
/* body{
      background-color: #ffedd4
   } */
</style>