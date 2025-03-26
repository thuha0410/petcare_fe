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
        path : '/admin/ql-bac-si',
        component: ()=>import('../components/Admin/QLBacSi/index.vue'),
        meta: {layout:'admin'},
    },
    {
        path : '/admin/ql-khach-hang',
        component: ()=>import('../components/Admin/QLKhachHang/index.vue'),
        meta: {layout:'admin'},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router