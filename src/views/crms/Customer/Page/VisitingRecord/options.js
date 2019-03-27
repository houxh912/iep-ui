const columnsMap = [
  { label: '主题', prop: 'theme' },
  { label: '拜访时间', prop: 'visitTime' },
  { label: '拜访记录', prop: 'contactRecord' },
]
const initForm = () => {
  return {
    theme: '',
    visitTime: '',
    contactRecord: '',
  }
}
export { columnsMap, initForm }
