const setAnimation = vm => {
  const {
    cData,
    total
  } = initAnimationData(vm)
  vm.refreshBarSetInterval = setInterval(() => {
    process(vm, cData, total)
  }, 3000)
}

const updateAnimation = vm => () => {
  const {
    cData,
    total
  } = initAnimationData(vm)
  const t = setInterval(() => {
    process(vm, cData, total)
  }, 3000)
  const obj = {
    key: vm.objKey,
    timeInterval: t
  }
  vm.updateTimeInterVal(obj)
}

const initAnimationData = vm => {
  const cData = vm.option.series[0].data
  const total = cData.reduce((pre, total) => {
    return {
      ...total,
      value: pre.value + total.value
    }
  }).value
  return {
    cData: cData,
    total: total
  }
}

const process = (vm, cData, total) => {
  vm.myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: vm.nowIndex
  })
  vm.nowIndex = (vm.nowIndex + 1) % cData.length
  vm.currentPercent = Math.ceil((cData[vm.nowIndex].value / total) * 100)
  vm.myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: vm.nowIndex
  })
  vm.labelText = cData[vm.nowIndex].name
}

export {
  setAnimation,
  updateAnimation
}
