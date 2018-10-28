<template>
  <div>
    <div class="floatingbtn" @click.stop="slideActive = !slideActive">
      <template>
        <img class="floatingicon" src="@/assets/icon/icon_dashboard.png" alt="" draggable="false" v-if="!slideActive">
        <img class="floatingicon" src="@/assets/icon/icon_close.png" alt="" draggable="false" v-if="slideActive">
      </template>
    </div>

    <div class="mask" :class="{'mask-active': !afterActive}">
      <div class="slide-box" :class="{subactive: !slideActive}">
        <!-- MainLayer -->
        <div class="main-layer">
          <!-- 状态及名称 -->
          <div class="statusinfo">
            <div class="status" :class="{active: Number(mainres.L1_Sta)}">{{mainres.L1_Sta == 0? "已关闭" : "开启中"}}</div>
            <div class="title">
              MainLayer
            </div>
          </div>
          <!-- 分辨率 -->
          <div class="details">
            <span>{{srclist[mainres.L1_Src]}}</span>
            <!-- todo  不一定是Inx_ResH -->
            <span>{{mainres.L1_ResW}}x{{mainres.L1_ResH}}@{{mainres.L1_ResR}}Hz</span>
          </div>
          <!-- 其他信息 -->
          <div class="infos">
            <div class="info">
              <div>大小 :</div>
              <div>{{mainres.L2_W}}x{{mainres.L2_H}}</div>
            </div>
            <div class="info">
              <div>优先级 :</div>
              <div>{{mainres.L1_Pri}}</div>
            </div>
            <div class="info">
              <div>位置 :</div>
              <div>({{mainres.L1_X}},{{mainres.L1_Y}})</div>
            </div>
            <div class="info">
              <div>截取状态 :</div>
              <div>{{mainres.L1_CSta}}</div>
            </div>
          </div>
        </div>
        <!-- PIPLayer -->
        <div class="PIPLayer">
          <!-- 状态及名称 -->
          <div class="statusinfo">
            <div class="status" :class="{active: Number(mainres.L2_Sta)}">{{mainres.L2_Sta == 0? "已关闭" : "开启中"}}</div>
            <div class="title">
              PIP
            </div>
          </div>
          <!-- 分辨率 -->
          <div class="details">
            <span>{{srclist[mainres.L2_Src]}}</span>
            <span>{{mainres.L2_ResW}}x{{mainres.L2_ResH}}@{{mainres.L2_ResR}}Hz</span>
          </div>
          <!-- 其他信息 -->
          <div class="infos">
            <div class="info">
              <div>大小 :</div>
              <div>{{mainres.L2_W}}x{{mainres.L2_H}}</div>
            </div>
            <div class="info">
              <div>优先级 :</div>
              <div>{{mainres.L2_Pri}}</div>
            </div>
            <div class="info">
              <div>位置 :</div>
              <div>({{mainres.L2_X}},{{mainres.L2_Y}})</div>
            </div>
            <div class="info">
              <div>截取状态 :</div>
              <div>{{mainres.L2_CSta}}</div>
            </div>
          </div>
        </div>
        <!-- 屏体信息 -->
        <div class="screeninfo">
          <!-- 状态及名称 -->
          <div class="title">
            屏体信息
          </div>
          <div class="screen-content">
            <div class="screen-left">
              <el-progress type="circle" :width="135" :percentage="mainres.Screen_Bri && Number(mainres.Screen_Bri)" :stroke-width="10" color="#febe00"></el-progress>
              <div class="light">屏体亮度</div>
            </div>
            <div class="screen-right">
              <div class="info">
                <div>配屏大小 :</div>
                <div>{{mainres.Screen_W}}x{{mainres.Screen_H}}</div>
              </div>
              <div class="info">
                <div>Gamma :</div>
                <div>{{+mainres.Pic_Gam/10}}</div>
              </div>
              <div class="info">
                <div>色温 :</div>
                <div>{{+mainres.Pic_CloTem-180}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 画质信息 -->
        <div class="pictureinfo">
          <div class="title">
            画质信息
          </div>
          <div class="infos">
            <div class="info">
              <div>亮度 :</div>
              <div>
                <el-progress :percentage="mainres.Pic_Bri && Number(mainres.Pic_Bri)" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>饱和度 :</div>
              <div>
                <el-progress :percentage="mainres.Pic_Sat && Number(mainres.Pic_Sat)" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>对比度 :</div>
              <div>
                <el-progress :percentage="mainres.Pic_Con && Number(mainres.Pic_Con)" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>色调 :</div>
              <div>
                <el-progress :percentage="mainres.Pic_Hue && Number(mainres.Pic_Hue)" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
          </div>
        </div>
        <!-- 其他 -->
        <div class="otherinfo">
          <div class="title">
            其他
          </div>
          <div class="otherbtn">
            <div class="bkg" :class="{'bkg-active': Number(mainres.BKG_Sta)}">BKG</div>
            <div class="bkg" :class="{'bkg-active': Number(mainres.HDR_Sta)}">HDR</div>
          </div>
          <div class="infos">
            <div class="info">
              <div>设备冗余 :</div>
              <div>{{mainres.Redu_Sta}}</div>
            </div>
            <div class="info">
              <div>同步状态 :</div>
              <div>{{mainres.Sync_Sta}}</div>
            </div>
          </div>
        </div>
        <!-- 输入 -->
        <div class="inputinfo">
          <div class="title">
            输入
          </div>
          <div class="infos">
            <!-- 同样的问题，这里如果是9个，直接写9就好 -->
            <div class="info" v-for="(item, index) in data[4].input">
              <el-tooltip effect="dark" :content="mainres[srclist[index] + '_Sta'] | itoTip" placement="top">
                <!-- <div class="img" :style="{background :url(require(`../../assets/ctrls/DP_1.png`))}"> -->
                <div class="img" :style='mainres[srclist[index] + "_Sta"] && {backgroundImage:"url(" + require(`../../assets/ctrls/${pngSrcList[index]}_${mainres[srclist[index] + "_Sta"]}.png`) + ")" }'>
                </div>
              </el-tooltip>
              <div>{{srclist[index]}}</div>
            </div>
          </div>
        </div>
        <!-- 输出  -->
        <div class=" outputinfo">
          <div class="title">
            输出
          </div>
          <div class="infos">
            <div class="info" v-for="(item, index) in data[2].out">
              <el-tooltip effect="dark" :content="mainres['Out_Port'+ (index+1)] | otoTip" placement="top">
                <div class="img" :style='mainres["Out_Port" + (index+1)] && {backgroundImage:"url(" + require(`../../assets/ctrls/output_${mainres["Out_Port" +(index+1)]}.png`) + ")" }'></div>
              </el-tooltip>
              <div>{{index+1}}</div>
            </div>
          </div>
        </div>
        <!-- 光纤 -->
        <div class="shineinfo">
          <div class="infos">
            <!-- 这里确定是4个吗，如果要按照回多少个就生成多少个，那这里还需要搞一搞，如果确定是4个，直接写4 -->
            <div class="info" v-for="(item, index) in data[3].opt">
              <div>OPT{{index+1}}</div>
              <el-tooltip effect="dark" :content="mainres['Opt'+ (index+1) +'_Sta'] | toTip" placement="top">
                <div :class="['img', 'img' + mainres['Opt'+ (index+1) +'_Sta']]"></div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        afterActive: false,
        slideActive: false,
        timmer: null,
        srclist: ['DP', 'HDMI', 'SDI1', 'SDI2', 'DVI1', 'DVI2', 'DVI3', 'DVI4', 'MOSAIC'],
        pngSrcList: ['DP', 'HDMI', 'SDI', 'SDI', 'DVI', 'DVI', 'DVI', 'DVI', 'MOSAIC'],
        data: [
          {
            name: 'MainLayer',
            status: 0,
            src: 0,
            pri: '1',
            w: '3840',
            h: '2160',
            r: '60',
            sx: '3000',
            sy: '1000',
            sw: '3000',
            sy: '1000',
            csta: '0'
          },
          {
            name: 'PIP',
            status: 0,
            src: 0,
            pri: '1',
            w: '3840',
            h: '2160',
            r: '60',
            sx: '3000',
            sy: '1000',
            sw: '3000',
            sy: '1000',
            csta: '0'
          },
          // 最好确定个数之后，就不需要这些数据了
          {
            out: ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
          },
          {
            opt: ['1', '0', '0', '0']
          },
          {
            input: ['1', '0', '0', '0', '0', '0', '0', '0', '0']
          }
        ],
        // 你的业务要什么时候请求数据？ 什么时候更新数据？ 要不要更新  还会不会再请求？还是只在页面加载的时候请求一次
        // mainres: { L1_Sta: '0', L1_Src: '1', In1_ResW: '1920', In1_ResH: '1080', In1_ResR: '6000', L1_W: '1920', L1_H: '1080', L1_X: '0', L1_Y: '0', L1_Pri: '2', L1_CSta: '0', Out_Port1: '0', Out_Port2: '0', Out_Port3: '0', Out_Port4: '0', Out_Port5: '0', Out_Port6: '0', Out_Port7: '0', Out_Port8: '0', Out_Port9: '0', Out_Port10: '0', Out_Port11: '0', Out_Port12: '0', Out_Port13: '0', Out_Port14: '0', Out_Port15: '0', Out_Port16: '0', DP_Sta: '0', HDMI_Sta: '0', SDI1_Sta: '0', SDI2_Sta: '0', DVI1_Sta: '0', DVI2_Sta: '1', DVI3_Sta: '2', DVI4_Sta: '3', DVI_Mosaic_Sta: '0' },
        // pipres: { L2_Sta: '0', L2_Src: '1', In1_ResW: '1920', In1_ResH: '1080', In1_ResR: '6000', L2_W: '1920', L2_H: '1080', L2_X: '0', L2_Y: '0', L2_Pri: '2', L2_CSta: '0', Pic_Bri: '60', Pic_Con: '50', Pic_Sat: '40', Pic_Hue: '0', Pic_CloTem: '0', Pic_Gam: '15', Screen_Bri: '60', Screen_W: '2096', Screen_H: '1080', BKG_Sta: '0', HDR_Sta: '0', Sync_Sta: '0', Redu_Sta: '0', Opt1_Sta: '0', Opt2_Sta: '1', Opt3_Sta: '2', Opt4_Sta: '0' }
        mainres: {},
        pipres: {}
      };
    },
    props: [
      'subactive'
    ],
    watch: {
      slideActive(val) {
        let t = null;
        clearTimeout(this.timmer);
        if(val) {
          t = setInterval(() => {
            this.getAllInfo();
          }, 2000);
          this.afterActive = true;
        } else {
          t = null;
          this.timmer = setTimeout(() => { this.afterActive = false }, 300);
        }
        this.$emit('update:subactive', val);
      }
    },
    created() {
      this.getAllInfo();
    },
    methods: {
      ...mapActions(['ajax']),
      getAllInfo() {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, L1_Info: 0, L2_Info: 0, Pic_Info: 0, Other_Info: 0, Output_Info: 0, Input_Info: 0, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.$nextTick(() => {
            this.mainres = res;
            // this.mainres.Screen_Bri = Number(this.mainres.Screen_Bri);
          })
        });
      }
      // {"L2_Sta":"0", "L2_Src":"1", "In1_ResW":"1920", "In1_ResH":"1080", "In1_ResR":"6000", "L2_W":"1920", "L2_H":"1080", "L2_X":"0", "L2_Y":"0", "L2_Pri":"2", "L2_CSta":"0", "Pic_Bri":"60", "Pic_Con":"50", "Pic_Sat":"50", "Pic_Hue":"0", "Pic_CloTem":"0", "Pic_Gam":"15", "Screen_Bri":"60", "Screen_W":"2096", "Screen_H":"1080", "BKG_Sta":"0", "HDR_Sta":"0", "Sync_Sta":"0", "Redu_Sta":"0", "Opt1_Sta":"0", "Opt2_Sta":"0", "Opt3_Sta":"0", "Opt4_Sta":"0", "ERRC": "0"}
    },
    filters: {
      toNumber: function(value) {
        return Number(value)
      },
      itoTip(value) {
        switch(value) {
          case '0':
            return '输入源无信号，窗口未占用';
            break;
          case '1':
            return '输入源有信号，窗口未占用';
            break;
          case '2':
            return '输入源有信号，被窗口占用';
            break;
          case '3':
            return '输入源无信号，被窗口占用';
            break;
          default:
            return '';
            break;
        }
      },
      otoTip(value) {
        switch(value) {
          case '0':
            return '未连接';
            break;
          case '1':
            return '已连接';
            break;
          case '2':
            return '已连接，复制模式';
            break;
          case '3':
            return '已连接，备份模式';
            break;
          default:
            return '';
            break;
        }
      },
      toTip(value) {
        switch(value) {
          case '0':
            return '未连接';
            break;
          case '1':
            return '已连接';
            break;
          case '2':
            return '备份未生效';
            break;
          case '3':
            return '备份已生效';
            break;
          default:
            return '';
            break;
        }
      }
    }

  }
