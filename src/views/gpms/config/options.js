import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
let businessType = {}
for (let item of dicData.prms_business_type) {
  businessType[item.value] = item.label
}

const dictsMap = {
  projectType: {
    '0': '内部项目',
    '1': '外部项目',
  },
  businessType: businessType,
}

const columnsMap = [
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'projectType',
    label: '项目类别',
    type: 'dict',
  },
  {
    prop: 'businessType',
    label: '业务类型',
    width: 300,
    type: 'dict',
  },
]

export const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  detailedDescri: [
    { required: true, message: '请选择项目类型', trigger: 'blur' },
  ],
  isRequired: [
    { required: true, message: '请选择项目类型', trigger: 'change' },
  ],
  projectType: [
    { required: true, message: '请选择项目类型', trigger: 'change' },
  ],
  businessType: [
    { required: true, message: '请选择业务类型', trigger: 'change' },
  ],
  sortValue: [
    { required: true, message: '请输入排序值', trigger: 'blur' },
  ],
  url: [
    { required: true, message: '请输入URL', trigger: 'blur' },
  ],
}

export function initFormData () {
  return {
    name: '',
    detailedDescri: '',
    isRequired: '',
    projectType: '',
    businessType: '',
    sortValue: '',
    url: '',
  }
}

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
