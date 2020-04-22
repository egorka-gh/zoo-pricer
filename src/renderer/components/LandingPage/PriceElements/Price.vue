<template>
  <div class="price-item">
    <div class="price-item-action">
      <span>{{ price.adv }}</span>
    </div>
    <div class="price-item-name">
      <p>{{ price.name }}</p>
    </div>
    <div class="price-item-price">
      <span>{{ price.price }}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['price'],
}
</script>

