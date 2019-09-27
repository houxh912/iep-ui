import { parseToMoney } from '@/filters/'
const getSummary2 = (param) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = ''
      return
    }
    if (index === 1) {
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
    } else {
      sums[index] = 'N/A'
    }
  })
  return sums
}
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
const getLastSummaries = (param) => {
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
      if (index === 5) {
        sums[index] = values[values.length - 1]
      } else if (index === 6) {
        sums[index] = ''
      } else {
        sums[index] = parseToMoney(sums[index])
      }
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
const getSummariesUnionBudget = (budgetTable) => {
  return function (param) {
    const { columns } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '总计'
        return
      }
      console.log(budgetTable)
      // const data = budgetTable[index - 1].orgRelation
      // const values = data.map(item => {
      //   return Number(item[column.property])
      // })
      // console.log(values)
      // if (!values.every(value => isNaN(value))) {
      //   sums[index] = values.reduce((prev, curr) => {
      //     const value = Number(curr)
      //     if (!isNaN(value)) {
      //       return prev + curr
      //     } else {
      //       return prev
      //     }
      //   }, 0)
      //   sums[index] = parseToMoney(sums[index])
      // } else {
      //   sums[index] = 'N/A'
      // }
    })
    return sums
  }
}
export { getSummaries, getLastSummaries, getSummariesInBudget, getSummariesUnionBudget, getSummary2 }
