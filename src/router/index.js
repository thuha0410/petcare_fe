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
        path : '/admin/ql-bac-si',
        component: ()=>import('../components/Admin/QLBacSi/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
    },
        {
        path : '/',
        component: ()=>import('../components/Client/home-page/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/xem-sp',
        component: ()=>import('../components/Client/XemSP/index1.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/xem-chi-tiet-sp',
        component: ()=>import('../components/Client/XemSP/index2.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/client/xem-dich-vu',
        component: ()=>import('../components/Client/DichVu/index.vue'),
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