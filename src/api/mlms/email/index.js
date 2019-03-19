import request from '@/router/axios'
const prefixUrl = '/mlms/email'

// 收件箱
export function getReceiverList (params) {
  return request({
    url: `${prefixUrl}/receiver_page`,
    method: 'get',
    params: params,
  })
}

// 已发送
export function getSendList (params) {
  return request({
    url: `${prefixUrl}/send_page`,
    method: 'get',
    params: params,
  })
}

// 星标邮件
export function getStarList (params) {
  return request({
    url: `${prefixUrl}/star_page`,
    method: 'get',
    params: params,
  })
}

// 草稿
export function getDraftList (params) {
  return request({
    url: `${prefixUrl}/draft_page`,
    method: 'get',
    params: params,
  })
}

// 新建邮件
export function createEmail (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 删除邮件
export function deleteEmailById (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 星标功能
export function emailStarById (id) {
  return request({
    url: `/mlms/email_star/sign/${id}`,
    method: 'post',
  })
}

// 标记已读
export function isReadeById (id) {
  return request({
    url: `/mlms/email_receiver/is_reade/${id}`,
    method: 'post',
  })
}

// 标记已读
export function isReadeBatch (ids) {
  return request({
    url: '/mlms/email_receiver/is_reade',
    method: 'post',
    data: ids,
  })
}
