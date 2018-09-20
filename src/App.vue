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
          console.log(11111 + res); // { "DP_Sta":0, "HDMI_Sta":0, "SDI1_Sta":0, "SDI2_Sta":0, "DVI1_Sta":0, "DVI2_Sta":0, "DVI3_Sta":0, "DVI4_Sta":0, "DVI_Mosaic_Sta":0, "BKG_Sta":0, "FRZ_Sta":0, "BLACK_Sta":0, "Account":0000, "ERRC": 0}
          let account = getLoc('_');
          if(account == getCommon('account')) {  // store.state.lang   // res.Account  // store.state.common.account  getCommon('account')
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
            this.$router.push('/login');
          }
        });
      }
    }
  }
</script>


<style lang="less">
  #app {
    background: url('./assets/img_BG.png') center center no-repeat / cover;
  }
  @import '../static/css/main.less';
</style>