import axios from 'axios'
import { omit } from 'lodash'

const request = (config = {}) => {
  const { url, apiPrefix } = config
  const omitConfig = omit(config, ['url', 'apiPrefix'])

  const _baseURL = apiPrefix

  const _config = {
    url: _baseURL + url,
    timeout: 5000,
    method: 'get',
    headers: {},
    ...omitConfig,
  }

  const promise = axios(_config).then((result) => {
    const body = result.data
    if (body.code === '00000') {
      return Promise.resolve(body)
    } else {
      return Promise.reject(body)
    }
  })
  return promise
}
export default request
