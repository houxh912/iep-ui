import { getDic } from '@/wenjuan/util/dic'
export function getDicValue (value,dic) {
  let dicArr = getDic(dic)
  for(let item of dicArr){
    if(item.value == value){
      return item.label
    }
  }
}