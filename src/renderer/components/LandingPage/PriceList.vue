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

