const dictsMap = {
  lockFlag: {
    0: '启用',
    1: '禁用',
  },
  sex: {
    0: '男',
    1: '女',
  },
}

const initForm = () => {
  return {
    name: '',//姓名
    idCard: '',//身份证号
    image: '',//头像
    sex: '',//性别
    birthDate: '',//出生年月：
    nation: '',//民族
    politicsStatus: '',//政治面貌.
    marriageStatus: '',//婚姻状况.
    birthStatus: '',//生育状况.
    residentType: '',//户口类别.
    birthplaceProvince: '',//户籍所在省
    birthplaceCity: '',//户籍所在市
    residenceCities: '',//户籍地址
    residenceAddress: '',
    province: '',//家庭所在省
    city: '',//家庭所在市
    currentCities: '',//家庭地址
    currentAddress: '',
    education: '',//最高学历
    university: '',//毕业学校
    qq: '',
    major: '',
    phone: '',//联系电话
    graduateTime: '',//毕业时间
    wechat: '',//微信
    email: '',//邮箱
    socialRela: '',//外部头衔
    agency: '',//任职机构
    job: '',
    introduction: '',//机构简介
  }
}
const columnsMap = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
    type: 'dict',
  },
  {
    prop: 'phone',
    label: '联系电话',
  },
  {
    prop: 'job',
    label: '职称/职务',
  },
  {
    prop: 'province',
    label: '所属省',
  },
  {
    prop: 'lockFlag',
    label: '状态',
    type: 'dict',
  },
]
const columnsPendingMap = [
  {
    prop: 'name',
    label: '机构名称',
  },
  {
    prop: 'type',
    label: '机构分类',
  },
  {
    prop: 'province',
    label: '所属省',
  },
  {
    prop: 'industry',
    label: '行业',
  },
  {
    prop: 'time',
    label: '申请时间',
  },
  {
    prop: 'obj',
    label: '申请对象',
  },
]
const initSearchForm = () => {
  return {
    sex: '',
    province: '',
    phone: '',
    university: '',
    lockFlag: '',
  }
}

const rules = {
  name: [{
    required: true,
    message: '请输入机构名称',
    trigger: 'blur',
  }],
  type: [{
    required: true,
    message: '请输入机构分类',
    trigger: 'blur',
  }],
}


export { dictsMap, columnsPendingMap, columnsMap, initForm, initSearchForm, rules }