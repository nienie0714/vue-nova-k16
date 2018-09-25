import Vue from 'vue';
import Vuex from 'vuex';
import { serialize, getLoc, setLoc, getSen, setSen } from '../utils';
import { xhr, api } from '../api';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    state: {
        // 接收常规接口每次传进来的数据
        common: getSen('common') || {
            DP_Sta: '',
            HDMI_Sta: '',
            SDI1_Sta: '',
            SDI2_Sta: '',
            DVI1_Sta: '',
            DVI2_Sta: '',
            DVI3_Sta: '',
            DVI4_Sta: '',
            DVI_Mosaic_Sta: '',
            BKG_Sta: '',
            FRZ_Sta: '',
            BLACK_Sta: '',
            Account: ''
        },
        cacheData: getSen('cacheData') || {},
        lang: getLoc('lang') || 'zh'
    },
    getters: {
        getCommon: state => serialize(state.common),
        getCacheData: state => serialize(state.cacheData),
        getLang: state => state.lang
    },
    mutations: {
        setCommon(state, data) {
            state.common = { ...state.common, ...data };
            setSen('common', state.common);
        },
        setCacheData(state, data) {
            state.cacheData = { ...state.cacheData, ...data };
            setSen('cacheData', state.cacheData);
        },
        setLang(state, data) {
            state.lang = data;
            setLoc('lang', data);
        }
    },
    actions: {
        ajax(state, data) {
            let name = data.name;
            let cacheData = state.state.cacheData;

            if (data instanceof Array) {
                return xhr(data);
            } else {
                return new Promise((resolve, reject) => {
                    if (api[name].cache && cacheData[name]) {
                        return resolve(serialize(cacheData[name]));
                    }
                    xhr(data)
                        .then(res => {
                            state.commit('setCacheData', {
                                [name]: serialize(res)
                            });
                            resolve(res);
                        })
                        .catch(res => reject(res));
                });
            }
        }
    }
});
