// import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    // 0: '暂无',
    // 1: '正式员工',
    // 2: '试用期员工',
    // 3: '实习期员工',
    // 4: '兼职员工',
    // 5: '其他',
    // 6: '离职员工',
  },
}
const columnsMap = [
  {
    prop: 'time',
    label: '时间',
  },
]
const initSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initSearchForm }