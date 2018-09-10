const routes = [
    {
        path: '/',
        redirect: '/product'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/user',
                component: resolve => require(['../components/page/User.vue'], resolve),
                meta: { title: '用户管理', keepAlive: false }
            },
            {
                path: '/product',
                component: resolve => require(['../components/page/product.vue'], resolve),
                meta: { title: '产品管理', keepAlive: false }
            },
            {
                path: '/Role',
                component: resolve => require(['../components/page/Role.vue'], resolve),
                meta: { title: '角色管理', keepAlive: false }
            },
            {
                name: 'Firmware',
                path: '/Firmware',
                component: resolve => require(['../components/page/Firmware.vue'], resolve),
                meta: { title: '固件包', keepAlive: false }
            },
            {
                path: '/tabs',
                component: resolve => require(['../components/page/Tabs.vue'], resolve),
                meta: { title: 'tab选项卡' }
            }
        ]
    },
    {
        path: '/login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
];

export default routes;
