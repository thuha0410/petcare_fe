<template>
     <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="ms-2">Danh sách quyền</h5>
                    <div class="input-group mb-3 ms-2">
                        <input type="text" class="form-control" placeholder="search" aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                    </div>
                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Tên quyền</th>
                                <th class="text-center align-middle">Cấp quyền</th>
                                <th class="text-center align-middle">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                                <tr>
                                    <td class="text-center align-middle">1</td>
                                    <td class="text-center align-middle">asdfg</td>
                                    <td class="text-center align-middle">
                                        <button 
                                            class="btn btn-primary">Thêm quyền</button>
                                    </td>
                                    <td class="text-center align-middle text-nowrap">
                                        <button class="btn btn-primary"><i class="fa-solid fa-pen"></i></button>
                                        <button class="btn btn-danger ms-2"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="ms-2">Danh sách chức năng</h5>

                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Tên chức năng</th>
                                <th class="text-center align-middle">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>asdfghj</td>
                                    <td class="text-center align-middle">
                                        <span ><button 
                                                class="btn btn-primary">Cấp quyền</button></span>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <h5 class="ms-2">Đang phân quyền cho </h5>
                        <h5 class="text-danger ms-2">Bác sĩ</h5>
                    </div>

                    <hr>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">Tên chức năng</th>
                                <th class="text-center align-middle">Tên quyền</th>
                                <th class="text-center align-middle">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center align-middle">
                                        <button class="btn btn-danger">Xóa</button>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>