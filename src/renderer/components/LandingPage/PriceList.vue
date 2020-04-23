<template>
  <div>
    <div :style="cssVars" class="pages-holder pages-decorator">
      <div class="page-item page-decorator"></div>
      <div class="page-item page-decorator"></div>
      <div class="page-item page-decorator"></div>
    </div>
    <div :style="cssVars" class="pages-holder pages-container">
      <PriceItem v-for="item in prices" :key="item.id" :price="item" />
    </div>
  </div>
</template>

<script>
import PriceItem from './PriceItem'

export default {
  components: { PriceItem },
  computed: {
    prices () {
      return this.$store.state.PriceList.items
    },
    cssVars() {
      return {
        '--height': this.$store.state.Ad.height + 'px'
      };
    }
  }
}
</script>

<style>
.pages-holder {
  overflow: hidden;
  height: calc(100vh - var(--height));
  padding: 20px 0 10px 20px;
  margin: 0;
}
.pages-decorator {
  position: absolute;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
}

.pages-container {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

.page-decorator {
  height: 100%;
  background: #ffffff;
}

.page-item {
  width: calc(((100vw - 20px) / 3) - 20px);
  margin: 0 20px 0 0;
}

.price-item {
  display: grid;
  grid-template-columns: [action] 70px [name] 1fr [price] 100px 10px;
  color: #3d3d3d;
  border: thin solid #cccccc;
}

.price-item-name {
  grid-column: name;
  grid-row: 1;
  margin: 5px 0;
}

.price-item-action {
  grid-column: action;
  grid-row: 1;
  color: #ea9a56;
  font-weight: bold;
  text-align: center;
}
.price-item-action span {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.price-item-gap {
  grid-column: price;
  grid-row: 2;
  height: 20px;
}

.price-item-price {
  grid-column: price;
  grid-row: 1;
  text-align: end;
}
.price-item-price span {
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.price-item-head {
  background: #f6c546;
  color: #3d3d3d;
}

.price-item-head h1 {
  font-weight: 2000;
}

.price-item-head h2 {
  font-weight: 600;
}

.price-item-head img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: bottom;
}

.price-item-brand {
  background: #f3f3f3;
}
.price-item-brand .brand {
  font-size: x-large;
  font-weight: bold;
}
.price-item-brand .country {
  font-size: larger;
  color: #999999;
}
</style>