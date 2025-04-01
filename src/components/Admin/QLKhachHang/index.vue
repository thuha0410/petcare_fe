<template >

   <div class="card">
       <div class="card-header">
           <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH SÁCH KHÁCH HÀNG</h3>
       </div>
       <div class="card-body">
           <div class="table table-resposive">
               <table class="table table-bordered">
                   <thead>
                       <tr class="text-center align-middle">
                           <th>#</th>
                           <th>Họ và tên</th>
                           <th>Số điện thoại</th>
                           <th>Email</th>
                           <th>Ngày sinh</th>
                           <th>Tình trạng</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       
                           <tr class="text-center align-middle">
                           <th>1</th>
                           <td>Lương Văn Aí</td>
                           <td>0934750153</td>
                           <td>tthello123@gmail.com</td>
                           <td>28/04/2003</td>
                           <td>
                               <button class="btn btn-success me-2">Hoạt động</button>
                               <button class="btn btn-warning ">Ngưng hoạt động</button>
                           </td>
                           <td>
                               <button data-bs-toggle="modal" data-bs-target="#capnhat" style="width:100px;" class="btn btn-primary me-2">Cập nhật</button>
                               <button data-bs-toggle="modal" data-bs-target="#xoa" style="width:100px;" class="btn btn-danger ">Xóa</button>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </div>
   <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">THÔNG BÁO!</h1>
                </div>
                <div class="modal-body">
                    <h5>Bạn có muốn xóa không?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h1 class="modal-title fs-5 text-white " id="exampleModalLabel">CẬP NHẬT THÔNG TIN</h1>
                </div>
                <div class="modal-body">
                    <label for="">Họ và tên</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Số điện thoại</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Email</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Ngày sinh</label>
                    <input class="form-control mb-2" type="text">
                    <label for="">Tình trạng</label>
                    <select class="form-control mb-2" name="" id="">
                        <option value="0">Nghỉ</option>
                        <option value="1">Hoạt động</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  
}
</script>
<style >
   
</style>