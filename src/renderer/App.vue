<template>
  <div id="app">
    <router-view :app_data="app_data" v-on:new-config="config"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'zoo-pricer',
    props: ["app_data"],
    methods: {
    config: function (config) {
      this.$parent.newConfig(config);
    }
  }
  }
</script>

<style>
/* CSS */
</style>
