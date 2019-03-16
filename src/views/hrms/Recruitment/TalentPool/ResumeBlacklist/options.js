import { mergeByFirst } from '@/util/util'

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
    prop: 'birthday',
    label: '出生年月',
  },
  {
    prop: 'applyPosition',
    label: '应聘岗位',
  },
  {
    prop: 'blacklistArea',
    label: '拉黑地区',
  },
  {
    prop: 'blacklistReason',
    label: '拉黑原因',
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
  }
}

export { formToDto, columnsMap, initForm, initSearchForm }