const dictsMap = {
  status: {
    0: '禁用',
    1: '启用',
  },
}

const initForm = () => {
  return {
    name: '',//机构名称
    abbreviation: '',//机构简称
    creditCode: '',//社会信用代码
    license: '',//营业执照
    LOGO: '',//LOGO
    time: '',//成立时间
    tagKeyWords: [],//标签
    type: '',//机构分类
    state: '',//机构层级
    industry: [],//行业
    website: '',//机构官网
    contacts: '',//联系人
    tel: '',//联系电话
    fax: '',//传真
    email: '',//邮箱
    adress: '',//机构住址
    describe: '',//机构简介
  }
}
const columnsMap = [
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
    type: '',
    province: '',
    industry: '',
    authStatus: '',
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