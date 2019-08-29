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

// 获取我关注的用户的说说
export function getFollowPage (obj) {
  return request({
    url: `${prefixUrl}/follow_page`,
    method: 'get',
    params: obj,
  })
}

// 说说中@人联想接口
export function getUserNameList (obj) {
  return request({
    url: `${prefixUrl}/user/name/list`,
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

// 评论删除
export function deleteCommentThumbsById (id) {
  return request({
    url: `${commentUrl}/${id}`,
    method: 'post',
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

// 回复评论
export function deleteCommentById (id) {
  return request({
    url: `${replyUrl}/${id}`,
    method: 'post',
  })
}

// 回复点赞
export function addReplyThumbsByRecord (id) {
  return request({
    url: `${replyUrl}/replyThumbsByRecord/${id}`,
    method: 'get',
  })
}

// 说说总数榜 - 总
export function getMostThoughts () {
  return request({
    url: `${prefixUrl}/mostThoughts`,
    method: 'get',
  })
}

// 说说总数榜 - 分页
export function getMostThoughtsPage (params) {
  return request({
    url: `${prefixUrl}/mostThoughts/page`,
    method: 'get',
    params: params,
  })
}

// 本周排行榜 - 总
export function getMostThoughtsWeekly () {
  return request({
    url: `${prefixUrl}/mostThoughtsWeekly`,
    method: 'get',
  })
}

// 本周排行榜 - 分页
export function getMostThoughtsWeeklyPage (params) {
  return request({
    url: `${prefixUrl}/mostThoughtsWeekly/page`,
    method: 'get',
    params: params,
  })
}

//  本周点赞榜 - 总
export function getMostThumbedThoughtsWeekly () {
  return request({
    url: `${prefixUrl}/mostThumbedThoughtsWeekly`,
    method: 'get',
  })
}

//  本周点赞榜 - 分页
export function getMostThumbedThoughtsWeeklyPage (params) {
  return request({
    url: `${prefixUrl}/mostThumbedThoughtsWeekly/page`,
    method: 'get',
    params: params,
  })
}

// 热门话题榜 - 总
export function getHotTopics () {
  return request({
    url: `${prefixUrl}/hotTopics`,
    method: 'get',
  })
}

// 热门话题榜 - 分页
export function getHotTopicsPage (params) {
  return request({
    url: `${prefixUrl}/hotTopics/page`,
    method: 'get',
    params: params,
  })
}

// 说说点赞用户列表
export function getThumbMembers (id) {
  return request({
    url: `${prefixUrl}/thumbMembers/${id}`,
    method: 'get',
  })
}

// 说说详情
export function getDetailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 获取对应话题的说说列表
export function getTopicThoughts (obj) {
  return request({
    url: `${prefixUrl}/topicThoughts`,
    method: 'get',
    params: obj,
  })
}

// 根据id置顶指定说说
export function topUpThoughts (obj) {
  return request({
    url: `${prefixUrl}/topUp`,
    method: 'post',
    data: obj,
  })
}

// 说说管理页面的说说分页
export function getManagePage (params) {
  return request({
    url: `${prefixUrl}/manage/page`,
    method: 'get',
    params: params,
  })
}
