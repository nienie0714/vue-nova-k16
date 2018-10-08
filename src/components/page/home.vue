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
              <!-- <div class="menu-box" :class="light.className">
                <div>{{$t('home.light')}}</div>
              </div> -->
              <div class="menu-box light">
                <div>{{$t('home.light')}}</div>
                <div class="card-btm">
                  <div class="innum"><input v-model.number="value" onafterpaste="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onkeypress="this.value=this.value.replace(/[^0-9]/g,'')" @blur="handleLight"></div>
                  <div class="inimggroup">
                    <div class="inimg" @click="decrease">
                      <img v-if="notmin" src="@/assets/icon/icon_low_normal.png" alt="">
                      <img v-else src="@/assets/icon/icon_low_normal.png" alt="">
                    </div>
                    <div class="inimg" @click="increase">
                      <img v-if="notmax" src="@/assets/icon/icon_add_normal.png" alt="">
                      <img v-else src="@/assets/icon/icon_add_normal.png" alt="">
                    </div>
                  </div>
                </div>
                <!-- slider -->
                <div class="block">
                  <el-slider v-model="value" :step="4" @change="handleLight">
                    <!--  min=0 max=1920 -->
                  </el-slider>
                </div>
              </div>
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
      <div class="btncenter">
        <v-button :maintitle="'功能'" :subtitle="'输入源'" @getBtn="(data)=>{btnactive=data, btnactive==1?active=false:active=true;}"></v-button>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../common/bus';
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { getLoc } from '../../utils';
  import { Message } from 'element-ui';
  import axios from 'axios';

  export default {
    data() {
      return {
        routers: [{
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
          name: this.$t('home.setting'),
          path: 'setting',
          className: 'setting'
        }, {
          name: this.$t('home.communication'),
          path: 'communication',
          className: 'communication'
        }
        ],
        active: false,
        subactive: true,
        btnactive: 1,
        hometimer: null,
        value: 50,
        notmax: true,
        notmin: true
      };
    },
    computed: {
      ...mapGetters(['getCommon', 'getCacheData'])
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      go(route) {
        this.$router.push({ name: route.path });
      },
      increase() {
        this.value++;
        this.handleLight();
      },
      decrease() {
        this.value--;
        this.handleLight();
      },
      handleLight() {
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 4,
            Screen_Bri: this.value,
            _: localStorage.getItem('_')
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
    padding: 40px 30px 20px 30px;
    color: #fff;
    font-size: 28px;
    display: flex;
    transform: translateY(5px);
    transition: all 0.3s;
    position: relative;
    cursor: pointer;
    // align-items: flex-end;
    &:hover {
      opacity: 0.8;
      transform: translateX(0);
    }
    &.light {
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_light.png') center center no-repeat / 360px 200px;
      .card-btm {
        margin-top: 20px;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .innum {
          flex: 1;
        }
        .inimggroup {
          display: flex;
          justify-content: flex-end;
          .inimg {
            user-select: none;
            cursor: pointer;
            width: 50px;
            height: 32px;
            border: 1px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
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
  input {
    border: none;
    width: 50%;
    font-size: 34px;
    background-color: #1f2a51;
    color: white;
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
</style>

