<template>
  <div class="percent-container">
    <div>
      <span ref="numberGrow">{{animatedNumber}}</span>
      <span>%</span>
    </div>
    <div
      v-if="isShowText"
      class="text_container"
      :style="{'transition': 'transform 1s cubic-bezier(1,1,0,0) 0s', '-webkit-transform': scaleX}"
    >{{currentLabelText}}</div>
  </div>
</template>

<script>
import {
  // TweenMax,
  // TimelineLite,
  TweenLite
  // Power2,
  // Elastic,
  // CSSPlugin
} from 'gsap/TweenMax'
export default {
  props: {
    percent: {
      type: Object
    },
    isShowText: {
      type: Boolean,
      default: true
    },
    labelText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scaleX: 'scaleX(0.9) translate3d(0, 0, 0)',
      tweenedNumber: 0,
      t1: null,
      t2: null,
      t3: null
    }
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    percent(newVal, oldValue) {
      // clearInterval(this.t1)
      // this.t1 = null
      // clearInterval(this.t2)
      // this.t2 = null
      // this.numberGrow(this.$refs.numberGrow, newVal.number, oldValue.number)
      TweenLite.to(this.$data, 1, { tweenedNumber: Number(newVal.number) })
      this.handleTransform()
    }
  },
  created() {
    this.currentLabelText = this.labelText
  },
  methods: {
    // 预留，定时器动画
    // numberGrow(el, newVal, oldValue) {
    //   const step = 1
    //   let start = oldValue
    //   let end = newVal
    //   if (start < end) {
    //     this.t1 = setInterval(() => {
    //       el.innerHTML = start
    //       start += step
    //       if (start > end) {
    //         clearInterval(this.t1)
    //         this.t1 = null
    //       }
    //     }, 10)
    //   } else {
    //     this.t2 = setInterval(() => {
    //       el.innerHTML = start
    //       start -= step
    //       if (start < end) {
    //         clearInterval(this.t2)
    //         this.t2 = null
    //       }
    //     }, 10)
    //   }
    // },

    handleTransform() {
      // if (this.scaleX === 'scaleX(0.2)') {
      //   this.scaleX = 'scaleX(1)'
      // } else {
      //   this.scaleX = 'scaleX(0.2)'
      // }
      clearTimeout(this.t3)
      this.scaleX = 'scaleX(0.1) translate3d(0, 0, 0)'
      this.t3 = setTimeout(() => {
        this.currentLabelText = this.labelText
        this.scaleX = 'scaleX(0.9) translate3d(0, 0, 0)'
      }, 1000)
      // setTimeout(() => {
      //   this.scaleX = 'scaleX(0.2)'
      // }, 1000)
      // const scaleXStep = 0.042
      // let start = 0.2
      // let secondStart = 1
      // let flag = 0
      // this.t3 = setInterval(() => {
      //   flag += scaleXStep
      //   if (flag <= 1) {
      //     secondStart -= scaleXStep
      //     this.scaleX = scaleX
      //   }
      //   if (flag > 1 && flag <= 1.8) {
      //     start += scaleXStep
      //     this.currentLabelText = this.labelText
      //     this.scaleX = `scaleX(${start})`
      //   }
      //   if (flag > 1.8) {
      //     window.clearInterval(this.t3)
      //     this.t3 = null
      //   }
      // }, 21)
    }
  },

  beforeDestroy() {
    clearInterval(this.t1)
    this.t1 = null
    clearInterval(this.t2)
    this.t2 = null
    clearTimeout(this.t3)
    this.t3 = null
  }
}
</script>

<style  lang="scss" scoped>
.percent-container {
  color: #ffffff;
  width: 100px;
  height: 46px;
  text-align: center;
  .text_container {
    width: 100px;
    height: 26px;
    text-align: center;
  }
}
</style>
