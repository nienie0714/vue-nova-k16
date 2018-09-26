<template>
  <div class="aaa">
    <div class="wrapper">
      <v-header></v-header>
      <!-- 页面名称 -->
      <div class="jrtitle">
        <div class="snav">
          <img src="@/assets/icon/u343.png" alt="" @click="$router.go(-1);">
          <img src="@/assets/icon/u123.svg" alt="">
          <span>输入设置</span>
          <el-button @click="showmosaic = !showmosaic">a</el-button>
        </div>
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
          <div class="container">
            <div class="tabdp" v-show="active == 0" @click="dp">
              <div class="tabtitle" @click="dp">关于DP的EDID设置</div>
              <v-textbox :title="'当前输入dp分辨率'" :defaultcontent="showdata"></v-textbox>
              <v-textbox :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
              <v-textbox :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
              <!-- <v-textbox :showswitch="1" :title="'预设刷新率（Hz）'" :defaultcontent="'switch'"></v-textbox>
              <v-sliderbox :title="'滑块'" v-model="rationum"></v-sliderbox> -->
            </div>
            <div class="tabcontent2" v-show="active == 1" @click="hdmi">
              <div class="tabtitle">关于HDMI的EDID设置</div>
              <v-textbox :title="'当前输入hdmi分辨率'" :defaultcontent="showdata"></v-textbox>
              <v-textbox :showdrop="1" :title="'预设分辨率'" :defaultcontent="ratio" :list="list1" @getData="(data)=>{ratio=data.item}"></v-textbox>
              <v-textbox :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="fresh" :list="list2" @getData="(data)=>{fresh=data.item}"></v-textbox>
            </div>
            <div class="tabcontent3" v-show="active == 2">
              <div class="tabtitle">关于SDI的EDID设置</div>
            </div>
            <div class="tabcontent4" v-show="active == 3">
              <div class="tabtitle">关于DPI的EDID设置</div>
              <v-textbox class="zindex" :showdrop="1" :title="'DVI输入模式'" :defaultcontent="link" :list="dvimodel" @getData="(data)=>{link=data.item;doublelink=data.index}"></v-textbox>
              <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
              <v-textbox v-show="doublelink" :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
              <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
              <v-textbox v-show="doublelink" :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="'3840×2160@ 60Hz'"></v-textbox>
              <div></div>
              <v-textbox :showdrop="1" :showslider="0" :title="'预设分辨率'" :defaultcontent="'1920*1080'" :list="list1"></v-textbox>
              <v-textbox :showdrop="1" :showslider="0" :title="'预设刷新率（Hz）'" :defaultcontent="'60'" :list="list2"></v-textbox>
            </div>

            <div class="btn" @click="apply">应用</div>
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
        dvimodel: ['单链模式', '双链模式'],            // HDMI 模式
        showmosaic: false,                           // DVI mosic开关          
        link: '双链模式',                             // DVI mosic默认值    
        doublelink: true,                            // DVI 单双链显示 2/4 dvi
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
      apply() {   // 哪个页面的应用
        let ratio = this.ratio.split(' ')[0];

        let width = ratio.split('*')[0];
        let height = ratio.split('*')[1];
        let hz = this.fresh;
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            In_EdidA: 0,
            In0_EdidW: width, // 哪个页面的应用
            In0_EdidH: height,
            In0_EdidR: hz,
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
      }
    }
  }

</script>

<style scoped lang="less">
  .tabs {
    width: 1800px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    z-index: 11;
    .tab {
      width: 24.8%;
      height: 100%;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(0, 0, 0, 1);
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
        background-color: rgba(209, 58, 29, 1);
      }
    }
  }
  .tabtitle {
    padding: 20px 30px;
    color: white;
  }
  .zindex {
    .card-top {
      z-index: 12 !important;
    }
  }
</style>
