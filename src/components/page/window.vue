<template>
  <div class="wrapper" @click="closeCard">
    <!-- <v-header></v-header> -->
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">窗口设置</span>
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab tab3" v-for="(item, index) in data" :class="{active: active == index}" @click="readData(index)" :key="index">
          <b>{{item.name}}</b>
        </div>
      </div>
      <div class="container">
        <!-- content -->
        <div class="content">
          <!-- 主窗口 -->
          <div class="tabcontent4" v-show="active == 0" :class="{active: data[0].showcutout}">
            <ul class="cardul">
              <li>
                <v-textbox :showswitch="1" :title="'主窗口状态'" @switchOpen="switchMainWindow"></v-textbox>
                <!-- <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="'aaa'"></v-readbox>  :defaultcontent="'开启'"-->
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="ratioVisible" :showdrop="1" :title="'当前输入源'" :defaultcontent="'DP'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'缩放模式'" :defaultcontent="'自定义缩放'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
              </li>
              <li>
                <v-textbox :activeIndex="0" v-model="mosicVisible" :showdrop="1" :title="'优先级'" :defaultcontent="'1'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
              </li>
            </ul>
            <ul class="cardul">
              <li>
                <v-sliderbox :title="'窗口水平起始'" :min="800" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'窗口垂直起始'" :min="600" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'窗口水平宽度'" :min="800" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'窗口垂直宽度'" :min="600" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
            </ul>
            <div class="btncenter mosicbtn">
              <div class="applybtn mosicc" @click="data[0].showcutout = true"><img src="~assets/icon/icon_more.png" alt="">输入截取</div>
            </div>
          </div>
          <!-- 副窗口 -->
          <div class="tabcontent3" v-show="active == 1">

          </div>
          <!-- BKG -->
          <div class="tabcontent3" v-show="active == 2">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-textbox :showswitch="1" :title="'BKG状态'" @switchOpen="switchBkg"></v-textbox>
                </li>
                <li>
                  <v-textbox :activeIndex="0" v-model="ratioVisible" :showdrop="1" :title="'BKG类型'" :defaultcontent="'图片BKG'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <li class="noneli">
                  <v-readbox></v-readbox>
                </li>
                <li class="noneli">
                  <v-readbox></v-readbox>
                </li>
              </ul>
            </div>
            <div class="showdata showdatadvi">
              <div class="tabgroup">
                <div class="tabtitle">Capture</div>
                <div class="applybtn"><img src="~assets/icon/icon_apply.png" alt="">截取</div>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :activeIndex="0" v-model="freshVisible" :showdrop="1" :title="'Capture源选择'" :defaultcontent="'DP'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <li>
                  <v-textbox :activeIndex="0" v-model="mosic" :showdrop="1" :title="'保存位置选择'" :defaultcontent="'BKG1'" :list="[1,2,3]" @getData="obj => {}"></v-textbox>
                </li>
                <li class="noneli">
                  <v-readbox></v-readbox>
                </li>
                <li class="noneli">
                  <v-readbox></v-readbox>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 主窗口 副界面 -->
        <div class="subcontainer" v-show="active == 0" :class="{active: data[0].showcutout}">
          <div class="tabgroup">
            <div class="tabtitle">输入截取</div>
          </div>
          <div class="mosic">
            <ul class="cardul">
              <li>
                <v-textbox :showswitch="1" :title="'截取状态'" @switchOpen="switchMainCut"></v-textbox>
              </li>
              <li>
                <v-sliderbox :title="'水平起始'" :min="800" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'垂直起始'" :min="600" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'水平宽度(px)'" :min="800" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
              <li>
                <v-sliderbox :title="'垂直宽度(px)'" :min="600" :max="3840" v-model.number="data[0].a"></v-sliderbox>
              </li>
            </ul>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn" @click="data[0].showcutout = false"><img class="down" src="~assets/icon/icon_more.png">返回</div>
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
    name: 'window',
    data() {
      return {
        _: '',
        active: 0,
        ratioVisible: false,
        freshVisible: false,
        mosicVisible: false,
        data: [
          {
            name: '主窗口',
            a: 900,
            showcutout: false
          },
          {
            name: '副窗口'
          },
          {
            name: 'BKG'
          }
        ]
      }
    },
    created() {
      this._ = getLoc('_');
      this.active = this.getCommon.windowActive;
    },
    computed: {
      ...mapGetters(['getCommon', 'getCount', 'getMosic']),
    },
    watch: {
      getCount(val) {
        if(!val) {
          this.readData(this.getCommon['windowActive']);
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      readData(index) {
        // 激活菜单tab
        this.active = index || 0;
        this.setCommon({ windowActive: index });
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
        this.mosicVisible = false;
      },
      switchMainWindow(val) {
        console.log(val);
      },
      switchMainCut(val) {
        console.log(val);
      },
      switchBkg(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped lang="less">
  .cardul {
    display: flex;
    width: 100%;
    // flex-grow: 0; // 不允许变大
    li {
      position: relative;
      width: 364px;
      height: 160px;
      padding-right: 4px;
      padding-bottom: 4px;
      &.noneli {
        visibility: hidden;
      }
    }
  }
</style>

