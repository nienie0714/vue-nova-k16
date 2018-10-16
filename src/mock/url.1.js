import api from '../api/api';
import Mock from 'mockjs';
import store from '../store';

Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    console.log(res.url);

    // 将参数截为对象数组
    let params = {};
    let str = res.url.split('?')[1];
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }

    // 从状态机里拿数据
    let mockData = store.getters.getMock;
    // 拼接返回的数据格式
    let ret = {};

    // 写请求
    if (res.url.indexOf('RW=1') != -1) {
        // 调用mutations   ..mapMutations
        for (let item in params) {
            if (item.indexOf('In9_Edid') != -1) {
                ret[item.replace('9', '4')] = params[item];
                ret[item.replace('9', '5')] = params[item];
                ret[item.replace('9', '6')] = params[item];
                ret[item.replace('9', '7')] = params[item];
            } else {
                ret[item] = params[item.replace('Res', 'Edid')];
            }
        }
        // console.log('SetMock', ret);
        store.commit('setMock', ret);
        return Mock.mock({ ERRC: '0' });
    } else {
        // store.getters.getMock

        for (let item in params) {
            if (item.indexOf('Res') != -1) {
                ret[item] = mockData[item.replace('Res', 'Edid')];
            } else {
                ret[item] = mockData[item];
            }
        }

        store.commit('setMock', ret);
        // 拼接成功标志
        ret['ERRC'] = '0';
        // ret['Account'] = params['Account'] == '0' ? localStorage.getItem('_') : params['Account'];
        ret['Account'] = localStorage.getItem('_');

        // console.log('Param', params);
        // console.log('MockData', ret);
        return Mock.mock(ret);
    }
});

// return Mock.mock({
//     DP_Sta: 1,
//     HDMI_Sta: 1,
//     'SDI1_Sta|0-4': 0,// 生成 0-4 之间的随机数
//     'SDI2_Sta|0-4': 0,
//     'DVI1_Sta|0-4': 0,
//     'DVI2_Sta|0-4': 0,
//     'DVI3_Sta|0-4': 0,
//     'DVI4_Sta|0-4': 0,
//     'DVI_Mosaic_Sta|0-4': 0,
//     'BKG_Sta|0-4': 0,
//     'FRZ_Sta|0-4': 0,
//     'BLACK_Sta|0-4': 0,
//     Account: 2,
//     ERRC: 0
// });
