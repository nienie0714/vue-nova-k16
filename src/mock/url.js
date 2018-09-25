import api from '../api/api';
import Mock from 'mockjs';

console.log(api.url.url);
Mock.mock(RegExp(api.url.url + '*'), 'get', res => {
    console.log(res.url.split('?')[1]);
    if (res.url.split('?')[1] == 'RW=0&DevID=0&DP_Sta=0&HDMI_Sta=0&SDI1_Sta=0&SDI2_Sta=0&DVI1_Sta=0&DVI2_Sta=0&DVI3_Sta=0&DVI4_Sta=0&DVI_Mosaic_Sta=0&BKG_Sta=0&FRZ_Sta=0&BLACK_Sta=0&Account=0') {
        return {
            DP_Sta: '1',
            HDMI_Sta: '2',
            SDI1_Sta: '3',
            SDI2_Sta: '0',
            DVI1_Sta: '4',
            DVI2_Sta: '0',
            DVI3_Sta: '0',
            DVI4_Sta: '0',
            DVI_Mosaic_Sta: '0',
            BKG_Sta: '0',
            FRZ_Sta: '0',
            BLACK_Sta: '0',
            Account: '0',
            ERRC: '0'
        };
    }
});
