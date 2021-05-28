<template>
  <div class="total-number" :style="{'background-color':bgColor}">
    <span class="title-lable">{{label}}</span>
    <div class="number">
      <span class="title">{{prefix}}</span>
      <span class="sum-number" :style="{'color':color}">{{formatThousand(number)}}</span>
      <span class="title">{{unit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: '总计'
    },
    number: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#f4ea94'
    },
    bgColor: {
      type: String,
      default: 'rgba(0, 178, 255, .1)'
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  beforeDestroy() {},
  methods: {
    formatThousand(num) {
      if (num) {
        var reg = /\d{1,3}(?=(\d{3})+$)/g
        return (num + '').replace(reg, '$&,')
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.total-number {
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  background-color: rgba(0, 178, 255, .1);
  padding: 0 28px 0 32px;
  display: flex;
  justify-content: space-between;
  .title-lable {
    color: #fff;
    font-size: 20px;
  }
  .number {
    .title {
      font-size: 14px;
      color: #fff;
    }
    .sum-number {
      font-size: 34px;
      font-weight: 700;
      font-family: Arial;
    }
  }
}
</style>
