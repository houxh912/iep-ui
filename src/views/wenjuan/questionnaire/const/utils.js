//获取题目的关联指标ids
export function getIndexIds (arr) {
  let ids = []
  for(let item of arr){
    if(item.evaluateId){
      ids.push(item.evaluateId)
    }
  }
  return ids
}

//从当前数组去掉某一个值
export function deleteIndex (index,arr){
  let resArr = [...arr]
  for(let i= 0;i<arr.length;i++){
    if(arr[i] == index){
      resArr.splice(i,1)
    }
  }
  return resArr
}
