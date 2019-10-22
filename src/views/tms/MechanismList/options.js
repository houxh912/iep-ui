const dictsMap = {
  isForbidden: {
    0: '禁用',
    1: '启用',
  },
  claimStatus: {
    0: '未认领',
    1: '认领',
  },
}

const initForm = () => {
  return {
    address: '',
    applyTime: '',
    applyUserId: 0,
    city: '',
    claimStatus: '',
    createTime: '',
    creditCode: '',
    delFlag: '',
    email: '',
    establishedTime: '',
    fax: '',
    firstSpell: '',
    introduction: '',
    isForbidden: '',
    level: '',
    licence: '',
    line: 0,
    link: '',
    logo: '',
    orgAbrName: '',
    orgId: 0,
    orgName: '',
    orgUrl: '',
    phone: '',
    province: '',
    type: '',
    updateTime: '',

  }
}
const columnsMap = [
  {
    prop: 'type',
    label: '机构分类',
  },
  {
    prop: 'province',
    label: '所属省',
  },
  {
    prop: 'line',
    label: '行业',
  },
  {
    prop: 'isForbidden',
    label: '状态',
    type: 'dict',
  },
]
const columnsPendingMap = [
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
    line: '',
    claimStatus: '',
    isForbidden: '',
  }
}

const rules = {
  orgName: [{
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