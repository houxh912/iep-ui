import request from '@/router/axios'
const prefixUrl = '/admin/person'

export function pageList (params) {
  return request({
    url: `${prefixUrl}/page_search`,
    method: 'post',
    data: params,
  })
}
export function pageRecycleList (params) {
  return request({
    url: `${prefixUrl}/page_recycle`,
    method: 'post',
    data: params,
  })
}
export function deletePageById (id) {
  return request({
    url: `${prefixUrl}/deletePerson/${id}`,
    method: 'get',
  })
}
export function deleteRealPageById (id) {
  return request({
    url: `${prefixUrl}/realDelete/${id}`,
    method: 'get',
  })
}
export function recoveryById (id) {
  return request({
    url: `${prefixUrl}/recovery/${id}`,
    method: 'get',
  })
}
export function deleteMorePage (params) {
  return request({
    url: `${prefixUrl}/batchDelete`,
    method: 'post',
    data: params,
  })
}
export function deleteMoreRealPage (params) {
  return request({
    url: `${prefixUrl}/batchRealDelete`,
    method: 'post',
    data: params,
  })
}
export function insertOrUpdate (data) {
  return request({
    url: `${prefixUrl}/insertOrUpdate`,
    method: 'post',
    data: data,
  })
}
export function getDetailPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function getReLockById (id) {
  return request({
    url: `${prefixUrl}/removeLock/${id}`,
    method: 'get',
  })
}
export function getLockById (id) {
  return request({
    url: `${prefixUrl}/lockPerson/${id}`,
    method: 'get',
  })
}
export function getLock (data) {
  return request({
    url: `${prefixUrl}/batchLock`,
    method: 'post',
    data: data,
  })
}
export function getReLock (data) {
  return request({
    url: `${prefixUrl}/batchRemoveLock`,
    method: 'post',
    data: data,
  })
}

const prefixUrl2 = '/admin'
// @/api/tms/excel

function getDownload (path, fileName) {
  return request({
    url: `${prefixUrl2}${path}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${fileName}.xls`
    link.click()
  })
}
// export function getTagExcelExport () {
//   return getDownload('/import', '标签导出信息')
// }

// 提交
export function getModelExcel () {
  return getDownload('/person/exportExcel', '导入模板')
}