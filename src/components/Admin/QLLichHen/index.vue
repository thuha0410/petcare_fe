<template >
 <div class="card">
       <div class="card-header">
           <h3 class="text-black " style="font-size: 25px;font-weight: bold;font-family: 'Tahoma', sans-serif;">DANH SÁCH LỊCH HẸN</h3>
       </div>
       <div class="card-body">
        <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Tìm kiếm"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary text-dark" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass" style="color: #000000;"></i>Tìm</button>
            </div>
           <div class="table table-resposive">
               <table class="table table-bordered">
                   <thead>
                       <tr class="text-center align-middle">
                           <th>#</th>
                           <th>Mã lịch hẹn</th>
                           <th>Tên thú cưng</th>
                           <th>Ngày giờ hẹn</th>
                           <th>Tên bác sĩ</th>
                           <th>Tiền cọc </th>
                           <th>Tình trạng</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       
                           <tr class="text-center align-middle">
                           <th>1</th>
                           <td>id123</td>
                           <td>id123</td>
                           <td>datetime</td>
                           <td>id123</td>
                           <td>300000</td>
                           <td>
                               <button class="btn btn-warning me-2">chờ duyệt</button>
                               <button class="btn btn-success ">đã xác nhận</button>
                               <button class='btn btn-danger ms-2'> đã hủy </button>
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
                        <option value="0">chờ duyệt</option>
                        <option value="1">đã xác nhận</option>
                        <option value="2">đã hủy </option>
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