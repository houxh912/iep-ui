// org config options
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
    prop: 'politicalStatus',
    label: '政治面貌',
    hidden: true,
  },
  {
    prop: 'maritalStatus',
    label: '婚姻状况',
    hidden: true,
  },
  {
    prop: 'fertilityStatus',
    label: '生育状况',
    hidden: true,
  },
  {
    prop: 'language',
    label: '外语水平',
    hidden: true,
  },
  {
    prop: 'education',
    label: '最高学历',
    hidden: true,
  },
  {
    prop: 'graduatedSchool',
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
  {
    prop: 'accountLocation',
    label: '户口所在地',
    hidden: true,
  },
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
    prop: 'IDCard',
    label: '身份证',
    hidden: false,
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
    prop: 'dept',
    label: '所属部门',
    hidden: true,
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
const initDepartureForm = () => {
  return {
    id: '',
    departureTime: '',
    reason: '',
  }
}
const initInductionForm = () => {
  return {
    id: '',
    status: 2,
    inductionTime: '',
  }
}
const initPositiveForm = () => {
  return {
    id: '',
    positiveTime: '',
  }
}
export { dictsMap, columnsMap, initOrgForm, initSearchForm, inittransferForm, initDepartureForm, initInductionForm, initPositiveForm }