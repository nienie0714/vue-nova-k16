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
            // DVI_Mosaic_Sta: '',
            BKG_Sta: '',
            FRZ_Sta: '',
            BLACK_Sta: '',
            Account: '',
            sourceActive: 0,
            windowActive: 0
        },
        mosic: getSen('mosic') || {
            In9_MosL: '',
            In9_MosM: '',
            In9_MosW: '',
            In9_MosH: ''
        },
        mock: getSen('mock') || {
            DP_Sta: '1',
            HDMI_Sta: '1',
            SDI1_Sta: '1',
            SDI2_Sta: '1',
            DVI1_Sta: '1',
            DVI2_Sta: '1',
            DVI3_Sta: '1',
            DVI4_Sta: '1',
            // DVI_Mosaic_Sta: '1',
            BKG_Sta: '1',
            FRZ_Sta: '1',
            BLACK_Sta: '1'
        },
        cacheData: getSen('cacheData') || {},
        lang: getLoc('lang') || 'zh',
        count: 0
    },
    getters: {
        getCommon: state => serialize(state.common),
        getMosic: state => serialize(state.mosic),
        getMock: state => serialize(state.mock),
        getCacheData: state => serialize(state.cacheData),
        getLang: state => state.lang,
        getCount: state => state.count
    },
    mutations: {
        setCommon(state, data) {
            state.common = { ...state.common, ...data };
            setSen('common', state.common);
        },
        setMosic(state, data) {
            state.mosic = { ...state.mosic, ...data };
            setSen('mosic', state.mosic);
        },
        setMock(state, data) {
            state.mock = { ...state.mock, ...data };
            setSen('mock', state.mock);
        },
        setCacheData(state, data) {
            state.cacheData = { ...state.cacheData, ...data };
            setSen('cacheData', state.cacheData);
        },
        setLang(state, data) {
            state.lang = data;
            setLoc('lang', data);
        },
        setCount(state, data) {
            state.count = data;
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
