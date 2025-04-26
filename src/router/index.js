import { createRouter, createWebHistory } from "vue-router"; 
import kiemTraAdmin from './kiemTraAdmin';
import { kiemTraQuyen } from '../utils/kiemTraQuyen';

const routes = [
    {
        path : '/doctor',
        component: ()=>import('../components/Doctor/XemLich/index.vue'),
        meta: {layout:'doctor'},
    },
    {
        path : '/admin/ql-dich-vu',
        component: ()=>import('../components/Admin/QLDichVu/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(4) ]
    },
    {
        path : '/admin/ql-loai-dich-vu',
        component: ()=>import('../components/Admin/LoaiDichVu/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(4) ]
    },
    {
        path : '/admin/nhap-thuoc',
        component: ()=>import('../components/Admin/NhapThuoc/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(1) ]
    },
    {
        path : '/admin/ql-ton-kho',
        component: ()=>import('../components/Admin/QLTonKho/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-thuoc',
        component: ()=>import('../components/Admin/Thuoc/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(8) ]
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(11) ]
    },
    {
        path : '/admin/phan-quyen',
        component: ()=>import('../components/Admin/PhanQuyen/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(16) ]
    },
    {
        path : '/admin/ql-kho',
        component: ()=>import('../components/Admin/QLKho/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(12) ]
    },
    {
        path : '/admin/doanh-thu',
        component: ()=>import('../components/Admin/QLBaoCao/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-pet',
        component: ()=>import('../components/Admin/QLPet/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(7) ]
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(6) ]
    },
    {
        path : '/admin/ql-lich-hen',
        component: ()=>import('../components/Admin/QLLichHen/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-nha-cung-cap',
        component: ()=>import('../components/Admin/QLNhaCungCap/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(9) ]
    },
    {
        path : '/admin/ql-kho',
        component: ()=>import('../components/Admin/QLKho/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-nhan-vien',
        component: ()=>import('../components/Admin/QLNhanVien/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: [ kiemTraAdmin, kiemTraQuyen(5) ]
    },
    {
        path : '/nhan-vien/dang-nhap',
        component: ()=>import('../components/Admin/DangNhap/index.vue'),
        meta: {layout:'dangNhap'},
    },
    {
        path : '/client/dat-lich',
        component: ()=>import('../components/Client/DatLich/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-theo-bac-si',
        component: ()=>import('../components/Client/DatLichTheoBacSi/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/nhap-mail',
        component: ()=>import('../components/Client/NhapMail/index.vue'),
        meta: {layout:"dangNhap"}
    },
    {
        path : '/client/doi-mat-khau',
        component: ()=>import('../components/Client/DoiMatKhau/index.vue'),
        meta: {layout:"dangNhap"}
    },
    {
        path : '/client/:id_khach_hang',
        component: ()=>import('../components/Client/KichHoat/index.vue'),
        meta: {layout:"dangNhap"},
        props: true
    },
    {
        path : '/client/dat-lich',
        component: ()=>import('../components/Client/DatLich/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-theo-bac-si',
        component: ()=>import('../components/Client/DatLichTheoBacSi/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-tiem-chung',
        component: ()=>import('../components/Client/DatLichTiemChung/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-cham-soc',
        component: ()=>import('../components/Client/DatLichChamSoc/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/gioi-thieu',
        component: ()=>import('../components/Client/GioiThieu/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/danh-gia',
        component: ()=>import('../components/Client/DanhGia/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/chon-dich-vu',
        component: ()=>import('../components/Client/DichVu/ChonDichVu/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/xem-dich-vu',
        component: ()=>import('../components/Client/DichVu/Home/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/thong-tin-ca-nhan',
        component: ()=>import('../components/Client/ThongTinCaNhan/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/',
        component: ()=>import('../components/Client/home-page/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/xem-bs/:id',
        component: ()=>import('../components/Client/XemBS/index.vue'),
        meta: {layout:'client'},
        props: true
    },
    {
        path : '/client/dang-nhap-dang-ky',
        component: ()=>import('../components/Client/DangNhapDangKy/index.vue'),
        meta: {layout:'dangNhap'},
    },
    {
        path : '/admin/ql-luong',
        component: ()=>import('../components/Admin/QLLuong/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-chuc-vu',
        component: ()=>import('../components/Admin/QLChucVu/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/hoa-don',
        component: ()=>import('../components/Admin/QLThanhToan/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/client/bang-gia',
        component: ()=>import('../components/Client/BangGia/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/chon-dich-vu/:id',
        component: ()=>import('../components/Client/DichVu/ChonDichVu/index.vue'),
        meta: {layout:'client'},
        props : true
    },
    {
        path : '/doctor/xem-ho-so-benh-an',
        component: ()=>import('../components/Doctor/XemHoSo/index.vue'),
        meta: {layout:'doctor'}
    },
    {
        path : '/doctor/xem-lich',
        component: ()=>import('../components/Doctor/XemLich/index.vue'),
        meta: {layout:'doctor'}
    },
    {
        path : '/doctor/in-don-thuoc',
        component: ()=>import('../components/Doctor/InDonThuoc/index.vue'),
        
    },
    {
        path : '/client/pet',
        component: ()=>import('../components/Client/ThongTinCaNhan/pet.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/thanh-toan',
        component: ()=>import('../components/Client/ThanhToan/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/doctor/ke-don-thuoc',
        component: ()=>import('../components/Doctor/KeDonThuoc/index.vue'),
        meta: {layout:'doctor'}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router