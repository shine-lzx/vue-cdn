<template>
  <div class="scroll-wrap" :style="{'height': height}">
    <div v-if="hasTitle" class="title">
      <div v-for="(item ,index) in titleList" :key="index" class="titleItem" :style="item.style" style="color: #fff;">
        {{item.name}}
      </div>
    </div>
    <div class="scrollContent" :id="id" @mouseenter="Stop()" @mouseleave="Up()">
      <ul class="scrollArea">
        <li
        v-for="(item ,index) in listData"
        :key="index" class="scrollItem"
        :style="isStripe(index)"
        @click="event ? handleClick(item.locationId, item.locationName, index) : returnFalse()"
        :class="event && currentIndex === index ? 'activeItem' : ''">
          <div class="index" :style="indexStyle">{{index + 1}}</div>
          <div
            v-for="(items ,indexs) in titleList"
            :key="indexs"
            class="contentItem"
            :style="items.style"
          >{{listData[index][items.property]}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    listData: {
      type: Array,
      required: true
    },
    hasTitle: {
      type: Boolean,
      default: false
    },
    titleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: '500px'
    },
    id: {
      type: String,
      required: true
    },
    indexStyle: {
      type: String
    },
    maxNumber: {
      type: Number,
      default: 0
    },
    stripe: {
      type: Boolean,
      default: false // true为带斑马线条纹背景色,默认不带条纹
    },
    event: {
      type: Boolean,
      default: false // true为li添加点击事件,默认不带事件
    }
  },
  data() {
    return {
      intnum: null,
      currentId: '',
      currentIndex: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.ScrollUp()
    })
  },
  watch: {
    listData: {
      deep: true,
      handler: function(newVa) {
        this.$nextTick(() => {
          this.ScrollUp()
        })
      }
    }
  },
  computed: {
    isStripe() {
      return function(index) {
        if (this.stripe) {
          if (index % 2 === 0) {
            return 'background: #091b2e;'
          } else {
            return 'background: #09182a;'
          }
        } else {
          return ''
        }
      }
    }
  },
  beforeDestroy() {
    // this.Stop()
  },
  methods: {
    scrollNews(obj) {
      const $ul = obj.find('ul')
      const lineHeight = $ul.find('li:first').height()
      //  https://blog.csdn.net/Dreamfirefly/article/details/77709516 该博客介绍了定时器动画切页面后，动画加快的问题以及可能奏效的解决方案
      $ul
        .stop(true, true)
        .animate({ marginTop: -lineHeight + 'px' }, 400, () => {
          $ul
            .css({ marginTop: 0 })
            .find('li:first')
            .appendTo($ul)
        })
    },
    ScrollUp() {
      if (this.listData.length > this.maxNumber) {
        const id = `#${this.id}`
        const scrollContent = $(id)
        clearInterval(this.intnum)
        this.intnum = null
        this.intnum = setInterval(() => {
          this.scrollNews(scrollContent)
        }, 2000)
      } else {
        return false
      }
    },
    Stop() {
      clearInterval(this.intnum)
    },
    Up() {
      this.ScrollUp()
    },
    handleClick(id, text, index) {
      this.currentId = id
      this.currentIndex = index
      this.$emit('item-click', id, text)
    },
    returnFalse() {
      return false
    }
  }
}
</script>

<style lang='scss' scoped>
.scroll-wrap {
  width: 100%;
  color: #fff;
  position: relative;
  .title {
    display: flex;
    height: 52px;
    line-height: 52px;
    width: 100%;
    box-sizing: border-box;
    background: #082840;
    padding-left: 50px;
    .titleItem {
      width: 100px;
      font-size: 20px;
      color: #fff !important;
    }
  }
  .scrollContent {
    position: absolute;
    top: 52px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .scrollArea {
      padding: 0;
      margin: 0;
      .scrollItem {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        text-align: left;
        font-size: 20px;
        cursor: pointer;
        .index {
          background-color: #00b2ff;
          font-weight: normal;
          width: 25px;
          height: 25px;
          line-height: 25px;
          vertical-align: middle;
          border-radius: 50%;
          text-align: center;
          margin: 0 15px;
          color: #fff;
          font-size: 16px;
        }
      }
      .activeItem{
        color: #00b2ff;
      }
    }
  }
}
</style>
