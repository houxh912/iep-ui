import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    1: '待发布', 2: '招聘中', 3: '结束招聘',
  },
}

const columnsMap = [
  {
    prop: 'dept',
    label: '招聘部门',
  },
  {
    prop: 'recruitsCount',
    label: '招聘人数',
  },
  {
    prop: 'jobType',
    label: '工作类型',
  },
  {
    prop: 'applicationTime',
    label: '招聘发布时间',
  },
  {
    prop: 'status',
    label: '招聘状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    id: '', // ID
    position: [],
    dept: [],
    // positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    // deptId: '', // 所属部门 deptnName
    // deptName: '', // 所属部门 deptnName
    recruitsCount: 0, // 招聘人数
    targetCount: 0, // 目标人数
    academicId: '', // 学历要求(dict) hrms_highest_educational
    jobTypeId: '', // 工作类型(dict) hrms_work_type
    years: 0, // 工作年限
    profession: '', // 专业要求
    place: '', // 工作地点
    sex: 1, // 性别
    treatment: '', // 工资待遇
    language: '', // 外语要求
    term: '', // 招聘期限
    welfare: '', // 福利待遇
    duties: '', // 岗位职责
    claim: '', // 岗位要求
  }
}

const initDtoForm = () => {
  return {
    id: '', // ID
    // position: [],
    // dept: [],
    positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    deptId: '', // 所属部门 deptnName
    // deptName: '', // 所属部门 deptnName
    recruitsCount: 0, // 招聘人数
    targetCount: 0, // 目标人数
    academicId: '', // 学历要求(dict) hrms_highest_educational
    jobTypeId: '', // 工作类型(dict) hrms_work_type
    years: 0, // 工作年限
    profession: '', // 专业要求
    place: '', // 工作地点
    sex: 1, // 性别
    treatment: '', // 工资待遇
    language: '', // 外语要求
    term: '', // 招聘期限
    welfare: '', // 福利待遇
    duties: '', // 岗位职责
    claim: '', // 岗位要求
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initDtoForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  newForm.deptId = form.dept[form.dept.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    keyword: '',
    department: '',
    category: '',
    name: '',
    sex: '',
    status: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm, formToDto }