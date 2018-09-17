import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import Locales from './locale';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill';
import components from './components/common/index'; // 加载公共组件

Vue.use(ElementUI, { size: 'small' });
Vue.use(VueI18n);

// 导入组件
Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()); //首字母大写
    Vue.component(`v${name}`, components[key]);
});

// 国际化
// let locale = window.Android.getLanguage() ? 'zh' : 'en';
// store.commit('setLang', locale);

const messages = Object.create(null);
Object.keys(Locales).forEach(local => {
    messages[local] = {
        ...Locales[local]
    };
});
const i18n = new VueI18n({
    locale: store.state.lang,
    messages
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
