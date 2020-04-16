<template>
  <div>
    <PriceHead 
            :price="price"      
      />
    <Brand 
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

