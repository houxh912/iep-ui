const dictsMap = {
  isForbidden: {
    0: '禁用',
    1: '启用',
  },
  claimStatus: {
    0: '未认证',
    1: '认证',
  },
  type: {
    1: '政府',
    2: '园区',
    3: '协会',
    4: '企业',
    5: '学术机构',
    6: '培训机构',
    7: '会议场所',
    8: '非政府组织',
    9: '媒体',
    10: '其它',
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
    prop: 'province',
    label: '所属省',
  },
  {
    prop: 'isForbidden',
    label: '状态',
    type: 'dict',
  },
]
const columnsPendingMap = [
  {
    prop: 'province',
    label: '所属省',
  },
]
const initSearchForm = () => {
  return {
    type: '',
    province: '',
    line: '',
    claimStatus: '',
    isForbidden: '',
    applyUserId: '',
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