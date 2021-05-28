import echarts from 'echarts'
import { mapActions } from 'vuex'

export const pieMixins = {
  data() {
    return {
      refreshBarSetInterval: null,
      currentPercent: {
        index: -1,
        number: 0,
      },
      nowIndex: -1,
      labelText: '',
    }
  },
  methods: {
    ...mapActions({
      addTimeInterVal: 'addTimeInterVal',
      updateTimeInterVal: 'updateTimeInterVal',
    }),

    initEchart() {
      this.myChart = echarts.init(this.$refs.mychart)
      this.myChart.setOption(this.option)
    },

    setAnimation() {
      const { cData, total } = this.initAnimationData() // 这里传入，避免重复计算消耗性能
      this.refreshBarSetInterval = setInterval(() => {
        this.process(cData, total)
      }, 3000)
    },

    updateAnimation() {
      const { cData, total } = this.initAnimationData()
      this.refreshBarSetInterval = setInterval(() => {
        this.process(cData, total)
      }, 3000)
      const obj = {
        key: this.objKey,
        timeInterval: this.refreshBarSetInterval,
      }
      this.updateTimeInterVal(obj)
    },

    initAnimationData() {
      const cData = this.option.series[0].data
      const total = cData.reduce((pre, total) => {
        return {
          ...total,
          value: pre.value + total.value,
        }
      }).value
      return {
        cData: cData,
        total: total,
      }
    },

    process(cData, total) {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.nowIndex,
      })
      this.nowIndex = (this.nowIndex + 1) % cData.length
      let number
      if (total === 0) {
        number = 0
      } else {
        number = Math.ceil((cData[this.nowIndex].value / total) * 100)
      }
      this.currentPercent = {
        index: this.nowIndex,
        number,
      }
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.nowIndex,
      })
      this.labelText = cData[this.nowIndex].name
    },
  },
  beforeDestroy() {
    clearInterval(this.refreshBarSetInterval)
    this.refreshBarSetInterval = null
  },
}
