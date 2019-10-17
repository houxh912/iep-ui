const dictsMap = {
  status: {
    0: '禁用',
    1: '启用',
  },
  sex: {
    0: '男',
    1: '女',
  },
}

const initForm = () => {
  return {
    name: '',//姓名
    id: '',//身份证号
    head: '',//头像
    sex: '',//性别
    time: '',//出生年月：
    nationality: '',//民族
    political: '',//政治面貌
    marital: '',//婚姻状况
    fertility: '',//生育状况
    account: '',//户口类别
    residenceCities: '',//户籍地址
    residenceAddress: '',
    homeCities: '',//家庭地址
    homeAddress: '',
    education: '',//最高学历
    school: '',//毕业学校
    qq: '',
    major: '',
    tel: '',//联系电话
    eduTime: '',//毕业时间
    wx: '',//微信
    email: '',//邮箱
    external: '',//外部头衔
    organization: '',//任职机构
    job: '',
    describe: '',//机构简介
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
  },
  {
    prop: 'tel',
    label: '联系电话',
  },
  {
    prop: 'industry',
    label: '职称/职务',
  },
  {
    prop: 'province',
    label: '所属省',
  },
  {
    prop: 'status',
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
    tel: '',
    school: '',
    status: '',
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