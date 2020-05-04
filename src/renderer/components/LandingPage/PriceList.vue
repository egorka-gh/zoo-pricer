<template>
  <div>
    <div ref="wrap" class="pages-holder pages-decorator">
      <div class="page-item page-decorator">
        <PageScroll :data="prices1" :viewportHeight="clientHeight" :speed="speed">
          <PriceItem v-for="item in prices1" :key="item.id" :price="item" />
        </PageScroll>
      </div>
      <div class="page-item page-decorator">
        <PageScroll :data="prices2" :viewportHeight="clientHeight" :speed="speed">
          <PriceItem v-for="item in prices2" :key="item.id" :price="item" />
        </PageScroll>
      </div>
      <div class="page-item page-decorator">
        <PageScroll :data="prices3" :viewportHeight="clientHeight" :speed="speed">
          <PriceItem v-for="item in prices3" :key="item.id" :price="item" />
        </PageScroll>
      </div>
    </div>
  </div>
</template>

<script>
  import PriceItem from './PriceItem'
  const log = require('electron-log');
  import PageScroll from './PageScroll'
  //const arrayEqual = require('comutils/arrayEqual')

export default {
  //components: { PriceItem, PageScroll },
  components: { PriceItem, PageScroll},
  props:["price_data", "speed"],
  data: function(){
    return {
      prices1: [],
      prices2: [],
      prices3: [],
      clientHeight: 0,
    }
  },
  computed: {
    showPrices(){
      return !this.price_data.hide;
    },
    prices () {
      return this.price_data.items
    }
  },
  watch:{
    price_data: function(){
      log.info("PriceList: price_data changed");
    },
    prices: function (newPrices) {
      this.spreadPrices(newPrices)   
    }
  },
  methods: {
    spreadPrices  (newPrices) {
   // prices: function (newPrices, oldPrices) {
     // if (arrayEqual(newPrices, oldPrices)) return
      //split by group and spread over three columns
      log.info("PriceList: prices changed");
      let group ;
      let groups = []
      let grp=[]
      newPrices.forEach((rec) => {
        if(!group || rec.group_id != group){
          group = rec.group_id
          if (grp.length>0) groups.push(grp)
          grp=[]
        }
        grp.push(rec)
      });
      if (grp.length>0) groups.push(grp)
      //log.info("groups", groups)
      let columns = [[],[],[]]
      if (groups.length<=3){
        groups.forEach((g,i) => { columns[i]=g});
      }else{
        const third = newPrices.length/3
        groups.forEach((g) => { 
          //choothe column
          let col = 0
          let len = newPrices.length
          for ( var i = 0; i<3; i++){
            //first fill up to third 
            if((g.length + columns[i].length) <= third){
              col=i
              break;
            }
            //choose min column
            if (columns[i].length < len){
              col=i;
              len=columns[i].length;
            }
          }
          columns[col] = columns[col].concat(g)
        });
      }
      //set gap at last item
      columns.forEach((c) => { if(c.length>0) c[c.length-1].show_gap=true });
      //complite
      this.prices1=columns[0]
      this.prices2=columns[1]
      this.prices3=columns[2]
    }
  },
  mounted(){
    this.clientHeight = this.$refs.wrap.clientHeight
    if (this.prices && this.prices.length>0) this.spreadPrices(this.prices)
  }
}
</script>

<style>
.pages-holder {
  overflow: hidden;
  height: calc(100vh - var(--height));
  padding: 10px 0 10px 10px;
  margin: 0;
}
.pages-decorator {
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
  overflow: hidden;
  background: #ffffff;
}

.page-item {
  width: calc(((100vw - 10px) / 3) - 10px);
  margin: 0 10px 0 0;
}

.price-item {
  display: grid;
  grid-template-columns: [action] 70px [name] 1fr [price] 100px 10px;
  color: #3d3d3d;
  border: thin solid #cccccc;
  font-size: var(--font_body);
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
  height: var(--group_gap);
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

.price-item-head .group1 {
  font-weight: bold;
  font-size: var(--font_group1);
}

.price-item-head .group2 {
  font-weight: 600;
  font-size: var(--font_group2);
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
  font-weight: bold;
  font-size: var(--font_brand1);
}
.price-item-brand .country {
  color: #999999;
  font-size: var(--font_brand2);
}
</style>