<template>
  <div class="price-item price-item-brand">
    <div class="price-item-name">
      <span class="brand">{{ price.brand }}</span>
      <span class="country">{{ country }}</span>
    </div>
    <div class="price-item-price">
      <span>Руб/кг</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['price'],
    computed: {
    country () {
      return this.price.country? ('/'+this.price.country) : '';
    }
  }

}
</script>

