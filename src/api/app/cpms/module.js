import request from '@/router/axios'
import { prefixUrl } from '../../cpms/module'
export function getModulePage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
