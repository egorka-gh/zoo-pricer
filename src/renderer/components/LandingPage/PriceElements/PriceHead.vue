<template>
  <div>
    <span>{{ price.group }}</span>
    <span>|</span>
    <span>{{ price.group_comment }}</span>
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