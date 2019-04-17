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
    id: '', // 用户ID 不可编辑
    name: null, // 姓名 不可编辑
    userName: null, // 用户名 不可编辑
    orgId: null, // 组织ID 不可编辑
    orgName: null, // 组织名 不可编辑
    orgList: [], // 组织名 不可编辑
    staffId: null, // 工号
    avatar: '', // 头像
    roleName: [], // 角色
    // orgName: '组织', // 资产所属公司 不可编辑
    position: [], // 岗位
    positionName: null, // 岗位
    externalTitle: null, // 对外头衔
    people: [], // 标签名字
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
    dept: [], // 所属部门
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
    abilityTag: [], // 卓越标签
    projectTag: [], // 专业标签
    learningTag: [], // 进步标签
    workExperience: [], // 工作经历
    trainingSituation: [], // 培训情况
    eduSituation: [], // 学习情况
    userCert: [], // 资质证书
    accountTypeId: null, // 户口类别
    accountTypeName: null, // 户口类别
    accountLocation: null, // 户口所在地
    residenceCities: [], // (户口)
    residenceAddress: null, // 户籍地址
    provinceName: null, // 户籍地址
    cityName: null, // 户籍地址
    currentCities: [], // 现住
    currentAddress: null, // 现住地址
    IDCard: null, // 身份证
    phone: null, // 联系手机
    wechat: null, // 微信
    qq: null, // QQ
    email: null, // 邮箱
    home: null, // 邮箱
    birthplaceProvince: null, //所属省（户口）
    birthplaceCity: null,//所属市（户口）
    province: null, //所属省（现住）
    city: null,  //所属市（现住）
    emergencyName: null, // 应急联系人
    emergencyPhone: null, // 应急联系方式
    signingTime: null, // 劳动合同签订时间
    benefitsStartTime: null, // 社保福利起缴时间
    benefitsStopTime: null, // 社保福利停缴时间
    separationTime: null, // 离职时间
    careerPlanning: null,//职业规划
    laborContract: [],//劳动合同
    welfare: [],//社保福利
    transfer: [],//调动情况
    dimission: [],//离职信息
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.province = row.currentCities[0]
  newForm.city = row.currentCities[1]
  newForm.birthplaceProvince = row.residenceCities[0]
  newForm.birthplaceCity = row.residenceCities[1]
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptIds = row.dept.map(m => m.id)
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
    sortable: true,
    key: 'sex',
  },
  {
    prop: 'userName',
    label: '用户名',
    hidden: true,
    key: 'userName',
  },
  {
    prop: 'position',
    label: '岗位',
    hidden: false,
    key: 'position',
  },
  {
    prop: 'staffId',
    label: '工号',
    hidden: true,
    key: 'staffNo',
  },
  {
    prop: 'status',
    label: '员工状态',
    type: 'dict',
    hidden: false,
    key: 'userStatus',
  },
  {
    prop: 'IDCard',
    label: '身份证',
    hidden: false,
    key: 'idCard',
  },
  {
    prop: 'externalTitle',
    label: '对外头衔',
    hidden: true,
    key: 'externalTitle',
  },
  {
    prop: 'job',
    label: '职务',
    hidden: true,
    key: 'job',
  },
  {
    prop: 'title',
    label: '职称',
    hidden: true,
    key: 'title',
  },

  {
    prop: 'positiveTime',
    label: '转正时间',
    hidden: true,
    key: 'regDate',
  },
  {
    prop: 'transferTime',
    label: '调动时间',
    hidden: true,
    key: 'transferTime',
  },
  {
    prop: 'birthday',
    label: '出生年月',
    hidden: true,
    key: 'birthDate',
  },
  {
    prop: 'nationality',
    label: '民族',
    hidden: true,
    key: 'nation',
  },
  {
    prop: 'politicsName',
    label: '政治面貌',
    hidden: true,
    key: 'politicsName',
  },
  {
    prop: 'marriageName',
    label: '婚姻状况',
    hidden: true,
    key: 'marriageName',
  },
  {
    prop: 'bearName',
    label: '生育状况',
    hidden: true,
    key: 'bearName',
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
    key: 'education',
  },
  {
    prop: 'university',
    label: '毕业学校',
    hidden: true,
    key: 'university',
  },
  {
    prop: 'profession',
    label: '专业',
    hidden: true,
    key: 'major',
  },
  {
    prop: 'graduationTime',
    label: '毕业时间',
    hidden: true,
    key: 'graduateTime',
  },
  {
    prop: 'referrer',
    label: '推荐人',
    hidden: true,
    key: 'recommend',
  },
  {
    prop: 'accountTypes',
    label: '户口类别',
    hidden: true,
    key: 'accountTypes',
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
    key: 'residentAdd',
  },
  {
    prop: 'currentAddress',
    label: '现住地址',
    hidden: true,
    key: 'currentAdd',
  },
  {
    prop: 'phone',
    label: '联系手机',
    hidden: true,
    key: 'phone',
  },
  {
    prop: 'weChat',
    label: '微信',
    hidden: true,
    key: 'wechat',
  },
  {
    prop: 'qq',
    label: 'QQ',
    hidden: true,
    key: 'qq',
  },
  {
    prop: 'email',
    label: '邮箱',
    hidden: true,
    key: 'email',
  },
  {
    prop: 'emergencyName',
    label: '应急联系人',
    hidden: true,
    key: 'emergencyPerson',
  },
  {
    prop: 'emergencyPhone',
    label: '应急联系方式',
    hidden: true,
    key: 'emergencyContact',
  },
  {
    prop: 'signingTime',
    label: '劳动合同签订时间',
    hidden: true,
    key: 'signingTime',
  },
  {
    prop: 'benefitsStartTime',
    label: '社保福利起缴时间',
    hidden: true,
    key: 'benefitsStartTime',
  },
  {
    prop: 'benefitsStopTime',
    label: '社保福利停缴时间',
    hidden: true,
    key: 'benefitsStopTime',
  },
  {
    prop: 'separationTime',
    label: '离职时间',
    hidden: true,
    key: 'separationTime',
  },
  {
    prop: 'deptList',
    label: '所属部门',
    hidden: true,
    type: 'tag',
    key: 'deptList',
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

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' },
  ],
  date: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
  ],

  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' },
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' },
  ],
  staffId: [
    { required: true, message: '请填写员工编号', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, formToDto, transferFormToDto, initSearchForm, initTransferForm, initDepartureForm, initInductionForm, initPositiveForm, toDtoSearchForm, rules }