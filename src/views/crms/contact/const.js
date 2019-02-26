// org config options
export const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

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

export const initOrgForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}