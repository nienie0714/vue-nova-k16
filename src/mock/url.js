import api from '../api/api';
import Mock from 'mockjs';

Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    // 将参数截为数组
    let params = new Object();
    let str = res.url.split('?')[1];
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
    for (let item in params) {
        console.log(454545, item);
    }
    return Mock.mock({
        'DP_Sta|0-4': 0,
        'HDMI_Sta|0-4': 0,
        'SDI1_Sta|0-4': 0,
        'SDI2_Sta|0-4': 0,
        'DVI1_Sta|0-4': 0,
        'DVI2_Sta|0-4': 0,
        'DVI3_Sta|0-4': 0,
        'DVI4_Sta|0-4': 0,
        'DVI_Mosaic_Sta|0-4': 0,
        'BKG_Sta|0-4': 0,
        'FRZ_Sta|0-4': 0,
        'BLACK_Sta|0-4': 0,
        'Account|0-4': 0,
        ERRC: 0
    });
    // return {
    //     DP_Sta: '1',
    //     HDMI_Sta: '2',
    //     SDI1_Sta: '3',
    //     SDI2_Sta: '0',
    //     DVI1_Sta: '4',
    //     DVI2_Sta: '0',
    //     DVI3_Sta: '0',
    //     DVI4_Sta: '0',
    //     DVI_Mosaic_Sta: '0',
    //     BKG_Sta: '0',
    //     FRZ_Sta: '0',
    //     BLACK_Sta: '0',
    //     Account: '0',
    //     ERRC: '0'
    // };
});
