const columnsMap = [
  { label: '方案名称', prop: 'schemeName' },
  { label: '附件', prop: 'downLoadUrl' },
]
const initForm = () => {
  return {
    schemeName: '',
    downLoadUrl: '',
  }
}
export { columnsMap, initForm }
