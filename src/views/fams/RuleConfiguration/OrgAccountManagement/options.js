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
    width: '200',
    type: 'detail',
  },
  {
    prop: 'balance',
    label: '国脉贝',
  },
  {
    prop: 'frozenAmount',
    label: '冻结金额',
  },
  {
    prop: 'availableAmount',
    label: '发票可用额度',
    width: '120',
  },
  {
    prop: 'investmentAmount',
    label: '投资',
  },
  {
    prop: 'accountStatus',
    label: '状态',
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