import $ from 'jquery'

const initTransform = (vm, ref, percent, side) => {
  vm.$nextTick(() => {
    setTransform(vm.$refs[ref], percent, side)
  })
}

const setTransform = (el, percent, side = 'left') => {
  // todo webkit前缀
  // const width = $(window).width()
  // let r1 = (width / 1920) * percent
  $(el).css({
    '-webkit-transform': 'scale(' + percent + ')',
    'transform-origin': `${side} top 0px`
  })
  // $(window).resize(() => {
  //   // let r2 = ($(window).width() / 1920) * percent
  //   $(el).css({
  //     '-webkit-transform': 'scale(' + percent + ')'
  //   })
  // })
}

export { initTransform }
