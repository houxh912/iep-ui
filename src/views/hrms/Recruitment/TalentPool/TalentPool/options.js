﻿import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    1: '待处理',
    2: '已邀约',
    3: '邀约未面试',
    4: '面试未录用',
    5: '已录用',
  },
}

const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 55,
  },
  {
    prop: 'education',
    label: '学历',
    type: 'dictGroup',
    dictName: 'hrms_highest_educational',
    width: '100',
  },
  {
    prop: 'applyPosition',
    label: '应聘岗位',
  },
  {
    prop: 'receptionTime',
    label: '简历接受时间',
    width: '170',
  },
  {
    prop: 'source',
    label: '来源',
    type: 'dictGroup',
    dictName: 'hrms_resume_source',
    width: '100',
  },
]

const initForm = () => {
  return {
    'id': '',
    'name': '',
    'sex': 1,
    'sexName': '',
    'avatar': '',
    'birthday': '',
    'title': '',
    'phone': '',
    'age': '',
    'email': '',
    'height': '',
    'weight': '',
    'nation': '',
    'address': '',
    'politics': '',
    'health': '',
    'marriage': '',
    'bear': 1,
    'university': '',
    'education': 2,
    'relation': '',
    'referrer': '',
    'appWay': 9,
    'source': 4,
    'hobbies': '',
    'advantage': '',
    'honor': '',
    'result': '',
    'position': [],
    'positionId': 3,
    'positionName': '',
    'arrive': '',
    'salary': '',
    'workPlace': '',
    'attach': [],
    'workExperience': [],
    'trainingSituation': [],
    'eduSituation': [],
    'userCert': [],
    'blacklistArea': '',
    'blacklistReasons': '',
    'cities': [],
  }
}

const initDtoForm = () => {
  return {
    'id': '',
    'name': '',
    'sex': 1,
    'avatar': '',
    'birthday': '',
    'title': '',
    'phone': '',
    'age': '',
    'email': '',
    'height': '',
    'weight': '',
    'nation': '',
    'address': '',
    'politics': '',
    'health': '',
    'marriage': '',
    'bear': 1,
    'university': '',
    'education': 2,
    'relation': '',
    'referrer': '',
    'appWay': 9,
    'source': 4,
    'hobbies': '',
    'advantage': '',
    'honor': '',
    'result': '',
    'position': [],
    'positionId': 3,
    'arrive': '',
    'salary': '',
    'workPlace': '',
    'attach': '',
    'workExperience': [],
    'trainingSituation': [],
    'eduSituation': [],
    'userCert': [],
    'blacklistArea': '',
    'blacklistReasons': '',
    'cities': [],
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  newForm.attach = form.attach[0] || ''
  return newForm
}
const formToVo = (form) => {
  const newForm = mergeByFirst(initDtoForm(), form)
  newForm.attach = []
  return newForm
}

const initSearchForm = () => {
  return {
    name: '', // 姓名
    marriageStatus: '',
    positionName: '', // 岗位名称
    position: [], // 岗位id
    educationId: null, // 最高学历字典ID
    sex: 0, // 性别id
    rangeTime: null, // 开始时间
    status: null, // 简历状态id
    rangeAge: [0, 100], // 年龄
  }
}
const initDtoSearchForm = () => {
  return {
    name: '', // 姓名
    marriageStatus: '',
    positionName: '', // 岗位名称
    positionId: null, // 岗位id
    educationId: null, // 最高学历字典ID
    sex: 0, // 性别id
    startTime: null, // 简历接收时间（开始时间）
    endTime: null, // 简历接收时间（结束时间）
    status: null, // 简历状态
    minAge: null, // 最小年龄
    maxAge: null, // 最大年龄
  }
}
// positionId: 1, // 岗位id
// deptId: 1, // 部门ID
// sex: 1, // 性别id
// status: 1, // 招聘状态id
// startTime: initNow(), // 开始时间
// endTime: initNow(), // 结束时间
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.sex = row.sex ? row.sex : null
  newForm.positionId = row.position.length && row.position[row.position.length - 1]
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  if (row.rangeAge) {
    newForm.minAge = row.rangeAge[0]
    newForm.maxAge = row.rangeAge[1]
  }
  return newForm
}

const initToResumeForm = () => {
  return {
    ids: [],
    reason: '',
  }
}
const initToBlacklistForm = () => {
  return {
    ids: [],
    area: '',
    reason: '',
  }
}

const initrejectedForm = () => {
  return {
    msg: '',
  }
}

export { dictsMap, columnsMap, initForm, initrejectedForm, formToDto, formToVo, initToResumeForm, initToBlacklistForm, initSearchForm, toDtoSearchForm }