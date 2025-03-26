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
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router