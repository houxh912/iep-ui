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
    label: '组织名称',
    type: 'detail',
  },
  {
    prop: 'orgType',
    label: '组织类别',
    type: 'dictGroup',
    dictName: 'GOMS_ORG_TYPE',
  },
  {
    prop: 'intro',
    label: '组织描述',
    type: 'detail',
  },
  {
    prop: 'isOpen',
    label: '允许加入',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    minWidth: 120,
  },
  {
    prop: 'creator',
    label: '创建人',
    width: 80,
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    orgId: '',
    logo: '',
    name: '',
    orgType: '',
    isOpen: 0,
    orgSort: 0,
    abrName: '',
    moduleIds: [],
    establishTime: '',
    creatorName: '',
    contactMethod: '',
    intro: '',
    structure: '',
    coreAdvantage: '',
  }
}

const initOrgSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initForm, initOrgSearchForm }