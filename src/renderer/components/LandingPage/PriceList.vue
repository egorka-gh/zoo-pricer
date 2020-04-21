<template>
  <div :style="cssVars" class="page">
      <PriceItem 
            v-for="item in prices"
            :key="item.id"
            :price="item"      
      />
  </div>
</template>

<script>
import PriceItem from './PriceItem'

export default {
  components: { PriceItem },
  computed: {
    prices () {
      return this.$store.state.PriceList.items
    },
    cssVars() {
      return {
        '--height': this.$store.state.Ad.height + 'px'
      };
    }
  }
}
</script>

<style>
  .page{
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    overflow: hidden;
    height: calc(100vh - var(--height));
    padding: 0;
    margin: 0;
  }
  .page-item{
    flex: 0 0 1;
    width: calc((100% / 3));
  }
</style>