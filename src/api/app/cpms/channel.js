import request from '@/router/axios'
const prefixUrl = '/cpms/channel_product'

export const getDetailsPage = (params) => {
  return request({
    url: `${prefixUrl}/details_page`,
    method: 'get',
    params: params,
  })
}

export const getModulePage = (params) => {
  return request({
    url: `${prefixUrl}/module_page`,
    method: 'get',
    params: params,
  })
}

// 组织详情产品集合
export const getDetailsList = (id) => {
  return request({
    url: `${prefixUrl}/details_list/${id}`,
    method: 'get',
  })
}
