
// 根据传入的时间，返回YYYY-MM-DD
export function formatYear (mill){
  var y = new Date(mill)
  let raws = [
      y.getFullYear(),
      formatDig(y.getMonth() + 1),
      formatDig(y.getDate()),
      // y.getDay() || 7,
  ]
  let format = ['-','-','-']
  return String.raw({raw:raws}, ...format)
}


// 月份日期前一位补0
export function formatDig (num) {
  return num>9?''+num:'0'+num
}
