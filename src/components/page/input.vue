<template>
  <div class="wrapper" @click="closeCard">
    <v-header></v-header>
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">输入设置</span>
      <!-- <el-button @click="showmosaic = !showmosaic">a</el-button> -->
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="active = index" :key="index">
          <b>{{item}}</b>
        </div>
      </div>
      <!-- content -->
      <div class="content" :class="{active: showmosaic}">
        <!-- dp -->
        <div class="tabdp" v-show="active == 0" @click="dp">
          <div class="showdata">
            <ul class="cardul">
              <li>
                <v-readbox :title="'当前输入dp分辨率'" :defaultcontent="showdata"></v-readbox>
              </li>
            </ul>
          </div>
          <div class="setdata">
            <div class="btnapply">
              <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(data)=>{btnactive=data}"></v-button>
              <div class="applybtn" @click="apply([1])">应用</div>
            </div>
            <ul class="cardul">
              <template v-if="btnactive==1">
                <li>
                  <v-textbox :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
                </li>
                <li>
                  <v-textbox :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
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
                  <v-textbox :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
                </li>
                <li>
                  <v-textbox :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
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
        <div class="tabcontent3" v-show="active == 2">
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
        <div class="tabcontent4" v-show="active == 3">
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
            </ul>
          </div>
          <div class="showdata showdatadvi">
            <div class="btnapply">
              <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(data)=>{btnactive=data}"></v-button>
              <div class="applybtn" @click="apply([1])">应用</div>
            </div>
            <ul class="cardul">
              <li>
                <v-textbox ref="text-box1" v-model="ratioVisible" :showdrop="1" :showslider="0" :title="'预设分辨率'" :defaultcontent="'1920*1080'" :list="list1"></v-textbox>
              </li>
              <li>
                <v-textbox ref="text-box2" v-model="freshVisible" :showdrop="1" :showslider="0" :title="'预设刷新率（Hz）'" :defaultcontent="'60'" :list="list2"></v-textbox>
                </v-textbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
                </v-textbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
                </v-textbox>
              </li>
            </ul>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn">MOSAIC</div>
          </div>
        </div>

      </div>
      <div class="subcontainer">
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>333</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
        <div>222</div>
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
        dviVisible: false,
        ratioVisible: false,
        freshVisible: false,
        tabsList: ['DP', 'HDMI', 'SDI', 'DVI'],      // tab
        active: 0,                                   // tab active
        list1: ['800*600', '1024*768', '1280*720', '1280*768', '1920*1080', '3840*2160 (默认)'],  // 分辨率
        list2: ['23.98', '24', '25', '29.97', '30', '60 (默认)'],  // 刷新率
        ratio: '1920*1080',                          // 分辨率 默认值 width*height
        fresh: '60',                                 // 刷新率 默认值
        width: '0',                                  // 分辨率 width
        height: '0',                                 // 分辨率 height
        hz: '0',                                     // 分辨率 hz
        rationum: 0,                                 // 分辨率 滑块
        showdata: 'No Single',                       // 默认显示，是否在线
        rationumW: 1920,                           // dp 默认水平分辨率
        rationumH: 1080,                           // dp 默认垂直分辨率
        rationumZ: 60,                              // dp 默认刷新率
        dvimodel: ['单链模式', '双链模式'],            // HDMI 模式
        showmosaic: false,                           // DVI mosic开关          
        link: '双链模式',                             // DVI mosic默认值    
        doublelink: 1,                            // DVI 双链为1 单链为2
        showdouble: true,                        // DVI 单双链显示 2/4 dvi
        btnactive: 1,                                // btn
        _: ''                                        // 账户
      }
    },
    created() {
      this._ = getLoc('_');
    },
    computed: {
      ...mapGetters(['getCommon', 'getCount'])
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
      dviS(data) {
        // (data)=>{doublelink=data}
        alert(data);
        this.doublelink = data
      },
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
            let { In0_ResW: width, In0_ResH: height, In0_ResR: hz } = res;
            this.width = width;
            this.height = height;
            this.hz = hz;
            this.showdata = `${this.width}*${this.height}@ ${this.hz}Hz`;
          });
        } else if(dpSta == 0 || dPSta == 3) {
          this.showdata = 'No Single';
        } else {
          this.showdata = 'No Single';
        }
      },
      bpGetBtn(val) {
        console.log(val);
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
      apply(val = [1]) {
        alert(1)
        let inx = {};
        let ratio = this.ratio.split(' ')[0];
        let width = ratio.split('*')[0];
        let height = ratio.split('*')[1];
        let hz = this.fresh;

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
            // In0_EdidW: width, // 哪个页面的应用
            // In0_EdidH: height,
            // In0_EdidR: hz,
            ...inx,
            _: this._
          }
        }).then(res => {
          //? let { In0_ResW: this.width, In0_ResH: this.height,  In0_ResR: this.hz} = {In0_ResW: 0,In0_ResH: 0,In0_ResR: 0, a: 1};
          //let { In0_EdidW: width, In0_EdidH: height, In0_EdidR: hz } = res;
          this.width = width;
          this.height = height;
          this.hz = hz;
          this.showdata = `${this.width}*${this.height}@ ${this.hz}Hz`;
        });
      },
      closeCard() {
        this.dviVisible = false;
        this.ratioVisible = false;
        this.freshVisible = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .tabs {
    width: 100%;
    // min-width: 1030px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 11;
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
  .tabtitle {
    padding: 20px 30px;
    color: white;
  }

  .showdata {
    box-sizing: border-box;
    height: 220px;
    width: 100%;
    padding: 30px 0 30px 0;
    border-bottom: 1px dashed white;
    &.showdatadvi {
      height: 300px;
    }
  }

  .setdata {
    box-sizing: border-box;
    height: 320px;
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

  .btnapply {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>
