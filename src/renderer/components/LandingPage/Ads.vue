<template>
  <div>
    <h1>sdwdw {{ counter }}</h1>
    <carousel :autoplay="true" :nav="false" :items="2" :loop="true">    
      <img 
            v-for="item in ads"
            :key="item.name"
      v-bind:src="item.path" alt="item.name"
      />
    </carousel>
    <a @click="handleClick">Click me!</a>
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
    ads () {
      return this.$store.state.Ad.items
    }
  },
  methods: {
    handleClick: function() {
      alert('test');
      //this.$store.commit('incRoot');
      this.$store.dispatch('checkout', null, {root: true});
      //this.$store.dispatch('sync', '01');
      //this.$store.dispatch('someAsyncTask', null, {root: true});
    }
  }
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