<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="ms-2">DANH SÁCH CHỨC VỤ</h4>
                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Tên chức vụ</th>
                                <th class="text-center align-middle">Cấp quyền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_chuc_vu" :key="index">
                                <tr>
                                    <td class="text-center align-middle">{{ index + 1 }}</td>
                                    <td class="text-center align-middle">{{ value.ten_chuc_vu }}</td>
                                    <td class="text-center align-middle">
                                        <button v-on:click="Object.assign(chuc_vu, value), loadCQ()"
                                            class="btn btn-primary">Thêm
                                            quyền</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="ms-2">DANH SÁCH CHỨC NĂNG</h4>
                    <div class="input-group mb-3">
                        <input v-model="tim_kiem.noi_dung" type="text" class="form-control"
                            placeholder="Tìm kiếm chức năng" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button v-on:click="tim_kiem_chuc_nang()" class="btn btn-outline-secondary text-dark"
                            type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"
                                style="color: #000000;"></i>Tìm</button>
                    </div>
                    <hr>
                    <div style="max-height: 500px; overflow-y: auto;">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle">#</th>
                                    <th class="text-center align-middle">Tên chức năng</th>
                                    <th class="text-center align-middle">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="chuc_vu.ten_chuc_vu != null">
                                <template v-for="(value, index) in list_chuc_nang" :key="index">
                                    <tr class="text-center align-middle">
                                        <th>{{ index + 1 }}</th>
                                        <td>{{ value.ten_chuc_nang }}</td>
                                        <td>
                                            <button v-on:click="CapQuyen(value)" class="btn btn-primary">Cấp
                                                quyền</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4>ĐANG PHÂN QUYỀN CHO: <strong class="text-primary">{{ chuc_vu.ten_chuc_vu }}</strong></h4>
                </div>
                <div class="card-body">
                    <div class="table table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center text-nowrap align-middle">
                                    <th>Tên chức năng</th>
                                    <th>Tên chức vụ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_daPhanQuyen" :key="index">
                                    <tr class="text-center align-middle">
                                        <th>{{ value.ten_chuc_nang }}</th>
                                        <td>{{ value.ten_chuc_vu }}</td>
                                        <td>
                                            <button v-on:click="xoa(value)" class="btn btn-danger"><i
                                                    class="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });
export default {
    data() {
        return {
            list_chuc_nang: [],
            list_chuc_vu: [],
            chuc_vu: {
                ten_chuc_vu: null,
            },
            list_daPhanQuyen: [],
            tim_kiem: {
                noi_dung: ''
            }
        }
    },
    mounted() {
        this.load_chuc_vu(),
            this.load_chuc_nang(),
            this.loadCQ()
    },
    methods: {
        load_chuc_vu() {
            axios
                .get('http://127.0.0.1:8000/api/phan-quyen/load-chuc-vu',
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_chuc_vu = res.data.data
                })
        },
        load_chuc_nang() {
            axios
                .get('http://127.0.0.1:8000/api/phan-quyen/load-chuc-nang',
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_chuc_nang = res.data.data
                })
        },
        loadCQ() {
            axios
                .post("http://127.0.0.1:8000/api/phan-quyen/load-cap-quyen", this.chuc_vu,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    this.list_daPhanQuyen = res.data.data
                })
        },
        xoa(x) {
            axios
                .post("http://127.0.0.1:8000/api/phan-quyen/xoa", x,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == 1) {
                        toaster.success(res.data.message)
                        this.loadCQ()
                    } else {
                        toaster.error(res.data.message)

                    }
                });
        },
        CapQuyen(x) {
            console.log("Giá trị nhận được khi click Cấp quyền:", x,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                    }
                }
            );
            var payload = {
                id_chuc_vu: this.chuc_vu.id,
                id_chuc_nang: x.id
            }
            console.log("Payload gửi đi:", payload);
            axios
                .post('http://127.0.0.1:8000/api/phan-quyen/cap-quyen', payload,
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                        }
                    }
                )
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadCQ()
                    } else {
                        toaster.error('Cấp quyền thất bại')
                    }
                })
        },
        tim_kiem_chuc_nang() {
            axios.post('http://127.0.0.1:8000/api/phan-quyen/tim-kiem-chuc-nang', this.tim_kiem,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_admin')
                    }
                }
            )
                .then((res) => {
                    this.list_chuc_nang = res.data.data;
                })
                .catch(() => console.error('Lỗi khi tìm kiếm'));
        }
    }

}
</script>
<style></style>