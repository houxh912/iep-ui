// org config options
const dictsMap = {
  accountStatus: {
    0: '正常',
    1: '冻结',
  },
}

const columnsMap = [
  {
    prop: 'orgName',
    label: '所属组织',
    type: 'detail',
  },
  {
    prop: 'balance',
    label: '可用金额',
  },
  {
    prop: 'bankAmount',
    label: '银行存款',
  },
  {
    prop: 'cash',
    label: '库存现金',
  },
  {
    prop: 'groupAmount',
    label: '集团往来',
  },
  {
    prop: 'orgAmount',
    label: '组织拆借',
  },
  {
    prop: 'accountStatus',
    label: '账户状态',
    type: 'dict',
  },
]

const initSearchForm = () => {
  return {
    orgName: '',
    accountStatus: '',
  }
}

export { dictsMap, columnsMap, initSearchForm }
