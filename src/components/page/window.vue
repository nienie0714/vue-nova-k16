<template>
  <div class="wrapper" @click="closeCard">
    <!-- <v-header></v-header> -->
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);" draggable="false">
      <img class="iicon" src="@/assets/icon/input_window.png" alt="" draggable="false">
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
              <!-- <span style="color:#fff;">{{data[0].sta}}</span> -->
              <li v-if="switchlist[data[0].sta]">
                <v-textbox :showswitch="1" :title="'主窗口状态'" :defaultcontent="switchlist[data[0].sta].r" :open="data[0].sta" @switchOpen="switchMainWindow"></v-textbox>
                <!-- <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="'aaa'"></v-readbox>  :defaultcontent="'开启'"-->
              </li>
              <li v-if="srclist[data[0].src]">
                <v-textbox :activeIndex="data[0].src" v-model="ratioVisible" :showdrop="1" :title="'当前输入源'" :defaultcontent="srclist[data[0].src].r" :list="srclist" @getData="selectSrc"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'缩放模式'" :defaultcontent="'自定义缩放'" :list="scalaModel" @getData="obj => {}"></v-textbox>
              </li>
              <li v-if="prilist[data[0].pri]">
                <v-textbox :activeIndex="data[0].pri" v-model="mosicVisible" :showdrop="1" :title="'优先级'" :defaultcontent="prilist[data[0].pri].r" :list="prilist" @getData="selectPri"></v-textbox>
              </li>
              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <ul class="cardul">
              <li>
                <v-fpsliderbox :title="'窗口水平起始'" :min="0" :max="20000" :val="data[0].x" @callback="xCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直起始'" :min="0" :max="20000" :val="data[0].y" @callback="yCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口水平宽度'" :min="64" :max="20000" :val="data[0].w" @callback="wCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直宽度'" :min="64" :max="20000" :val="data[0].h" @callback="hCallback" @change="mainCallback"></v-fpsliderbox>
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
                <v-textbox :showswitch="1" :title="'副窗口状态'" :defaultcontent="switchlist[data[1].sta].r" :open="data[1].sta" @switchOpen="switchMainWindow"></v-textbox>
              </li>
              <li v-if="srclist[data[1].src]">
                <v-textbox :activeIndex="data[1].src" v-model="ratioVisible" :showdrop="1" :title="'当前输入源'" :defaultcontent="srclist[data[1].src].r" :list="srclist" @getData="selectSrc"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'缩放模式'" :defaultcontent="'自定义缩放'" :list="scalaModel" @getData="obj => {}"></v-textbox>
              </li>
              <li v-if="prilist[data[1].pri]">
                <v-textbox :activeIndex="data[1].pri" v-model="mosicVisible" :showdrop="1" :title="'优先级'" :defaultcontent="prilist[data[1].pri].r" :list="prilist" @getData="selectPri"></v-textbox>
              </li>

              <li class="noneli">
                <v-textbox></v-textbox>
              </li>
            </ul>
            <ul class="cardul">
              <li>
                <v-fpsliderbox :title="'窗口水平起始'" :min="0" :max="20000" :val="data[1].x" @callback="xCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直起始'" :min="0" :max="20000" :val="data[1].y" @callback="yCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口水平宽度'" :min="64" :max="20000" :val="data[1].w" @callback="wCallback" @change="mainCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'窗口垂直宽度'" :min="64" :max="20000" :val="data[1].h" @callback="hCallback" @change="mainCallback"></v-fpsliderbox>
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
            <div class="showdatano" :class="{showdatahr: data[2].type}">
              <!-- <span style="color:#fff;">{{data[2]}}</span> -->
              <ul class="cardul">
                <li v-if="switchlist[data[2].sta]">
                  <v-textbox :showswitch="1" :title="'BKG状态'" :defaultcontent="switchlist[data[2].sta].r" :open="data[2].sta" @switchOpen="switchBkg"></v-textbox>
                </li>
                <li v-if="typelist[data[2].type]">
                  <v-textbox :activeIndex="data[2].type" v-model="mosicVisible" :showdrop="1" :title="'BKG类型'" :defaultcontent="typelist[data[2].type].r" :list="typelist" @getData="selectType"></v-textbox>
                </li>
                <li v-for="item in 3" class="noneli">
                  <v-readbox></v-readbox>
                </li>
              </ul>

              <ul class="cardul" v-if="!data[2].type">
                <!-- <span style="color:#fff;">{{data[2]}}</span> -->
                <li>
                  <v-fpsliderbox :title="'R(红分量)'" :min="0" :max="255" :val="data[2].r" @callback="rCallback" @change="RGBCallback"></v-fpsliderbox>
                </li>
                <li>
                  <v-fpsliderbox :title="'G(绿分量)'" :min="0" :max="255" :val="data[2].g" @callback="gCallback" @change="RGBCallback"></v-fpsliderbox>
                </li>
                <li>
                  <v-fpsliderbox :title="'B(蓝分量)'" :min="0" :max="255" :val="data[2].b" @callback="bCallback" @change="RGBCallback"></v-fpsliderbox>
                </li>
                <li v-for="item in 2" class="noneli">
                  <v-textbox></v-textbox>
                </li>
              </ul>
            </div>
            <div class="showdatano showdatahr" v-if="data[2].type">
              <div class="tabgroup">
                <div class="tabtitle">BKG</div>
                <div class="applybtn" @click="bkgApply"><img src="~assets/icon/icon_apply.png" alt="">应用</div>
              </div>
              <ul class="cardul">
                <li @click="()=>{this.data[2].active=0}">
                  <v-imgbox :title="'BKG1'" :hasimg="data[2].b0img" :isapply="data[2].apply == 0" :active="data[2].active == 0"></v-imgbox>
                </li>
                <li @click="()=>{this.data[2].active=1}">
                  <v-imgbox :title="'BKG2'" :hasimg="data[2].b1img" :isapply="data[2].apply == 1" :active="data[2].active == 1"></v-imgbox>
                </li>
                <li @click="()=>{this.data[2].active=2}">
                  <v-imgbox :title="'BKG3'" :hasimg="data[2].b2img" :isapply="data[2].apply == 2" :active="data[2].active == 2"></v-imgbox>
                </li>
                <li @click="()=>{this.data[2].active=3}">
                  <v-imgbox :title="'BKG4'" :hasimg="data[2].b3img" :isapply="data[2].apply == 3" :active="data[2].active == 3"></v-imgbox>
                </li>
                <li class="noneli">
                  <v-readbox></v-readbox>
                </li>
              </ul>
            </div>
            <div class="showdatano showdatahr" v-if="data[2].type">
              <div class="tabgroup">
                <div class="tabtitle">Capture</div>
                <div class="applybtn" @click="capture"><img src="~assets/icon/icon_capture.png" alt="">抓拍</div>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :activeIndex="data[2].cutsrc" v-model="freshVisible" :showdrop="1" :title="'Capture源选择'" :defaultcontent="srclist[data[2].cutsrc].r" :list="srclist" @getData="obj => {this.data[2].cutsrc = obj.index;}"></v-textbox>
                </li>
                <li>
                  <v-textbox :activeIndex="data[2].cutapply" v-model="ratioVisible" :showdrop="1" :title="'保存位置选择'" :defaultcontent="imglist[data[2].cutapply].r" :list="imglist" @getData="obj => {this.data[2].cutapply = obj.index;}"></v-textbox>
                </li>
                <li v-for="item in 3" class="noneli">
                  <v-readbox></v-readbox>
                </li>
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
                <v-fpsliderbox :title="'水平起始'" :val="data[0].cut_x" :min="0" :max="data[0].cut_x_max" @callback="cutXCallback" @change="mainCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直起始'" :val="data[0].cut_y" :min="0" :max="data[0].cut_y_max" @callback="cutYCallback" @change="mainCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平宽度(px)'" :val="data[0].cut_w" :min="64" :max="data[0].cut_w_max" @callback="cutWCallback" @change="mainCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直宽度(px)'" :val="data[0].cut_h" :min="64" :max="data[0].cut_h_max" @callback="cutHCallback" @change="mainCutCallback"></v-fpsliderbox>
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
                <v-fpsliderbox :title="'水平起始'" :val="data[1].cut_x" :min="0" :max="data[1].cut_x_max" @callback="cutX1Callback" @change="subCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直起始'" :val="data[1].cut_y" :min="0" :max="data[1].cut_y_max" @callback="cutY1Callback" @change="subCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'水平宽度(px)'" :val="data[1].cut_w" :min="64" :max="data[1].cut_w_max" @callback="cutW1Callback" @change="subCutCallback"></v-fpsliderbox>
              </li>
              <li>
                <v-fpsliderbox :title="'垂直宽度(px)'" :val="data[1].cut_h" :min="64" :max="data[1].cut_h_max" @callback="cutH1Callback" @change="subCutCallback"></v-fpsliderbox>
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
        typelist: [{ r: '纯色BKG' }, { r: '图片BKG' }],
        imglist: [{ r: 'BKG1' }, { r: 'BKG2' }, { r: 'BKG3' }, { r: 'BKG4' }],
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
            cut_w_max: 1920,
            cut_h_max: 1080,
            cut_x: 0,
            cut_y: 0,
            cut_w: 1920,
            cut_h: 1080
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
            cut_w_max: 1920,
            cut_h_max: 1080,
            cut_x: 0,
            cut_y: 0,
            cut_w: 3840,
            cut_h: 2160
          },
          {
            name: 'BKG',
            sta: 0,
            type: 0,
            r: 0,
            g: 0,
            b: 0,
            b0img: 0,
            b1img: 0,
            b2img: 0,
            b3img: 0,
            apply: 0,
            active: 0,
            cutapply: 0,
            cutsrc: 0
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
      ...mapGetters(['getCommon', 'getWindow']),
    },
    watch: {
      // data(val, oldVal) {
      //   console.log(val[1], oldVal[1]);
      // }
      active(val) {
        this.readData(this.active);
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon', 'setWindow']),
      readData(index) {
        console.log('-----------' + index + '请求--------');
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
          });
        }
        if(index == 2) {

          this.ajax({
            name: 'url',
            data: {
              RW: 0,
              DevID: 0,
              BKG_Sta: 0,
              BKG_Mod: 0,
              BKG_IMG: 0,
              BKG_G0Sta: 0,
              BKG_G1Sta: 0,
              BKG_G2Sta: 0,
              BKG_G3Sta: 0,
              BKG_PCBR: 0,
              BKG_PCBG: 0,
              BKG_PCBB: 0,
              _: this._            }
          }).then(res => {
            console.log('----BKG-----状态信息同步', res);
            // let temp = Object.assign({}, this.data[2], {
            this.data[2].sta = +res.BKG_Sta;
            this.data[2].type = +res.BKG_Mod;
            this.data[2].b1img = +res.BKG_G0Sta;
            this.data[2].b2img = +res.BKG_G1Sta;
            this.data[2].b3img = +res.BKG_G2Sta;
            this.data[2].b4img = +res.BKG_G3Sta;
            this.data[2].apply = +res.BKG_IMG;
            this.data[2].r = +res.BKG_PCBR || 0;  // todo
            this.data[2].g = +res.BKG_PCBG || 0;
            this.data[2].b = +res.BKG_PCBB || 0;
            // });
            // this.$set(this.data, 2, temp);
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
      switchMainWindow(val) {
        let num = this.active + 1;
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
      selectSrc(obj) {
        let num = this.active + 1;
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
      selectPri(obj) {
        let num = this.active + 1;
        // 添加响应
        this.data[num - 1].pri = obj.index;
        // let temp = Object.assign(this.data[num - 1], { pri: obj.index });
        // this.$set(this.data, num - 1, temp);

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
      mainCallback() {
        let num = this.active + 1;
        if(this.data[num - 1].sta == 1) {
          let obj = {};
          obj[`L${num}_W`] = this.data[num - 1].w;
          obj[`L${num}_H`] = this.data[num - 1].h;
          obj[`L${num}_X`] = this.data[num - 1].x;
          obj[`L${num}_Y`] = this.data[num - 1].y;

          this.ajax({
            name: 'url',
            data: {
              RW: 1,
              DevID: 0,
              CMD: 8,
              ...obj,
              _: this._
            }
          }).then(res => {

          });
        }
      },
      xCallback(val) {
        let num = this.active + 1;
        this.data[num - 1].x = val;
        this.mainCallback();
      },
      yCallback(val) {
        let num = this.active + 1;
        this.data[num - 1].y = val;
        this.mainCallback();
      },
      wCallback(val) {
        let num = this.active + 1;
        this.data[num - 1].w = val;
        this.mainCallback();
      },
      hCallback(val) {
        let num = this.active + 1;
        this.data[num - 1].h = val;
        this.mainCallback();
      },
      // --------------   主截取   -----------
      // 切换截取状态   主  +   副
      switchMainCut(val) {
        let num = this.active + 1;
        this.data[num - 1].cutsta = val;
        let csta = {};
        csta[`L${num}_CSta`] = val;

        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 9,
            ...csta,
            _: this._          }
        }).then(res => {
          let msg = num == 1 ? '主窗口截取' : '副窗口截取'
          Message(msg + this.switchlist[this.data[num - 1].cutsta].r);
        });
      },
      // 主窗口截取滑杆
      mainCutCallback() {

        if(this.data[0].cutsta == 1) {
          let obj = {};

          obj.L1_CW = this.data[0].cut_w;
          obj.L1_CH = this.data[0].cut_h;
          obj.L1_CX = this.data[0].cut_x;
          obj.L1_CY = this.data[0].cut_y;

          this.ajax({
            name: 'url',
            data: {
              RW: 1,
              DevID: 0,
              CMD: 10,
              ...obj,
              _: this._
            }
          }).then(res => {

          });
        }
      },
      cutXCallback(val) {
        if(val + this.data[0].cut_w > this.data[0].cut_w_max) {

          this.data[0].cut_w = this.data[0].cut_w_max - val;
        }
        this.data[0].cut_x = val;
        this.mainCutCallback();
      },
      cutYCallback(val) {
        if(val + this.data[0].cut_h > this.data[0].cut_h_max) {

          this.data[0].cut_h = this.data[0].cut_y_max - val;
        }
        this.data[0].cut_y = val;
        this.mainCutCallback();
      },
      cutWCallback(val) {
        if(val + this.data[0].cut_x > this.data[0].cut_w_max) {
          this.data[0].cut_x = this.data[0].cut_w_max - val;
        }
        this.data[0].cut_w = val;
        this.mainCutCallback();
      },
      cutHCallback(val) {
        if(val + this.data[0].cut_y > this.data[0].cut_h_max) {

          this.data[0].cut_y = this.data[0].cut_y_max - val;
        }
        this.data[0].cut_h = val;
        this.mainCutCallback();
      },
      // 副窗口截取滑杆
      subCutCallback(newobj) {

        if(this.data[1].cutsta == 1) {
          let obj = {};
          obj.L2_CW = this.data[1].cut_w;
          obj.L2_CH = this.data[1].cut_h;
          obj.L2_CX = this.data[1].cut_x;
          obj.L2_CY = this.data[1].cut_y;

          this.ajax({
            name: 'url',
            data: {
              RW: 1,
              DevID: 0,
              CMD: 10,
              ...obj,
              _: this._
            }
          }).then(res => {

          });
        }
      },
      cutX1Callback(val) {
        if(val + this.data[1].cut_w > this.data[1].cut_w_max) {

          this.data[1].cut_w = this.data[1].cut_w_max - val;
        }
        this.data[1].cut_x = val;
        this.subCutCallback();
      },
      cutY1Callback(val) {
        if(val + this.data[1].cut_h > this.data[1].cut_h_max) {

          this.data[1].cut_h = this.data[1].cut_y_max - val;
        }
        this.data[1].cut_y = val;
        this.subCutCallback();
      },
      cutW1Callback(val) {
        if(val + this.data[1].cut_x > this.data[1].cut_w_max) {
          this.data[1].cut_x = this.data[1].cut_w_max - val;
        }
        this.data[1].cut_w = val;
        this.subCutCallback();
      },
      cutH1Callback(val) {
        if(val + this.data[1].cut_y > this.data[1].cut_h_max) {

          this.data[1].cut_y = this.data[1].cut_y_max - val;
        }
        this.data[1].cut_h = val;
        this.subCutCallback();
      },
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
          let temp = Object.assign({}, this.data[0], {
            cutsta: +res[`L1_CSta`],
            cut_x: +res[`L1_CX`],
            cut_x_max: +res[`In${i}_ResW`] - 64,
            cut_y: +res[`L1_CY`],
            cut_y_max: +res[`In${i}_ResH`] - 64,
            cut_w: +res[`L1_CW`],
            cut_w_max: +res[`In${i}_ResW`],
            cut_h: +res[`L1_CH`],
            cut_h_max: +res[`In${i}_ResH`],
          });
          this.$set(this.data, 0, temp);

        });
        this.data[0].showcutout = true;
      },

      getCutInfo1() {
        let i = this.data[1].src;
        let currentSrc = {};
        currentSrc[`In${i}_ResW`] = 0;
        currentSrc[`In${i}_ResH`] = 0;
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            L2_CSta: 0,
            L2_CW: 0,
            L2_CH: 0,
            L2_CX: 0,
            L2_CY: 0,
            ...currentSrc,
            _: this._
          }
        }).then(res => {

          let temp = Object.assign({}, this.data[1], {
            cutsta: +res[`L2_CSta`],
            cut_x: +res[`L2_CX`],
            cut_x_max: +res[`In${i}_ResW`] - 64,
            cut_y: +res[`L2_CY`],
            cut_y_max: +res[`In${i}_ResH`] - 64,
            cut_w: +res[`L2_CW`],
            cut_w_max: +res[`In${i}_ResW`],
            cut_h: +res[`L2_CH`],
            cut_h_max: +res[`In${i}_ResH`],
          });
          this.$set(this.data, 1, temp);
        });
        this.data[1].showcutout = true;
      },
      // ------------------   BKG   -------------------
      switchBkg(val) {
        this.data[2].sta = val;

        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 11,
            BKG_Sta: val,
            _: this._
          }
        }).then(res => {
          Message('BKG' + this.switchlist[this.data[2].sta].r);
        });
      },
      selectType(obj) {
        this.data[2].type = obj.index;
        if(this.data[2].sta) {
          this.ajax({
            name: 'url',
            data: {
              RW: 1,
              DevID: 0,
              CMD: 12,
              BKG_Mod: obj.index,
              _: this._            }
          }).then(res => {
            Message('BKG类型已已切换至' + this.typelist[this.data[2].type].r);
          });
        }
      },
      //  R  G  B
      RGBCallback() {
        let obj = {};
        obj[`BKG_PCBR`] = this.data[2].r;
        obj[`BKG_PCBG`] = this.data[2].g;
        obj[`BKG_PCBB`] = this.data[2].b;
        if(this.data[2].sta) {
          this.ajax({
            name: 'url',
            data: {
              RW: 1,
              DevID: 0,
              CMD: 13,
              ...obj,
              _: this._
            }
          }).then(res => {

          });
        }
      },
      rCallback(val) {
        this.data[2].r = val;
        this.RGBCallback();
      },
      gCallback(val) {
        this.data[2].g = val;
        this.RGBCallback();
      },
      bCallback(val) {
        this.data[2].b = val;
        this.RGBCallback();
      },
      // bkg apply
      bkgApply() {
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 14,
            BKG_IMG: this.data[2].active,
            _: this._
          }
        }).then(res => {
          this.data[2].apply = this.data[2].active;
          Message('BKG应用成功');
        });
      },
      // Capture 输入源
      capture(obj) {
        this.setCommon({ Switch: false });
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 15,
            BKG_CSrc: this.data[2].cutsrc,
            BKG_CSID: this.data[2].cutapply,
            _: this._
          }
        }).then(res => {
          Message('BKG抓拍成功');
          this.setCommon({ Switch: true });
        });
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

