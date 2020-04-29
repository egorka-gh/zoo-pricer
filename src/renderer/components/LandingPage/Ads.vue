<template>
  <div class="owl-wrapper">
    <carousel
      v-if="showAds"
      :autoplay="true"
      :nav="false"
      :dots="false"
      :loop="true"
      :margin="5"
      :autoplayTimeout="autoplayInterval"
      :items="showItems"
    >
      <img v-for="item in ads" :key="item.name" v-bind:src="item.path" :alt="item.name" />
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'


export default {
  components: { carousel },
  props: ['ads_data'],
  computed: {
    showAds(){
      return !this.ads_data.hide;
    },
    ads () {
      return this.ads_data.items;
    },
    autoplayInterval(){
      return this.ads_data.interval;
    },
    showItems(){
      return this.ads_data.showItems;
    }
  }
}
</script>

<style >
.owl-wrapper {
  margin: 0 5px;
}
.owl-item {
  height: var(--height);
  display: flex;
  padding: 0 0 10px 0;
  justify-content: center;
  align-items: center;
}
.owl-item img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: contain;
}
</style>