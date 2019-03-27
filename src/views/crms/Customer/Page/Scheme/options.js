const columnsMap = [
  { label: '方案名称', prop: 'programName' },
  // { label: '附件', prop: 'downLoadUrl' },
]
const initForm = () => {
  return {}
}
const initSchemeForm = () => {
  return {
    programName: '',
    downLoadUrl: '',
    clientId: '',
    atchUpload: '',
  }
}
export { columnsMap, initForm, initSchemeForm }
