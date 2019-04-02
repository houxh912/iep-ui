const columnsMap = [
  { label: '方案名称', prop: 'programName' },
  // { label: '附件', prop: 'downLoadUrl' },
]
const initForm = () => {
  return {
    clientId: '',
    programName: '',
    attachs: [],
  }
}
export { columnsMap, initForm }
