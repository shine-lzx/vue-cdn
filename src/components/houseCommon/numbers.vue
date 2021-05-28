<template>
  <div class="numbers">
    <div class="text1">
      {{ text1 }}
    </div>
    <div class="num-list">
      <span class="num-item" v-for="(item, index) in numList" :key="index">
        <scroll :newNum="item" class="num"></scroll>
      </span>
    </div>
    <div class="text2">
      {{ text2 }}
    </div>
  </div>
</template>

<script>
import scroll from './scroll'
export default {
  components: {
    scroll,
  },
  props: {
    text1: {
      type: String,
      default: '',
    },
    text2: {
      type: String,
      default: '',
    },
    num: {
      type: String,
      default: '',
    },
  },
  computed: {
    numList() {
      let arr = this.num.split('')
      return arr
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.numbers {
  display: flex;
  height: 60px;
  line-height: 60px;
  .text1 {
    width: 124px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgb(255, 255, 255);
    font-weight: normal;
    font-family: 'Microsoft Yahei', Arial, sans-serif;
    font-size: 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .text2 {
    font-size: 22px;
    color: #ffffff;
    font-weight: normal;
    vertical-align: super;
  }
  .num-item {
    background-color: rgba(255, 255, 255, 0.1);
    display: inline-block;
    letter-spacing: 0.02em;
    text-indent: 0.02em;
    height: auto;
    line-height: normal;
    font-size: 36px;
    font-weight: bolder;
    letter-spacing: 0.02em;
    margin-right: 0.2em;
    border-radius: 2px;
    width: 40px;
    text-align: center;
    .num {
      color: #ffd600;
    }
  }
}
</style>
