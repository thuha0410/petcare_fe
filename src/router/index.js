import { createRouter, createWebHistory } from "vue-router"; 
import { kiemTraAdminVaQuyen} from './kiemTraAdmin';
import KiemTraKH from './KiemTraKH';
import PaymentSuccess from '@/pages/Payment/PaymentSuccess.vue'
import PaymentError from '@/pages/Payment/PaymentError.vue'

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
        beforeEnter: kiemTraAdminVaQuyen(4)
    },
    {
        path : '/admin/ql-loai-dich-vu',
        component: ()=>import('../components/Admin/LoaiDichVu/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(4)
    },
    {
        path : '/admin/nhap-thuoc',
        component: ()=>import('../components/Admin/NhapThuoc/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(1)
    },
    {
        path : '/admin/ql-ton-kho',
        component: ()=>import('../components/Admin/QLTonKho/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(2)
    },
    {
        path : '/admin/ql-thuoc',
        component: ()=>import('../components/Admin/Thuoc/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(8)
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(11)
    },
    {
        path : '/admin/phan-quyen',
        component: ()=>import('../components/Admin/PhanQuyen/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(16)
    },
    {
        path : '/admin/ql-kho',
        component: ()=>import('../components/Admin/QLKho/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(12)
    },
    {
        path : '/admin/doanh-thu',
        component: ()=>import('../components/Admin/QLBaoCao/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(14)
    },
    {
        path : '/admin/ql-gio',
        component: ()=>import('../components/Admin/QLGio/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-pet',
        component: ()=>import('../components/Admin/QLPet/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(7)
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(6)
    },
    {
        path : '/admin/ql-lich-hen',
        component: ()=>import('../components/Admin/QLLichHen/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(3)
    },
    {
        path : '/admin/ql-nha-cung-cap',
        component: ()=>import('../components/Admin/QLNhaCungCap/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(9)
    },
    {
        path : '/admin/ql-kho',
        component: ()=>import('../components/Admin/QLKho/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(12)
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(11)
    },
    {
        path : '/admin/ql-nhan-vien',
        component: ()=>import('../components/Admin/QLNhanVien/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(5)
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
        path : '/client/send-mail',
        component: ()=>import('../components/Client/NhapMail/index.vue'),
        meta: {layout:"dangNhap"}
    },
    {
        path : '/client/doi-mat-khau/:ma_doi',
        component: ()=>import('../components/Client/DoiMatKhau/index.vue'),
        meta: {layout:"dangNhap"},
        props: true
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
        beforeEnter: KiemTraKH,
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
        beforeEnter: KiemTraKH,
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
        beforeEnter: kiemTraAdminVaQuyen(10)
    },
    {
        path : '/admin/ql-chuc-vu',
        component: ()=>import('../components/Admin/QLChucVu/index.vue'),
        meta: {layout:'admin'},
        beforeEnter: kiemTraAdminVaQuyen(15)
    },
    {
        path : '/admin/hoa-don',
        component: ()=>import('../components/Admin/QLThanhToan/index.vue'),
        meta: {layout:'admin'}, 
        beforeEnter: kiemTraAdminVaQuyen(13)
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
        props : true,
        beforeEnter: KiemTraKH,
    },
    {
        path : '/doctor/xem-ho-so-benh-an',
        component: ()=>import('../components/Doctor/XemHoSo/index.vue'),
        meta: {layout:'doctor'},
        beforeEnter: kiemTraAdminVaQuyen(17)
    },
    {
        path : '/doctor/xem-lich',
        component: ()=>import('../components/Doctor/XemLich/index.vue'),
        meta: {layout:'doctor'},
        beforeEnter: kiemTraAdminVaQuyen(17)
    },
    {
        path : '/doctor/in-don-thuoc',
        component: ()=>import('../components/Doctor/InDonThuoc/index.vue'),
        beforeEnter: kiemTraAdminVaQuyen(17)
    },
    {
        path : '/doctor/ke-don-thuoc',
        component: ()=>import('../components/Doctor/KeDonThuoc/index.vue'),
        meta: {layout:'doctor'},
        beforeEnter: kiemTraAdminVaQuyen(17)
    },
    {
        path : '/client/pet',
        component: ()=>import('../components/Client/ThongTinCaNhan/pet.vue'),
        meta: {layout:'client'},
        beforeEnter: KiemTraKH,
    },
    {
        path: '/payment/success',
        name: 'PaymentSuccess',
        component: PaymentSuccess
    },
    {
        path: '/payment/error',
        name: 'PaymentError',
        component: PaymentError
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router