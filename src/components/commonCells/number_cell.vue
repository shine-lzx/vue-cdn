<template>
  <div class="number_cell_container" :style="{'width': width}">
    <!-- fontRequire 是我加的字体样式  默认值是false  -->
    <div class="number_cell--label" :class="fontRequire?'fontRequireCSS':''">{{label}}</div>
    <div :style="{'color':color}" class="number_cell--number">
      {{formatThousand(number)}}
      <span>{{sub}}</span>
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
    number: {
      type: String
    },
    color: {
      type: String
    },
    sub: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '140px'
    },
    fontRequire: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
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

<style lang="scss" scoped>
.number_cell_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .number_cell--label {
    font-size: 14px;
    color: #939daa;
  }
  .fontRequireCSS {
    font-size: 22px;
    color: #00b2ff;
    font-weight: bold;
    margin-bottom:10px;
  }
  .number_cell--number {
    font-family: Arial;
    font-size: 34px;
    font-weight: bold;
    span {
      display: inline-block;
      color: #ffffff;
      font-size: 12px;
      margin-left: -6px;
    }
  }
}
</style>
