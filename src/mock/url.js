import api from '../api/api';
import Mock from 'mockjs';
import store from '../store';
import data from './mockData';

Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    console.log('请求的URL', res.url);

    // 将参数截为对象数组
    let params = {};
    let str = res.url.split('?')[1];
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }

    // 如果没有初始数据的话，拿出初始数据填入SessionStorage中
    if (JSON.stringify(store.getters.getMock) === '{}') {
        store.commit('setMock', data);
    }
    let mockData = store.getters.getMock;
    // 拼接返回的数据格式
    let ret = {};

    if (res.url.indexOf('RW=1') != -1) {
        // 写请求，需要更新相应的数据，只需要返回ERRC
        for (let item in params) {
            //对于In9_Edid的特殊处理(如果之后还有别的特殊处理，需要添加到这个if上)
            if (item.indexOf('In9_Edid') != -1) {
                let value = params[item];
                for (let i = 4; i < 8; i++) {
                    let newKey = item.replace('Edid', 'Res');
                    newKey = newKey.replace('9', i.toString());
                    ret[newKey] = value;
                }
            } else if (item.indexOf('Edid' != -1)) {
                ret[item.replace('Edid', 'Res')] = params[item];
            } else {
                //对于普通数据的处理，方法是直接覆盖原有值(如果发现新增功能初始不生效，就是没有默认值，无需修改这里)
                ret[item] = params[item];
                console.log('tag', '设置成功' + params[item] + item);
            }
        }
        //保存现在的设置
        store.commit('setMock', ret);
        return Mock.mock({ ERRC: '0' });
    } else {
        // 读请求，需要根据键值的名称返回对应的数据
        // console.log('Data', mockData);
        for (let item in params) {
            // 设置特殊处理
            ret[item] = mockData[item];
            // console.log('MockData', mockData[item]);
            // console.log('RetData', ret[item]);
            if (!mockData[item]) {
                //设置忽略
                if (item != 'Account' && item != 'RW' && item != '_' && item != 'DevID') {
                    console.log('请添加默认值', item);
                }
            }
        }

        // 拼接成功标志
        ret['ERRC'] = '0';
        // ret['Account'] = params['Account'] == '0' ?sessionStorage.removeItem('_') : params['Account'];
        ret['Account'] = sessionStorage.getItem('_');

        // console.log('Param', params);
        console.log('回复的数据', ret);
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
