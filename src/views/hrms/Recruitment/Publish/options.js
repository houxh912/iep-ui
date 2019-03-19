import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

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
    positionName: '',
    dept: [],
    // positionId: '', // 岗位 positionName
    // positionName: '', // 岗位 positionName
    // deptId: '', // 所属部门 deptnName
    deptName: '', // 所属部门 deptnName
    recruitsCount: 0, // 招聘人数
    targetCount: 0, // 目标人数
    academicId: '', // 学历要求(dict) hrms_highest_educational
    jobTypeId: '', // 工作类型(dict) hrms_work_type
    years: 0, // 工作年限
    profession: '', // 专业要求
    place: '', // 工作地点
    sex: 1, // 性别
    sexName: '', // 性别
    treatment: '', // 工资待遇
    language: '', // 外语要求
    term: initNow(), // 招聘期限
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

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}
const initSearchForm = () => {
  return {
    name: '', // 岗位名称
    position: [], // 岗位id
    dept: [], // 部门ID
    sex: 1, // 性别id
    status: 1, // 招聘状态id
    rangeTime: [initNow(), initNow()], // 开始时间
  }
}
const initDtoSearchForm = () => {
  return {
    name: '', // 岗位名称
    positionId: 1, // 岗位id
    deptId: 1, // 部门ID
    sex: 1, // 性别id
    status: 1, // 招聘状态id
    startTime: initNow(), // 开始时间
    endTime: initNow(), // 结束时间
  }
}
// name: '', // 岗位名称
// positionId: 1, // 岗位id
// deptId: 1, // 部门ID
// sex: 1, // 性别id
// status: 1, // 招聘状态id
// startTime: initNow(), // 开始时间
// endTime: initNow(), // 结束时间
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  newForm.startTime = row.rangeTime[0]
  newForm.endTime = row.rangeTime[1]
  return newForm
}

export { dictsMap, columnsMap, initForm, initSearchForm, formToDto, toDtoSearchForm }