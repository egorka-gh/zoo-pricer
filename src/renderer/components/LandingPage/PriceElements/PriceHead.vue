<template>
  <div class="price-item price-item-head">
    <div class="price-item-name">
      <div class="group1">{{ price.group }}</div>
      <div class="group2">{{ price.group_comment }}</div>
    </div>
    <div class="price-item-price">
      <img src="~@/assets/cat.png" />
    </div>
  </div>
</template>

<script>

export default {
  props: ['price'],
}

</script>