</script>
<style lang="less" scoped>
  .floatingbtn {
    position: fixed;
    right: 0;
    top: 80px;
    height: 50px;
    line-height: 50px;
    .floatingicon {
      cursor: pointer;
      user-select: none;
    }
  }

  // 浮窗
  .mask {
    width: 1201px; // 写死会有问题
    height: 845px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    z-index: 99;
    &.mask-active {
      z-index: -1;
    }
  }
  .slide-box {
    width: 100%;
    height: 100%;
    // background: rgba(57, 62, 67, 0.8);
    transform: translateX(0);
    transition: transform ease 0.5s;
    &.subactive {
      transform: translateX(100%);
    }
  }
  .slide-box {
    position: relative;
    .title {
      font-size: 28px;
      color: #fff;
      &.mb18 {
        margin-bottom: 29px;
      }
      &.small {
        font-size: 20px;
        color: #adb4cf;
      }
    }
  }

  .title {
    width: 100%;
    height: 24px;
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 24px;
  }

  .infos {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    .info {
      box-sizing: border-box;
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 15px 0;
      > div:nth-child(1) {
        width: 100%;
        color: #adb4cf;
        font-size: 16px;
        margin-bottom: 5px;
      }
      > div:nth-child(2) {
        width: 100%;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .main-layer,
  .PIPLayer {
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.75);
    width: 400px;
    height: 320px;
    position: absolute;
    top: 0;
    left: 0px;
    padding: 34px 30px 34px 30px;
    // 标题及状态
    .statusinfo {
      height: 24px;
      width: 320px;
      .status {
        box-sizing: border-box;
        width: 60px;
        height: 100%;
        background-color: #adb4cf;
        padding-left: 6px;
        float: left;
        font-size: 16px;
        &.active {
          background-color: #febe00;
        }
      }
      .title {
        margin-left: 70px;
        font-size: 20px;
        line-height: 24px;
      }
    }
    .details {
      box-sizing: border-box;
      height: 70px;
      line-height: 24px;
      padding: 18px 0;
      color: #fff;
      :first-child {
        margin-right: 10px;
      }
    }
  }
  .PIPLayer {
    left: 401px;
  }

  .screeninfo {
    box-sizing: border-box;
    width: 390px;
    height: 320px;
    position: absolute;
    padding: 34px 30px 34px 30px;
    background-color: rgba(0, 0, 0, 0.75);
    top: 0;
    right: 0px;
    .title {
      width: 100%;
      height: 24px;
      margin-bottom: 40px;
      font-size: 20px;
      line-height: 24px;
    }
    .screen-content {
      display: flex;
      justify-content: flex-start;

      .screen-left {
        width: 100%;
        color: #fff;
        .light {
          color: #adb4cf;
          margin-top: 5px;
          padding-left: 40px;
        }
      }
      .screen-right {
        width: 100%;
        .info {
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 15px 20px 0;
          > div:nth-child(1) {
            width: 100%;
            color: #adb4cf;
            font-size: 16px;
            margin-bottom: 5px;
          }
          > div:nth-child(2) {
            width: 100%;
            color: #fff;
            font-size: 16px;
          }
        }
        .info:first-child {
          padding-top: 0;
        }
      }
    }
  }

  // 画质信息
  .pictureinfo {
    box-sizing: border-box;
    width: 801px;
    height: 245px;
    position: absolute;
    padding: 34px 30px 34px 30px;
    background-color: rgba(0, 0, 0, 0.75);
    top: 330px;
    left: 0px;
    .title {
      width: 100%;
      height: 24px;
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 24px;
    }
    .infos {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      .info {
        box-sizing: border-box;
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 15px 0;
        > div:nth-child(1) {
          width: 100%;
          color: #adb4cf;
          font-size: 16px;
          margin-bottom: 5px;
        }
        > div:nth-child(2) {
          width: 100%;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  // 其他
  .otherinfo {
    box-sizing: border-box;
    width: 390px;
    height: 245px;
    position: absolute;
    padding: 34px 30px 34px 30px;
    background-color: rgba(0, 0, 0, 0.75);
    top: 330px;
    right: 0px;
    .title {
      width: 100%;
      height: 24px;
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 24px;
    }
    .otherbtn {
      height: 28px;
      display: flex;
      margin-bottom: 30px;
      .bkg {
        color: #061031;
        width: 60px;
        height: 28px;
        background-color: #525972;
        display: flex;
        align-items: center;
        justify-content: center;
        &.bkg-active {
          background-color: #fff;
        }
      }
      .bkg:first-child {
        margin-right: 10px;
      }
    }
    .infos {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      .info {
        box-sizing: border-box;
        width: 50%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 15px 0;
        > div:nth-child(1) {
          width: 100%;
          color: #adb4cf;
          font-size: 16px;
          margin-bottom: 5px;
        }
        > div:nth-child(2) {
          width: 100%;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  // 输入
  .inputinfo {
    box-sizing: border-box;
    position: absolute;
    padding: 34px 30px 30px 30px;
    background-color: rgba(0, 0, 0, 0.75);
    width: 1081px;
    height: 129px;
    bottom: 131px;
    left: 0px;
    display: flex;
    .title {
      width: 60px;
      height: 100%;
      font-size: 20px;
      line-height: 24px;
    }
    .infos {
      display: flex;
      justify-content: center;
      .info {
        box-sizing: border-box;
        width: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 10px 0 10px;
        .img {
          display: flex;
          justify-content: center;
          width: 60px;
          height: 40px;
          background: center no-repeat;
          // background: url('../../assets/ctrls/DP_1.png') center no-repeat;
        }
        > div:nth-child(2) {
          display: flex;
          justify-content: center;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  .outputinfo {
    box-sizing: border-box;
    display: flex;
    position: absolute;
    padding: 34px 30px 24px 30px;
    background-color: rgba(0, 0, 0, 0.75);
    width: 1081px;
    height: 130px;
    bottom: 0;
    left: 0px;
    .title {
      width: 60px;
      height: 100%;
      font-size: 20px;
      line-height: 24px;
    }
    .infos {
      display: flex;
      justify-content: center;
      .info {
        box-sizing: border-box;
        width: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 10px;
        .img {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          background: center no-repeat;
          // background: url('../../assets/ctrls/output_1.png') center no-repeat;
        }
        > div:nth-child(2) {
          display: flex;
          justify-content: center;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  .shineinfo {
    box-sizing: border-box;
    position: absolute;
    padding: 20px 10px 20px 20px;
    background-color: rgba(0, 0, 0, 0.75);
    width: 119px;
    height: 260px;
    bottom: 0;
    right: 0px;
    font-size: 14px;
    color: #fff;
    .infos {
      height: 100%;
      .info {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0;
        > div:nth-child(1) {
          display: flex;
          width: 48px;
          margin-bottom: 0;
          justify-content: flex-start;
          align-items: center;
          color: #fff;
          font-size: 16px;
        }
        .img {
          width: 38px;
          height: 26px;
          display: flex;
        }
        .img0 {
          background: url('../../assets/ctrls/opt_0.png') top no-repeat;
        }
        .img1 {
          background: url('../../assets/ctrls/opt_1.png') top no-repeat;
        }
        .img2 {
          background: url('../../assets/ctrls/opt_2.png') top no-repeat;
        }
        .img3 {
          background: url('../../assets/ctrls/opt_3.png') top no-repeat;
        }
      }
    }
  }
  // 这里的 DVI_Mosaic  最好让后端把接口名字一换，如果人家不换，在收到数据的时候换一下就可以界面上显示 MOSAIC。。。。
  // 充分展示了如何在屎山上继续铲屎
  // 有没有发现问题？　为什么你的实现需要依赖后端数据呢　为什么呢？　　这里你就需要去考虑如何解耦　前提是你把之前的实现看懂了
  // 我来给你一个提示
  // testlist:[{
  //   name: 'DP',  // 你要显示在界面上的数据
  //   key: 'DP',   // 这个是后端发回的数据中，与之对应的名字
  //   type: 'DP'  //对应图片需要用的前半部分
  // }, {}, {}]
  // 这样写是不是就解耦了？ 没看懂没关系，我来给你拿你最蛋疼的Mosaic举例
  // 你要显示的是 MOSAIC 数据的key是DVI_Mosaic 图片是 MOSAIC_0 这里的对象一写，是不是要用啥，取啥就行了？显示绑定name 取数据用.key 拼接显示的图片用type就可以了
  // 多说一句，为啥我这里不用你说的class替换要直接用内联样式呢。。。因为那样的话，你有多少图片就要多少class，侧边就是切换class，你可以对比看一下就知道为啥这里不能那么做
  // 这样的话，后端给的数据叫啥跟你前台就没关系了，跟后端数据有关的只有这个对象了，改动之后你维护这个对象就行了
  // 这样你就可以在拿到UI没有协议的情况下，开发完前端的页面了
  // 我在上面用了一种最耦合的方法给你展示了什么是烂代码，基本的写法，思路都告诉你了，你用半个小时就能看完这个例子并且重构，fighting。。。
  // 希望你下面的输出模块能用这种解耦的思想来做哦~   加油狗子，做一个不被后端支配的前端大神
</style>


