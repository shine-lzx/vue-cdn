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
  name: 'barTest',
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
    legendShow: {
      type: Boolean,
      default: true
    },
    dataset: {
      type: Object,
      default () {
        return {
          source: []
        }
      }
    },
    /* 数据结构
    dataset: {
      source: [
        ['product', '2015', '2016', '2017'],
        ['2-3', 43.3, 85.8, 93.7],
        ['2-4', 83.1, 73.4, 55.1],
        ['2-5', 86.4, 65.2, 82.5],
        ['2-6', 72.4, 53.9, 39.1]
      ]
    }, */
    gradientList: {
      type: Array,
      default() {
        return []
      }
    },
    colorList: {
      type: Array,
      default() {
        return []
      }
    },
    axisLabelRotate: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      myChart: {},
      option: {
        color: ['#00b2ff', 'rgb(61,231,201)', '#f4ea94'],
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
          right: 10, // 设置图例的位置，上下左右，
          top: 30,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 3,
          // 图例样式
          textStyle: {
            color: '#939daa', // 图例文字颜色
            fontSize: 10
          },
          selectedMode: false // 控制是否可以通过点击图例改变系列的显示状态
          // orient: 'vertical'
          // show: false
        },
        grid: {
          left: 50
        },
        // x轴设置
        xAxis: {
          type: 'category', // 样式类型
          boundaryGap: false,
          // 坐标轴刻度相关设置
          axisTick: {
            show: false, // 刻度是否显示
            // 刻度样式
            lineStyle: {
              color: '#fff'
            },
            alignWithLabel: true,
            interval: (index, value) => {
              return index * 46 + 46
            }
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
            rotate: 0,
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
            show: TreeWalker
          },
          axisTick: {
            show: false
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
          // {
          //   type: 'line',
          //   areaStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [{
          //         offset: 1, color: 'rgba(125, 125, 125, 0.1)' // 0% 处的颜色
          //       },
          //       {
          //         offset: 0, color: 'rgba(225, 225, 225, 0.7)' // 100% 处的颜色
          //       }],
          //       global: false // 缺省为 false
          //     }
          //   }
          // }
        ],
        // 数据加载时长
        animationDuration: function (idx) {
          return 1000
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
    // 获得折线图下方渐变色区域，参数是数组，两个颜色
    // 这个xy和x2y2，还有那个1,0我也搞不明白了，，，，
    getGradient (arr) {
      return {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 1, color: arr[1] // 100% 处的颜色
          },
          {
            offset: 0, color: arr[0] // 0% 处的颜色
          }],
          global: false // 缺省为 false
        }
      }
    }
  },
  watch: {
    dataset(newValue) {
      this.option.dataset = newValue
      this.option.series = []
      // 根据 newValue.source[0]来确定添加几条折线图
      for (let i = 1; i < newValue.source[0].length; i++) {
        this.option.series.push({ type: 'line', cursor: 'auto', symbolSize: 10, hoverAnimation: false, symbol: 'circle' })
      }
      this.setEchart()
    },
    titleText(newValue) {
      this.option.title.text = newValue
      this.setEchart()
    },
    legendShow(newValue) {
      this.option.legend.show = newValue
      this.setEchart()
    },
    colorList(newValue) {
      this.option.color = newValue
      this.setEchart()
    },
    // 渐变色，代码需要优化(有点繁琐)
    gradientList(newValue) {
      //  获取渐变色数组
      let arr = newValue.map(item => {
        return this.getGradient(item)
      })
      // 将对应的渐变色添加到对应的数据中
      this.option.series = this.option.series.map((item, index) => {
        return {
          ...item,
          areaStyle: arr[index]
        }
      })
      this.setEchart()
    },
    axisLabelRotate(newValue) {
      this.option.xAxis.axisLabel.rotate = newValue
      this.setEchart()
    }
  },
  destroyed () {
  }
}
</script>

<style lang='scss' scoped>
// .barBG {
//   width: 1200px;
//   height: 800px;
//   // background-color: #fff;
// }
</style>
