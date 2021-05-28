<template>
  <div class="common_toptitle_container">
    <div class="ct--title">{{ title }}</div>
    <!-- todo,这个图有点问题，左右两边留白不对称 -->
    <img class="ct--img" src="@/assets/images/top_title_bg.png" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '无标题',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.common_toptitle_container {
  // width: 100%;
  text-align: center;
  position: relative;
  .ct--title {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-family: 'Microsoft YaHei';
    font-size: 30px;
    color: #00b2ff;
  }
  .ct--img {
    width: 100%;
  }
}
</style>
