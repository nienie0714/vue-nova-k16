<template>
  <div class="home">
    <div class="wrapper">
      <v-header></v-header>
      <div class="center">
        <div class="flip-container" :class="{active: active}">
          <!--  ontouchstart="this.classList.toggle('hover');"  -->
          <div class="flipper">
            <div class="front">
              <!-- 前面内容-home主页 -->
              <div class="menu-box" v-for="(router, index) in routers" :key="index" :class="router.className" @click="go(router)">
                <div>{{router.name}}</div>
              </div>
            </div>
            <div class="back">
              <!-- 背面内容-输入源 -->
              <div class="menu-box" v-for="(router, index) in routers" :key="index" :class="router.className" @click="go(router)">

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mask">
        <div class="slide-box" :class="{subactive: subactive}">
        </div>
      </div> -->
      <div class="btngroup">
        <div class="btn" :class="{btnactive: btnactive==1}" @click="active=false, btnactive=1">功能</div>
        <div class="btn" :class="{btnactive: btnactive==2}" @click="active=true, btnactive=2">接口</div>
        <div class="btn" @click="readPolling">TEST:点击发送常规请求</div>
        <!-- <div class="btn">{{$store.state.common.dpSta}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
  //import vHead from '../common/header.vue'; // 常规引用组件
  import bus from '../common/bus';
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { getLoc } from '../../utils';
  import { Message } from 'element-ui';
  import axios from 'axios';
  // import store1 from '../../store'

  export default {
    data() {
      return {
        routers: [{
          name: this.$t('home.light'),
          path: 'light',
          className: 'light'
        }, {
          name: this.$t('home.input'),
          path: 'input',
          className: 'input'
        }, {
          name: this.$t('home.screen'),
          path: 'screen',
          className: 'screen'
        }, {
          name: this.$t('home.window'),
          path: 'window',
          className: 'window'
        }, {
          name: this.$t('home.picture'),
          path: 'picture',
          className: 'picture'
        }, {
          name: this.$t('home.connect'),
          path: 'connect',
          className: 'connect'
        }, {
          name: this.$t('home.scene'),
          path: 'scene',
          className: 'scene'
        }, {
          name: this.$t('home.communication'),
          path: 'communication',
          className: 'communication'
        }, {
          name: this.$t('home.setting'),
          path: 'setting',
          className: 'setting'
        }
        ],
        active: false,
        subactive: true,
        btnactive: 1
      };
    },
    // components: {
    //   vHead// 常规引用组件
    // },
    created() {
      // console.log(store1.state.common.hdmiSta);
      setInterval(this.readPolling, 2000);
      // axios.get('http://172.16.5.135/page/panel/leds.cgi', {
      //   params: {
      //     RW: 0,
      //     DevID: 0,
      //     DP_Sta: 0,
      //     HDMI_Sta: 0,
      //     SDI1_Sta: 0,
      //     SDI2_Sta: 0,
      //     DVI1_Sta: 0,
      //     DVI2_Sta: 0,
      //     DVI3_Sta: 0,
      //     DVI4_Sta: 0,
      //     DVI_Mosaic_Sta: 0,
      //     BKG_Sta: 0,
      //     FRZ_Sta: 0,
      //     BLACK_Sta: 0,
      //     Account: 0,
      //     _: 0
      //   }
      // }).then(() => { });

      // this.ajax({
      //   name: 'url',
      //   data: { _: 1 }
      // }).then(res => {
      //   console.log('url:', res);
      // });
    },
    computed: {
      ...mapGetters(['getCommon'])
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      go(route) {
        this.$router.push({ name: route.path });
      },
      // 轮训常规接口
      readPolling() {
        console.log('----发送常规请求----');
        let command = localStorage.getItem('_');
        this.ajax({
          name: 'url',
          data: {
            RW: 0,
            DevID: 0,
            DP_Sta: 0,
            HDMI_Sta: 0,
            SDI1_Sta: 0,
            SDI2_Sta: 0,
            DVI1_Sta: 0,
            DVI2_Sta: 0,
            DVI3_Sta: 0,
            DVI4_Sta: 0,
            DVI_Mosaic_Sta: 0,
            BKG_Sta: 0,
            FRZ_Sta: 0,
            BLACK_Sta: 0,
            Account: 0,
            _: command
          }
        }).then(res => {
          console.log(11111, res); // { "DP_Sta":0, "HDMI_Sta":0, "SDI1_Sta":0, "SDI2_Sta":0, "DVI1_Sta":0, "DVI2_Sta":0, "DVI3_Sta":0, "DVI4_Sta":0, "DVI_Mosaic_Sta":0, "BKG_Sta":0, "FRZ_Sta":0, "BLACK_Sta":0, "Account":0000, "ERRC": 0}
          let account = getLoc('_');
          if(account == this.getCommon.account) {  // store.state.lang   // res.Account  // store.state.common.account  getCommon('account')
            let result = {};
            for(let key in res) {
              let tempKey = key.replace(/([A-Za-z0-9]*)_/, word => {
                // console.log(word);
                return word.toLowerCase();
              }).replace(/_/g, '');
              console.log(key, res[key], tempKey);
              result[key.replace(/([\w]*_)/, RegExp.$1.toLowerCase().replace(/_/, ''))] = res[key];
            }
            this.setCommon(result);
          } else {
            Message('您的账号已被其他人登录，请重新登录');
            localStorage.removeItem('_')
            this.$router.push('/login');
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }
  //  正反面反转
  /* entire container, keeps perspective */
  .flip-container {
    perspective: 1900;
  }
  /* flip the pane when hovered */
  // .flip-container:hover .flipper,
  // .flip-container.hover .flipper {
  //   transform: rotateY(180deg);
  // }
  .flipper-container .flipper,
  .active .flipper {
    transform: rotateY(180deg);
  }

  .flip-container,
  .front,
  .back {
    width: 1200px;
    height: 720px;
  }

  /* flip speed goes here */
  .flipper {
    transition: 1.2s;
    transform-style: preserve-3d;

    position: relative;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    backface-visibility: hidden;

    position: absolute;
    top: 0;
    left: 0;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
  }

  /* back, initially hidden pane */
  .back {
    transform: rotateY(180deg);
  }

  // 首页卡片
  .menu-box {
    float: left;
    box-sizing: border-box;
    width: 360px;
    height: 200px;
    margin: 0 40px 40px 0;
    padding: 40px 0 0 30px;
    color: #fff;
    font-size: 28px;
    display: flex;
    // align-items: flex-end;
    &:active {
      opacity: 0.8;
    }
    &.light {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_light.png') center center no-repeat / 360px 200px;
    }
    &.input {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_input.png') center center no-repeat / 360px 200px;
    }
    &.screen {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_screen.png') center center no-repeat / 360px 200px;
    }
    &.window {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_window.png') center center no-repeat / 360px 200px;
    }
    &.picture {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_picture.png') center center no-repeat / 360px 200px;
    }
    &.connect {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_connect.png') center center no-repeat / 360px 200px;
    }
    &.scene {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_scene.png') center center no-repeat / 360px 200px;
    }
    &.communication {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_communication.png') center center no-repeat / 360px 200px;
    }
    &.setting {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_setting.png') center center no-repeat / 360px 200px;
    }
  }

  // 浮窗
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

  .mask {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  .btngroup {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  //按钮
  .btn {
    height: 40px;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    border: solid 2px #828298;
    color: #828298;
    font-size: 16px;
    &.btnactive {
      font-size: 16px;
      color: #080532;
      background-color: #828298;
    }
  }
</style>

