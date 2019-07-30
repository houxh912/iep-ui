const columnsMap = [
  {
    prop: 'code',
    label: '编码',
  },
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'system',
    label: '所属系统',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initMemberForm = () => {
  return {
    code: '',
    id: '',
    name: '',
    system: '',
  }
}

const _initRow = (id) => {
  return {
    dictId: id,
    parentId: null,
    id: null,
    sort: 1,
    label: '',
    value: '',
  }
}

const initSearchForm = () => {
  return {
    code: '',
    name: '',
    system: '',
  }
}

export { columnsMap, initMemberForm, _initRow, initSearchForm }