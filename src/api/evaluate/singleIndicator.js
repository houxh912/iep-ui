import request from '@/wenjuan/router/request'
import exportDownload from '@/util/export'
const queryUrl = '/evaluate'

export function getEvaluateindex (query) {
  return request({
    url: `${queryUrl}/evaluateindex/page`, //列表
    method: 'get',
    params: query,
  })
}

export function getEvaluateindexById (id) {
  return request({
    url: `${queryUrl}/evaluateindex/selectById?id=${id}`, //详情
    method: 'get',
  })
}

// 删除
export function deleteData (id) {
  return request({
    url: `${queryUrl}/evaluateindex/deleteById?id=${id}`,
    method: 'post',
  })
}

// 新增
export function postFormData (obj) {
  return request({
    url: `${queryUrl}/evaluateindex/save`,
    method: 'post',
    data: obj,
  })
}

// 更新
export function putFormData (obj) {
  return request({
    url: `${queryUrl}/evaluateindex/update`,
    method: 'post',
    data: obj,
  })
}

// 单项指标模板下载
export function getDownload (params) {
    // return exportDownload({url: `${baseName}/model_download`, data: params})
  return exportDownload({
    url: `${queryUrl}/excel/download`,
    data: params,
    // method: 'get',
  })
}
