<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap " style="background-color: darkblue;">
            <h3 class="text-white" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                TỒN KHO</h3>
        </div>

        <div class="card-body ">

            <div class="row align-items-end mb-3">
                <!-- Khối lọc theo kho -->
                <div class="col-md-4">
                    <label class="form-label">Chọn kho</label>
                    <div class="input-group">
                        <select v-model="filter.kho" class="form-select">
                            <option value="">-- Tất cả kho --</option>

                            <template v-for="(value, index) in list_kho" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_kho }}</option>
                            </template>
                        </select>
                        <button class="btn btn-dark" v-on:click="locTheoKho()">Lọc</button>
                    </div>
                </div>

                <!-- Khối tìm kiếm thuốc -->
                <div class="col-md-4">
                    <label class="form-label">Tìm kiếm</label>
                    <div class="input-group">
                        <input v-model="filter.search" type="text" class="form-control" placeholder="Nhập tên thuốc...">
                        <button class="btn btn-outline-secondary" v-on:click="timKiem()">
                            <i class="fa-solid fa-magnifying-glass"></i> Tìm
                        </button>
                    </div>
                </div>
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
                            <td>{{ item.ten_kho || '[N/A]' }}</td>
                            <td>{{ item.ten_thuoc || '[N/A]' }}</td>
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
            list_kho: [],
            tim_kiem: {
                noi_dung: ''
            },
            filter: {
                kho: '',
                search: ''
            }
        }
    },
    mounted() {
        this.loaddataKho()
        this.loadTonKho()
    },
    methods: {
        loaddataKho() {
            axios
                .get("http://127.0.0.1:8000/api/kho/load", {
                })
                .then((res) => {
                    this.list_kho = res.data.data
                    console.log(this.list_kho);

                });
        },
        loadTonKho() {
            axios.get("http://127.0.0.1:8000/api/thuoc-kho/load")
                .then((res) => {
                    this.list_ton_kho = res.data.data;
                });
        },
        timKiem() {
            axios
                .post('http://127.0.0.1:8000/api/thuoc-kho/tim-kiem', {
                    noi_dung: this.filter.search
                })
                .then(res => {
                    this.list_ton_kho = res.data.data;
                });
        },
        locTheoKho() {
            axios
            .post('http://127.0.0.1:8000/api/thuoc-kho/loc', {
                id_kho: this.filter.kho
            })
            .then(res => {
                this.list_ton_kho = res.data.data;
            });
        },
    },
}
</script>
<style></style>