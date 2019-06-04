import request from '@/views/wenjuan/router/request'
import exportDownload from '@/util/export'
const queryUrl = '/evaluate'

export function getEvaluateindex (query) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/page`, //列表
    method: 'get',
    params: query,
  })
}

//获取工单列表
export function getEvaluateindexById (id) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/${id}`, //详情
    method: 'get',
  })
}

// 删除
export function deleteData (id) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/${id}`,
    method: 'post',
  })
}
// 批量删除
// export function deleteDatas (ids) {
//   return request({
//     url: `${queryUrl}/evaluateindexsystem/ids`,
//     method: 'post',
//     data: ids,
//   })
// }
// 新增
export function postFormData (obj) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/save`,
    method: 'post',
    data: obj,
  })
}

// 更新
export function putFormData (obj) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/update`,
    method: 'post',
    data: obj,
  })
}

// 指标库导出
export function getExport (id,title='') {
  return exportDownload({
    url: `${queryUrl}/excel/export?standardSystemId=${id}`,
    method: 'post',
    title: title,
  })
}

// 根据项目id获取指标体系内容
export function getPageById (params) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/listByProjectId`,
    method: 'get',
    params: params,
  })
}
//根据项目id为项目阶段获取指标体系内容
export function listForIndexSystem (params) {
  return request({
    url: `${queryUrl}/evaluateindexsystem/listForIndexSystem`,
    method: 'get',
    params: params,
  })
}

///evaluate/evaluateindexsystem/isOrNotModifier
export function isOrNotModifier (obj) {
  return request({
    url: '/evaluate/evaluateindexsystem/isOrNotModifier',
    method: 'post',
    data: obj,
  })
}


export function getQuesiotnEvaluateindexById (params) {
  return request({
    url: '/evaluate/evaluateindexsystem/getIndexSystemByWay', //详情
    method: 'get',
    params: params,
  })
}
