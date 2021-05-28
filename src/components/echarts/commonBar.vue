<template>
    <div class="barBG"
         id="echart"
         ref="mychart"
         :style="{'height': boxHeight, 'width': boxWidth}"
         >
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'commonBar',
  props: {
    boxWidth: {
      type: String,
      default: '300px'
    },
    boxHeight: {
      type: String,
      default: '300px'
    },
    titleText: {
      type: String,
      default: ''
    },

    // 是否显示提示标签
    legendShow: {
      type: Boolean,
      default: false
    },

    // data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 用于x轴显示
    xAxisData: {
      type: Array,
      default() {
        return []
      }
    },

    // 柱子宽度
    seriesBarWidth: {
      type: Number,
      default: 20
    },

    // data:[10, 52, 200, 334, 390, 330, 220] 数据与xAxisData对应
    seriesData: {
      type: Array,
      default () {
        return []
      }
    },

    // 默认调色盘颜色
    colorList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      myChart: {},
      option: {
        color: ['#00A9FF'],
        title: {
          text: '',
          // 标题样式
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 14
          },
          top: 20,
          left: 10,
          // subtext: '单位（户）',
          // 副标题样式
          subtextStyle: {
            color: '#939daa',
            fontSize: 10
          }
        },
        // 图例组件
        legend: {
          right: 0, // 设置图例的位置，上下左右，
          top: 30,
          itemWidth: 10,
          itemHeight: 10,
          // 图例样式
          textStyle: {
            color: '#939daa', // 图例文字颜色
            fontSize: 10
          },
          selectedMode: false, // 控制是否可以通过点击图例改变系列的显示状态
          // orient: 'vertical'
          show: false
        },
        grid: {
          left: 50
        },
        // 显示提示
        tooltip: {
          trigger: 'axis', // 触发方式
          axisPointer: {
            type: 'none'
          },
          show: false // 是否显示提示
          // showContent: false
        },
        // x轴设置
        xAxis: {
          type: 'category', // 样式类型
          // data: ['A', 'B', 'C'],
          // 坐标轴刻度相关设置
          axisTick: {
            show: false, // 刻度是否显示
            // 刻度样式
            lineStyle: {
              color: '#fff'
            },
            alignWithLabel: true,
            // interval: (index, value) => {
            //   return index * 46 + 46
            // }
          },
          // x轴线相关配置
          axisLine: {
            show: true // x轴线是否显示
          },
          // 刻度标签的相关设置
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)', // x轴文字颜色设置
              fontSize: 10
            },
            rotate: -45,
            interval: 0,
            showMaxLabel: true
          },
          nameGap: 6,
          nameTextStyle: {
            color: '##FD4041'
          }
        },
        // y轴设置
        yAxis: {
          // max: 'dataMax', // 坐标轴刻度最大值
          axisLine: {
            show: true
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)', // y轴文字颜色设置
              fontSize: 10
            }
          },
          splitLine: { show: false } // 去除网格线
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 10, // 宽度大小
            cursor: 'auto',
            data: [] // 数据来源
          }
        ],
        // 数据加载时长
        animationDuration: function (idx) {
          return 3000
          // 越往后的数据延迟越大
          // return idx * 1000
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setEchart()
    })
  },
  methods: {
    // 创建实例并生成表格
    setEchart () {
      this.myChart = echarts.init(this.$refs.mychart) // 创建实例
      this.myChart.clear()
      this.myChart.setOption(this.option) // 生成图表
    },
    // 隔10秒刷新表格
    refreshBar () {
      this.refreshBarSetInterval = setInterval(() => {
        this.setEchart()
      }, 10000)
    }
  },
  watch: {
    // boxWidth(newValue) {
    //   this.setEchart()
    // },
    // boxHeight(newValue) {
    //   this.setEchart()
    // },
    titleText(newValue) {
      this.option.title.text = newValue
      this.setEchart()
    },
    legendShow(newValue) {
      this.option.legend.show = newValue
      this.setEchart()
    },
    xAxisData(newValue) {
      this.option.xAxis.data = newValue
      this.setEchart()
    },
    seriesBarWidth(newValue) {
      this.option.series[0].barWidth = newValue
      this.setEchart()
    },
    seriesData(newValue) {
      this.option.series[0].data = newValue
      this.setEchart()
    },
    colorList(newValue) {
      this.option.color = newValue
      this.setEchart()
    }
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
// .barBG {
//   // width: 200px;
//   // height: 200px;
//   // background-color: rgba(0,0,255,0.5);
// }
</style>
