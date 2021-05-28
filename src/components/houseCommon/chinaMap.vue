<template>
  <div>
    <div class="mapChart" ref="mychart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
var geoCoordMap = {
  石家庄: [114.4995, 38.1006],
  沈阳: [123.1238, 42.1216],
  哈尔滨: [127.9688, 45.368],
  杭州: [119.5313, 29.8773],
  福州: [119.4543, 25.9222],
  济南: [117.1582, 36.8701],
  广州: [113.5107, 23.2196],
  武汉: [114.3896, 30.6628],
  成都: [103.9526, 30.7617],
  昆明: [102.9199, 25.4663],
  兰州: [103.5901, 36.3043],
  南宁: [108.479, 23.1152],
  银川: [106.3586, 38.1775],
  太原: [112.3352, 37.9413],
  长春: [125.8154, 44.2584],
  南京: [118.8062, 31.9208],
  合肥: [117.29, 32.0581],
  南昌: [116.0046, 28.6633],
  郑州: [113.4668, 34.6234],
  长沙: [113.0823, 28.2568],
  海口: [110.3893, 19.8516],
  贵阳: [106.6992, 26.7682],
  西安: [109.1162, 34.2004],
  西宁: [101.4038, 36.8207],
  呼和浩特: [111.4124, 40.4901],
  拉萨: [91.1865, 30.1465],
  北京: [116.4551, 40.2539],
  上海: [121.4648, 31.2891],
  乌鲁木齐: [87.9236, 43.5883],
  重庆: [107.7539, 30.1904],
  扬州: [119.42, 32.39],
}

var color = ['#a6c84c', '#ffa022', '#46bee9']
export default {
  props: {
    cityList: {
      type: Array,
      default: () => {
        return []
      },
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      },
    },
    mapStyle: {
      type: Object,
      default: () => {
        return {
          zoom: 0.8,
          top: '8%',
          left: '-4%',
        }
      },
    },
  },
  data() {
    return {
      myChart: {},
      option: {
        // 提示框组件
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: (p) => {
            // 自定义提示信息
            let dataCon = p.data
            let txtCon =
              '<span style="">' +
              dataCon.name +
              ' ' +
              dataCon.value[2] +
              '楼宇' +
              '<span>'
            return txtCon
          },
        },
        geo: {
          // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          zoom: this.mapStyle.zoom,
          top: this.mapStyle.top,
          left: this.mapStyle.left,
          // selectedMode: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#ffffff',
              },
            },
            emphasis: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#ffffff',
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: '#0b4cb2',
              borderColor: '#ffffff',
            },
            emphasis: {
              areaColor: '#162770',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 10,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [],
      },
      dataArr: [],
    }
  },
  watch: {
    houseList(newVal, oldVal) {
      this.dataArr = newVal
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(this.$refs.mychart)
      this.myChart.setOption(this.option)
    })
  },
  created() {
    this.dataArr = this.dataList
    this.setSeries([this.dataArr[0].name, this.cityList])
  },
  methods: {
    convertData(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = geoCoordMap[dataItem[0].name]
        var toCoord = geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
          })
        }
      }
      return res
    },
    convertData2(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name] // 获取坐标
        if (geoCoord) {
          // 如果有坐标
          res.push({
            // 创建对象数组，
            name: data[i].name,
            value: geoCoord.concat(data[i].value), // 用连接数组的形式将value值加入
          })
        }
      }
      return res
    },
    setSeries(v) {
      let series = []
      // console.log(v)
      // , ['扬州', YZData]
      ;[v].forEach((item, i) => {
        series.push(
          {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: this.convertData(item[1]),
          },
          {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke',
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
              },
            },
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            data: this.convertData2(this.dataArr),
          }
        )
      })
      this.option.series = series
    },
  },
}
</script>
<style lang="scss" scoped>
.mapChart {
  width: 1920px;
  height: 1080px;
}
</style>
