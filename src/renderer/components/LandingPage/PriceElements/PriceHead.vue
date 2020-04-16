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

