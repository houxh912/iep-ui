// org config options
//import { mergeByFirst } from '@/util/util'
const columnsMap = [
  {
    prop: 'moduleName',
    label: '模块名称',
  },
  {
    prop: 'guidePrice',
    label: '指导价格',
  },
  {
    prop: 'preferentialPrice',
    label: '优惠价格',
  },
]
const initSearchForm = () => {
  return {
    customName: '',
    synopsis: '',
  }
}
const rules = {
  customName: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
}
const initForm = () => {
  return {
  }
}

export { columnsMap, initForm, initSearchForm, rules }