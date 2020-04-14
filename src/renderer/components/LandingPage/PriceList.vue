<template>
  <div>
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
    }
  }
}
</script>

<style scoped>
.posts {
  list-style: none;
  text-align: left;
}

.post-item + .post-item {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>