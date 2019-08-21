const dictsMap = {
  status: {
    0: '待审核',
    1: '正常',
  },
}

const columnsMap = [
  {
    prop: 'title',
    label: '标题',
    width: 400,
  },
  {
    prop: 'creatorName',
    label: '发布人',
  },
  {
    prop: 'happenTime',
    label: '事件时间',
    type: 'date',
    formatString: 'YYYY-MM-DD',
  },
  {
    prop: 'createTime',
    label: '发布时间',
    type: 'date',
    formatString: 'YYYY-MM-DD',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]

const initForm = () => {
  return {
    id: '',
    title: '',
    creatorName: '',
    happenTime: '',
    status: '',
    content: '',
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  delete newForm.creatorName
  return newForm
}


export { dictsMap, columnsMap, initForm, toDtoForm }
