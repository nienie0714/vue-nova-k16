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
            <div class="status" :class="{active: true}">开启中</div>
            <div class="title">
              MainLayer
            </div>
          </div>
          <!-- 分辨率 -->
          <div class="details">
            <span>DVIMOSAIC</span>
            <span>3840x2160@60Hz</span>
          </div>
          <!-- 其他信息 -->
          <div class="infos">
            <div class="info">
              <div>大小 :</div>
              <div>3000x1000</div>
            </div>
            <div class="info">
              <div>优先级 :</div>
              <div>置地</div>
            </div>
            <div class="info">
              <div>位置 :</div>
              <div>(3000,1000)</div>
            </div>
            <div class="info">
              <div>截取状态 :</div>
              <div>开启中</div>
            </div>
          </div>
        </div>
        <!-- PIPLayer -->
        <div class="PIPLayer">
          <!-- 状态及名称 -->
          <div class="statusinfo">
            <div class="status" :class="{active: +pipres.L2_Sta}">已关闭</div>
            <div class="title">
              PIP
            </div>
          </div>
          <!-- 分辨率 -->
          <div class="details">
            <span>{{srclist[pipres.L2_Src]}}</span>
            <span>{{pipres.In1_ResW}}x{{pipres.In1_ResH}}@{{pipres.In1_ResR}}Hz</span>
          </div>
          <!-- 其他信息 -->
          <div class="infos">
            <div class="info">
              <div>大小 :</div>
              <div>{{pipres.L2_W}}x{{pipres.L2_H}}</div>
            </div>
            <div class="info">
              <div>优先级 :</div>
              <div>{{pipres.L2_Pri}}</div>
            </div>
            <div class="info">
              <div>位置 :</div>
              <div>({{pipres.L2_X}},{{pipres.L2_Y}})</div>
            </div>
            <div class="info">
              <div>截取状态 :</div>
              <div>{{pipres.L2_CSta}}</div>
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
              <el-progress type="circle" :width="135" :percentage="pipres.Screen_Bri" :stroke-width="10" color="#febe00"></el-progress>
              <div class="light">屏体亮度</div>
            </div>
            <div class="screen-right">
              <div class="info">
                <div>配屏大小 :</div>
                <div>{{pipres.Screen_W}}x{{pipres.Screen_H}}</div>
              </div>
              <div class="info">
                <div>Gamma :</div>
                <div>{{pipres.Pic_Gam}}</div>
              </div>
              <div class="info">
                <div>色温 :</div>
                <div>{{pipres.Pic_CloTem}}</div>
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
                <el-progress :percentage="pipres.Pic_Bri|toNumber" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>饱和度 :</div>
              <div>
                <el-progress :percentage="pipres.Pic_Sat|toNumber" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>对比度 :</div>
              <div>
                <el-progress :percentage="Number(pipres.Pic_Con)" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>色调 :</div>
              <div>
                <el-progress :percentage="Number(pipres.Pic_Hue)" :stroke-width="10" color="#ffffff"></el-progress>
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
            <!-- <div class="bkg" :class="{"bkg-active": pipres[0].BKG_Sta}">BKG</div> -->
            <div class="bkg">BKG</div>
            <!-- <div class="bkg" :class="{"bkg-active": pipres[0].HDR_Sta}">HDR</div> -->
            <div class="bkg">HDR</div>
          </div>
          <div class="infos">
            <div class="info">
              <div>设备冗余 :</div>
              <div>{{pipres.Redu_Sta}}</div>
            </div>
            <div class="info">
              <div>同步状态 :</div>
              <div>{{pipres.Sync_Sta}}</div>
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
              <el-tooltip effect="dark" :content="`使用中`" placement="top">
                <!-- <div class="img" :style="{background :url(require(`../../assets/ctrls/DP_1.png`))}"> -->
                <div class="img" :style='{backgroundImage:"url(" + require(`../../assets/ctrls/${pngSrcList[index]}_${mainres[srclist[index] + "_Sta"]}.png`) + ")" }'>
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
              <el-tooltip effect="dark" :content="`使用中`" placement="top">
                <div class="img"></div>
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
              <el-tooltip effect="dark" :content="pipres['Opt'+ (index+1) +'_Sta'] | toTip" placement="right">
                <div :class="['img', 'img' + pipres['Opt'+ (index+1) +'_Sta']]"></div>
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
        timer: null,
        // 这里的 DVI_Mosaic  最好让后端把接口名字一换，如果人家不换，在收到数据的时候换一下就可以界面上显示 MOSAIC。。。。
        // 充分展示了如何在屎山上继续铲屎
        srclist: ['DP', 'HDMI', 'SDI1', 'SDI2', 'DVI1', 'DVI2', 'DVI3', 'DVI4', 'DVI_Mosaic'],
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
        mainres: {},
        pipres: {}
      };
    },
    props: [
      'subactive'
    ],
    watch: {
      slideActive(val) {
        clearTimeout(this.timmer);
        if(val) {
          this.afterActive = true;
        } else {
          this.timmer = setTimeout(() => { this.afterActive = false }, 300);
        }
        this.$emit('update:subactive', val);
      }
    },
    created() {
      this.getMainInfo();
      this.getPipInfo();
    },
    methods: {
      ...mapActions(['ajax']),
      getMainInfo() {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, L1_Info: 0, Output_Info: 0, Input_Info: 0, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.mainres = res;
          // this.data[0].status = res.L1_Sta;
          // this.data[0].src = res.L1_Src;
          // this.data[0].pri = res.L1_Pri;
          // this.data[0].w = res.In1_ResW;
          // this.data[0].h = res.In1_ResH;
          // this.data[0].r = res.In1_ResR;
          // this.data[0].sw = res.L1_W;
          // this.data[0].sh = res.L1_H;
          // this.data[0].sx = res.L1_X;
          // this.data[0].sy = res.L1_Y;
          // this.data[0].sy = res.L1_Y;
          // this.data[0].csta = res.L1_CSta;
        });
      },
      getPipInfo() {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, L2_Info: 0, Pic_Info: 0, Other_Info: 0, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.pipres = res;
          this.pipres.Screen_Bri = Number(this.pipres.Screen_Bri);
          // {"L2_Sta":"0", "L2_Src":"1", "In1_ResW":"1920", "In1_ResH":"1080", "In1_ResR":"6000", "L2_W":"1920", "L2_H":"1080", "L2_X":"0", "L2_Y":"0", "L2_Pri":"2", "L2_CSta":"0", "Pic_Bri":"60", "Pic_Con":"50", "Pic_Sat":"50", "Pic_Hue":"0", "Pic_CloTem":"0", "Pic_Gam":"15", "Screen_Bri":"60", "Screen_W":"2096", "Screen_H":"1080", "BKG_Sta":"0", "HDR_Sta":"0", "Sync_Sta":"0", "Redu_Sta":"0", "Opt1_Sta":"0", "Opt2_Sta":"0", "Opt3_Sta":"0", "Opt4_Sta":"0", "ERRC": "0"}
          // res.L2_Sta
          // res.L2_Src
          // res.In1_ResW
          // res.In1_ResH
          // res.In1_ResR
          // res.L2_W
          // res.L2_H
          // res.L2_X
          // res.L2_Y
          // res.L2_Pri
          // res.L2_CSta
          // res.Pic_Bri
          // res.Pic_Con
          // res.Pic_Sat
          // res.Pic_Hue
          // res.Pic_CloTem
          // res.Pic_Gam
          // res.Screen_Bri
          // res.Screen_W
          // res.Screen_H
          // res.BKG_Sta
          // res.HDR_Sta
          // res.Sync_Sta
          // res.Redu_Sta
          // res.Opt1_Sta
          // res.Opt2_Sta
          // res.Opt3_Sta
          // res.Opt4_Sta
        });
      }
    },
    filters: {
      toNumber: function(value) {
        return Number(value)
      },
      toTip(value) {
        switch(value) {
          case '0':
            return '离线';
            break;
          case '1':
            return '使用中';
            break;
          case '2':
            return '被占用';
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
          background: url('../../assets/ctrls/output_1.png') center no-repeat;
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
    padding: 34px 20px 34px 20px;
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
          width: 30px;
          height: 18px;
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
      }
    }
  }
</style>


