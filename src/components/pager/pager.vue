<template>
  <div class="pager">
    <div class="pageSize">{{ pageSize }} 个/页</div>
    <ul class="pager_container">
      <li @click="onPreClick" class="icon_left">&lt;</li>
      <li
        v-for="pager in pagers"
        :key="pager"
        :class="{ active: currentPage === pager, disabled }"
        class="pager_item"
        @click="onPagerClick(pager)"
      >
        {{ pager }}
      </li>
      <li @click="onNextClick" class="icon_right">&gt;</li>
    </ul>
    <div class="totalPage">总共 {{ pageCount }} 页</div>
  </div>
</template>

<script>
export default {
  name: 'pager',
  props: {
    currentPage: Number,
    totalCount: Number,
    pageSize: Number,
    disabled: Boolean,
  },
  data() {
    return {
      nowPage: '',
    }
  },
  computed: {
    pagers() {
      const pageCount = Number(this.pageCount)
      const array = []
      for (let i = 1; i <= pageCount; i++) {
        array.push(i)
      }
      return array
    },
    pageCount() {
      let res = 1
      if (this.totalCount) {
        res = Math.ceil(this.totalCount / this.pageSize)
      } else {
        res = 1
      }
      return res
    },
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.nowPage = this.currentPage
    })
  },
  methods: {
    onPagerClick(pager) {
      this.nowPage = pager
      this.$emit('handlePageChange', this.nowPage)
    },
    onPreClick() {
      if (this.nowPage >= 2) {
        this.nowPage -= 1
        this.$emit('handlePageChange', this.nowPage)
      } else {
        this.nowPage = 1
      }
    },
    onNextClick() {
      if (this.nowPage >= this.pageCount) {
        this.nowPage = this.pageCount
      } else {
        this.nowPage += 1
        this.$emit('handlePageChange', this.nowPage)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pager {
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  .pageSize {
    width: 80px;
    text-align: center;
    border: 1px solid #00b2ff;
    border-radius: 4px;
  }
  .pager_container {
    flex: 1;
    display: flex;
    list-style: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0;
    margin: 0;
    text-align: center;
    .pager_item {
      width: 30px;
      height: 30px;
      color: #fff;
    }
    .active {
      border-radius: 50%;
      background: #00b2ff;
    }
    .icon_left {
      margin: 0 20px;
    }
    .icon_right {
      margin-left: 20px;
    }
  }
  .totalPage {
    width: 120px;
    text-align: center;
  }
}
</style>
