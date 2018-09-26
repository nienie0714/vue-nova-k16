import api from '../api/api';
import Mock from 'mockjs';

Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    if (res.url.indexOf('RW=1') != -1) {
        return Mock.mock({ ERRC: '0' });
    } else {
        // 将参数截为对象数组
        let params = new Object();
        let str = res.url.split('?')[1];
        // console.log(str);
        let strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }

        // 拼接返回的数据格式
        let ret = new Object();
        for (let k in params) {
            ret[k] = '1';
        }
        // 拼接成功标志
        ret['ERRC'] = '0';
        // ret['Account'] = params['Account'] == '0' ? localStorage.getItem('_') : params['Account'];
        ret['Account'] = localStorage.getItem('_');

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
