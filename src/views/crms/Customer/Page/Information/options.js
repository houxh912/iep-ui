const columnsMap = [
  { label: '方案名称', prop: 'programName' },
  { label: '附件', prop: 'downLoadUrl' },
]
const initForm = () => {
  return {
    title: '',
    cotext: '',
    createTime: '',
    tags: [],
  }
}
const initConsultaForm = () => {
  return {
    name: '',
  }
}
export { columnsMap, initForm, initConsultaForm }
