import { createRouter, createWebHistory } from "vue-router"; 

const routes = [
    {
        path : '/admin/ql-dich-vu',
        component: ()=>import('../components/Admin/QLDichVu/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-lich-hen',
        component: ()=>import('../components/Admin/QLLichHen/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/client/cham-soc',
        component: ()=>import('../components/Client/ChamSoc/index.vue'),
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
        path : '/client/dang-nhap-dang-ky',
        component: ()=>import('../components/Client/DangNhap/index.vue'),
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
        path : '/admin/doanh-thu',
        component: ()=>import('../components/Admin/QLBaoCao/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/doctor/xem-lich',
        component: ()=>import('../components/Doctor/XemLich/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/doctor/xem-ho-so',
        component: ()=>import('../components/Doctor/XemHoSo/index.vue'),
        meta: {layout:'admin'},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router