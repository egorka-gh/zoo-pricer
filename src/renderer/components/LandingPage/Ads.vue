<template>
  <div>
    <h1>hz {{ counter }}, counter {{ counter2 }}, showAds {{showAds}}</h1>
    <carousel v-if="showAds" :autoplay="true" :nav="false" :dots="false" :items="2" :loop="true" >    
      <img 
            v-for="item in ads"
            :key="item.name"
      v-bind:src="item.path" :alt="item.name"
      />
    </carousel>
    <a @click="handleClick">Click me!</a>
    <a @click="handleSync">handleSync!</a>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'


export default {
  components: { carousel },
  computed: {
    counter () {
      return this.$store.state.main
    },
    counter2 () {
      return this.$store.state.Counter.main
    },
    showAds(){
      return !this.$store.state.Ad.hide;
    },
    ads () {
      return this.$store.state.Ad.items
    }
  },
  methods: {
    handleClick: function() {
      this.$router.replace('config');
      this.$store.dispatch('checkout', null, {root: true});
    },
    handleSync: function() {
      this.$store.dispatch('sync', '01');
    }
  }
}
</script>
