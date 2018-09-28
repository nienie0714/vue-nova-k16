<template>
  <div class="wrapper" @click="closeCard">
    <v-header></v-header>
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">输入设置</span>
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="readData(index, item)" :key="index">
          <b>{{item}}</b>
        </div>
      </div>
      <div class="container">
        <!-- content -->
        <div class="content">
          <!-- dp -->
          <div class="tabdp" v-show="active == 0">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入dp分辨率'" :defaultcontent="data.dp.showdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(item)=>{data.dp.btnactive=item}"></v-button>
                <div class="applybtn" @click="apply('dp', data.dp.btnactive)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data.dp.btnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="data.dp.ratios" :list="list1" @getData="(obj)=>{data.dp.ratios=obj.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="data.dp.fresh" :list="list2" @getData="(obj)=>{data.dp.fresh=obj.item}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data.dp.ratio[1].W" :min="800" :max="4096"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data.dp.ratio[1].H" :min="600" :max="4096"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data.dp.ratio[1].Z" :min="23" :max="120"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- <v-textbox :showswitch="1" :title="'预设刷新率（Hz）'" :defaultcontent="'switch'"></v-textbox> -->
          <!-- hdmi -->
          <div class="tabcontent2" v-show="active == 1">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="data.hdmi.showdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data.hdmi.btnactive=obj}"></v-button>
                <div class="applybtn" @click="apply('hdmi', data.hdmi.btnactive)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data.hdmi.btnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="data.hdmi.ratios" :list="list1" @getData="(obj)=>{data.hdmi.ratios=obj.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="data.hdmi.fresh" :list="list2" @getData="(obj)=>{data.hdmi.fresh=obj.item}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data.hdmi.ratio[1].W" :min="800" :max="4097"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data.hdmi.ratio[1].H" :min="600" :max="4097"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data.hdmi.ratio[1].Z" :min="23" :max="127"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- sdi -->
          <div class="tabcontent3" v-show="active == 2">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前sdi1分辨率'" :defaultcontent="sdi1showdata"></v-readbox>
                </li>
                <li>
                  <v-readbox :title="'当前sdi2分辨率'" :defaultcontent="sdi2showdata"></v-readbox>
                </li>
              </ul>
            </div>
          </div>
          <!-- dvi -->
          <div class="tabcontent4" v-show="active == 3" :class="{active: showmosaic}">
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button :maintitle="'单链模式'" :subtitle="'双链模式'" @getBtn="(data)=>{link=data}"></v-button>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data.dvi.showdata"></v-textbox>
                </li>
                <li v-if="link==2">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data.dvi.showdata"></v-textbox>
                </li>
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data.dvi.showdata"></v-textbox>
                </li>
                <li v-if="link==2">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data.dvi.showdata"></v-textbox>
                </li>
                <li v-if="link==1" class="noneli">
                  <v-textbox></v-textbox>
                </li>
                <li v-if="link==1" class="noneli">
                  <v-textbox></v-textbox>
                </li>
              </ul>
            </div>
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data.dvi.btnactive=obj}"></v-button>
                <div class="applybtn" @click="apply('dvi', data.dvi.btnactive)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data.dvi.btnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="data.dvi.ratios" :list="list1" @getData="(obj)=>{data.dvi.ratios=obj.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="data.dvi.fresh" :list="list2" @getData="(obj)=>{data.dvi.fresh=obj.item}"></v-textbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data.dvi.ratio[1].W"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data.dvi.ratio[1].H"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data.dvi.ratio[1].Z"></v-sliderbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                </template>
              </ul>
            </div>
            <div class="btncenter mosaicbtn">
              <div class="applybtn" @click="showmosaic = true">MOSAIC</div>
            </div>
          </div>

        </div>
        <div class="subcontainer" v-show="active == 3" :class="{active: showmosaic}">
          <div class="tabgroup">
            <div class="tabtitle">此处可将各DVI源按照所选模板进行统一拼接，拼接源可独立源使用</div>
            <div class="applybtn">应用</div>
          </div>
          <div class="mosic">
            <div class="mosicleft">
              <ul class="cardul">
                <li>
                  <v-textbox ref="text-box1" v-model="ratioVisible" :title="'拼接模板'" :defaultcontent="'1920*1080'" :list="list1"></v-textbox>
                </li>
                <li>
                  <v-sliderbox :title="'垂直分辨率(px)'" :min="800" :max="4096" v-model.number="rationumH"></v-sliderbox>
                </li>
                <li>
                  <v-sliderbox :title="'刷新率（Hz）'" :min="600" :max="2160" v-model.number="rationumZ"></v-sliderbox>
                </li>
              </ul>
            </div>
            <div class="mosicright">
              <div class="aa">
                拼接总宽高
              </div>

              <div class="bb" :style="{width: cRationumH + 'px', height: cRationumZ + 'px'}">

                <div class="row">
                  <div v-for="row in 3"></div>

                </div>
                <div class="col">
                  <div v-for="(col,index) in 3">
                    <div class="H" v-if="!index">
                      <div class="HCenter"></div>
                      <div class="Hdata">H</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn" @click="showmosaic = false">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { getLoc } from '../../utils';
  export default {
    name: 'aaa',
    data() {
      return {
        ratioVisible: false,
        freshVisible: false,
        tabsList: ['DP', 'HDMI', 'SDI', 'DVI'],      // tab
        active: 0,                                   // tab active
        // public       
        list1: ['800*600', '1024*768', '1280*720', '1280*768', '1280*800', '1280*1024', '1366*768', '1440*900', '1600*900', '1600*1200', '1600*1050', '1920*1080', '1920*1200', '1920*2160', '2048*640', '2048*1152', '2048*1536', '2304*1152', '2560*816', '2560*960', '2560*1600', '3840*1080', '3840*2160 (默认)', '4096*2160'],  // 分辨率  DP HDMI  DL-DVI
        list2: ['23.98', '24', '25', '29.97', '30', '47.96', '48', '50', '59.94', '60 (默认)', '75', '120'],  // 刷新率

        data: {   // pro:js格式不一样应该不影响吧？
          dp: {
            btnactive: 1,                                // dp 预设 / 自定义
            showdata: 'No Single',                       // 当前输入dp分辨率
            ratios: '3840*2160',                         // 分辨率 默认值 width*height // 
            fresh: '60',                                 // 刷新率 默认值
            ratio: [{
              width: '3840',                             // 分辨率 width
              height: '2160',                            // 分辨率 height
              hz: '60',                                  // 分辨率 hz
            }, {
              W: 3840,                                   // dp 默认水平分辨率
              H: 2160,                                   // dp 默认垂直分辨率
              Z: 60,                                     // dp 默认刷新率
            }]
          },
          hdmi: {
            btnactive: 1,                                // hdmi 预设 / 自定义
            showdata: 'No Single',                       // 当前输入hdmi分辨率
            ratios: '3840*2160',                         // 分辨率 默认值 width*height // 
            fresh: '60',                                 // 刷新率 默认值
            ratio: [{
              width: '3840',                             // 分辨率 width
              height: '2160',                            // 分辨率 height
              hz: '60',                                  // 分辨率 hz
            }, {
              W: 3840,                                   // hdmi 默认水平分辨率
              H: 2160,                                   // hdmi 默认垂直分辨率
              Z: 60,                                     // hdmi 默认刷新率
            }]
          },
          dvi: {
            btnactive: 1,                                // hdmi 预设 / 自定义
            showdata: 'No Single',                       // 当前输入hdmi分辨率
            ratios: '3840*2160',                         // 分辨率 默认值 width*height // 
            fresh: '60',                                 // 刷新率 默认值
            ratio: [{
              width: '3840',                             // 分辨率 width
              height: '2160',                            // 分辨率 height
              hz: '60',                                  // 分辨率 hz
            }, {
              W: 3840,                                   // hdmi 默认水平分辨率
              H: 2160,                                   // hdmi 默认垂直分辨率
              Z: 60,                                     // hdmi 默认刷新率
            }]
          }
        },

        sdi1showdata: 'No Single',                   // sdi1展示内容    
        sdi2showdata: 'No Single',                   // sdi2展示内容    

        dvimodel: ['单链模式', '双链模式'],            // dvi模式
        link: 1,                                      // 单链    2双链   

        showmosaic: false,                           // DVI mosic默认值    
        rationumH: 1080,                             // mosic 宽
        rationumZ: 60,                               // mosic  高

        _: '',                                       // 账户
      }
    },
    created() {
      this._ = getLoc('_');
    },
    computed: {
      ...mapGetters(['getCommon', 'getCount']),
      cRationumH() {
        return (this.rationumH - 800) * (480 - 400) / (4096 - 800) + 400
      },
      cRationumZ() {
        return (this.rationumZ - 600) * (270 - 200) / (2160 - 600) + 200
      }
    },
    watch: {
      // getCount(val) {
      //   if(!val) {
      //     console.log(this.active);
      //     switch(this.active) {
      //       case 0: this.dp(); break;
      //       case 1: this.hdmi(); break;
      //     }
      //   }
      // }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      readData(index, params) {
        // 激活菜单tab
        this.active = index;
        let sparams = params.toLowerCase();

        // let res = { 'In0_ResW': '1280', 'In0_ResH': '100', 'In0_ResR': '60', 'ERRC': '0' };

        let state = this.getCommon[params + '_Sta'];   // pro: DP_Sta  1 1 undefined undefined   SDI1 SDI2 DVI1 DVI2 DVI3 DVI4
        console.log('----------', params, state, '-------');

        let val = []
        if(index == 0) {
          val = [0];
        } else if(index == 1) {
          val = [1];
        } else if(index == 2) {
          val = [2, 3];
        } else if(index == 3) {
          val = [4, 5, 6, 7];
        }
        let inx = {};
        val.forEach(item => {
          inx[`In${item}_ResW`] = 0;
          inx[`In${item}_ResH`] = 0;
          inx[`In${item}_ResR`] = 0;
        });
        // 向服务端发送请求
        let retdata = { RW: 0, DevID: 0, ...inx, _: this._ };
        if(state == 1 || state == 2) {
          this.ajax({
            name: 'url',
            data: retdata
          }).then(res => {
            //pro: let { In0_ResW: this.width, In0_ResH: this.height,  In0_ResR: this.hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
            // let { In0_ResW: dpwidth, In0_ResH: dpheight, In0_ResR: dphz } = res;
            // this.dpwidth = dpwidth;
            // this.dpheight = dpheight;
            // this.dphz = dphz;
            // this.showdata = `${this.dpwidth}*${this.dpheight}@ ${this.dphz}Hz`;
          });
        } else if(state == 0 || state == 3) {
          this.data.sparams.showdata = 'No Single';
        } else {
          this.data.sparamsshowdata = 'No Single';
        }
      },
      apply(val, index) {
        console.log('--------------------------------------------------');
        let inx = {};
        let width = '';
        let height = '';
        let hz = '';
        if(index == 1) {
          // this.data[val]['ratio'][index - 1].width = this.data[val].ratios.split('*')[0];
          width = this.data[val]['ratio'][index - 1].width;
          height = this.data[val]['ratio'][index - 1].height;
          hz = this.data[val]['ratio'][index - 1].hz;
        } else if(index == 2) {
          width = this.data[val]['ratio'][index - 1].W;
          height = this.data[val]['ratio'][index - 1].H;
          hz = this.data[val]['ratio'][index - 1].Z;
        }

        let tmp = [];
        if(val == 'dp') {
          tmp = [0];
        } else if(val == 'hdmi') {
          tmp = [1];
        } else if(val == 'dvi') {
          tmp = [4, 5, 6, 7];
        }
        tmp.forEach(item => {
          inx[`In${item}_EdidW`] = width;
          inx[`In${item}_EdidH`] = height;
          inx[`In${item}_EdidR`] = hz;
        });

        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 1,
            ...inx,
            _: this._
          }
        }).then(res => {
          //? let { In0_ResW: this.width, In0_ResH: this.height,  In0_ResR: this.hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
          //let { In0_EdidW: width, In0_EdidH: height, In0_EdidR: hz } = res;
          // this.dpwidth = width;
          // this.dpheight = height;
          // this.dphz = hz;
          // this.dpshowdata = `${this.dpwidth}*${this.dpheight}@ ${this.dphz}Hz`;
          // 直接调用读取接口显示数据会不会更方便
        });
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .tabs {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 11;
    position: absolute;
    left: 40px;
    right: 40px;
    background-color: #02022b;
    .tab {
      width: 24.8%;
      height: 100%;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      background-color: #1f2a51;
      > b {
        display: block;
        width: 100%;
        text-align: center;
      }
      &:last-child {
        margin-right: 0;
      }
      &.active {
        border: none;
        color: #0c0831;
        background-color: #febe00;
      }
    }
  }
  .tabgroup {
    display: flex;
    justify-content: space-between;
    .tabtitle {
      padding: 20px 30px;
      color: white;
    }
  }

  .showdata {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 0 30px 0;
    border-bottom: 1px dashed white;
  }

  .setdata {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 0 30px 0;
  }

  .cardul {
    display: flex;
    width: 100%;
    // flex-grow: 0; // 不允许变大
    li {
      position: relative;
      width: 364px;
      height: 160px;
      padding-right: 4px;
      padding-bottom: 4px;
      &.noneli {
        visibility: hidden;
      }
    }
  }

  .mosic {
    width: 100%;
    height: 488px;
    display: flex;
    .mosicleft {
      width: 364px;
      padding-right: 5px;
      .cardul {
        display: flex;
        width: 100%;
        flex-direction: column;
        li {
          position: relative;
          width: 364px;
          height: 160px;
          padding-right: 4px;
          padding-bottom: 4px;
          &.noneli {
            visibility: hidden;
          }
        }
      }
    }
    .mosicright {
      flex: 1;
      padding: 30px 20px 20px 20px;
      background-color: #1f2a51;
      font-size: 20px;
      color: white;
    }
  }

  .btnapply {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .aa {
    margin-bottom: 30px;
  }

  .bb {
    position: relative;
    border: 1px dashed yellow;
    width: 200px;
    height: 200px;
    .row,
    .col {
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      > div {
        flex: auto;
        position: relative;
        &:last-child {
          border: none;
        }
      }
    }

    .row {
      flex-direction: column;
      > div {
        border-bottom: 1px dashed yellow;
      }
    }

    .col {
      > div {
        border-right: 1px dashed yellow;
        .H {
          width: 100%;
          height: 15px;
          border-left: 1px solid turquoise;
          border-right: 1px solid turquoise;
          margin-left: -1px;
          position: absolute;
          display: flex;
          justify-content: center;
          top: -18px;
          .HCenter {
            height: 50%;
            border-bottom: 1px solid turquoise;
            position: absolute;
            width: 100%;
          }
          .Hdata {
            width: 30px;
            flex-grow: 0;
            text-align: center;
            background-color: #1f2a51;
            font-size: 12px;
            position: relative;
          }
        }
      }
    }
  }

  .tabcontent4 {
    transition: transform 0.5s ease;
    &.active {
      transform: translateY(-100%);
    }
  }
</style>
