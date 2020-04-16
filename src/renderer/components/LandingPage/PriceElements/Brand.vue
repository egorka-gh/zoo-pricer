<template>
  <div>
    <span>{{ price.brand }}</span>
    <span>/</span>
    <span>{{ price.country }}</span>
  </div>
</template>

<script>

export default {
  props: ['price'],
}
</script>

