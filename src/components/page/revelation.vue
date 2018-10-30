<template>
  <div class="revelation">

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
                  <div class="decrease" @click="decrease" :class="{disabled: value <= 0}">
                  </div>
                  <div class="increase" @click="increase" :class="{disabled: value >= 100}">
                  </div>
                </div>
              </div>
              <!-- slider -->
              <div class="block">
                <el-slider v-model="value" @change="handleLight">
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
            <div class="menu-backbox inputclass" v-for="(item, index) in srclist">
              <div class="info">
                <div class="titlerol">
                  <div class="title">{{item.title}}</div>
                  <div class="titlebtn">
                    <div class="smain" v-if="item.isMain">Main</div>
                    <div class="spip" v-if="item.isPIP">PIP</div>
                  </div>
                </div>
                <div class="src">{{item.src}}</div>
                <template>
                  <div class="srcinfo" v-if="item.isSingle">{{item.w}}x{{item.h}}@{{item.r}}</div>
                  <div class="srcinfo" v-else>{{item.no}}</div>
                </template>
              </div>
              <div class="srcactive">
                <div class="main" @click="setMain(index)">Main</div>
                <div class="pip" @click="setPIP(index)">PIP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btncenter">
      <v-button :maintitle="'功能'" :subtitle="'输入源'" @getBtn="switchHome"></v-button>
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
        srclist: [
          {
            title: 'input',
            src: 'DP 1.2',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'HDMI 2.0',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: '12G SDI-1',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: '12G SDI-2',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'DVI-1',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'DVI-2',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'DVI-3',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'DVI-4',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          },
          {
            title: 'input',
            src: 'DVI Mosaic',
            className: 'srcactive',
            isSingle: false,
            w: '1920',
            h: '1080',
            r: '120',
            no: 'No Single',
            isMain: false,
            isPIP: false
          }
        ],
        active: false,
        subactive: true,
        btnactive: 1,
        hometimer: null,
        value: -1,
        interval: null
      };
    },
    created() {
      this.value = +this.getMosic['Screen_Bri'];
    },
    computed: {
      ...mapGetters(['getCommon', 'getMosic'])
    },
    watch: {
      value(val, old) {
        if(old != -1) {
          this.handleLight();
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon', 'setMosic']),
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
            _: sessionStorage.getItem('_')
          }
        });
      },
      switchHome(val) {
        this.btnactive = val;
        this.btnactive == 1 ? this.active = false : this.active = true;
        if(val == 2) {
          this.initSrc();
          this.initMP();
          this.interval = setInterval(() => {
            this.initSrc();
            this.initMP();
          }, 2000);
        } else {
          clearInterval(this.interval);
          this.ajax({
            name: 'url',
            data: { RW: 0, DevID: 0, Screen_Bri: 0, In9_MosL: 0, In9_MosM: 0, In9_MosW: 0, In9_MosH: 0, _: sessionStorage.getItem('_') }
          }).then(res => {
            // { "In9_MosL":"1", "In9_MosM":"2", "In9_MosW":"1920", "In9_MosH":"1080", "ERRC": "0"}
            this.setMosic(res);
            this.value = +this.getMosic['Screen_Bri'];
          });
        }
      },
      initSrc() {
        let list = ['DP_Sta', 'HDMI_Sta', 'SDI1_Sta', 'SDI2_Sta', 'DVI1_Sta', 'DVI2_Sta', 'DVI3_Sta', 'DVI4_Sta', 'DVI_Mosaic_Sta'];
        let statelist = [this.getCommon['DP_Sta'], this.getCommon['HDMI_Sta'], this.getCommon['SDI1_Sta'], this.getCommon['SDI2_Sta'], this.getCommon['DVI1_Sta'], this.getCommon['DVI2_Sta'], this.getCommon['DVI3_Sta'], this.getCommon['DVI4_Sta'], "1"];
        let ret = {};
        let val = [];

        statelist.forEach((item, index) => {
          if(item == 1 || item == 2) {
            this.srclist[index].isSingle = true;
            ret[`In${index}_ResW`] = 0;
            ret[`In${index}_ResH`] = 0;
            ret[`In${index}_ResR`] = 0;
            val.push(index);
          } else {
            this.srclist[index].isSingle = false;
          }
        });
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, ...ret, _: sessionStorage.getItem('_') }
        }).then(res => {
          val.forEach((data, i) => {
            this.srclist[i]['h'] = +res[`In${i}_ResH`]
            this.srclist[i]['w'] = +res[`In${i}_ResW`]
            this.srclist[i]['r'] = +res[`In${i}_ResR`] / 100;
          });
        });
      },
      setMain(index) {
        this.ajax({
          name: 'url',
          data: { RW: 1, DevID: 0, CMD: 6, L1_Src: index, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.srclist.forEach((item, i) => {
            if(i == index) {
              item.isMain = true;
            } else {
              item.isMain = false;
            }
          });
        });
      },
      setPIP(index) {
        this.ajax({
          name: 'url',
          data: { RW: 1, DevID: 0, CMD: 6, L2_Src: index, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.srclist.forEach((item, i) => {
            if(i == index) {
              item.isPIP = true;
            } else {
              item.isPIP = false;
            }
          });
        });
      },
      initMP() {
        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, L1_Src: 0, L2_Src: 0, _: sessionStorage.getItem('_') }
        }).then(res => {
          this.srclist.forEach((item, i) => {
            if(i == res['L1_Src']) {
              item.isMain = true;
            } else {
              item.isMain = false;
            }
          });
          this.srclist.forEach((item, i) => {
            if(i == res['L2_Src']) {
              item.isPIP = true;
            } else {
              item.isPIP = false;
            }
          });
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
    margin-top: 135px;
  }
  //  正反面反转
  /* entire container, keeps perspective */
  .flip-container {
    perspective: 4000;
    -webkit-perspective: 4000;
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
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_light.png') center no-repeat;
      background-size: 360px 200px;
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
          .decrease {
            width: 50px;
            height: 32px;
            border: 1px solid #525972;
            border-right: none;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            cursor: pointer;
            background-position: center center;
            background-image: url('~assets/icon/icon_low_normal.png');
            background-repeat: no-repeat;
            &.disabled {
              background-image: url('~assets/icon/icon_low_forbidden.png');
              cursor: not-allowed;
            }
          }
          .increase {
            width: 50px;
            height: 32px;
            border: 1px solid #525972;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
            cursor: pointer;
            background-position: center center;
            background-image: url('~assets/icon/icon_add_normal.png');
            background-repeat: no-repeat;
            &.disabled {
              background-image: url('~assets/icon/icon_add_forbidden.png');
              cursor: not-allowed;
            }
          }
        }
      }
    }
    &.input {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_input.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.screen {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_screen.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.window {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_window.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.picture {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_picture.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.connect {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_connect.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.scene {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_scene.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.communication {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_communication.png') center no-repeat;
      background-size: 360px 200px;
    }
    &.setting {
      background: rgba(0, 0, 0, 0.8) url('../../assets/home/img_setting.png') center no-repeat;
      background-size: 360px 200px;
    }
  }
  input {
    border: none;
    width: 50%;
    font-size: 34px;
    background-color: #1f2a51;
    color: white;
  }
  .inputclass {
    background-color: #1f2a51;
    display: flex;
    flex-direction: column;
    .titlerol {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 30px;
      .title {
        font-size: 16px;
        color: #adb4cf;
      }
      .titlebtn {
        display: flex;
        flex-direction: row;
        .smain {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 48px;
          height: 24px;
          margin-right: 10px;
          // padding: 14px 33px;
          background-color: #febe00;
          color: #061031;
          font-size: 16px;
        }
        .spip {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 48px;
          height: 24px;
          // padding: 14px 33px;
          background-color: #62c655;
          color: #061031;
          font-size: 16px;
        }
      }
    }
    .src {
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .srcinfo {
      font-size: 20px;
      color: #ffffff;
    }
  }
  .menu-backbox {
    float: left;
    box-sizing: border-box;
    width: 360px;
    height: 200px;
    margin: 0 40px 40px 0;
    padding: 40px 30px 20px 30px;
    color: #fff;
    font-size: 28px;
    transform: translateY(5px);
    transition: all 0.3s;
    position: relative;
    &:hover {
      transform: translateX(0);
    }
    &:hover .srcactive {
      opacity: 1;
    }
    &:hover .info {
      opacity: 0.5;
    }
  }
  .srcactive {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #cecfd5;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.3s;
    .main {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 120px;
      height: 48px;
      padding: 14px 14px;
      margin-right: 20px;
      border: 1px solid #febe00;
      color: #febe00;
      font-size: 24px;
      cursor: pointer;
    }
    .pip {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 60px;
      height: 48px;
      padding: 14px 33px;
      background-color: #62c655;
      color: #061031;
      font-size: 24px;
      cursor: pointer;
    }
  }
</style>

