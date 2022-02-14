import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        name: "Login",
        component: resolve => require(['../views/login.vue'],resolve)
    },
    {
        path: "/home",
        name: "Home",
        component: resolve => require(['../views/Home.vue'],resolve),
        children: [
            {
                path: '/personnelForm',
                name: 'personnelForm',
                component: resolve => require(['../views/personnelForm.vue'],resolve)
            },
            {
                path: '/developer',
                name: 'developer',
                component: resolve => require(['../views/developer.vue'],resolve)
            },
            {
                path: '/copyright',
                name: 'copyright',
                component: resolve => require(['../views/copyright.vue'],resolve)
            }
        ]
    }
];

const router = new VueRouter({
    routes,
});

export default router;
