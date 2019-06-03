import { parseToMoney } from '@/filters/'
const getSummaries = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = parseToMoney(sums[index])
    } else {
      sums[index] = ''
    }
  })
  return sums
}
const getSummariesInBudget = (budgetTable) => {
  return function (param) {
    const { columns } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '总计'
        return
      }
      const realIndex = Math.ceil(index / 2)
      const data = budgetTable[realIndex - 1].relation
      const values = data.map(item => Number(item[column.property]))
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        sums[index] = parseToMoney(sums[index])
      } else {
        sums[index] = 'N/A'
      }
    })
    return sums
  }
}
export { getSummaries, getSummariesInBudget }