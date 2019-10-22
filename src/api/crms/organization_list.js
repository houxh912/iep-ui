import request from '@/router/axios'
const prefixUrl = '/crm/organization'
export function getPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function deletePage (query) {
  return request({
    url: `${prefixUrl}/delete`,
    method: 'post',
    data: query,
  })
}
export function addPage (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function updatePage (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function getDetailPage (id) {
  return request({
    url: `${prefixUrl}/info/${id}`,
    method: 'get',
  })
}


const prefixUrl2 = '/crm'
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
  return getDownload('/organization_excel/download', '导入模板')
}