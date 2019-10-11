
import { Message } from 'element-ui'
import request from '@/router/axios'
// @/api/common
export function getCommonList (url, name) {
  return request({
    url: `/${url}/list`,
    method: 'get',
    params: {
      name,
    },
  })
}

export function getCommonPage (url, params) {
  return request({
    url: `/${url}`,
    method: 'get',
    params,
  })
}

export function downloadUrl (url) {
  request({
    url: '/admin/file/' + url,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = url
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
  })
}

const downLoadMessage = [
  '文件较大，正在下载中，请耐心等候',
  '文件过大，需要较长下载时间，请耐心等候',
]

export function downloadFile (file) {
  let downLoadCode1 = window.setTimeout(() => {
    Message(downLoadMessage[0])
  }, 1000*10)
  let downLoadCode2 = window.setInterval(() => {
    Message(downLoadMessage[1])
  }, 1000*60)
  request({
    url: '/admin/file/' + file.url,
    method: 'get',
    responseType: 'arraybuffer',
    timeout: '3600000',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = file.name
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
    // 关闭定时信息
    window.clearTimeout(downLoadCode1)
    window.clearInterval(downLoadCode2)
  })
}
