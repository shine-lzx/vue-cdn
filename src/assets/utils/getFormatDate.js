export const getFormatDate = () => {
  let nowDate = new Date()
  let year = nowDate.getFullYear()
  let month =
    nowDate.getMonth() + 1 < 10
      ? '0' + (nowDate.getMonth() + 1)
      : nowDate.getMonth() + 1
  let date =
    nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
  let hour =
    nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours()
  let minute =
    nowDate.getMinutes() < 10
      ? '0' + nowDate.getMinutes()
      : nowDate.getMinutes()
  let second =
    nowDate.getSeconds() < 10
      ? '0' + nowDate.getSeconds()
      : nowDate.getSeconds()
  let time =
    year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  return time
}
