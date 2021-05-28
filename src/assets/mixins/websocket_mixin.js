import { findEstateInfo } from '@/assets/api/oaCommon'
const getEstateId = (v) => {
  switch (v) {
    case '192.168.200.248':
    case '192.168.200.245':
    case '192.168.200.244':
    case '58.213.162.164':
      return 'EDFA1FE6D86DE3FC1BAC2575210D8386' // 场内
    case '58.220.195.170': // 星地
      return '250240D185CA1E3CAD1CC630076B6A8F'
    case '218.94.152.182': // 长岛
      return '51B6745D5F18BB273765F22DF3FC71A9'
    default:
      return 'EDFA1FE6D86DE3FC1BAC2575210D8386'
  }
}

export const websocketMixins = {
  created() {
    const esId = this.estateId
      ? this.estateId
      // eslint-disable-next-line no-undef
      : getEstateId(returnCitySN['cip'])
    findEstateInfo({
      estateId: esId,
    }).then((res) => {
      this.wsIp = res.data.ip
      this.startWebSocket()
    })
  },
}
