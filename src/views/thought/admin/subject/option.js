export const tableOption = [
  {
    label: '话题主题',
    prop: 'content',
  }, {
    label: '话题分类',
    prop: 'topicType',
    type: 'dict',
  }, {
    label: '创建时间',
    prop: 'createTime',
  }, {
    label: '创建人',
    prop: 'creatorName',
  }, {
    label: '讨论',
    prop: 'hot',
  },
]

export const dictsMap = {
  topicType: {
    '1': '普通话题',
    '2': '专项话题',
  },
}