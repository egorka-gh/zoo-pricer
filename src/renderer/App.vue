<template>
  <div id="app">
    <router-view :app_data="app_data"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'zoo-pricer',
    props: ["app_data"]
  }
</script>

<style>
/* CSS */
</style>
