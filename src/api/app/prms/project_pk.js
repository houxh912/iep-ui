
import request from '@/router/axios'
//项目pk
export function getProjectPKList (obj) {
  return request({
    url: '/fams/iepProjectInformation/pkList',
    method: 'post',
    data: obj,
  })
}
