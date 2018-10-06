const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('../components/page/home')
    },
    {
        name: 'input',
        path: '/input',
        component: () => import('../components/page/input')
    },
    {
        name: 'window',
        path: '/window',
        component: () => import('../components/page/window')
    },
    // {
    //     path: '/',
    //     component: resolve => require(['../components/page/home.vue'], resolve),
    //     meta: { title: '自述文件' },
    //     children: [
    //         {
    //             path: '/index',
    //             component: resolve => require(['../components/page/index.vue'], resolve),
    //             meta: { title: '用户管理', keepAlive: false }
    //         }
    //     ]
    // },
    {
        name: 'login',
        path: '/login',
        component: resolve => require(['../components/page/login.vue'], resolve)
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
