<template>
  <div :style="cssVars" class="owl-wrapper">
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
  computed: {
    showAds(){
      return !this.$store.state.Ad.hide;
    },
    ads () {
      return this.$store.state.Ad.items;
    },
    cssVars() {
      return {
        '--height': this.$store.state.Ad.height + 'px'
      };
    },
    autoplayInterval(){
      return this.$store.state.Ad.interval;
    },
    showItems(){
      return this.$store.state.Ad.showItems;
    }
  },
  methods: {
    handleClick: function() {
      this.$router.replace('config');
      this.$store.dispatch('checkout', null, {root: true});
    },
    handleSync: function() {
      this.$store.dispatch('sync', '01');
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