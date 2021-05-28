<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
const { mapState, mapActions } = require('vuex')
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      allIntervals: 'allIntervals',
    }),
  },
  mounted() {
    this.$nextTick(() => {
      document.onvisibilitychange = () => {
        if (document.visibilityState !== 'visible') {
          for (let v of this.allIntervals) {
            clearInterval(v.timeInterval)
          }
          this.setNull()
        } else {
          for (let v of this.allIntervals) {
            v.func()
          }
        }
      }
    })
  },
  methods: {
    ...mapActions({
      setNull: 'setNull',
    }),
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

[v-cloak] {
  display: none;
}
</style>
