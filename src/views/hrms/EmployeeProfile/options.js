// org config options
const dictsMap = {
  employeeStatus: {
    0: '暂无',
    1: '正式员工',
    2: '试用期员工',
    3: '实习期员工',
    4: '兼职员工',
    5: '其他',
    6: '离职员工',
  },
}
// const pageColumnObj = {
//   id: '', // 用户ID
//   name: '', // 姓名
//   userName: '', // 用户名
//   roleName: '', // 角色
//   staffId: '', // 工号
//   position: '', // 岗位
//   externalTitle: '', // 对外头衔
//   job: '', // 职务
//   title: '', // 职称
//   entryTime: '', // 入职时间
//   positiveTime: '', // 转正时间
//   transferTime: '', // 调动时间
//   status: '', // 员工状态
//   dept: '', // 所属部门
//   birthday: '', // 出生年月
//   sex: '', // 性别
//   nationality: '', // 民族
//   politicalStatus: '', // 政治面貌
//   maritalStatus: '', // 婚姻状况
//   fertilityStatus: '', // 生育状况
//   language: '', // 外语水平
//   education: '', // 最高学历
//   graduatedSchool: '', // 毕业学校
//   profession: '', // 专业
//   graduationTime: '', // 毕业时间
//   referrer: '', // 推荐人
//   certifications: '', // 资质证书名称
//   accountTypes: '', // 户口类别
//   accountLocation: '', // 户口所在地
//   residenceAddress: '', // 户籍地址
//   currentAddress: '', // 现住地址
//   IDCard: '', // 身份证
//   phone: '', // 联系手机
//   weChat: '', // 微信
//   qq: '', // QQ
//   email: '', // 邮箱
//   emergencyName: '', // 应急联系人
//   emergencyPhone: '', // 应急联系方式
//   signingTime: '', // 劳动合同签订时间
//   expirationTime: '', // 劳动合同到期时间
//   benefitsStartTime: '', // 社保福利起缴时间
//   benefitsStopTime: '', // 社保福利停止时间
//   separationTime: '', // 离职时间
// }
const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
    hidden: false,
  },
  {
    prop: '部门',
    label: '部门',
    hidden: true,
  },
  {
    prop: 'employedDate',
    label: '入职时间',
    hidden: false,
  },
  {
    prop: 'employeeStatus',
    label: '员工状态',
    type: 'dict',
    hidden: false,
  },
  {
    prop: 'position',
    label: '岗位',
    hidden: false,
  },
  {
    prop: 'idCard',
    label: '身份证号码',
    hidden: false,
  },
]

const initOrgForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
    organization: '',
    department: '',
    job_category: '',
    job_name: '',
    status: '',
    position: '',
    job_title: '',
    entry_time: '',
  }
}



const inittransferForm = () => {
  return {
    dept: '',
    position: '',
    job: '',
    title: '',
    transferTime: '',
  }
}
const initdepartureForm = () => {
  return {
    title: '',
    departureTime: '',
    reason: '',
  }
}
const initinductionForm = () => {
  return {
    name: '',
    sex: '',
    position: '',
    idCard: '',
    inductionTime: '',
  }
}
const initpositiveForm = () => {
  return {
    name: '张三',
    position: '产品',
    psoitiveTime: '',

  }
}
export { dictsMap, columnsMap, initOrgForm, initSearchForm, inittransferForm, initdepartureForm, initinductionForm, initpositiveForm }