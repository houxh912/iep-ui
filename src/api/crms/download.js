import request from '@/router/axios'

export function downloadModel (url, name) {
  // let name = url
  return request({
    url: `/admin/file/${url}`,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    // let filename = response.headers['content-disposition'].split(';')[1]
    // filename = decodeURIComponent(filename.split('=')[1])
    // filename = decodeURIComponent(filename.split('"')[1])
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = name
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
  })
}
