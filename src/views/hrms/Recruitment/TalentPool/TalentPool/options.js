import { mergeByFirst } from '@/util/util'
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
  },
  {
    prop: 'applyPosition',
    label: '应聘岗位',
  },
  {
    prop: 'receptionTime',
    label: '简历接受时间',
  },
  {
    prop: 'source',
    label: '来源',
  },
]

const initForm = () => {
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
    'positionName': '',
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
  const newForm = mergeByFirst(initDtoForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
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

const studyColumns = [
  {
    prop: 'name',
    label: '学习(教育)单位',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
  {
    prop: 'content',
    label: '学习内容',
  },
]

const workExpColumns = [
  {
    prop: 'name',
    label: '公司',
  },
  {
    prop: 'position',
    label: '岗位',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
  {
    prop: 'description',
    label: '工作描述',
  },
  {
    prop: 'leavingReason',
    label: '离职原因',
  },
]

const trainingColumns = [
  {
    prop: 'name',
    label: '培训名称',
  },
  {
    prop: 'place',
    label: '培训单位',
  },
  {
    prop: 'method',
    label: '培训方式',
  },
  {
    prop: 'startTime',
    label: '起始时间',
  },
]

const certificateColumns = [
  {
    prop: 'name',
    label: '证书名称',
  },
  {
    prop: 'number',
    label: '证书编号',
  },
  {
    prop: 'issuedPlace',
    label: '颁发单位',
  },
  {
    prop: 'annex',
    label: '附件',
  },
]

export { dictsMap, columnsMap, initForm, initSearchForm, initrejectedForm, formToDto, initToResumeForm, initToBlacklistForm, workExpColumns, studyColumns, trainingColumns, certificateColumns }