<template>
  <div id="wrapper" :style="cssVars">
    <main>
      <button class="focus-holder"></button>
      <PriceList :price_data="price" :speed="speed"></PriceList>
      <Ads :ads_data="ads_data"></Ads>
    </main>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import Ads from './LandingPage/Ads'
  import PriceList from './LandingPage/PriceList'
  //const log = require('electron-log');

  export default {
    name: 'landing-page',
    components: { Ads, PriceList },
    props: ["app_data", "price"],
    computed:{
      ads_data(){
        return this.app_data.ads;
      },
      price_data(){
        return this.app_data.price;
      },
      speed(){
        return this.app_data.font.speed ? this.app_data.font.speed : 50;
      },
      cssVars() {
        return {
          '--font_group1': this.app_data.font.group1 + 'px',
          '--font_group2': this.app_data.font.group2 + 'px',
          '--font_brand1': this.app_data.font.brand1 + 'px',
          '--font_brand2': this.app_data.font.brand2 + 'px',
          '--font_body': this.app_data.font.body + 'px',
          '--group_gap': this.app_data.font.gap + 'px',
          '--height': this.ads_data.height + 'px',
        }
      }
    },
    /*
    watch:{
      app_data: function(){
          log.info("LandingPage: app_data changed");
      },
      price: function(){
          log.info("LandingPage: price changed");
      }
    }
    */
  }
</script>

<style >
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(ellipse at top left, #f3f3f3 60%, #e0e0e0 100%);
  height: 100vh;
  width: 100vw;
}

.focus-holder {
  position: absolute;
  color: transparent;
}
</style>
