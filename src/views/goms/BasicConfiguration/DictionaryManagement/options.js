
const columnsMap = [
  {
    prop: 'id',
    label: '序号',
    width: '55',
  },
  {
    prop: 'code',
    label: '字典编码',
  },
  {
    prop: 'name',
    label: '字典名称',
  },
  {
    prop: 'system',
    label: '所属系统',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
  },
]

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

const initMemberForm = () => {
  return {
    code: '',
    createTime: '',
    id: '',
    name: '',
    system: '',
    updateTime: '',
  }
}

const initSearchForm = () =>  {
  return {
    code: '',
    name: '',
    system: '',
  }
}


export { columnsMap, initMemberForm, _initRow, initSearchForm }