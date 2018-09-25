import axios from 'axios';
import api from './api';
import { Loading, Message } from 'element-ui';
import store from '../store';
import qs from 'qs';

let loading = false;
let timer = null;
let loadingInstance;

axios.defaults.timeout = 5000;

//添加请求拦截器
axios.interceptors.request.use(
    config => {
        loading = true;
        return config;
    },
    error => {
        loading = false;
        loadingInstance.close();
        return Promise.reject(error);
    }
);

//添加响应拦截器
axios.interceptors.response.use(
    response => {
        loading = false;
        if (loadingInstance) {
            loadingInstance.close();
        }
        return response;
    },
    error => {
        loading = false;
        if (loadingInstance) {
            loadingInstance.close();
        }

        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            error.message = '连接到服务器失败';
        }
        return Promise.resolve(error);
    }
);

//检查接口请求状态
function checkStatus(resolve, reject, response, config) {
    if (response && response.status === 200) {
        if (response.data.ERRC == '0') {
            resolve(response.data);
        } else {
            if (!config.error) {
                if (response.data.ERRC == '1') {
                    Message('请求超时');
                } else if (response.data.ERRC == '2') {
                    Message('校验错误');
                } else if (response.data.ERRC == '3') {
                    Message('该操作关键字未定义');
                } else if (response.data.ERRC == '4') {
                    Message('参数值越界，不合理');
                } else if (response.data.ERRC == '5') {
                    Message('EDID设置不支持，执行无效');
                } else if (response.data.ERRC == '6') {
                    Message('EDID设置失败');
                } else if (response.data.ERRC == '7') {
                    Message('上传失败');
                }
            }
            reject(response.data);
        }
        // resolve(response.data);
    } else {
        Message(response.message || '请求失败');
        reject(response.data);
    }
}

let xhr = config => {
    //加载动画
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (loading) {
            loadingInstance = Loading.service();
        }
    }, 2000);

    if (config instanceof Array) {
        return axios.all(config);
    } else {
        let name = config.name;
        let data = config.data || {};
        let { url, method = 'get', isForm } = api[name];
        if (/:id/.test(url)) {
            url = url.replace(':id', config.id);
        }

        if (method === 'post') {
            if (isForm) {
                data = qs.stringify(data);
            } else {
                data = JSON.stringify(data);
            }
        }

        let headers = {
            session: store.getters.getCommon.session,
            'Content-Type': isForm ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8'
            // 'Content-Type': 'text/html'
        };

        switch (method) {
            // case 'get':
            // case 'delete':
            //     return new Promise((resolve, reject) => {
            //         axios[method](url, {
            //             params: data,
            //             headers
            //         })
            //             .then(res => {
            //                 checkStatus(resolve, reject, res, config);
            //             })
            //             .catch(res => {
            //                 reject(res);
            //             });
            //     });
            // case 'post':
            // case 'put':
            //     return new Promise((resolve, reject) => {
            //         axios[method](url, data, {
            //             headers
            //         })
            //             .then(res => {
            //                 checkStatus(resolve, reject, res, config);
            //             })
            //             .catch(res => {
            //                 reject(res);
            //             });
            //     });
            case 'get':
                return new Promise((resolve, reject) => {
                    axios
                        .get(url, {
                            params: data,
                            headers
                        })
                        .then(res => {
                            checkStatus(resolve, reject, res, config);
                        })
                        .catch(res => {
                            reject(res);
                        });
                });
            default:
                break;
        }
    }
};

export { xhr, api };
