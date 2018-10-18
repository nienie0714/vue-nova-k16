<template>
  <div>
    <div class="floatingbtn" @click.stop="slideActive = !slideActive">
      <img class="floatingicon" src="@/assets/icon/icon_dashboard.png" alt="" draggable="false">
    </div>
    <div class="mask" :class="{'mask-active': !slideActive}">
      <div class="slide-box" :class="{subactive: !slideActive}">
        <!-- 画质信息 -->
        <div class="common square">
          <div class="title mb18">
            画质信息
          </div>
          <div class="circleflex">
            <div class="innerflex">
              <el-progress type="circle" :width="80" :percentage="80" color="#ff7d45"></el-progress>
              <div class="light">亮度</div>
            </div>
            <div class="innerflex">
              <el-progress type="circle" :width="80" :percentage="80" color="#f5bf4f"></el-progress>
              <div class="contrast">对比度</div>
            </div>
            <div class="innerflex">
              <el-progress type="circle" :width="80" :percentage="80" color="#40beff"></el-progress>
              <div class="saturability">饱和度</div>
            </div>
          </div>
        </div>
        <!-- MainLayer -->
        <div class="common square1">
          <div class="title">
            MainLayer
          </div>
          <div class="statusinfo" :class="{active: true}">
            <div class="status" :class="{active: true}">开启中</div>
            <div class="details">DVIMOSAIC 3840x2160@60Hz</div>
          </div>
          <div class="info">
            <div>大小:</div>
            <div>3000x1000</div>
          </div>
          <div class="info">
            <div>位置:</div>
            <div>(3000,1000)</div>
          </div>
          <div class="info">
            <div>优先级:</div>
            <div>置地</div>
          </div>
          <div class="info">
            <div>截取状态:</div>
            <div>开启中</div>
          </div>
        </div>
        <!-- PIPLayer -->
        <div class="common square2">
          <div class="title">
            PIPLayer
          </div>
          <div class="statusinfo" :class="{active: false}">
            <div class="status" :class="{active: false}">已关闭</div>
            <div class="details">HDMI 3840x2160@60Hz</div>
          </div>
          <div class="info">
            <div>大小:</div>
            <div>3000x1000</div>
          </div>
          <div class="info">
            <div>位置:</div>
            <div>(3000,1000)</div>
          </div>
          <div class="info">
            <div>优先级:</div>
            <div>置地</div>
          </div>
          <div class="info">
            <div>截取状态:</div>
            <div>开启中</div>
          </div>
        </div>
        <!-- 其他 -->
        <div class="common rectangle1">
          <div class="title mb18">
            其他
          </div>
          <div class="info">
            <div>屏体亮度:</div>
            <div>60%</div>
          </div>
          <div class="info">
            <div>配屏大小:</div>
            <div>8192x1080</div>
          </div>
          <div class="info">
            <div>BKG状态:</div>
            <div>开启中</div>
          </div>
          <div class="info">
            <div>同步状态:</div>
            <div>关闭</div>
          </div>
          <div class="info">
            <div>设备冗余:</div>
            <div>主控</div>
          </div>
        </div>
        <div class="common rectangle2">
          <div class="title small">
            光纤
          </div>
        </div>
        <!-- 输入  -->
        <div class="common rowrectangle1">
          <div class="title">
            输入
          </div>

        </div>
        <!-- 输出  -->
        <div class="common rowrectangle2">
          <div class="title">
            输出
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
        active: true,
        slideActive: false,
        timer: null
      };
    },
    props: [
      'subactive'
    ],
    watch: {
      slideActive(val) {
        console.log(val);
        this.$emit('update:subactive', val);
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

  .mask {
    width: 1740px; // 写死会有问题
    height: 700px;
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
    .statusinfo {
      margin: 35px 0;
      height: 24px;
      width: 320px;
      border: 1px solid #adb4cf;
      .status {
        box-sizing: border-box;
        width: 60px;
        height: 100%;
        background-color: #adb4cf;
        padding-left: 6px;
        float: left;
        &.active {
          background-color: #62c655;
        }
      }
      .details {
        height: 100%;
        line-height: 24px;
        padding-left: 70px;
        color: #fff;
      }
      &.active {
        border: 1px solid #62c655;
      }
    }
    .info {
      box-sizing: border-box;
      font-size: 20px;
      display: flex;
      align-items: center;
      padding: 10px 0;
      > div:nth-child(1) {
        color: #adb4cf;
        width: 92px;
      }
      > div:nth-child(2) {
        color: #fff;
      }
    }
    .common {
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 35px 30px 45px 30px;
    }
    .square {
      width: 470px;
      height: 430px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .square1 {
      width: 425px;
      height: 430px;
      position: absolute;
      top: 0;
      left: 480px;
    }
    .square2 {
      width: 425px;
      height: 430px;
      position: absolute;
      top: 0;
      left: 907px;
    }
    .rectangle1 {
      width: 400px;
      height: 430px;
      position: absolute;
      top: 0;
      right: 0px;
    }
    .rectangle2 {
      width: 400px;
      height: 268px;
      position: absolute;
      top: 432px;
      right: 0px;
    }
    .rowrectangle1 {
      width: 1332px;
      height: 130px;
      position: absolute;
      bottom: 132px;
      left: 0px;
    }
    .rowrectangle2 {
      width: 1332px;
      height: 130px;
      position: absolute;
      bottom: 0;
      left: 0px;
    }
    .circleflex {
      display: flex;
      justify-content: space-between;
      .innerflex {
        display: flex;
        flex-direction: column;
        color: #fff;
        text-align: center;
        font-size: 20px;
        .light {
          margin-top: 20px;
          color: #ff7d45;
        }
        .contrast {
          margin-top: 20px;
          color: #f5bf4f;
        }
        .saturability {
          margin-top: 20px;
          color: #40beff;
        }
      }
    }
  }
</style>


