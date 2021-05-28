<template>
  <div class="percent_container" :style="{ height: height }">
    <div class="scroll_block" v-for="(item, index) in scrollData" :key="index">
      <template>
        <div class="block_title">{{ item.title }}</div>
        <div class="block_bar">
          <div class="underline"></div>
          <div
            class="bar"
            :style="{ width: (item.value / Number(totalNum)) * 85 + '%' }"
          ></div>
          <div class="value">{{ item.value }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scrollData: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
    height: {
      type: String,
      default: '150px',
    },
    totalNum: {
      type: String,
      required: true,
      default: '0',
    },
  },
}
</script>

<style lang="scss" scoped>
.percent_container {
  position: relative;
  width: 100%;
  .scroll_block {
    box-sizing: border-box;
    height: 50px;
    margin: 5px;
    .block_title {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      color: #fff;
      margin-left: 20px;
      margin-top: 15px;
      animation: animationKey 13s cubic-bezier(0.15, 0.52, 0.5, 0.9) 0s infinite;
    }
    .block_bar {
      height: 30px;
      display: flex;
      position: relative;
      padding-left: 10px;
      .underline {
        flex: 1;
        float: left;
        height: 2px;
        background: rgba(0, 186, 255, 0.1);
        margin-top: 28px;
      }
      .bar {
        flex: 1;
        position: absolute;
        left: 10px;
        bottom: 4px;
        display: block;
        height: 6px;
        background: #00b2ff;
        transition-duration: 2s;
        overflow: hidden;
        &:before {
          content: '';
          position: absolute;
          left: -100px;
          top: 0;
          width: 18px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.35);
          animation: throughLight 2.5s ease-in 2.5s infinite;
          @keyframes throughLight {
            75% {
              left: 0;
              top: 0;
            }
            100% {
              left: 90%;
              top: 0;
            }
          }
        }
      }
      .value {
        width: 70px;
        color: #f4ea94;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        animation: animationKey 13s cubic-bezier(0.15, 0.52, 0.5, 0.9) 0s
          infinite;
      }
    }
  }
}
@keyframes animationKey {
  0% {
    // transform: scale(1)
  }
  77% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
  89% {
    -webkit-transform: rotateX(90deg);
    transform: rotateX(90deg);
  }
  100% {
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
}
</style>
