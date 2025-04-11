import { createRouter, createWebHistory } from "vue-router"; 

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
    },
    {
        path : '/admin/ql-loai-dich-vu',
        component: ()=>import('../components/Admin/LoaiDichVu/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/nhap-thuoc',
        component: ()=>import('../components/Admin/NhapThuoc/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-thuoc',
        component: ()=>import('../components/Admin/Thuoc/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/phan-quyen',
        component: ()=>import('../components/Admin/PhanQuyen/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-bac-si',
        component: ()=>import('../components/Admin/QLBacSi/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-kho',
        component: ()=>import('../components/Admin/QLKho/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/doanh-thu',
        component: ()=>import('../components/Admin/QLBaoCao/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/hoa-don',
        component: ()=>import('../components/Admin/QLThanhToan/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-pet',
        component: ()=>import('../components/Admin/QLPet/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-lich-hen',
        component: ()=>import('../components/Admin/QLLichHen/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-nha-cung-cap',
        component: ()=>import('../components/Admin/QLNhaCungCap/index.vue'),
        meta: {layout:'admin'},
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
        path : '/admin/ql-bac-si',
        component: ()=>import('../components/Admin/QLBacSi/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/client/cham-soc',
        component: ()=>import('../components/Client/ChamSoc/index.vue'),
        meta: {layout:'client'},
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
        path : '/client/doi-mat-khau/:ma_doi',
        component: ()=>import('../components/Client/DoiMatKhau/index.vue'),
        meta: {layout:"dangNhap"}
    },
    {
        path : '/client/kich-hoat-tai-khoan/:id_khach_hang',
        component: ()=>import('../components/Client/KichHoat/index.vue'),
        meta: {layout:"dangNhap"},
        props: true
    },
    {
        path : '/client/dat-lich-tiem-chung',
        component: ()=>import('../components/Client/DatLichTiemChung/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-cham-soc',
        component: ()=>import('../components/Client/ChamSoc/index.vue'),
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
        path : '/client/xem-bs',
        component: ()=>import('../components/Client/XemBS/index.vue'),
        meta: {layout:'client'},
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
        path : '/client/chon-dich-vu',
        component: ()=>import('../components/Client/DichVu/ChonDichVu/index.vue'),
        meta: {layout:'client'},
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
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router