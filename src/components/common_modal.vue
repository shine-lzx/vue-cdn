<template>
  <div class="common_model_container">
    <div
      class="divBoxMain"
      @mouseenter.stop="handleHover"
      @mouseleave.stop="handleout"
    >
      <div v-show="actModal" class="divModal">
        <div class="modal--text">
          <div @click="handleBig()" class="modal--big">
            <img src="../assets/images/big.png" alt />
            <div style="color:#009af8">放大</div>
          </div>
          <!-- <div @click="handleJump()">
            <div class="modal--link">
              <img src="../assets/images/link.png" alt />
              <div style="color:#009af8">链接</div>
            </div>
          </div> -->
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actModal: false,
    }
  },
  methods: {
    handleHover() {
      this.actModal = true
    },

    handleout() {
      this.actModal = false
    },

    handleBig() {
      this.$emit('open-big')
    },

    handleModalClose() {
      this.$emit('close-big')
    },

    handleJump() {},
  },
}
</script>

<style lang="scss" scoped>
.common_model_container {
  .divBoxMain {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 0;
  }
  .divModal {
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    height: 10%;
    background-color: rgba(11, 23, 37, 0.8);
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    .modal--text {
      display: flex;
      width: 120px;
      justify-content: space-between;
      .modal--big {
        cursor: pointer;
      }
      .modal--link {
        cursor: pointer;
      }
    }
  }
}
</style>
