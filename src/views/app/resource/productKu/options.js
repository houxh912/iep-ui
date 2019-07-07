// org config options
//import { mergeByFirst } from '@/util/util'
const dictsMap = {
    dsType: {
      0: '全部',
      1: '自定义',
      2: '本级及子级',
      3: '本级',
    },
  }
  
  const columnsMap = [
    {
      prop: 'modelName',
      label: '模块名称',
    },
    {
      prop: 'guidancePrice',
      label: '指导价格',
    },
    {
      prop: 'favorablePrice',
      label: '优惠价格',
    },
  ]
  const initSearchForm = () => {
    return {
      productName:'',
      productDes:'',
    }
  }
  const initForm = () => {
    return {
    }
  }
  
  export { dictsMap, columnsMap, initForm, initSearchForm }