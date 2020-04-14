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

<style scoped>
.posts {
  list-style: none;
  text-align: left;
}

.post-item + .post-item {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>