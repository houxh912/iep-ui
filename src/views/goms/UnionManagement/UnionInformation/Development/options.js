const dictsMap = {
  status: {
    0: '待审核',
    1: '正常',
  },
  node: {
    0: '栏目一',
    1: '栏目二',
    2: '栏目三',
  },
}

const columnsMap = [
  {
    prop: 'title',
    label: '标题',
    width: 400,
  },
  {
    prop: 'node',
    label: '栏目',
    type: 'dict',
  },
  {
    prop: 'creatorName',
    label: '发布人',
  },
  {
    prop: 'happenTime',
    label: '发布时间',
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
    node: '',
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
