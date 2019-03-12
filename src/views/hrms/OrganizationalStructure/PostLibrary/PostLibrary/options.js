const columnsMap = [
  {
    prop: 'name',
    label: '岗位名称',
  },
  {
    prop: 'type',
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
    type: '',
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
