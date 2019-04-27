import request from '@/router/axios'
import { prefixUrl } from '../../cpms/module'
export function getModuleList (params) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}
