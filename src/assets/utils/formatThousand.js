export const formatThousand = num => {
  if (num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g
    return (num + '').replace(reg, '$&,')
  } else {
    return ''
  }
}
