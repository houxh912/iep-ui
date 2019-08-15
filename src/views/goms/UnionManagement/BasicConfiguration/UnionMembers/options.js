const initOrgForm = () => {
  return {
    orgId: null,
  }
}
const initForm = () => {
  return {
    belongUser: '',
    createTime: '',
    id: null,
    moduleIds: [],
    moduleNum: null,
    orgName: '',
  }
}

const columnsMap = [
  {
    prop: 'orgName',
    label: '组织名称',
  },
  {
    prop: 'belongUser',
    label: '所属者',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

export { initOrgForm, columnsMap, initForm }