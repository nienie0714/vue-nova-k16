<template>
  <div class="wrapper" @click="closeCard">
    <v-header></v-header>
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">输入设置</span>
      <el-button @click="showmosaic = !showmosaic">a</el-button>
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="active = index" :key="index">
          <b>{{item}}</b>
        </div>
      </div>
      <div class="container">
        <!-- content -->
        <div class="content">
          <!-- dp -->
          <div class="tabdp" v-show="active == 0" @click="dp">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入dp分辨率'" :defaultcontent="dpshowdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(data)=>{dpbtnactive=data}"></v-button>
                <div class="applybtn" @click="apply([1])">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="dpbtnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="dprationumW" :min="10" :max="105"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="dprationumH"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="dprationumZ"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- <v-textbox :showswitch="1" :title="'预设刷新率（Hz）'" :defaultcontent="'switch'"></v-textbox> -->
          <!-- hdmi -->
          <div class="tabcontent2" v-show="active == 1" @click="hdmi">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="showdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(data)=>{btnactive=data}"></v-button>
                <div class="applybtn" @click="apply([2])">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="btnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="rationumW"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="rationumH"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="rationumZ"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- sdi -->
          <div class="tabcontent3" v-show="active == 2" @click="sdi">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前sdi1分辨率'" :defaultcontent="showdata"></v-readbox>
                </li>
                <li>
                  <v-readbox :title="'当前sdi2分辨率'" :defaultcontent="showdata"></v-readbox>
                </li>
              </ul>
            </div>
          </div>
          <!-- dvi -->
          <div class="tabcontent4" v-show="active == 3" :class="{active: showmosaic}">
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button :maintitle="'单链模式'" :subtitle="'双链模式'" @getBtn="(data)=>{doublelink=data; doublelink==1?showdouble=true:showdouble=false;}"></v-button>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
                </li>
                <li v-if="showdouble">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
                </li>
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
                </li>
                <li v-if="showdouble">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
                </li>
                <li v-if="!showdouble" class="noneli">
                  <v-textbox></v-textbox>
                </li>
                <li v-if="!showdouble" class="noneli">
                  <v-textbox></v-textbox>
                </li>
              </ul>
            </div>
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(data)=>{btnactive=data}"></v-button>
                <div class="applybtn" @click="apply([1])">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="btnactive==1">
                  <li>
                    <v-textbox v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
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
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="rationumW"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="rationumH"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="rationumZ"></v-sliderbox>
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
        ratio: '3840*2160',                          // 分辨率 默认值 width*height // 
        fresh: '60',                                 // 刷新率 默认值
        width: '0',                                  // 分辨率 width
        height: '0',                                 // 分辨率 height
        hz: '0',                                     // 分辨率 hz
        rationum: 0,                                 // 分辨率 滑块
        showdata: 'No Single',                       // 默认显示，是否在线
        rationumW: 1920,                             // dp 默认水平分辨率
        rationumH: 1080,                             // dp 默认垂直分辨率
        rationumZ: 60,                               // dp 默认刷新率

        // DP
        dpwidth: '0',                                  // 分辨率 width
        dpheight: '0',                                 // 分辨率 height
        dphz: '0',                                     // 分辨率 hz
        dprationumW: 3840,                             // dp 默认水平分辨率
        dprationumH: 2160,                             // dp 默认垂直分辨率
        dprationumZ: 60,                               // dp 默认刷新率
        dpbtnactive: 1,                                // dp 预设 / 自定义
        dpshowdata: 'No Single',                       // 当前输入dp分辨率

        dvimodel: ['单链模式', '双链模式'],            // HDMI 模式
        showmosaic: false,                           // DVI mosic开关          
        link: '双链模式',                             // DVI mosic默认值    
        doublelink: 1,                            // DVI 双链为1 单链为2
        showdouble: true,                        // DVI 单双链显示 2/4 dvi
        btnactive: 1,                                // btn
        _: '',                                   // 账户
        aa: {
          dp: {
            current: 1,
            ratio: [{
              width: 1
            }, {
              width: 2
            }]
          }
        }
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
      getCount(val) {
        if(!val) {
          console.log(this.active);
          switch(this.active) {
            case 0: this.dp(); break;
            case 1: this.hdmi(); break;
            // case 2: this.dp(); break;
            // case 3: this.dp(); break;
          }
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      dp() {
        console.log('dp...');
        // let res = { 'In0_ResW': '1280', 'In0_ResH': '100', 'In0_ResR': '60', 'ERRC': '0' };
        let dpSta = this.getCommon.DP_Sta;
        if(dpSta == 1 || dpSta == 2) {
          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              DevID: 0,
              In0_ResW: 0,
              In0_ResH: 0,
              In0_ResR: 0,
              _: this._
            }
          }).then(res => {
            //? let { In0_ResW: this.width, In0_ResH: this.height,  In0_ResR: this.hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
            let { In0_ResW: dpwidth, In0_ResH: dpheight, In0_ResR: dphz } = res;
            this.dpwidth = dpwidth;
            this.dpheight = dpheight;
            this.dphz = dphz;
            this.showdata = `${this.dpwidth}*${this.dpheight}@ ${this.dphz}Hz`;
          });
        } else if(dpSta == 0 || dPSta == 3) {
          this.showdata = 'No Single';
        } else {
          this.showdata = 'No Single';
        }
      },
      hdmi() {
        console.log('hdmi...');
        let hdmiSta = this.getCommon.HDMI_Sta;
        if(hdmiSta == 1 || hdmiSta == 2) {
          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              In1_ResW: 0,
              In1_ResH: 0,
              In1_ResR: 0,
              _: this._
            }
          }).then(res => {
            // let { In0_ResW: width, In0_ResH: height,  In0_ResR: hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
            let { In1_ResW: width, In1_ResH: height, In1_ResR: hz } = res;
            this.width = width;
            this.height = height;
            this.hz = hz;
            this.showdata = `${this.width}*${this.height}@ ${this.hz}Hz`;
          });
        } else if(hdmiSta == 0 || hdmiSta == 3) {
          this.showdata = 'No Single';
        } else {
          this.showdata = 'No Single';
        }
      },
      sdi() {
        console.log('sdi...');
        let sdi1Sta = this.getCommon.SDI1_Sta;
        let sdi2Sta = this.getCommon.SDI2_Sta;
        if(sdi1Sta == 1 || sdi1Sta == 2 || sdi2Sta == 1 || sdi2Sta == 2) {
          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              In2_ResW: 0,
              In2_ResH: 0,
              In2_ResR: 0,
              In3_ResW: 0,
              In3_ResH: 0,
              In3_ResR: 0,
              _: this._
            }
          }).then(res => {
            // let { In0_ResW: width, In0_ResH: height,  In0_ResR: hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
            let { In2_ResW: width1, In2_ResH: height1, In2_ResR: hz1, In3_ResW: width2, In3_ResH: height2, In3_ResR: hz2 } = res;
            this.width = width1;
            this.height = height1;
            this.hz = hz1;
            this.showdata = `${this.width}*${this.height}@ ${this.hz}Hz`;
          });
        } else if(hdmiSta == 0 || hdmiSta == 3) {
          this.showdata = 'No Single';
        } else {
          this.showdata = 'No Single';
        }
      },
      apply(val = 'dp', index) {


        aa[val][index - 1]

        console.log('--------------------------------------------------');
        let inx = {};
        let ratio = '';
        let width = '';
        let height = '';
        let hz = '';
        if(val.includes(1)) {
          if(this.dpbtnactive == 1) {
            ratio = this.ratio.split(' ')[0];
            width = ratio.split('*')[0];
            height = ratio.split('*')[1];
            hz = this.fresh;
          } else if(this.dpbtnactive == 2) {
            width = this.dprationumW;
            height = this.dprationumH;
            hz = this.dprationumZ;
          }
        }

        val.forEach(item => {
          inx[`In${item}_EdidW`] = width;
          inx[`In${item}_EdidH`] = height;
          inx[`In${item}_EdidR`] = hz;
        });

        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            In_EdidA: 0,
            ...inx,
            _: this._
          }
        }).then(res => {
          //? let { In0_ResW: this.width, In0_ResH: this.height,  In0_ResR: this.hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
          //let { In0_EdidW: width, In0_EdidH: height, In0_EdidR: hz } = res;
          this.dpwidth = width;
          this.dpheight = height;
          this.dphz = hz;
          this.dpshowdata = `${this.dpwidth}*${this.dpheight}@ ${this.dphz}Hz`;
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
