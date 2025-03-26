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
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router