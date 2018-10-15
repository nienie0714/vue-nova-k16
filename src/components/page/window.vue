<template>
  <div class="wrapper" @click="closeCard">
    <!-- <v-header></v-header> -->
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);" draggable="false">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="" draggable="false">
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
              <li v-if="switchlist[data[0].sta]">
                <v-textbox :showswitch="1" :title="'主窗口状态'" :defaultcontent="switchlist[data[0].sta].r" :open="data[0].sta" @switchOpen="switchMainWindow" :num="1"></v-textbox>
                <!-- <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="'aaa'"></v-readbox>  :defaultcontent="'开启'"-->
              </li>
              <li v-if="srclist[data[0].src]">
                <v-textbox :activeIndex="data[0].src" v-model="ratioVisible" :showdrop="1" :title="'当前输入源'" :defaultcontent="srclist[data[0].src].r" :list="srclist" @getData="selectSrc" :num="1"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'缩放模式'" :defaultcontent="'自定义缩放'" :list="scalaModel" @getData="obj => {}"></v-textbox>
              </li>
              <li v-if="prilist[data[0].pri]">
                <v-textbox :activeIndex="data[0].pri" v-model="mosicVisible" :showdrop="1" :title="'优先级'" :defaultcontent="prilist[data[0].pri].r" :list="prilist" @getData="selectPri" :num="1"></v-textbox>
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
          <div class="tabcontent4" v-show="active == 1" :class="{active: data[1].showcutout}">
            <!-- <span style="color:#fff;">{{data[1]}}</span> -->
            <ul class="cardul">
              <li v-if="switchlist[data[1].sta]">
                <v-textbox :showswitch="1" :title="'副窗口状态'" :defaultcontent="switchlist[data[1].sta].r" :open="data[1].sta" @switchOpen="switchMainWindow" :num="2"></v-textbox>
              </li>
              <li v-if="srclist[data[1].src]">
                <v-textbox :activeIndex="data[1].src" v-model="ratioVisible" :showdrop="1" :title="'1当前输入源'" :defaultcontent="srclist[data[1].src].r" :list="srclist" @getData="selectSrc" :num="2"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'1缩放模式'" :defaultcontent="'自定义缩放'" :list="scalaModel" @getData="obj => {}"></v-textbox>
              </li>
              <li v-if="prilist[data[1].pri]">
                <v-textbox :activeIndex="data[1].pri" v-model="mosicVisible" :showdrop="1" :title="'1优先级'" :defaultcontent="prilist[data[1].pri].r" :list="prilist" @getData="selectPri" :num="2"></v-textbox>
              </li>

              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <ul class="cardul">
              <li>
                <v-fpsliderbox :title="'窗口水平起始'" :min="0" :max="20000" :val="data[1].x" @callback="xCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直起始'" :min="0" :max="20000" :val="data[1].y" @callback="yCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口水平宽度'" :min="64" :max="20000" :val="data[1].w" @callback="wCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直宽度'" :min="64" :max="20000" :val="data[1].h" @callback="hCallback"></v-fpsliderbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <div class="btncenter mosicbtn">
              <div class="applybtn mosicc" @click="getCutInfo1"><img src="~assets/icon/icon_more.png" alt="">输入截取</div>
            </div>
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
                <v-textbox :showswitch="1" :title="'截取状态'" :defaultcontent="switchlist[data[0].cutsta].r" :open="data[0].cutsta" @switchOpen="switchMainCut"></v-textbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平起始'" :min="0" :max="data[0].cut_x_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直起始'" :min="0" :max="data[0].cut_y_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平宽度(px)'" :min="64" :max="data[0].cut_w_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直宽度(px)'" :min="64" :max="data[0].cut_h_max"></v-fpsliderbox>
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
        <!-- 副窗口 副界面 -->
        <div class="subcontainer" v-show="active == 1" :class="{active: data[1].showcutout}">
          <div class="tabgroup">
            <div class="tabtitle">输入截取</div>
          </div>
          <div class="mosic">
            <ul class="cardul">
              <li>
                <v-textbox :showswitch="1" :title="'截取状态'" :defaultcontent="switchlist[data[1].cutsta].r" :open="data[1].cutsta" @switchOpen="switchMainCut"></v-textbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平起始'" :min="0" :max="data[1].cut_x_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直起始'" :min="0" :max="data[1].cut_y_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平宽度(px)'" :min="64" :max="data[1].cut_w_max"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直宽度(px)'" :min="64" :max="data[1].cut_h_max"></v-fpsliderbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn" @click="data[1].showcutout = false"><img class="down" src="~assets/icon/icon_more.png">返回</div>
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
        // srclist: ['DP', 'HDMI', 'SDI1', 'SDI2', 'DVI1', 'DVI2', 'DVI3', 'DVI4', 'Mosic'],
        srclist: [{ r: 'DP' }, { r: 'HDMI' }, { r: 'SDI1' }, { r: 'SDI2' }, { r: 'DVI1' }, { r: 'DVI2' }, { r: 'DVI3' }, { r: 'DVI4' }, { r: 'Mosic' }],
        switchlist: [{ r: '关闭' }, { r: '开启' }],
        prilist: [{ r: 1 }, { r: 2 }],
        scalaModel: [{ r: '自定义缩放', default: true }],
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
            cut_x_max: 0,
            cut_y_max: 0,
            cut_w_max: 3840,
            cut_h_max: 2160
          },
          {
            name: '副窗口',
            sta: 0,
            src: 0,
            pri: 0,
            x: 0,
            y: 0,
            w: 800,
            h: 600,
            showcutout: false,
            cutsta: 0,
            cut_x_max: 0,
            cut_y_max: 0,
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
      this.readData(this.active);
    },
    computed: {
      ...mapGetters(['getWindow']),
    },
    watch: {
      data(val, oldVal) {
        console.log(val[1], oldVal[1]);
      }
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


        // 主窗口同步读命令  + 副窗口同步读命令
        if(index == 0 || index == 1) {
          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              ...inx,
              _: this._            }
          }).then(res => {
            console.log('pri:', res[`L${i}_Pri`]);
            // this.data[i].sta = +res[`L${i}_Sta`];
            // this.data[i].src = +res[`L${i}_Src`];
            // this.data[i].pri = +res[`L${i}_Pri`] - 1;
            // this.data[i].x = +res[`L${i}_X`];
            // this.data[i].y = +res[`L${i}_Y`];
            // this.data[i].w = +res[`L${i}_W`];
            // this.data[i].h = +res[`L${i}_H`];
            let temp = Object.assign({}, this.data[index], {
              sta: +res[`L${i}_Sta`],
              src: +res[`L${i}_Src`],
              pri: +res[`L${i}_Pri`] - 1,
              x: +res[`L${i}_X`],
              y: +res[`L${i}_Y`],
              w: +res[`L${i}_W`],
              h: +res[`L${i}_H`],
            });
            this.$set(this.data, index, temp);
            setTimeout(() => {
              console.log('----', this.data[i], i);

            }, 1000);
            console.log('----', this.data[i], temp);
          });
        }
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
        this.mosicVisible = false;
      },
      // ----------------   主  -------------------（副）
      // 主窗口状态  +  副窗口状态
      switchMainWindow(val, num) {
        this.data[num - 1].sta = val;
        let sta = {};
        sta[`L${num}_Sta`] = val;
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 5,
            ...sta,
            _: this._          }
        }).then(res => {
          let msg = num == 1 ? '主窗口' : '副窗口'
          Message(msg + this.switchlist[this.data[num - 1].sta].r);
        });
      },
      // 主当前输入源   +   副当前输入源
      selectSrc(obj, num) {
        this.data[num - 1].src = obj.index;
        let src = {};
        src[`L${num}_Src`] = obj.index;
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 6,
            ...src,
            _: this._          }
        }).then(res => {
          Message('当前输入源已切换至' + this.srclist[this.data[num - 1].src].r);
        });
      },
      // 主优先级 + 副优先级
      selectPri(obj, num) {
        // 添加响应
        this.data[num - 1].pri = obj.index;
        // let temp = Object.assign(this.data[num - 1], { pri: obj.index });
        // this.$set(this.data, num - 1, temp);
        console.log(777, this.data);

        let pri = {};
        pri[`L${num}_Pri`] = obj.index + 1;
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 7,
            ...pri,
            _: this._
          }
        }).then(res => {
          let msg = num == 1 ? '主窗口优先级当前为' : '副窗口优先级当前为'
          Message(msg + this.prilist[this.data[num - 1].pri].r);
        });
      },
      // 自定义窗口滑杆数值改变后的回调
      mainCallback(newobj) {
        let obj = {};
        obj[`L1_W`] = this.data[0].w;
        obj[`L1_H`] = this.data[0].h;
        obj[`L1_X`] = this.data[0].x;
        obj[`L1_Y`] = this.data[0].y;
        this.ajax({
          name: 'url',
          data: Object.assign({
            RW: 1,
            DevID: 0,
            CMD: 8,
            ...obj,
            _: this._
          }, newobj)
        }).then(res => {

        });
      },
      xCallback(val) {
        this.mainCallback({ L1_X: val });
      },
      yCallback(val) {
        this.mainCallback({ L1_Y: val });
      },
      wCallback(val) {
        this.mainCallback({ L1_W: val });
      },
      hCallback(val) {
        this.mainCallback({ L1_H: val });
      },
      //  mainCallback(newobj, num) {
      //   console.log(1111, newobj);
      //   let obj = {};
      //   obj[`L${num}_W`] = this.data[num - 1].w;
      //   obj[`L${num}_H`] = this.data[num - 1].h;
      //   obj[`L${num}_X`] = this.data[num - 1].x;
      //   obj[`L${num}_Y`] = this.data[num - 1].y;
      //   console.log(obj);
      //   console.log(555, this.data[0].x);
      //   console.log(333, this.data[0].h);

      //   this.ajax({
      //     name: 'url',
      //     data: Object.assign({
      //       RW: 1,
      //       DevID: 0,
      //       CMD: 8,
      //       ...obj,
      //       _: this._
      //     }, newobj)
      //   }).then(res => {

      //   });
      // },
      // xCallback(val, num) {
      //   let obj = {};
      //   obj[`L${num}_X`] = val;
      //   this.data[num - 1].x = val;
      //   this.mainCallback(obj, num);
      // },
      // yCallback(val, num) {
      //   let obj = {};
      //   obj[`L${num}_Y`] = val;
      //   this.data[num - 1].y = val;
      //   this.mainCallback(obj, num);
      // },
      // wCallback(val, num) {
      //   let obj = {};
      //   obj[`L${num}_W`] = val;
      //   this.data[num - 1].w = val;
      //   this.mainCallback(obj, num);
      // },
      // hCallback(val, num) {
      //   let obj = {};
      //   obj[`L${num}_H`] = val;
      //   this.data[num - 1].h = val;
      //   this.mainCallback(obj, num);
      // },
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
          this.data[0].cut_w_max = res[`In${i}_ResW`];
          this.data[0].cut_h_max = res[`In${i}_ResH`];
        });
        this.data[0].showcutout = true;
      },

      getCutInfo1() {
        this.data[1].showcutout = true;
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
          Message('主窗口截取' + this.switchlist[this.data[0].cutsta].r);
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

