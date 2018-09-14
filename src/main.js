import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill';
import components from './components/common/index'; // 加载公共组件

Vue.use(ElementUI, { size: 'small' });

Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()); //首字母大写
    Vue.component(`v${name}`, components[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
