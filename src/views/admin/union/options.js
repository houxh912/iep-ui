// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: 'name',
    label: '联盟名称',
    width: '200px',
  },
  {
    prop: 'intro',
    label: '联盟描述',
    type: 'detail',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
    width: '80px',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'date',
    formatString: 'YYYY-MM-DD',
    width: '140px',
  },
]

const initForm = () => {
  return {
    abrName: '',
    contactMethod: '',
    coreAdvantage: '',
    createTime: '',
    establishTime: '',
    intro: '',
    logo: '',
    modules: [],
    name: '',
    orgId: 0,
    orgName: '',
    status: 0,
    structure: '',
    unionCulture: '',
    unionId: 1,
    updateTime: '',
    userId: 1,
  }
}

const checkboxInit = (row) => {
  if (row.status === 0)
    return 0 //不可勾选
  else
    return 1 //可勾选
}


export { dictsMap, columnsMap, checkboxInit, initForm }