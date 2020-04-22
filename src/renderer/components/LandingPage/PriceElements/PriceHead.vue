<template>
  <div class="price-item price-item-head">
    <div class="price-item-name">
      <h1>{{ price.group }}</h1>
      <h2>{{ price.group_comment }}</h2>
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

