const dictsMap = {
  status: {
    1: '正常',
    2: '试用',
  },
}

const columnsMap = [
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    description: '',
    menuId: '',
    status: 1,
  }
}

export {
  dictsMap,
  columnsMap,
  initForm,
}
