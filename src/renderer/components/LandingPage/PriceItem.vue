<template>
  <div class="page-item">
    <PriceHead  v-if="price.show_group"
            :price="price"      
      />
    <Brand v-if="price.show_brand"
            :price="price"      
      />
    <Price 
            :price="price"      
      />
  </div>
</template>

<script>
import Brand from './PriceElements/Brand'
import Price from './PriceElements/Price'
import PriceHead from './PriceElements/PriceHead'

export default {
  components: { PriceHead, Price, Brand },
  props: ['price'],
}
</script>

