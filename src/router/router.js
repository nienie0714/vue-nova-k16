const routes = [
    {
        path: '/',
        component: resolve => require(['../components/page/home.vue'], resolve),
        children: [
            {
                name: 'login',
                path: '/login',
                component: resolve => require(['../components/page/login.vue'], resolve)
            },
            {
                name: 'revelation',
                path: '/',
                component: resolve => require(['../components/page/revelation.vue'], resolve)
            },
            {
                name: 'input',
                path: '/input',
                component: resolve => require(['../components/page/input.vue'], resolve)
            },
            {
                name: 'window',
                path: '/window',
                component: resolve => require(['../components/page/window.vue'], resolve)
            }
        ]
    },
    {
        name: '404',
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
        name: 403,
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/404'
    }
];

export default routes;
