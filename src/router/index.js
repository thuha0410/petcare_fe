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
    // {
    //     path : '/client/xem-sp',
    //     component: ()=>import('../components/Client/XemSP/index.vue'),
    //     meta: {layout:'admin'}
    // },
    // {
    //     path : '/client/chitiet-sp',
    //     component: ()=>import('../components/Client/ChitietSP/index.vue')
    // },
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