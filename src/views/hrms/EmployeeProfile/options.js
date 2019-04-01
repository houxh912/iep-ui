import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'

const dictsMap = {
  status: {
    0: '暂无',
    1: '正式员工',
    2: '试用期员工',
    3: '实习期员工',
    4: '兼职员工',
    5: '其他',
    6: '离职员工',
  },
}

const initForm = () => {
  return {
    id: null, // 用户ID 不可编辑
    name: null, // 姓名 不可编辑
    userName: null, // 用户名 不可编辑
    orgName: null, // 组织名 不可编辑
    staffId: null, // 工号
    avatar: '', // 头像
    roleName: [], // 角色
    // orgName: '组织', // 资产所属公司 不可编辑
    position: [], // 岗位
    positionName: null, // 岗位
    externalTitle: null, // 对外头衔
    people: [], // 标签名字
    duties: null, // 岗位职责
    job: null, // 职务
    jobId: null, // 职务
    title: null, // 职称
    titleId: null, // 职称
    entryTime: null, // 入职时间
    positiveTime: null, // 转正时间
    transferTime: null, // 调动时间
    status: null, // 员工状态
    deptList: [], // 所属部门
    deptIds: [], // 所属部门
    birthday: null, // 出生年月
    sex: null, // 性别
    sexName: null, // 性别
    nationality: null, // 民族
    politics: null, // 政治面貌字典
    marriage: null, // 婚姻状况
    bear: null, // 生育状况
    language: null, // 外语水平
    education: '', // 最高学历
    university: null, // 毕业学校
    profession: null, // 专业
    graduationTime: null, // 毕业时间
    referrer: null, // 推荐人
    accountTypes: null, // 户口类别
    accountLocation: null, // 户口所在地
    residenceCities: [],
    residenceAddress: null, // 户籍地址
    currentCities: [],
    currentAddress: null, // 现住地址
    IDCard: null, // 身份证
    phone: null, // 联系手机
    wechat: null, // 微信
    qq: null, // QQ
    email: null, // 邮箱
    emergencyName: null, // 应急联系人
    emergencyPhone: null, // 应急联系方式
    signingTime: null, // 劳动合同签订时间
    benefitsStartTime: null, // 社保福利起缴时间
    benefitsStopTime: null, // 社保福利停缴时间
    separationTime: null, // 离职时间
    careerPlanning: null,//职业规划
    laborContract: [],//劳动合同
    socialContract: [],//社保福利
    transferContract: [],//调动情况
    quitContract: [],//离职信息
  }
}

