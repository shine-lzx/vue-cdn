<template>
  <span>{{doformatThousand(animatedNum)}}</span>
</template>

<script>
import { formatThousand } from '@/assets/utils/formatThousand'
import { TweenLite } from 'gsap/TweenMax'
export default {
  props: {
    newNum: String
  },
  data() {
    return {
      tweenedNumber: 0
    }
  },
  computed: {
    animatedNum() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    newNum() {
      this.animatedNumber()
    }
  },
  mounted() {
    this.animatedNumber()
  },
  methods: {
    doformatThousand(num) {
      return formatThousand(num)
    },
    animatedNumber() {
      let newVal = this.newNum
      TweenLite.to(this.$data, 1, { tweenedNumber: Number(newVal) })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
