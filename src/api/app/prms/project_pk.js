
import request from '@/router/axios'
//项目pk
export function getProjectPKList (obj) {
  return request({
    url: '/prms/iepProjectInformation/pkList',
    method: 'post',
    data: obj,
  })
}
//加入

export function getProjectJoinList (obj) {
  return request({
    url: 'prms/iepProjectInformation/projectCartAdd',
    method: 'post',
    data: obj,
  })
}
// //删除
// export function clearCartOne (id) {
//   return request({
//     url: `prms/iepProjectInformation/clearCartOne/${id}`,
//     method: 'post',
//   })
// }
