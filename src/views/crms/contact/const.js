export const columnsMap = [
  {
    prop: 'intro',
    label: '联系人名称',
  },
  {
    prop: 'isOpen',
    label: '联系人职务',
  },
  {
    prop: 'status',
    label: '对应客户',
  },
]

export const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}