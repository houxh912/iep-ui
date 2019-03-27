const columnsMap = [
  { label: '业务类型', prop: 'type', width: '150px' },
  { label: '合同金额', prop: 'money', width: '150px' },
  { label: '合同状态', prop: 'status', width: '150px' },
  { label: '回款率', prop: 'efficiency', width: '150px' },
]
const initForm = () => {
  return {
    name: '',
  }
}
export { columnsMap, initForm }
