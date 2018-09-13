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
              <div class="carda">
                <div class="card-top">
                  <div class="card-title">
                    当前输入分辨率
                  </div>
                  <div class="card-icon" @click="dropcard = !dropcard">
                    <img src="@/assets/icon/u389.png" alt="">
                  </div>
                </div>
                <div class="card-btm">3840×2160@ 60Hz</div>
              </div>
              <div class="dropcard" v-show="dropcard">
                aaaaa
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
        dropcardshow: true
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
    width: 240px;
    height: 123px;
    padding: 15px 10px;
    background-color: rgba(58, 62, 71, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    &-top {
      display: flex;
      margin-bottom: 10px;
      .card-title {
        width: 90%;
      }
      .card-icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .dropcard {
    }
  }
  .tabs {
    .tab {
      display: inline-block;
      margin-right: 3px;
      width: 24.7%;
      height: 50px;
      line-height: 50px;
      text-align-last: center;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(0, 0, 0, 1);
      border: none;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        border: none;
        background-color: rgba(209, 58, 29, 1);
      }
    }
  }
</style>
