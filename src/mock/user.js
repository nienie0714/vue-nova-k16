import api from '../api/api';
import Mock from 'mockjs';

Mock.mock(api.user.url, 'get', {
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
});