const laborColumns = [
  {
    prop: 'type',
    label: '合同类型',
  },
  {
    prop: 'company',
    label: '归属公司',
  },
  {
    prop: 'startTime',
    label: '开始日期',
  },
  {
    prop: 'endTime',
    label: '到期日期',
  },
  {
    prop: 'annex',
    label: '合同附件',
  },
]
const socialColumns = [
  {
    prop: 'type',
    label: '缴纳类型',
  },
  {
    prop: 'company',
    label: '归属公司',
  },
  {
    prop: 'startTime',
    label: '起缴时间',
  },
  {
    prop: 'endTime',
    label: '停缴时间',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]
const transferColumns = [
  {
    prop: 'type',
    label: '调动类型',
  },
  {
    prop: 'date',
    label: '调动日期',
  },
  {
    prop: 'end',
    label: '变更后',
  },
]
const quitColumns = [
  {
    prop: 'time',
    label: '离职时间',
  },
  {
    prop: 'reason',
    label: '离职原因',
  },
  {
    prop: 'department',
    label: '部门',
  },
]
const formToDto = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  // newForm.province = row.cities[0]
  // newForm.city = row.cities[1]
  newForm.positionId = row.position[row.position.length - 1]
  return newForm
}
// 入职 0,6
// 转正 2,3,4,5
// 调动 1,2,3,4,5
// 离职 1,2,3,4,5
const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
    hidden: false,
  },
  {
    prop: 'userName',
    label: '用户名',
    hidden: true,
  },
  {
    prop: 'position',
    label: '岗位',
    hidden: false,
  },
  {
    prop: 'staffId',
    label: '工号',
    hidden: true,
  },
  {
    prop: 'status',
    label: '员工状态',
    type: 'dict',
    hidden: false,
  },
  {
    prop: 'IDCard',
    label: '身份证',
    hidden: false,
  },
  {
    prop: 'externalTitle',
    label: '对外头衔',
    hidden: true,
  },
  {
    prop: 'job',
    label: '职务',
    hidden: true,
  },
  {
    prop: 'title',
    label: '职称',
    hidden: true,
  },
  {
    prop: 'entryTime',
    label: '入职时间',
    hidden: false,
  },
  {
    prop: 'positiveTime',
    label: '转正时间',
    hidden: true,
  },
  {
    prop: 'transferTime',
    label: '调动时间',
    hidden: true,
  },
  {
    prop: 'birthday',
    label: '出生年月',
    hidden: true,
  },
  {
    prop: 'nationality',
    label: '民族',
    hidden: true,
  },
  {
    prop: 'politicsName',
    label: '政治面貌',
    hidden: true,
  },
  {
    prop: 'marriageName',
    label: '婚姻状况',
    hidden: true,
  },
  {
    prop: 'bearName',
    label: '生育状况',
    hidden: true,
  },
  // {
  //   prop: 'language',
  //   label: '外语水平',
  //   hidden: true,
  // },
  {
    prop: 'education',
    label: '最高学历',
    hidden: true,
  },
  {
    prop: 'university',
    label: '毕业学校',
    hidden: true,
  },
  {
    prop: 'profession',
    label: '专业',
    hidden: true,
  },
  {
    prop: 'graduationTime',
    label: '毕业时间',
    hidden: true,
  },
  {
    prop: 'referrer',
    label: '推荐人',
    hidden: true,
  },
  {
    prop: 'accountTypes',
    label: '户口类别',
    hidden: true,
  },
  // {
  //   prop: 'accountLocation',
  //   label: '户口所在地',
  //   hidden: true,
  // },
  {
    prop: 'residenceAddress',
    label: '户籍地址',
    hidden: true,
  },
  {
    prop: 'currentAddress',
    label: '现住地址',
    hidden: true,
  },
  {
    prop: 'phone',
    label: '联系手机',
    hidden: true,
  },
  {
    prop: 'weChat',
    label: '微信',
    hidden: true,
  },
  {
    prop: 'qq',
    label: 'QQ',
    hidden: true,
  },
  {
    prop: 'email',
    label: '邮箱',
    hidden: true,
  },
  {
    prop: 'emergencyName',
    label: '应急联系人',
    hidden: true,
  },
  {
    prop: 'emergencyPhone',
    label: '应急联系方式',
    hidden: true,
  },
  {
    prop: 'signingTime',
    label: '劳动合同签订时间',
    hidden: true,
  },
  {
    prop: 'benefitsStartTime',
    label: '社保福利起缴时间',
    hidden: true,
  },
  {
    prop: 'benefitsStopTime',
    label: '社保福利停缴时间',
    hidden: true,
  },
  {
    prop: 'separationTime',
    label: '离职时间',
    hidden: true,
  },
  {
    prop: 'deptList',
    label: '所属部门',
    hidden: true,
    type: 'tag',
  },
]

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
    dept: [],
    position: [],
    jobId: '',
    titleId: '',
    cities: [],
    rangeTime: [],
    status: [],
  }
}
const initDtoSearchForm = () => {
  return {
    name: '',
    sex: '',
    deptId: '',
    positionId: '',
    jobId: '',
    titleId: '',
    province: '',
    city: '',
    startTime: '',
    endTime: '',
    status: [],
  }
}
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  newForm.startTime = row.rangeTime[0]
  newForm.endTime = row.rangeTime[1]
  newForm.province = row.cities[0]
  newForm.city = row.cities[1]
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initTransferForm = () => {
  return {
    id: '',
    dept: [],
    position: [],
    jobId: '',
    titleId: '',
    transferTime: initNow(),
  }
}
const initDtoTransferForm = () => {
  return {
    id: '',
    deptId: '',
    positionId: '',
    jobId: '',
    titleId: '',
    transferTime: '',
  }
}

const transferFormToDto = (form) => {
  const newForm = mergeByFirst(initDtoTransferForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  newForm.deptId = form.dept[form.dept.length - 1]
  return newForm
}

const initDepartureForm = () => {
  return {
    id: '',
    departureTime: initNow(),
    reason: '',
  }
}
const initInductionForm = () => {
  return {
    id: '',
    status: 2,
    inductionTime: initNow(),
  }
}
const initPositiveForm = () => {
  return {
    id: '',
    positiveTime: initNow(),
  }
}
export { dictsMap, columnsMap, initForm, formToDto, transferFormToDto, initSearchForm, initTransferForm, initDepartureForm, initInductionForm, initPositiveForm, toDtoSearchForm, laborColumns, socialColumns, transferColumns, quitColumns }