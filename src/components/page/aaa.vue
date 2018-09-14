<template>
  <div class="aaa">
    <div class="wrapper">
      <v-head></v-head>
      <div class="content-box">
        <div class="snav">
          <img src="@/assets/icon/u343.png" alt="" @click="$router.go(-1);">
          <img src="@/assets/home/u123.svg" alt="">
          <span>输入设置</span>
        </div>
      </div>
      <div class="content">
        <div class="tabs">
          <div class="tab" v-for="(item, index) in tabsList" :class="{active: active == index}" @click="active = index" :key="index">
            <b>{{item}}</b>
          </div>
        </div>
        <div class="contents">
          <div class="tabcontent1" v-show="active == 0">
            <div class="DPc">关于DP的EDID设置</div>
            <div class="card">
              <div class="card-top">
                <div class="card-icon" @click="dropcard = !dropcard">
                  <!-- <img src="@/assets/icon/u389.png" alt=""> -->
                  <transition name="bounce">
                    <span v-if="dropcard">xia</span>
                    <span v-else>shang</span>
                  </transition>
                </div>
                <div class="card-title">
                  当前输入分辨率
                </div>
                <div class="card-btm">3840×2160@ 60Hz</div>
              </div>
              <div class="dropcard" :class="{actives: dropcard}">
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
                <div>aaaaa</div>
              </div>
            </div>
          </div>
          <div class="tabcontent2" v-show="active == 1">
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
          </div>
          <div class="tabcontent3" v-show="active == 2">
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
          </div>
          <div class="tabcontent4" v-show="active == 3">
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHead from '../common/header.vue';
  export default {
    name: 'aaa',
    data() {
      return {
        tabsList: ["DP", "HDMI", "SDI", "DVI"],
        active: 0,
        dropcard: false
      }
    },
    components: {
      vHead
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style scoped lang="less">
  .snav {
    height: 22px;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    img {
      display: inline-block;
      width: 25px;
      height: 25px;
    }
  }
  .card {
    box-sizing: border-box;
    width: 240px;
    height: 123px;
    display: flex;
    flex-direction: column;

    position: relative;
    &-top {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-color: rgba(58, 62, 71, 1);
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 2px;
      padding: 15px 10px;
      z-index: 10;
      .card-title {
        width: 90%;
      }
      .card-icon {
        float: right;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .card-btm {
        width: 100%;
      }
    }
    .dropcard {
      width: 240px;
      height: 123px;
      // padding: 15px 10px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s;
      position: absolute;
      left: 0;
      top: 0;
      overflow-y: auto;
      cursor: pointer;
      > div {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        transition: 0.3s;
      }
      > div:hover {
        color: #ff6700;
        background: #ccc;
      }
    }
    .dropcard::-webkit-scrollbar {
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    .dropcard::-webkit-scrollbar-thumb {
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    .dropcard::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .actives {
      left: 0;
      top: 125px;
    }
  }

  .tabs {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
