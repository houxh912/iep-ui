import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    0: '禁用',
    1: '正常',
  },
}

const initForm = () => {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 1, // 类型为批示
    kind: 0,
  }
}

const rules = {
  subject: [{
    required: true,
    message: '请输入主题名称',
    trigger: 'blur',
  }],
  content: [{
    required: true,
    message: '请输入内容',
    trigger: 'blur',
  }],
}
const initSearchForm = () => {
  return {
    rangeTime: null, // 日期
    realName: '',
  }
}
const initDtoSearchForm = () => {
  return {
    startTime: '', // 日期
    endTime: '', // 日期
    realName: '',
  }
}
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  return newForm
}

export { initSearchForm, toDtoSearchForm, dictsMap, initForm, rules }