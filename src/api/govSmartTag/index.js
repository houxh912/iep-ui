import request from '@/views/wenjuan/router/request'
const baseUrl = '/tms/tag'

//智能标签remote请求
export function selectTags (keyword) {
  return request({
    url: `${baseUrl}/assn_tag?keyWord=${keyword}`,
    method: 'get',
  })
}

//获取智能标签所有内容形成下拉选
export function getTagSelect () {
  return request({
    url: `${baseUrl}/selectTag`,
    method: 'get',
  })
}