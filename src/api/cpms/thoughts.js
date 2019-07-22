import request from '@/router/axios'
const prefixUrl = '/cpms/iephrthoughts'
const commentUrl = '/cpms/iepcommonthoughtscomment'
const replyUrl = '/cpms/iepcommonthoughtsreply'

export function thoughtsCreate (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function getThoughtsList (obj) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: obj,
  })
}

export function getThoughtsPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function thoughtsDelete (obj) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: obj,
  })
}

// 分页查询感想
export function geTallPage (obj) {
  return request({
    url: `${prefixUrl}/all_page`,
    method: 'get',
    params: obj,
  })
}

// 说说点赞
export function addThumbsUpByRecord (id) {
  return request({
    url: `${prefixUrl}/addThumbsUpByRecord/${id}`,
    method: 'get',
  })
}

// 评论
export function CommentThoughts (obj) {
  return request({
    url: `${commentUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 评论点赞
export function addcCommentThumbsByRecord (id) {
  return request({
    url: `${commentUrl}/commentThumbsByRecord/${id}`,
    method: 'get',
  })
}


// 回复评论
export function CommentReply (obj) {
  return request({
    url: `${replyUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 回复点赞
export function addReplyThumbsByRecord (id) {
  return request({
    url: `${replyUrl}/replyThumbsByRecord/${id}`,
    method: 'get',
  })
}

// 说说点赞用户列表
export function getThumbMembers (id) {
  return request({
    url: `${prefixUrl}/thumbMembers/${id}`,
    method: 'get',
  })
}

//  国脉人说说点赞排行榜
export function getRankingThumbsUp () {
  return request({
    url: `${prefixUrl}/rankingThumbsUp`,
    method: 'get',
  })
}

