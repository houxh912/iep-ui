import request from '@/router/axios'

const prefixUrl = '/fams/investment'
// @/api/fams/investment

export function getInvestmentPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getInvestmentPersonPage (query) {
  return request({
    url: `${prefixUrl}/relation/page`,
    method: 'get',
    params: query,
  })
}

export function getMyPerson () {
  return request({
    url: `${prefixUrl}/my`,
    method: 'get',
  })
}

export function getInvestmentById (id) {
  return request({
    url: `${prefixUrl}/detail/${id}`,
    method: 'get',
  })
}

export function upInvestmentById (id) {
  return request({
    url: `${prefixUrl}/up/${id}`,
    method: 'post',
  })
}

export function downInvestmentById (id) {
  return request({
    url: `${prefixUrl}/down/${id}`,
    method: 'post',
  })
}

export function postInvestment (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function joinInvestment (obj) {
  return request({
    url: `${prefixUrl}/join`,
    method: 'post',
    data: obj,
  })
}

export function putInvestment (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteInvestmentById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteInvestmentBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function ReviewInvestmentBatch (obj) {
  return request({
    url: `${prefixUrl}/pass/batch`,
    method: 'post',
    data: obj,
  })
}

export function PersonInvestmentBatch (obj) {
  return request({
    url: `${prefixUrl}/join/pass/batch`,
    method: 'post',
    data: obj,
  })
}

export function notificationCreate (obj) {
  return request({
    url: `${prefixUrl}/notification/create`,
    method: 'post',
    data: obj,
  })
}