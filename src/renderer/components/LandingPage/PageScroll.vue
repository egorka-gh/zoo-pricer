<template>
  <div ref="wrap" :style="cssVars">
    <div ref="realBox" :class="classAnimate" @click="start">
      <div ref="slotList" class="cut-overflow">
        <slot></slot>
      </div>
      <div v-html="copyHtml" class="cut-overflow"></div>
    </div>
  </div>
</template>

<script>
  //const copyObj = require('comutils/copyObj')
  //const log = require('electron-log');

export default {
    data () {
      return {
        height: 0,
        isAnimate: false,
        copyHtml: '',
      }
    },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      speed:{
        type: Number,
        default: 0
      },
      viewportHeight:{
        type: Number,
        default: 0
      }
    },

    computed: {
      cssVars() {
        return {
          '--scroll_offset': -this.height + 'px',
          '--scroll_duration': (this.speed <1) ? 20000 : Math.round(this.height*1000)/this.speed  + 'ms',
        }
      },
      classAnimate: function () {
        return {
          'animate-page': this.isAnimate
        }
      }
    },
    methods: {
      start(){
        this.isAnimate = false
        if (this.speed <1) return
        this.height = this.$refs.slotList.offsetHeight
        //check viewport 
        if (this.viewportHeight > 0 && this.height <= this.viewportHeight) return
        this.copyHtml = this.$refs.slotList.innerHTML
        this.isAnimate = true
      },
      stop(){
        this.isAnimate = false
      }
    },
    watch:{
      data: function () {
        //log.info('Scroll new data')
        this.stop()
        setTimeout(() => {
              this.start()
            }, 1000);
      
      }
    }

}
</script>

<style scoped>
.cut-overflow {
  overflow: hidden;
}

@keyframes go-up {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(var(--scroll_offset));
  }
}

.animate-page {
  animation: go-up var(--scroll_duration) linear infinite;
}
</style>