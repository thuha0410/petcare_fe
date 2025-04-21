<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between text-nowrap " style="background-color: darkblue;">
            <h3 class="text-white" style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">QUẢN LÝ
                TỒN KHO</h3>
        </div>

        <div class="card-body ">

            <div class="row align-items-end mb-3">
                <!-- Khối lọc theo kho -->
                <div class="col-lg-4">
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
                <div class="col-lg-4">
                    <label class="form-label">Tìm kiếm</label>
                    <div class="input-group">
                        <input v-model="filter.search" type="text" class="form-control" placeholder="Nhập tên thuốc...">
                        <button class="btn btn-outline-secondary" v-on:click="timKiem()">
                            <i class="fa-solid fa-magnifying-glass"></i> Tìm
                        </button>
                    </div>
                </div>
                <!-- ghi chú màu sắc -->
                <div class="col-lg-4 d-flex justify-content-end align-items-end gap-4 mt-2">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle me-2" style="width: 16px; height: 16px; background-color: #f2a6a6;">
                        </div>
                        <span>Hết hạn</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle me-2" style="width: 16px; height: 16px; background-color: #fbecb6;">
                        </div>
                        <span>Sắp hết hạn</span>
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
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in list_ton_kho" :key="index" :class="{
                                'table-danger': new Date(item.han_su_dung) < new Date(),
                                'table-warning': isSapHetHan(item.han_su_dung)
                            }">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.ten_kho || '[N/A]' }}</td>
                                <td>{{ item.ten_thuoc || '[N/A]' }}</td>
                                <td>{{ item.gia_nhap.toLocaleString() }} VND</td>
                                <td>{{ item.so_luong_ton_kho }}</td>
                                <td>{{ item.han_su_dung }}</td>
                                <td>{{ item.ngay_nhap }}</td>
                                <td>
                                    <span style="font-size: 16px;" v-if="new Date(item.han_su_dung) < new Date()"
                                        class="">
                                        Hết hạn</span>
                                    <span v-else-if="isSapHetHan(item.han_su_dung)" style="font-size: 16px;"
                                        class="text-dark">Sắp hết
                                        hạn</span>

                                </td>

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
    async mounted() {
        await this.loaddataKho();  // Chờ dữ liệu kho về trước
        this.loadTonKho();
    },
    methods: {
        loaddataKho() {
            return axios.get("http://127.0.0.1:8000/api/kho/load")
                .then((res) => {
                    this.list_kho = res.data.data;
                    console.log('Danh sách kho:', this.list_kho);
                });
        },
        isSapHetHan(han_su_dung) {
            const today = new Date();
            const hsd = new Date(han_su_dung);
            const diff = (hsd - today) / (1000 * 60 * 60 * 24); // số ngày
            return diff >= 0 && diff <= 30; // sắp hết hạn trong vòng 30 ngày
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