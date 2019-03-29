const columnsMap = [
  { label: '方案名称', prop: 'programName' },
  // { label: '附件', prop: 'downLoadUrl' },
]
const initForm = () => {
  return {
    id: '',
    programName: '',
    fileList: [],
    url: '',
  }
}
export { columnsMap, initForm }
