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
        path : '/tttt',
        component: ()=>import('../components/index.vue'),
    },
    {
        path : '/tttr',
        component: ()=>import('../components/index1.vue'),
        meta: {layout:'client'}
    },
    {
        path : '/client/dang-nhap-dang-ky',
        component: ()=>import('../components/Client/DangNhap/index.vue'),
        meta: {layout:'dangNhap'},
    },
    {
        path : '/ttty',
        component: ()=>import('../components/index2.vue'),
        meta: {layout:'client'}
        path : '/client/xem-dich-vu',
        component: ()=>import('../components/Client/DichVu/Home/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich',
        component: ()=>import('../components/Client/DatLich/index.vue'),
        meta: {layout:'client'},
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
        path : '/client/dat-lich-theo-bac-si',
        component: ()=>import('../components/Client/DatLichTheoBacSi/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/gioi-thieu',
        component: ()=>import('../components/Client/GioiThieu/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/dat-lich-tiem-chung',
        component: ()=>import('../components/Client/DatLichTiemChung/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/thanh-toan',
        component: ()=>import('../components/Client/ThanhToan/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/admin/ql-luong',
        component: ()=>import('../components/Admin/QLLuong/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-danh-gia',
        component: ()=>import('../components/Admin/QLDanhGia/index.vue'),
        meta: {layout:'admin'},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router