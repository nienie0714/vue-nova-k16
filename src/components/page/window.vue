<template>
  <div class="wrapper" @click="closeCard">
    <!-- <v-header></v-header> -->
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">窗口设置</span>
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab tab3" v-for="(item, index) in data" :class="{active: active == index}" @click="readData(index)" :key="index">
          <b>{{item.name}}</b>
        </div>
      </div>
      <div class="container">
        <!-- content -->
        <div class="content">
          <!-- 主窗口 -->
          <div class="tabcontent4" v-show="active == 0" :class="{active: data[0].showcutout}">
            <ul class="cardul">
              <li>
                <v-textbox :showswitch="1" :title="'主窗口状态'" :defaultcontent="switchlist[data[0].sta]" :open="data[0].sta" @switchOpen="switchMainWindow"></v-textbox>
                <!-- <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="'aaa'"></v-readbox>  :defaultcontent="'开启'"-->
              </li>
              <li>
                <v-textbox :activeIndex="data[0].src" v-model="ratioVisible" :showdrop="1" :title="'当前输入源'" :defaultcontent="srclist[data[0].src]" :list="srclist" @getData="selectSrc"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'缩放模式'" :defaultcontent="'自定义缩放'" :list="['自定义缩放']" @getData="obj => {}"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="data[0].pri" v-model="mosicVisible" :showdrop="1" :title="'优先级'" :defaultcontent="prilist[data[0].pri]" :list="prilist" @getData="selectPri"></v-textbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <ul class="cardul">
              <li>
                <v-fpsliderbox :title="'窗口水平起始'" :min="0" :max="20000" :val="data[0].x" @callback="xCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直起始'" :min="0" :max="20000" :val="data[0].y" @callback="yCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口水平宽度'" :min="64" :max="20000" :val="data[0].w" @callback="wCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直宽度'" :min="64" :max="20000" :val="data[0].h" @callback="hCallback"></v-fpsliderbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <div class="btncenter mosicbtn">
              <div class="applybtn mosicc" @click="getCutInfo"><img src="~assets/icon/icon_more.png" alt="">输入截取</div>
            </div>
          </div>
          <!-- 副窗口 -->
          <div class="tabcontent3" v-show="active == 1">

          </div>
          <!-- BKG -->
          <div class="tabcontent3" v-show="active == 2">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-textbox :showswitch="1" :title="'BKG状态'" @switchOpen="switchBkg"></v-textbox>
                </li>
                <li>
                  <v-textbox :activeIndex="0" v-model="ratioVisible" :showdrop="1" :title="'BKG类型'" :defaultcontent="'图片BKG'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <!-- <li v-for="item in 3" class="noneli">
                  <v-readbox></v-readbox>
                </li> -->
              </ul>
            </div>
            <div class="showdata showdatadvi">
              <div class="tabgroup">
                <div class="tabtitle">Capture</div>
                <div class="applybtn"><img src="~assets/icon/icon_apply.png" alt="">截取</div>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'Capture源选择'" :defaultcontent="'DP'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <li>
                  <v-textbox :activeIndex="0" v-model="ratioVisible" :showdrop="1" :title="'保存位置选择'" :defaultcontent="'BKG1'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <!-- <li v-for="item in 3" class="noneli">
                  <v-readbox></v-readbox>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <!-- 主窗口 副界面 -->
        <div class="subcontainer" v-show="active == 0" :class="{active: data[0].showcutout}">
          <div class="tabgroup">
            <div class="tabtitle">输入截取</div>
          </div>
          <div class="mosic">
            <ul class="cardul">
              <li>
                <v-textbox :showswitch="1" :title="'截取状态'" :defaultcontent="switchlist[data[0].cutsta]" :open="data[0].cutsta" @switchOpen="switchMainCut"></v-textbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平起始'" :min="800" :max="3840"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直起始'" :min="600" :max="3840"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平宽度(px)'" :min="800" :max="3840"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直宽度(px)'" :min="600" :max="3840"></v-fpsliderbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn" @click="data[0].showcutout = false"><img class="down" src="~assets/icon/icon_more.png">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { getLoc } from '../../utils';
  import { Message } from 'element-ui';
  export default {
    name: 'window',
    data() {
      return {
        _: '',
        active: 0,
        ratioVisible: false,
        freshVisible: false,
        mosicVisible: false,
        srclist: ['DP', 'HDMI', 'SDI1', 'SDI2', 'DVI1', 'DVI2', 'DVI3', 'DVI4', 'Mosic'],
        switchlist: ['关闭', '开启'],
        prilist: [1, 2],
        data: [
          {
            name: '主窗口',
            sta: 0,
            src: 0,
            pri: 0,
            x: 0,
            y: 0,
            w: 800,
            h: 600,
            showcutout: false,
            cutsta: 0,
            cut_w_max: 3840,
            cut_h_max: 2160
          },
          {
            name: '副窗口',
            sta: 0,
            src: 0,
            pri: 1,
            x: 0,
            y: 0,
            w: 800,
            h: 600,
            showcutout: false,
            cutsta: 0,
            cut_w_max: 3840,
            cut_h_max: 2160
          },
          {
            name: 'BKG'
          }
        ]
      }
    },
    created() {
      this._ = getLoc('_');
      this.active = this.getWindow.windowActive;
      this.readData(0);
    },
    computed: {
      ...mapGetters(['getWindow']),
    },
    watch: {
      // getCount(val) {
      //   if(!val) {
      //     this.readData(this.getWindow['windowActive']);
      //   }
      // }
      // 'data[0].src'(val) {

      // }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setWindow']),
      readData(index) {
        // 激活菜单tab
        this.active = index || 0;
        this.setWindow({ windowActive: index });

        let inx = {};
        let i = index + 1;
        inx[`L${i}_Sta`] = 0;
        inx[`L${i}_Src`] = 0;
        inx[`L${i}_Pri`] = 0;
        inx[`L${i}_W`] = 0;
        inx[`L${i}_H`] = 0;
        inx[`L${i}_X`] = 0;
        inx[`L${i}_Y`] = 0;


        // 主副窗口同步读命令
        if(index == 0 || index == 1) {
          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              ...inx,
              _: this._            }
          }).then(res => {
            this.data[i].sta = +res[`L${i}_Sta`]
            this.data[i].src = +res[`L${i}_Src`]
            this.data[i].pri = +res[`L${i}_Pri`]
            this.data[i].x = +res[`L${i}_X`];
            this.data[i].y = +res[`L${i}_Y`];
            this.data[i].w = +res[`L${i}_W`];
            this.data[i].h = +res[`L${i}_H`];
          });
        }
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
        this.mosicVisible = false;
      },
      // ----------------   主  -------------------
      // 主窗口状态
      switchMainWindow(val) {
        console.log(111, val);
        this.data[0].sta = this.data[0].sta == 1 ? 0 : 1;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 5,
            L1_Sta: this.data[0].sta,
            _: this._          }
        }).then(res => {
          Message('主窗口' + this.switchlist[this.data[0].sta]);
        });
      },
      // 当前输入源
      selectSrc(obj) {
        this.data[0].src = obj.index;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 6,
            L1_Src: obj.index,
            _: this._          }
        }).then(res => {
          Message('当前输入源已切换至' + this.srclist[obj.index]);
        });
      },
      // 优先级
      selectPri(obj) {
        console.log(11111, obj.index);
        this.data[0].pri = obj.index;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 7,
            L1_Pri: obj.index + 1,
            _: this._
          }
        }).then(res => {
          Message('主窗口优先级当前为' + this.prilist[obj.index]);
        });
      },
      // 自定义窗口滑杆数值改变后的回调
      xCallback(val) {
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 8,
            L1_W: this.data[0].w,
            L1_H: this.data[0].h,
            L1_X: val,
            L1_Y: this.data[0].y,
            _: this._          }
        }).then(res => {

        });
      },
      yCallback(val) {
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 8,
            L1_W: this.data[0].w,
            L1_H: this.data[0].h,
            L1_X: this.data[0].x,
            L1_Y: val,
            _: this._          }
        }).then(res => {

        });
      },
      wCallback(val) {
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 8,
            L1_W: val,
            L1_H: this.data[0].h,
            L1_X: this.data[0].x,
            L1_Y: this.data[0].y,
            _: this._          }
        }).then(res => {

        });
      },
      hCallback(val) {
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 8,
            L1_W: this.data[0].w,
            L1_H: val,
            L1_X: this.data[0].x,
            L1_Y: this.data[0].y,
            _: this._          }
        }).then(res => {
        });
      },
      // --------------   主截取   -----------
      getCutInfo() {
        let i = this.data[0].src;
        let currentSrc = {};
        currentSrc[`In${i}_ResW`] = 0;
        currentSrc[`In${i}_ResH`] = 0;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            L1_CSta: 0,
            L1_CW: 0,
            L1_CH: 0,
            L1_CX: 0,
            L1_CY: 0,
            ...currentSrc,
            _: this._
          }
        }).then(res => {
        });
        this.data[0].showcutout = true;
      },
      // 切换截取状态
      switchMainCut(val) {
        this.data[0].cutsta = this.data[0].cutsta == 1 ? 0 : 1;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            CMD: 9,
            L1_CSta: this.data[0].cutsta,
            _: this._          }
        }).then(res => {
          Message('主窗口截取' + this.switchlist[this.data[0].cutsta]);
        });
      },
      switchBkg(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped lang="less">
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
</style>

