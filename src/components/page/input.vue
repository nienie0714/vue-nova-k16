<template>
  <div class="wrapper-container">
    <div class="wrapper" @click="closeCard" :class="{alertmask}">
      <!-- <v-header></v-header> -->
      <!-- 页面名称 -->
      <div class="jrtitle">
        <img class="homeicon" src="@/assets/icon/icon_home.png" alt="" @click="$router.go(-1);" draggable="false">
        <img class="iicon" src="@/assets/icon/icon_input.png" alt="" draggable="false">
        <span class="snav">输入设置</span>
      </div>
      <div class="content-box">
        <!-- tab -->
        <div class="tabs">
          <div class="tab" v-for="(item, index) in data" :class="{active: active == index}" @click="readData(index)" :key="index">
            <span>{{item.name}}</span>
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
                    <v-readbox :title="'当前输入分辨率'" :defaultcontent="data[0].showdata"></v-readbox>
                  </li>
                  <li v-for="item in 4" class="noneli">
                    <v-readbox></v-readbox>
                  </li>
                </ul>
              </div>
              <div class="setdata">
                <div class="btnapply">
                  <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(item)=>{data[0].btnactive=item}"></v-button>
                  <div class="applybtn" @click="apply(0)">
                    <img src="~assets/icon/icon_apply.png" alt="">应用
                  </div>
                </div>
                <ul class="cardul">
                  <template v-if="data[0].btnactive==1">
                    <li v-if="list1[data[0].ratio[0].wh]">
                      <v-textbox :activeIndex="data[0].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[0].ratio[0].wh].w + '*' + list1[data[0].ratio[0].wh].h" :list="list1" @getData="obj => {data[0].ratio[0].wh = obj.index}"></v-textbox>
                    </li>
                    <li>
                      <v-textbox :activeIndex="data[0].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率(Hz)'" :defaultcontent="list2[data[0].ratio[0].r].r" :list="list2" @getData="obj => {data[0].ratio[0].r = obj.index}"></v-textbox>
                    </li>
                    <li v-for="item in 3" class="noneli">
                      <v-readbox></v-readbox>
                    </li>
                  </template>
                  <template v-else>
                    <li>
                      <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data[0].ratio[1].w" :min="800" :max="3840" :step="4"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data[0].ratio[1].h" :min="600" :max="3840"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'刷新率(Hz)'" v-model.number="data[0].ratio[1].r" :min="24" :max="120"></v-sliderbox>
                    </li>
                    <li v-for="item in 2" class="noneli">
                      <v-readbox></v-readbox>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
            <!-- hdmi -->
            <div class="tabcontent2" v-show="active == 1">
              <div class="showdata">
                <ul class="cardul">
                  <li>
                    <v-readbox :title="'当前输入分辨率'" :defaultcontent="data[1].showdata"></v-readbox>
                  </li>
                  <li v-for="item in 4" class="noneli">
                    <v-readbox></v-readbox>
                  </li>
                </ul>
              </div>
              <div class="setdata">
                <div class="btnapply">
                  <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data[1].btnactive=obj}"></v-button>
                  <div class="applybtn" @click="apply(1)"><img src="~assets/icon/icon_apply.png" alt="">应用</div>
                </div>
                <ul class="cardul">
                  <template v-if="data[1].btnactive==1">
                    <li v-if="list1[data[1].ratio[0].wh]">
                      <v-textbox :activeIndex="data[1].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[1].ratio[0].wh].w + '*' + list1[data[1].ratio[0].wh].h" :list="list1" @getData="(obj)=>{data[1].ratio[0].wh = obj.index}"></v-textbox>
                    </li>
                    <li>
                      <v-textbox :activeIndex="data[1].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率(Hz)'" :defaultcontent="list2[data[1].ratio[0].r].r" :list="list2" @getData="(obj)=>{data[1].ratio[0].r=obj.index}"></v-textbox>
                    </li>
                    <li v-for="item in 3" class="noneli">
                      <v-readbox></v-readbox>
                    </li>
                  </template>
                  <template v-else>
                    <li>
                      <v-sliderbox :title="'水平分辨率(px)'" v-model.number="data[1].ratio[1].w" :min="800" :max="3840" :step="4"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'垂直分辨率(px)'" v-model.number="data[1].ratio[1].h" :min="600" :max="3840"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'刷新率(Hz)'" v-model.number="data[1].ratio[1].r" :min="24" :max="120"></v-sliderbox>
                    </li>
                    <li v-for="item in 2" class="noneli">
                      <v-readbox></v-readbox>
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
                    <v-readbox :title="'SDI1分辨率'" :defaultcontent="data[2].showdata0"></v-readbox>
                  </li>
                  <li>
                    <v-readbox :title="'SDI2分辨率'" :defaultcontent="data[2].showdata1"></v-readbox>
                  </li>
                  <li v-for="item in 3" class="noneli">
                    <v-readbox></v-readbox>
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
                    <v-readbox :title="'DVI1输入分辨率'" :defaultcontent="data[3].showdata0"></v-readbox>
                  </li>
                  <li v-if="mosic.link==1">
                    <v-readbox :title="'DVI2输入分辨率'" :defaultcontent="data[3].showdata1"></v-readbox>
                  </li>
                  <li>
                    <v-readbox :title="'DVI3输入分辨率'" :defaultcontent="data[3].showdata2"></v-readbox>
                  </li>
                  <li v-if="mosic.link==1">
                    <v-readbox :title="'DVI4输入分辨率'" :defaultcontent="data[3].showdata3"></v-readbox>
                  </li>
                  <li v-if="mosic.link==1" class="noneli">
                    <v-readbox></v-readbox>
                  </li>
                  <li v-for="item in 3" v-if="mosic.link==2" class="noneli">
                    <v-readbox></v-readbox>
                  </li>
                </ul>
              </div>
              <div class="showdata showdatadvi">
                <div class="btnapply pt30">
                  <v-button :maintitle="'预设分辨率'" :subtitle="'自定义分辨率'" @getBtn="(obj)=>{data[3].btnactive=obj}"></v-button>
                  <div class="applybtn" @click="apply(3)"><img src="~assets/icon/icon_apply.png" alt="">应用</div>
                </div>
                <ul class="cardul">
                  <template v-if="data[3].btnactive==1">
                    <li v-if="list1[data[3].ratio[0].wh]">
                      <v-textbox :activeIndex="data[3].ratio[0].wh" v-model="ratioVisible" :showdrop="1" :title="'预设分辨率'" :defaultcontent="list1[data[3].ratio[0].wh].w + '*' + list1[data[3].ratio[0].wh].h" :list="list1" @getData="(obj)=>{data[3].ratio[0].wh=obj.index}"></v-textbox>
                    </li>
                    <li>
                      <v-textbox :activeIndex="data[3].ratio[0].r" v-model="freshVisible" :showdrop="1" :title="'预设刷新率(Hz)'" :defaultcontent="list2[data[3].ratio[0].r].r" :list="list2" @getData="(obj)=>{data[3].ratio[0].r=obj.index}"></v-textbox>
                    </li>
                    <li v-for="item in 3" class="noneli">
                      <v-textbox></v-textbox>
                    </li>
                  </template>
                  <template v-else>
                    <li>
                      <v-sliderbox :title="'水平分辨率(px)'" :min="800" :max="data[3].dvimax" :step="mosic.link" v-model.number="data[3].ratio[1].w"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'垂直分辨率(px)'" :min="600" :max="data[3].dvimax" v-model.number="data[3].ratio[1].h"></v-sliderbox>
                    </li>
                    <li>
                      <v-sliderbox :title="'刷新率（Hz）'" :min="24" :max="120" v-model.number="data[3].ratio[1].r"></v-sliderbox>
                    </li>
                    <li v-for="item in 2" class="noneli">
                      <v-textbox></v-textbox>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="btncenter mosicbtn">
                <div class="applybtn mosicc" @click="mosic.showmosaic = true"><img src="~assets/icon/icon_more.png" alt="">DVI MOSAIC</div>
              </div>
            </div>

          </div>
          <div class="subcontainer" v-show="active == 3" :class="{active: mosic.showmosaic}">
            <div class="tabgroup">
              <div class="tabtitle">此处可将各DVI源按照所选模板进行统一拼接，拼接源可独立源使用</div>
              <div class="applybtn" @click="mosicapply"><img src="~assets/icon/icon_apply.png" alt="">应用</div>
            </div>
            <div class="mosic">
              <div class="mosicleft">
                <ul class="cardul">
                  <li>
                    <v-textbox ref="text-box1" v-model="mosicVisible" :title="'拼接模板'" :showdrop="1">
                      <div class="mosic-template">
                        <div @click="saveTmplate(index)" v-for="(item, index) in mosic.templateList" class="mosic-img" :class="{['mosic-img-' + index]: true, selectActive: index === mosic.templateIndex}"></div>
                      </div>
                      <div slot="template">
                        <div class="mosic-img" :class="'mosic-img-' + mosic.templateIndex"></div>
                      </div>
                    </v-textbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'模板宽 (H)'" :min="64" :max="mosic.wm" :defaultcontent="mosic.w" v-model.number="mosic.w"></v-sliderbox>
                  </li>
                  <li>
                    <v-sliderbox :title="'模板高（V）'" :min="64" :max="mosic.hm" :defaultcontent="mosic.h" v-model.number="mosic.h"></v-sliderbox>
                  </li>
                </ul>
              </div>
              <div class="mosicright">
                <!-- <div style="color: white">mosic.templateIndex:{{mosic.templateIndex}}</div>
              <div style="color: white">this.mosic.templateList: {{this.mosic.templateList}}</div> -->
                <div class="aa" v-if="mosic.templateList[mosic.templateIndex]">
                  拼接总宽高（px） {{`${mosic.w * mosic.templateList[mosic.templateIndex].col} x ${mosic.h * mosic.templateList[mosic.templateIndex].row}`}}
                </div>

                <div class="bb" v-if="mosic.templateList[mosic.templateIndex]" :style="{width: cRationumH + 'px', height: cRationumZ + 'px', transform: `translateX(${-Math.round((cRationumH - 400) / 2)}px) translateY(${-Math.round((cRationumZ - 200) / 2)}px)`}">

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
              <div class="applybtn" @click="mosic.showmosaic = false"><img class="down" src="~assets/icon/icon_more.png">返回</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{alertmask: alertmask}"></div>
    <div v-if="alertmask" class="alertwindow">
      <div class="border">
        <div><img src="@/assets/icon/loading.gif" alt=""></div>
        <div>{{alertMessage}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { getSen } from '../../utils';
  import { Message } from 'element-ui';
  export default {
    name: 'aaa',
    data() {
      return {
        a: 24,
        ratioVisible: false,
        freshVisible: false,
        mosicVisible: false,
        active: 0,                                   // tab active      
        alertmask: false,
        // list1: ['800*600', '1024*768', '1280*720', '1280*768', '1280*800', '1280*1024', '1366*768', '1440*900', '1600*900', '1600*1200', '1600*1050', '1920*1080', '1920*1200', '1920*2160', '2048*640', '2048*1152', '2048*1536', '2304*1152', '2560*816', '2560*960', '2560*1600', '3840*1080', '3840*2160 (默认)', '4096*2160'],  // 分辨率  DP HDMI  DL-DVI
        list1: [],
        list1_1: [{ w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }, { w: 1280, h: 768 }, { w: 1280, h: 800 }, { w: 1280, h: 1024 }, { w: 1366, h: 768 }, { w: 1440, h: 900 }, { w: 1600, h: 900 }, { w: 1600, h: 1200 },
        { w: 1600, h: 1050 }, { w: 1920, h: 1080, default: true }, { w: 1920, h: 1200 }, { w: 2048, h: 640 }],  // 单链
        list1_2: [{ w: 800, h: 600 }, { w: 1024, h: 768 }, { w: 1280, h: 720 }, { w: 1280, h: 768 }, { w: 1280, h: 800 }, { w: 1280, h: 1024 }, { w: 1366, h: 768 }, { w: 1440, h: 900 }, { w: 1600, h: 900 }, { w: 1600, h: 1200 },
        { w: 1680, h: 1050 }, { w: 1920, h: 1080 }, { w: 1920, h: 1200 }, { w: 1920, h: 2160 }, { w: 2048, h: 640 }, { w: 2048, h: 1152 }, { w: 2048, h: 1536 }, { w: 2304, h: 1152 }, { w: 2560, h: 816 }, { w: 2560, h: 960 }, { w: 2560, h: 1600 }, { w: 3840, h: 1080 }, { w: 3840, h: 2160, default: true }, { w: 4096, h: 2160 }],  // 分辨率  DP HDMI  双链        
        list2: [{ r: 23.98 }, { r: 24 }, { r: 25 }, { r: 29.97 }, { r: 30 }, { r: 47.96 }, { r: 48 }, { r: 50 }, { r: 59.94 }, { r: 60, default: true }, { r: 75 }, { r: 120 }],  // 刷新率
        data: [
          {
            name: 'DP',
            btnactive: 1,
            showdata: 'No Single',
            ratio: [{
              wh: 22,
              r: 9
            }, {
              w: 3840,
              h: 2160,
              r: 60
            }]
          },
          {
            name: 'HDMI',
            btnactive: 1,
            showdata: 'No Single',
            ratio: [{
              wh: 22,
              r: 9
            }, {
              w: 1920,
              h: 1080,
              r: 60
            }]
          },
          {
            name: 'SDI',
            showdata0: 'No Single',
            showdata1: 'No Single',
          },
          {
            name: 'DVI 1/3',
            btnactive: 1,
            showdata0: 'No Single',
            showdata1: 'No Single',
            showdata2: 'No Single',
            showdata3: 'No Single',
            ratio: [{
              wh: 22,    // 默认为双链
              r: 9   // 选中index
            }, {
              w: 3840,
              h: 1080,
              r: 60
            }],
            dvimax: 3840,
          },
        ],
        mosic: {
          link: 1,
          linklist: [],
          showmosaic: false,
          isshowmosaicfirst: true,
          w: 800,
          h: 600,
          wm: 4096,
          hm: 4096,
          templateList: [],
          templateList1: [{ row: 1, col: 2 }, { row: 2, col: 1 }, { row: 1, col: 3 }, { row: 3, col: 1 }, { row: 1, col: 4 }, { row: 4, col: 1 }, { row: 2, col: 2 }],
          // templateList2: [{ row: 2, col: 2 }, { row: 1, col: 2 }, { row: 3, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 4, col: 1 }, { row: 2, col: 2 }],
          templateList2: [{ row: 1, col: 2 }, { row: 2, col: 1 }],
          templateIndex: 0,
        },
        _: '',
        alertMessage: '正在切换模式, 请等待...'
      }
    },
    mounted() {
      // console.log(5555, this.$root.$children[0].$children[0].$children[0]);
    },
    created() {
      this.active = this.getCommon.sourceActive;
      this.readData(this.getCommon['sourceActive']);

      this._ = getSen('_');
      this.mosic.link = +this.getMosic.In9_MosL + 1;

      if(this.mosic.link == 1) {
        this.data[3].dvimax = 2048;
        this.data[3].ratio[0].wh = 11;
        this.data[3].ratio[1].w = 1920;   // 预设分辨率默认值
        this.data[3].name = 'DVI 1/2/3/4';
      }

      if(this.active == 3) {
        if(this.mosic.link == 1) {
          this.list1 = Object.assign([], this.list1_1);
          this.mosic.templateList = Object.assign([], this.mosic.templateList1);   // 可能是有延时   时间太长
        } else {
          this.list1 = Object.assign([], this.list1_2);
          this.mosic.templateList = Object.assign([], this.mosic.templateList2);
        }
      } else {
        this.list1 = Object.assign([], this.list1_2);
      }

      this.mosic.templateIndex = +this.getMosic.In9_MosM;
      this.mosic.w = +this.getMosic.In9_MosW;
      this.mosic.h = +this.getMosic.In9_MosH;
    },
    computed: {
      ...mapGetters(['getCommon', 'getCount', 'getMosic']),
      cRationumH() {     // 不用在data里写么
        return Math.round((this.mosic.w - 800) * (480 - 400) * 10 / (4096 - 800) + 400);
      },
      cRationumZ() {
        return Math.round((this.mosic.h - 600) * (270 - 200) * 1.4 / (2160 - 600) + 200);
      }
    },
    watch: {
      getCount(val) {
        if(!val) {
          this.readData(this.getCommon['sourceActive']);
        }
      },
      active() {
        if(this.active == 3) {
          if(this.mosic.link == 1) {
            this.list1 = Object.assign([], this.list1_1);
            this.mosic.templateList = Object.assign([], this.mosic.templateList1);
          } else {
            this.list1 = Object.assign([], this.list1_2);
            this.mosic.templateList = Object.assign([], this.mosic.templateList2);
          }
        } else {
          this.list1 = Object.assign([], this.list1_2);
        }
      }
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon', 'setMosic']),
      readData(index) {
        // 激活菜单tab
        this.active = index || 0;

        // todo
        // 点击 tab: DVI  mosic.showmosaic=false;

        if(this.active == 3 && this.mosic.link == 1) {   // dvi的单链模式
          this.list1 = Object.assign([], this.list1_1);
        } else {
          this.list1 = Object.assign([], this.list1_2);
        }

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
          let name = this.data[index].name.split(" ")[0];
          let state = this.getCommon[name + (val.length > 1 ? (i + 1) : '') + '_Sta'];
          if(state == 1 || state == 2) {
            inx[`In${item}_ResW`] = 0;
            inx[`In${item}_ResH`] = 0;
            inx[`In${item}_ResR`] = 0;
          } else if(state == 0) {
            this.data[index]['showdata' + (val.length > 1 ? i : '')] = 'No Single';
          } else if(state == 3) {
            this.data[index]['showdata' + (val.length > 1 ? i : '')] = 'No Single';
          }
        });

        if(Object.keys(inx).length != 0) {
          this.ajax({
            name: 'url',
            data: { RW: 0, DevID: 0, ...inx, _: this._ }
          }).then(res => {
            let maxH = [];
            let maxW = [];
            val.forEach((item, i) => {
              let H = +res[`In${item}_ResH`]
              let W = +res[`In${item}_ResW`]
              let R = +res[`In${item}_ResR`] / 100;
              if(H) {
                this.data[index]['showdata' + (val.length > 1 ? i : '')] = `${W}*${H}@ ${R}Hz`;
                if(index == 3) {
                  maxH.push(H);
                  maxW.push(W);
                }
              } else {
                this.data[index]['showdata' + (val.length > 1 ? i : '')] = 'No Single';
              }
            });
            if(maxW.length) {
              this.mosic.wm = Math.max(...maxW);
              this.mosic.w = Math.min(this.mosic.w, this.mosic.wm);
              this.mosic.hm = Math.max(...maxH);
              this.mosic.h = Math.min(this.mosic.h, this.mosic.hm);
            }
          });
        }
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
        inx[`In${tmp}_EdidR`] = r * 100;

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
          this.alertmask = true;
          this.alertMessage = '请等待......'
          this.$root.$children[0].$children[0].$children[0].mask = true;
          this.setCommon({ Switch: false });
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
          setTimeout(() => {
            this.setCommon({ Switch: true });
            this.alertmask = false;
            this.$root.$children[0].$children[0].$children[0].mask = false;
          }, 3000);
        });
      },
      saveTmplate(index) {
        this.mosic.templateIndex = index;
        this.setMosic({ In9_MosM: index });
      },
      mosicapply() {
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 3,
            In9_MosM: this.mosic.templateIndex,
            In9_MosW: this.mosic.w,
            In9_MosH: this.mosic.h,
            _: this._
          }
        }).then(res => {
          Message('应用Mosaic成功');
        });
      },
      closeCard() {
        this.ratioVisible = false;
        this.freshVisible = false;
        this.mosicVisible = false;
      },
      handleLink(val) {
        this.ajax({
          name: 'url',
          data: {
            RW: 1,
            DevID: 0,
            CMD: 2,
            In9_MosL: val - 1,
            _: this._
          }
        }).then(res => {
          this.alertmask = true;
          this.alertMessage = '正在切换模式, 请等待...'
          // home遮罩层
          // this.$refs['text-box1'].$parent.$parent.mask = true;
          this.$root.$children[0].$children[0].$children[0].mask = true;
          this.setCommon({ Switch: false });
          this.mosic.link = val;
          this.data[3].name = val == 1 ? 'DVI 1/2/3/4' : 'DVI 1/3';
          this.data[3].dvimax = val == 1 ? 2048 : 3840;
          this.data[3].ratio[0].wh = val == 1 ? 11 : 22;
          this.data[3].ratio[1].w = val == 1 ? 1920 : 3840;   // 预设分辨率默认值
          this.mosic.templateList = val == 1 ? Object.assign([], this.mosic.templateList1) : Object.assign([], this.mosic.templateList2);
          this.mosic.templateIndex = val == 1 ? 6 : 1;
        });
        setTimeout(() => {
          this.setCommon({ Switch: true });
          this.alertmask = false;
          this.$root.$children[0].$children[0].$children[0].mask = false;
        }, 3000);
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
      height: 140px;
      padding-right: 4px;
      padding-bottom: 4px;
      &.noneli {
        visibility: hidden;
      }
    }
  }

  .mosic {
    width: 100%;
    height: 428px;
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
          height: 140px;
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
      background-color: #2e3c67;
      font-size: 20px;
      color: white;
    }
  }

  // .aa {
  //   margin-bottom: 30px;
  // }

  .bb {
    position: relative;
    border-left: 1px dashed #8d8da2;
    border-top: 1px dashed #8d8da2;
    width: 200px;
    height: 200px;
    left: 331px;
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
            background-color: #2e3c67;
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
            background-color: #2e3c67;
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
</style>

<style lang="less">
  .mosic-template {
    display: flex;
    flex-wrap: wrap;
    padding-left: 30px !important;
  }
  .mosic-img {
    float: left;
    width: 50px;
    height: 50px;
    background: no-repeat;
    background-size: 100% 100%;
    margin: 10px;
    box-sizing: border-box;
    &.selectActive {
      background-color: #febe00;
    }
    &-0 {
      background-image: url('~assets/mosic/icon_template_lr.png');
    }
    &-1 {
      background-image: url('~assets/mosic/icon_template_ud.png');
    }
    &-2 {
      background-image: url('~assets/mosic/icon_template_lmr.png');
    }
    &-3 {
      background-image: url('~assets/mosic/icon_template_umd.png');
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
</style>

