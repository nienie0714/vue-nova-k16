<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { getLoc } from './utils';

  export default {
    data: function() {
      return {
      }
    },
    created() {
      console.log('app.vue');
      setInterval(this.readPolling, 2000);
    },
    methods: {
      ...mapActions(['ajax']),
      ...mapMutations(['setCommon']),
      readPolling() {
        let command = localStorage.getItem('_');
        this.ajax({
          name: 'url',
          data: {
            DevID: 0,
            RW: 0,
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
          let account = getLoc('_');
          if(account == getCommon('account')) {  // store.state.lang   // Account  // store.state.common.account  getCommon('account')
            this.setCommon(result);
            res = res.map(item => {
              return Object.keys(item).replace(/([\w]*_)/, RegExp.$1.toLowerCase().replace(/_/, ''))
            });
            setComon(res);
          } else {
            this.$router.push('/login');
          }
          console.log(res); // { "DP_Sta":0, "HDMI_Sta":0, "SDI1_Sta":0, "SDI2_Sta":0, "DVI1_Sta":0, "DVI2_Sta":0, "DVI3_Sta":0, "DVI4_Sta":0, "DVI_Mosaic_Sta":0, "BKG_Sta":0, "FRZ_Sta":0, "BLACK_Sta":0, "Account":0000, "ERRC": 0}
        });
        // let res = { "DP_Sta": 1, "HDMI_Sta": 2, "SDI1_Sta": 3, "SDI2_Sta": 4, "DVI1_Sta": 5, "DVI2_Sta": 6, "DVI3_Sta": 7, "DVI4_Sta": 8, "DVI_Mosaic_Sta": 9, "BKG_Sta": 10, "FRZ_Sta": 11, "BLACK_Sta": 12, "Account": '0000', "ERRC": 13 };
        // let result = {};
        // for(let key in res) {
        //   let tempKey = key.replace(/([A-Za-z0-9]*)_/, word => {
        //     // console.log(word);
        //     return word.toLowerCase();
        //   }).replace(/_/g, '');
        //   console.log(key, res[key], tempKey);
        //   result[key.replace(/([\w]*_)/, RegExp.$1.toLowerCase().replace(/_/, ''))] = res[key];
        // }
        // this.setCommon(result);
      }
    }
  }
</script>


<style lang="less">
  #app {
    background: url('./assets/u11.png') center center no-repeat / cover;
  }
  @import '../static/css/main.less';
</style>