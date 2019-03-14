// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
  },
  {
    prop: 'education',
    label: '学历',
  },
  {
    prop: 'age',
    label: '年龄',
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
    'cityCode': '',
    'provinceCode': '',
    'address': '',
    'politic': '',
    'health': '',
    'marriage': '',
    'bear': 1,
    'university': '',
    'education': 2,
    'relation': '',
    'recommender': '',
    'appWay': 9,
    'source': 4,
    'hobbies': '',
    'advantage': '',
    'honor': '',
    'result': '',
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

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}
const initrejectedForm = () => {
  return {
    msg: '',

  }
}
export { dictsMap, columnsMap, initForm, initSearchForm, initrejectedForm }