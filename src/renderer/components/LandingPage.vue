<template>
  <div id="wrapper">
    <main>
      <button class="focus-holder"></button>
      <PriceList></PriceList>
      <Ads></Ads>
    </main>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import Ads from './LandingPage/Ads'
  import PriceList from './LandingPage/PriceList'

  export default {
    name: 'landing-page',
    components: { Ads, PriceList },
  }
</script>

<style >
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        #f3f3f3 60%,
        #e0e0e0 100%
      );
    height: 100vh;
    width: 100vw;
  }

  .focus-holder{
    position: absolute;
    color: transparent;
  }


</style>
