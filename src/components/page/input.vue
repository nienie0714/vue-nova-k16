<template>
  <div class="wrapper" @click="closeCard">
    <v-header></v-header>
    <!-- 页面名称 -->
    <div class="jrtitle">
      <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);">
      <img class="iicon" src="@/assets/icon/icon_input.png" alt="">
      <span class="snav">输入设置</span>
    </div>
    <div class="content-box">
      <!-- tab -->
      <div class="tabs">
        <div class="tab" v-for="(item, index) in data" :class="{active: active == index}" @click="readData(index)" :key="index">
          <b>{{item.name}}</b>
        </div>
      </div>
      <div class="container">
        <!-- content -->
        <div class="content">
          <!-- dp -->
          <div class="tabdp" v-show="active == 0">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入dp分辨率'" :defaultcontent="data[0].showdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(item)=>{data[0].btnactive=item}"></v-button>
                <div class="applybtn" @click="apply(0)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data[0].btnactive==1">
                  <li>
                    <v-textbox :activeIndex="data[0].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[0].ratio[0].wh].w + '*' + list1[data[0].ratio[0].wh].h" :list="list1" @getData="obj => {data[0].ratio[0].wh = obj.index}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox :activeIndex="data[0].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="list2[data[0].ratio[0].r].r" :list="list2" @getData="obj => {data[0].ratio[0].r = obj.index}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data[0].ratio[1].w" :min="800" :max="4096"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data[0].ratio[1].h" :min="600" :max="4096"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data[0].ratio[1].r" :min="23" :max="120"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- <v-textbox :showswitch="1" :title="'预设刷新率（Hz）'" :defaultcontent="'switch'"></v-textbox> -->
          <!-- hdmi -->
          <div class="tabcontent2" v-show="active == 1">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前输入hdmi分辨率'" :defaultcontent="data[1].showdata"></v-readbox>
                </li>
              </ul>
            </div>
            <div class="setdata">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data[1].btnactive=obj}"></v-button>
                <div class="applybtn" @click="apply(1)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data[1].btnactive==1">
                  <li>
                    <v-textbox :activeIndex="data[1].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[1].ratio[0].wh].w + '*' + list1[data[1].ratio[0].wh].h" :list="list1" @getData="(obj)=>{data[1].ratio[0].wh = obj.index}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox :activeIndex="data[1].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="list2[data[1].ratio[0].r].r" :list="list2" @getData="(obj)=>{data[1].ratio[0].r=obj.index}"></v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data[1].ratio[1].w" :min="800" :max="4097"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data[1].ratio[1].h" :min="600" :max="4097"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data[1].ratio[1].z" :min="23" :max="127"></v-sliderbox>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <!-- sdi -->
          <div class="tabcontent3" v-show="active == 2">
            <div class="showdata">
              <ul class="cardul">
                <li>
                  <v-readbox :title="'当前sdi1分辨率'" :defaultcontent="data[2].showdata0"></v-readbox>
                </li>
                <li>
                  <v-readbox :title="'当前sdi2分辨率'" :defaultcontent="data[2].showdata1"></v-readbox>
                </li>
              </ul>
            </div>
          </div>
          <!-- dvi -->
          <div class="tabcontent4" v-show="active == 3" :class="{active: mosic.showmosaic}">
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button v-model="mosic.link" :maintitle="'单链模式'" :subtitle="'双链模式'" @getBtn="handleLink"></v-button>
              </div>
              <ul class="cardul">
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data[3].showdata0"></v-textbox>
                </li>
                <li v-if="mosic.link==2">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data[3].showdata1"></v-textbox>
                </li>
                <li>
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data[3].showdata2"></v-textbox>
                </li>
                <li v-if="mosic.link==2">
                  <v-textbox :showdrop="0" :title="'当前输入分辨率'" :defaultcontent="data[3].showdata3"></v-textbox>
                </li>
                <li v-if="mosic.link==1" class="noneli">
                  <v-textbox></v-textbox>
                </li>
                <li v-if="mosic.link==1" class="noneli">
                  <v-textbox></v-textbox>
                </li>
              </ul>
            </div>
            <div class="showdata showdatadvi">
              <div class="btnapply">
                <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data[3].btnactive=obj}"></v-button>
                <div class="applybtn" @click="apply(3)">应用</div>
              </div>
              <ul class="cardul">
                <template v-if="data[3].btnactive==1">
                  <li>
                    <v-textbox :activeIndex="data[3].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[3].ratio[0].wh].w + '*' + list1[data[3].ratio[0].wh].h" :list="list1" @getData="(obj)=>{data[3].ratio[0].wh=obj.index}"></v-textbox>
                  </li>
                  <li>
                    <v-textbox :activeIndex="data[3].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率（Hz）'" :defaultcontent="list2[data[3].ratio[0].r].r" :list="list2" @getData="(obj)=>{data[3].ratio[0].r=obj.index}"></v-textbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                </template>
                <template v-else>
                  <li>
                    <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data[3].ratio[1].w"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data[3].ratio[1].h"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'刷新率（Hz）'" v-model.number="data[3].ratio[1].r"></v-sliderbox>
                  </li>
                  <li class="noneli">
                    <v-textbox></v-textbox>
                    </v-textbox>
                  </li>
                </template>
              </ul>
            </div>
            <div class="btncenter mosaicbtn">
              <div class="applybtn" @click="mosic.showmosaic = true">MOSAIC</div>
            </div>
          </div>

        </div>
        <div class="subcontainer" v-show="active == 3" :class="{active: mosic.showmosaic}">
          <div class="tabgroup">
            <div class="tabtitle">此处可将各DVI源按照所选模板进行统一拼接，拼接源可独立源使用</div>
            <div class="applybtn">应用</div>
          </div>
          <div class="mosic">
            <div class="mosicleft">
              <ul class="cardul">
                <li>
                  <v-textbox ref="text-box1" v-model="mosicVisible" :title="'拼接模板'" :defaultcontent="'1920*1080'" :showdrop="1">
                    <div class="mosic-template">
                      <div @click="mosic.templateIndex = index" v-for="(item, index) in mosic.templateList" class="mosic-img" :class="{['mosic-img-' + index]: true, selectActive: index === mosic.templateIndex}"></div>
                    </div>
                  </v-textbox>
                </li>
                <li>
                  <v-sliderbox :title="'模板宽 (H)'" :min="800" :max="mosic.wm" v-model.number="mosic.w"></v-sliderbox>
                </li>
                <li>
                  <v-sliderbox :title="'模板高（V）'" :min="600" :max="mosic.hm" v-model.number="mosic.h"></v-sliderbox>
                </li>
              </ul>
            </div>
            <div class="mosicright">
              <div class="aa">
                拼接总宽高（px） {{`${mosic.w * mosic.templateList[mosic.templateIndex].col} x ${mosic.h * mosic.templateList[mosic.templateIndex].row}`}}
              </div>

              <div class="bb" :style="{width: cRationumH + 'px', height: cRationumZ + 'px', transform: `translateX(${-Math.round((cRationumH - 400) / 2)}px) translateY(${-Math.round((cRationumZ - 200) / 2)}px)`}">
                <!-- <div class="row">
                  <div v-for="(row,index) in 3">
                    {{row}}
                    <div class="H" v-if="!index">
                      <div class="HCenter"></div>
                      <div class="Hdata">H</div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div v-for="(col,index) in 3">
                    {{col}}
                    <div class="H" v-if="!index">
                      <div class="HCenter"></div>
                      <div class="Hdata">H</div>
                    </div>
                  </div>
                </div> -->
                <div class="row1" v-for="(r,rowIndex) in mosic.templateList[mosic.templateIndex].row">
                  <div class="col1" v-for="(c,colIndex) in mosic.templateList[mosic.templateIndex].col" :class="{active: !rowIndex && !colIndex}">
                    <div class="H" v-if="!rowIndex && !colIndex">
                      <div class="HCenter"></div>
                      <div class="Hdata">H</div>
                    </div>
                    <div class="V" v-if="!rowIndex && !colIndex">
                      <div class="HCenter"></div>
                      <div class="Hdata">V</div>
                    </div>
                    {{(r-1) * mosic.templateList[mosic.templateIndex].col + c }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btncenter mosaicbtn">
            <div class="applybtn" @click="mosic.showmosaic = false">返回</div>
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
    name: 'aaa',
    data() {
      return {
        ratioVisible: false,
        freshVisible: false,
        mosicVisible: false,
        active: 0,                                   // tab active
        // public       
        // list1: ['800*600', '1024*768', '1280*720', '1280*768', '1280*800', '1280*1024', '1366*768', '1440*900', '1600*900', '1600*1200', '1600*1050', '1920*1080', '1920*1200', '1920*2160', '2048*640', '2048*1152', '2048*1536', '2304*1152', '2560*816', '2560*960', '2560*1600', '3840*1080', '3840*2160 (默认)', '4096*2160'],  // 分辨率  DP HDMI  DL-DVI
        list1: [{ w: 800, h: 600 }, { w: 3840, h: 2160, default: true }, { w: 4096, h: 2160 }],  // 分辨率  DP HDMI  DL-DVI
        // list2: [{ r: 23.98 }, 24, 25, 29.97, 30, 47.96, 48, 50, 59.94, 60(默认), 75, 120],  // 刷新率
        list2: [{ r: 23.98 }, { r: 60, default: true }],  // 刷新率
        data: [   // pro:js格式不一样应该不影响吧？
          {
            name: 'DP',
            btnactive: 1,                                // dp 预设 / 自定义
            showdata: 'No Single',                       // 当前输入dp分辨率                      // 分辨率 默认值 width*height //                                  // 刷新率 默认值
            ratio: [{
              wh: 1,
              r: 1
            }, {
              w: 1,
              h: 1,
              r: 1                                      // dp 默认刷新率
            }]
          },
          {
            name: 'HDMI',
            btnactive: 1,                                // hdmi 预设 / 自定义
            showdata: 'No Single',                       // 当前输入hdmi分辨率
            ratio: [{
              wh: 1,
              r: 1
            }, {
              w: 801,
              h: 601,
              r: 23                                   // dp 默认刷新率
            }]
          },
          {
            name: 'SDI',
            showdata0: 'No Single',                   // sdi2展示内容    
            showdata1: 'No Single',                   // sdi1展示内容    
          },
          {
            name: 'DVI',
            btnactive: 1,                                // hdmi 预设 / 自定义
            showdata0: 'No Single',                       // 当前输入hdmi分辨率
            showdata1: 'No Single',                       // 当前输入hdmi分辨率
            showdata2: 'No Single',                       // 当前输入hdmi分辨率
            showdata3: 'No Single',                       // 当前输入hdmi分辨率
            ratio: [{
              wh: 1,
              r: 1
            }, {
              w: 1,
              h: 1,
              r: 1                                 // dp 默认刷新率
            }]
          },
        ],
        mosic: {
          link: 1,                                      // 单链    2双链   
          showmosaic: false,                           // DVI mosic默认值    
          w: 802,                             // mosic 宽
          h: 602,
          wm: 4096,
          hm: 4096,                          // mosic  高
          templateList: [{ row: 2, col: 1 }, { row: 1, col: 2 }, { row: 3, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 4, col: 1 }, { row: 2, col: 2 }],
          templateIndex: 0,
        },
        _: '',                                       // 账户
      }
    },
    created() {
      this._ = getLoc('_');
      this.mosic.link = +this.getMosic.In9_MosL + 1;
      this.mosic.templateIndex = +this.getMosic.In9_MosM;
      this.mosic.w = +this.getMosic.In9_MosW;
      this.mosic.h = +this.getMosic.In9_MosH;
      this.active = this.getCommon.sourceActive;
    },
    computed: {
      ...mapGetters(['getCommon', 'getCount', 'getMosic']),
      cRationumH() {
        return Math.round((this.mosic.w - 800) * (480 - 400) / (4096 - 800) + 400);
      },
      cRationumZ() {
        return Math.round((this.mosic.h - 600) * (270 - 200) / (2160 - 600) + 200);
      },

    },
    watch: {
      getCount(val) {
        if(!val) {
          this.readData(this.active);
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      readData(index) {
        // 激活菜单tab
        this.active = index;
        this.setCommon({ sourceActive: index });
        let val = []
        if(index == 0) {
          val = [0];
        } else if(index == 1) {
          val = [1];
        } else if(index == 2) {
          val = [2, 3];
        } else if(index == 3) {
          val = [4, 5, 6, 7];
        }
        let inx = {};
        val.forEach((item, i) => {
          let state = this.getCommon[this.data[index].name + (val.length > 1 ? (i + 1) : '') + '_Sta'];
          if(state == 1 || state == 2) {
            inx[`In${item}_ResW`] = 0;
            inx[`In${item}_ResH`] = 0;
            inx[`In${item}_ResR`] = 0;
          }
        });

        this.ajax({
          name: 'url',
          data: { RW: 0, DevID: 0, ...inx, _: this._ }
        }).then(res => {
          val.forEach((item, i) => {
            let H = res[`In${item}_ResH`]
            let W = res[`In${item}_ResW`]
            let R = res[`In${item}_ResR`]
            if(H) {
              this.data[index]['showdata' + (val.length > 1 ? i : '')] = `${W}*${H}@ ${R}Hz`;
              if(index === 3) {
                console.log(H, W, R)
                this.mosic.wm = W;
                this.mosic.hm = H
              }
            } else {
              this.data[index]['showdata' + (val.length > 1 ? i : '')] = 'No Single';
            }
          });
        });
      },
      apply(index) {
        let inx = {};
        let w, h, r;
        let tmp = index === 3 ? 9 : index;

        if(this.data[index].btnactive == 1) {
          w = this.list1[this.data[index].ratio[0].wh].w
          h = this.list1[this.data[index].ratio[0].wh].h;
          r = this.list2[this.data[index].ratio[0].r].r;
        } else if(this.data[index].btnactive == 2) {
          w = this.data[index].ratio[1].w;
          h = this.data[index].ratio[1].h;
          r = this.data[index].ratio[1].r;
        }

        inx[`In${tmp}_EdidW`] = w
        inx[`In${tmp}_EdidH`] = h;
        inx[`In${tmp}_EdidR`] = r;

        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 1,
            ...inx,
            _: this._
          }
        }).then(res => {
          let val = [];
          if(index == 0) {
            val = [0];
          } else if(index == 1) {
            val = [1];
          } else if(index == 3) {
            val = [4, 5, 6, 7];
          }

          val.forEach((item, i) => {
            let state = this.getCommon[this.data[index].name + (val.length > 1 ? (i + 1) : '') + '_Sta'];
            if(state == 1 || state == 2) {
              this.data[index]['showdata' + (val.length > 1 ? i : '')] = `${w}*${h}@ ${r}Hz`;
            } else {
              this.data[index]['showdata' + (val.length > 1 ? i : '')] = 'No Single';
            }
          });
        });
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
        this.mosicVisible = false;
      },
      handleLink(val) {
        //http://192.168.0.10/page/panel/leds.cgi?RW=1&DevID=0&CMD=2&In9_MosL=0&_=1450258914882

        this.mosic.link = val
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 2,
            In9_MosL: 0,
            _: this._
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .tabs {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 11;
    position: absolute;
    left: 40px;
    right: 40px;
    background-color: #02022b;
    .tab {
      cursor: pointer;
      width: 24.8%;
      height: 100%;
      display: flex;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      background-color: #1f2a51;
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
        color: #0c0831;
        background-color: #febe00;
      }
    }
  }
  .tabgroup {
    display: flex;
    justify-content: space-between;
    .tabtitle {
      padding: 20px 30px;
      color: white;
    }
  }

  .showdata {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 0 30px 0;
    border-bottom: 1px dashed white;
  }

  .setdata {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 0 30px 0;
  }

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

  .mosic {
    width: 100%;
    height: 488px;
    display: flex;
    .mosicleft {
      width: 364px;
      padding-right: 5px;
      .cardul {
        display: flex;
        width: 100%;
        flex-direction: column;
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
    }
    .mosicright {
      flex: 1;
      padding: 30px 20px 20px 20px;
      background-color: #1f2a51;
      font-size: 20px;
      color: white;
    }
  }

  .btnapply {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .aa {
    margin-bottom: 30px;
  }

  .bb {
    position: relative;
    border-left: 1px dashed #8d8da2;
    border-top: 1px dashed #8d8da2;
    width: 200px;
    height: 200px;
    left: 180px;
    top: 80px;
    display: flex;
    flex-direction: column;
    background-color: #030218;
    .row1 {
      display: flex;
      width: 100%;
      height: 100%;
      flex: auto;
      display: flex;
      .col1 {
        display: flex;
        flex: auto;
        justify-content: center;
        align-items: center;
        border-right: 1px dashed #8d8da2;
        border-bottom: 1px dashed #8d8da2;
        position: relative;
        &.active {
          border: 1px solid #febe00;
          margin-top: -1px;
          margin-left: -1px;
        }

        .H {
          width: 100%;
          height: 15px;
          border-left: 1px solid #8d8da2;
          border-right: 1px solid #8d8da2;
          margin-left: -1px;
          position: absolute;
          display: flex;
          justify-content: center;
          top: -18px;
          .HCenter {
            height: 50%;
            border-bottom: 1px solid #8d8da2;
            position: absolute;
            width: 100%;
          }
          .Hdata {
            width: 30px;
            flex-grow: 0;
            text-align: center;
            background-color: #1f2a51;
            font-size: 12px;
            position: relative;
            color: #8d8da2;
          }
        }
        .V {
          height: 100%;
          width: 15px;
          border-top: 1px solid #8d8da2;
          border-bottom: 1px solid #8d8da2;
          margin-top: -1px;
          position: absolute;
          display: flex;
          align-items: center;
          left: -18px;
          top: 0;
          .HCenter {
            width: 50%;
            border-right: 1px solid #8d8da2;
            position: absolute;
            height: 100%;
          }
          .Hdata {
            height: 30px;
            line-height: 30px;
            width: 100%;
            flex-grow: 0;
            text-align: center;
            background-color: #1f2a51;
            font-size: 12px;
            position: relative;
            color: #8d8da2;
          }
        }
      }
    }

    .row,
    .col {
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      > div {
        flex: auto;
        position: relative;
        &:last-child {
          border: none;
        }
      }
    }

    .row {
      flex-direction: column;
      > div {
        border-bottom: 1px dashed #8d8da2;
      }
    }

    .col {
      > div {
        border-right: 1px dashed #8d8da2;
        .H {
          width: 100%;
          height: 15px;
          border-left: 1px solid #8d8da2;
          border-right: 1px solid #8d8da2;
          margin-left: -1px;
          position: absolute;
          display: flex;
          justify-content: center;
          top: -18px;
          .HCenter {
            height: 50%;
            border-bottom: 1px solid #8d8da2;
            position: absolute;
            width: 100%;
          }
          .Hdata {
            width: 30px;
            flex-grow: 0;
            text-align: center;
            background-color: #1f2a51;
            font-size: 12px;
            position: relative;
          }
        }
      }
    }
  }

  .tabcontent4 {
    transition: transform 0.5s ease;
    &.active {
      transform: translateY(-100%);
    }
  }
</style>

<style lang="less">
  .mosic-template {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px !important;
    .mosic-img {
      float: left;
      width: 50px;
      height: 50px;
      background: no-repeat;
      background-size: 100% 100%;
      margin: 10px;
      box-sizing: border-box;
      &.selectActive {
        background-color: #02022b;
      }
      &-0 {
        background-image: url('~assets/mosic/icon_template_ud.png');
      }
      &-1 {
        background-image: url('~assets/mosic/icon_template_lr.png');
      }
      &-2 {
        background-image: url('~assets/mosic/icon_template_umd.png');
      }
      &-3 {
        background-image: url('~assets/mosic/icon_template_lmr.png');
      }
      &-4 {
        background-image: url('~assets/mosic/icon_template_four_vertical.png');
      }
      &-5 {
        background-image: url('~assets/mosic/icon_template_four_across.png');
      }
      &-6 {
        background-image: url('~assets/mosic/icon_template_square.png');
      }
    }
  }
</style>

