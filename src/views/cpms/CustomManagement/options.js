const dictsMap = {
  status: {
    0: '待确认',
    1: '已确认',
    2: '未通过',
  },
}
const columnsMap = [
  {
    prop: 'creatorName',
    label: '提交人',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]
const initForm = () => {
  return {
    appId: '',
    appSecret: '',
    redirectUrl: '',
    remark: '',
    type: '',
  }
}


export { columnsMap, initForm, dictsMap }