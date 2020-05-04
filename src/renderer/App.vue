<template>
  <div id="app">
    <router-view :app_data="app_data" :price="price" v-on:new-config="config"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'zoo-pricer',
    props: ["app_data","price"],
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
