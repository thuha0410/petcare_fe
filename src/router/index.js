import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

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
        path : '/admin/ql-thanh-toan',
        component: ()=>import('../components/Admin/QLThanhToan/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-bao-cao',
        component: ()=>import('../components/Admin/QLBaoCao/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/',
        component: ()=>import('../components/Client/home-page/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/ttcn',
        component: ()=>import('../components/Client/ThongTinCaNhan/index.vue'),
        meta: {layout:'client'},
    },
    {
        path : '/danh-gia',
        component: ()=>import('../components/Client/DanhGia/index.vue'),
        meta: {layout:'client'},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router