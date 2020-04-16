<template>
  <div>
    <span>{{ price.adv }}</span>
    <span>|</span>
    <span>{{ price.name }}</span>
    <span>|</span>
    <span>{{ price.price }}</span>
  </div>
</template>

<script>

export default {
  props: ['price'],
}
</script>

