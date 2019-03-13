const columnsMap = [
  {
    prop: 'name',
    label: '岗位名称',
  },
  {
    prop: 'typeName',
    label: '岗位分类',
  },
  {
    prop: 'count',
    label: '在职人数',
  },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    typeName: '',
    typeId: null,
    count: '',
    duties: '',
    claim: '',
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

export { columnsMap, initForm, initSearchForm }
