import api from '../api/api';
import Mock from 'mockjs';
import store from '../store';
import data from './mockData';

Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    // console.log('请求的URL', res.url);

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
        return Mock.mock({
            ERRC: '0'
        });
    } else {
        // 读请求，需要根据键值的名称返回对应的数据
        // console.log('Data', mockData);
        //对于发一个回一堆的，进行特殊处理
        if (res.url.indexOf('/proxy/page/panel/leds.cgi?RW=0&DevID=0&L1_Info=0&L2_Info=0&Pic_Info=0&Other_Info=0&Output_Info=0&Input_Info=0&_=') != -1) {
            ret = {
                L1_Sta: '1',
                L1_Src: '1',
                L1_ResW: '0',
                L1_ResH: '0',
                L1_ResR: '0',
                L1_W: '0',
                L1_H: '0',
                L1_X: '0',
                L1_Y: '0',
                L1_Pri: '1',
                L1_CSta: '0',
                L2_Sta: '0',
                L2_Src: '1',
                L2_ResW: '0',
                L2_ResH: '0',
                L2_ResR: '0',
                L2_W: '1920',
                L2_H: '1080',
                L2_X: '0',
                L2_Y: '0',
                L2_Pri: '2',
                L2_CSta: '0',
                Pic_Bri: '60',
                Pic_Con: '50',
                Pic_Sat: '50',
                Pic_Hue: '360',
                Pic_CloTem: '0',
                Pic_Gam: '15',
                Screen_Bri: '60',
                Screen_W: '2096',
                Screen_H: '1080',
                BKG_Sta: '0',
                HDR_Sta: '1',
                Sync_Sta: '0',
                Redu_Sta: '0',
                Opt1_Sta: '1',
                Opt2_Sta: '2',
                Opt3_Sta: '3',
                Opt4_Sta: '0',
                Out_Port1: '1',
                Out_Port2: '2',
                Out_Port3: '3',
                Out_Port4: '0',
                Out_Port5: '0',
                Out_Port6: '0',
                Out_Port7: '0',
                Out_Port8: '0',
                Out_Port9: '0',
                Out_Port10: '0',
                Out_Port11: '0',
                Out_Port12: '0',
                Out_Port13: '0',
                Out_Port14: '0',
                Out_Port15: '0',
                Out_Port16: '0',
                DP_Sta: '1',
                HDMI_Sta: '2',
                SDI1_Sta: '3',
                SDI2_Sta: '0',
                DVI1_Sta: '0',
                DVI2_Sta: '0',
                DVI3_Sta: '0',
                DVI4_Sta: '0',
                MOSAIC_Sta: '0'
            };
        } else if (res.url.indexOf('/proxy/page/panel/leds.cgi?RW=0&DevID=0&L2_Info=0&Pic_Info=0&Other_Info=0&_=') != -1) {
            ret = {
                L2_Sta: '0',
                L2_Src: '1',
                In1_ResW: '1920',
                In1_ResH: '1080',
                In1_ResR: '6000',
                L2_W: '1920',
                L2_H: '1080',
                L2_X: '2',
                L2_Y: '3',
                L2_Pri: '2',
                L2_CSta: '0',
                Pic_Bri: '60',
                Pic_Con: '50',
                Pic_Sat: '40',
                Pic_Hue: '30',
                Pic_CloTem: '0',
                Pic_Gam: '15',
                Screen_Bri: '60',
                Screen_W: '2096',
                Screen_H: '1080',
                BKG_Sta: '0',
                HDR_Sta: '0',
                Sync_Sta: '0',
                Redu_Sta: '0',
                Opt1_Sta: '0',
                Opt2_Sta: '1',
                Opt3_Sta: '2',
                Opt4_Sta: '0'
            };
        } else if (res.url.indexOf('/proxy/page/panel/leds.cgi?RW=0&DevID=0&L1_Info=0&Output_Info=0&Input_Info=0&_') != -1) {
            ret = {
                L1_Sta: '0',
                L1_Src: '1',
                In1_ResW: '1920',
                In1_ResH: '1080',
                In1_ResR: '6000',
                L1_W: '1920',
                L1_H: '1080',
                L1_X: '1',
                L1_Y: '4',
                L1_Pri: '2',
                L1_CSta: '0',
                Out_Port1: '0',
                Out_Port2: '1',
                Out_Port3: '2',
                Out_Port4: '3',
                Out_Port5: '0',
                Out_Port6: '0',
                Out_Port7: '0',
                Out_Port8: '0',
                Out_Port9: '0',
                Out_Port10: '0',
                Out_Port11: '0',
                Out_Port12: '0',
                Out_Port13: '0',
                Out_Port14: '0',
                Out_Port15: '0',
                Out_Port16: '0',
                DP_Sta: '0',
                HDMI_Sta: '1',
                SDI1_Sta: '2',
                SDI2_Sta: '3',
                DVI1_Sta: '0',
                DVI2_Sta: '1',
                DVI3_Sta: '2',
                DVI4_Sta: '3',
                DVI_Mosaic_Sta: '0'
            };
        } else {
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
        }

        // 拼接成功标志
        ret['ERRC'] = '0';
        ret['Account'] = sessionStorage.getItem('_');

        // console.log('回复的数据', ret);
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
