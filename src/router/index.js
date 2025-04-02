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
        path : '/client/tiem-chung',
        component: ()=>import('../components/Client/TiemChung/index.vue'),
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
        path : '/tttt',
        component: ()=>import('../components/index.vue'),
    },
    {
        path : '/tttr',
        component: ()=>import('../components/index1.vue'),
        meta: {layout:'client'}
    },
    {
        path : '/ttty',
        component: ()=>import('../components/index2.vue'),
        meta: {layout:'client'}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router