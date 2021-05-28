<template>
  <div class="divTabsBox">
    <span
      v-for="(item, index) in tabsData"
      :key="index"
      @click.stop="handleActive(item.value)"
      :class="item.value === active ? 'onActive' : ''"
      >{{ item.text }}</span
    >
  </div>
</template>
<script>
const tabsData = [
  {
    value: '1',
    text: '今日',
  },
  {
    value: '2',
    text: '近7天',
  },
  {
    value: '3',
    text: '近30天',
  },
]
export default {
  props: {
    activeId: {
      type: String,
      default: '1',
    },
  },
  // computed: {
  //   active() {
  //     return this.activeId
  //   }
  // },
  data() {
    return {
      tabsData,
      active: this.activeId,
    }
  },
  methods: {
    handleActive(id) {
      this.active = id
      this.$emit('handleActive', id)
    },
  },
}
</script>
<style lang="scss" scoped>
.divTabsBox {
  text-align: center;
  margin-top: 20px;
  span {
    display: inline-block;
    padding: 4px 12px;
    margin: 0 70px;
    border-radius: 5px;
    cursor: pointer;
  }
  .onActive {
    background-color: #00a9ff;
    color: #051930;
  }
}
</style>
