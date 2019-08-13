import request from '@/router/axios'
const prefixUrl = '/admin/channel_admin'

// 组织风采
export const getRectagsOrgList = () => {
  return request({
    url: `${prefixUrl}/org_list`,
    method: 'get',
  })
}

// 组织详情
export const getOrgDetail = (id) => {
  return request({
    url: `${prefixUrl}/org/${id}`,
    method: 'get',
  })
}

// 组织详情
export const getRectagsOrgPage = (params) => {
  return request({
    url: `${prefixUrl}/org/page`,
    method: 'get',
    params: params,
  })
}

// 数据资产
export const getOrgAssets = (id) => {
  return request({
    url: `${prefixUrl}/org_assets/${id}`,
    method: 'get',
  })
}

// 数据资产
export const getOrgCredit = () => {
  return request({
    url: `${prefixUrl}/org/credit`,
    method: 'get',
  })
}

// 精彩瞬间
export const getAlbumList = () => {
  return request({
    url: `${prefixUrl}/album/list`,
    method: 'get',
  })
}