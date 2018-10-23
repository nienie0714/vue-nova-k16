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
            <div class="status" :class="{active: false}">已关闭</div>
            <div class="title">
              PIP
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
        <div class="screeninfo">
          <!-- 状态及名称 -->
          <div class="title">
            屏体信息
          </div>
          <div class="screen-content">
            <div class="screen-left">
              <el-progress type="circle" :width="160" :percentage="80" :stroke-width="10" color="#febe00"></el-progress>
            </div>
            <div class="screen-right">
              <div class="info">
                <div>配屏大小 :</div>
                <div>8192x1080</div>
              </div>
              <div class="info">
                <div>Gamma :</div>
                <div>2.8</div>
              </div>
              <div class="info">
                <div>色温 :</div>
                <div>自定义</div>
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
                <el-progress :percentage="40" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>饱和度 :</div>
              <div>
                <el-progress :percentage="80" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>对比度 :</div>
              <div>
                <el-progress :percentage="80" :stroke-width="10" color="#ffffff"></el-progress>
              </div>
            </div>
            <div class="info">
              <div>色调 :</div>
              <div>
                <el-progress :percentage="80" :stroke-width="10" color="#ffffff"></el-progress>
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
            <div class="bkg">BKG</div>
            <div class="bkg bkg-active">HDR</div>
          </div>
          <div class="infos">
            <div class="info">
              <div>设备冗余 :</div>
              <div>主控</div>
            </div>
            <div class="info">
              <div>同步状态 :</div>
              <div>关闭</div>
            </div>
          </div>
        </div>
        <!-- 输入 -->
        <div class="inputinfo">
          <div class="title">
            输入
          </div>
          <div class="infos">
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/DP_1.png" alt="">
              </div>
              <div>HDMI</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/HDMI_1.png" alt="">
              </div>
              <div>DP</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/SDI_1.png" alt="">
              </div>
              <div>SDI1</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/SDI_1.png" alt="">
              </div>
              <div>SDI2</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/DVI_1.png" alt="">
              </div>
              <div>DVI1</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/DVI_1.png" alt="">
              </div>
              <div>DVI2</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/DVI_1.png" alt="">
              </div>
              <div>DVI3</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/DVI_1.png" alt="">
              </div>
              <div>DVI4</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/MOSAIC_1.png" alt="">
              </div>
              <div>MOSAIC</div>
            </div>
          </div>
        </div>
        <!-- 输出  -->
        <div class="outputinfo">
          <div class="title">
            输出
          </div>
          <div class="infos">
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>1</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>2</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>3</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>4</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>5</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>6</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>7</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>8</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>9</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>10</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>11</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>12</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>13</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>14</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>15</div>
            </div>
            <div class="info">
              <div class="img">
                <img src="@/assets/ctrls/icon_output_1.png" alt="">
              </div>
              <div>16</div>
            </div>
          </div>
        </div>
        <!-- 光纤 -->
        <div class="shineinfo">
          <div class="infos">
            <div class="info">
              <div>OPT1</div>
              <div class="img">
                <img src="@/assets/ctrls/icon_opt_1.png" alt="">
              </div>
            </div>
            <div class="info">
              <div>OPT2</div>
              <div class="img">
                <img src="@/assets/ctrls/icon_opt_1.png" alt="">
              </div>
            </div>
            <div class="info">
              <div>OPT3</div>
              <div class="img">
                <img src="@/assets/ctrls/icon_opt_1.png" alt="">
              </div>
            </div>
            <div class="info">
              <div>OPT4</div>
              <div class="img">
                <img src="@/assets/ctrls/icon_opt_1.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        afterActive: false,
        slideActive: false,
        timer: null
      };
    },
    props: [
      'subactive'
    ],
    watch: {
      // slideActive(val) {
      //   this.$emit('update:subactive', val);
      // }
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
      this.getAllInfo();
    },
    methods: {
      getAllInfo() {

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
    background: rgba(57, 62, 67, 0.8);
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
  .main-layer,
  .PIPLayer {
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.5);
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
  .PIPLayer {
    left: 401px;
  }

  .screeninfo {
    box-sizing: border-box;
    width: 390px;
    height: 320px;
    position: absolute;
    padding: 34px 30px 34px 30px;
    background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(0, 0, 0, 0.5);
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
        justify-content: space-between;
        padding: 10px 10px 0 10px;
        .img {
          display: flex;
          justify-content: center;
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
    background-color: rgba(0, 0, 0, 0.5);
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
          display: flex;
          justify-content: center;
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
    background-color: rgba(0, 0, 0, 0.5);
    width: 119px;
    height: 260px;
    bottom: 0;
    right: 0px;
    font-size: 14px;
    color: #fff;
    .infos {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>


