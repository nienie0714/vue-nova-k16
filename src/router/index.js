import Vue from 'vue';
import Router from 'vue-router';
import routes from './router';
Vue.use(Router);

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    routes
});
// 使用钩子函数对路由进行权限跳转;
router.beforeEach((to, from, next) => {
    const command = sessionStorage.getItem('_');
    if (!command && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});
export default router;
