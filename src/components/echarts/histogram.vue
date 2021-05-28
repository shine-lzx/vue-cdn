<template>
  <div>
    <!-- 双柱 - 柱状图 -->
    <div class="divTitle">{{title}}</div>
    <div class="barBG" id="echart" ref="mychart" :style="{'height': boxHeight, 'width': boxWidth}"></div>
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

    // data : ['product', 'data1', 'data2'] 用于x轴显示
    dimensionsData: {
      type: Array,
      default() {
        return []
      }
    },

    // data:[{ product: '25', 'data1': 43.3, 'data2': 85.8 },{ product: '27', 'data1': 83.1, 'data2': 73.4 }] 数据与dimensionsData对应
    sourceData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      title: this.titleText,
      myChart: {},
      option: {
        legend: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          // x轴线相关配置
          axisLine: {
            show: true, // x轴线是否显示
            lineStyle: {
              color: 'rgba(94, 126, 163, 1)'
            }
          },
          // 刻度标签的相关设置
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(254, 254, 254, 1)', // x轴文字颜色设置
              fontSize: 16
            },
            interval: 0,
            showMaxLabel: true
          }
        },
        yAxis: {
          // max: 'dataMax', // 坐标轴刻度最大值
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(94, 126, 163, 1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 1)', // y轴文字颜色设置
              fontSize: 14
            }
          },
          splitLine: {
            show: true, // 网格线
            lineStyle: {
              color: 'rgba(94, 126, 163, 0.4)'
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1698CB' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#054B73' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            barGap: 0
          },
          {
            type: 'bar',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E0E398' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#1698CB' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            barGap: 0
          }
        ],
        dataset: {
          dimensions: this.dimensionsData,
          source: this.sourceData
        },
        // 数据加载时长
        animationDuration: function(idx) {
          return 3000
          // 越往后的数据延迟越大
          // return idx * 1000
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.title = this.titleText
      this.option.dataset.dimensions = this.dimensionsData
      this.option.dataset.source = this.sourceData
      this.setEchart()
    })
  },
  methods: {
    // 创建实例并生成表格
    setEchart() {
      this.myChart = echarts.init(this.$refs.mychart) // 创建实例
      this.myChart.clear()
      this.myChart.setOption(this.option) // 生成图表
    },
    // 隔10秒刷新表格
    refreshBar() {
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
      this.title = newValue
      this.setEchart()
    },
    dimensionsData(newValue) {
      this.option.dataset.dimensions = newValue
      this.setEchart()
    },
    sourceData(newValue) {
      this.option.dataset.source = newValue
      this.setEchart()
    }
  },
  destroyed() {}
}
</script>

<style lang='scss' scoped>
// .barBG {
//   // width: 200px;
//   // height: 200px;
//   // background-color: rgba(0,0,255,0.5);
// }
.divTitle{
  color: #ffffff;
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 60px;
}
</style>
