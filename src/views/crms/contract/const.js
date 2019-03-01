export const dictsMap = {
  type: {
    1: '外包',
  },
}

export const initFormData = () => {
  return {
    name: '',
  }
}

export const rules = {}

export const allTableOption = [
  { label: '合同名称', prop: 'name' },
  { label: '业务类型', prop: 'type' },
  { label: '合同金额', prop: 'money' },
  { label: '合同状态', prop: 'state' },
  { label: '回款率', prop: 'odds' },
]
