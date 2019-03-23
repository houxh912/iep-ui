// 根据距离当前日的天数获取年月日
export function getDays (day) {
  let today = new Date()
  let targetday_milliseconds=today.getTime() + 1000*60*60*24*day
  today.setTime(targetday_milliseconds) //注意，这行是关键代码
  let tYear = today.getFullYear()
  let tMonth = today.getMonth()
  let tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return {
    year: tYear,
    month: tMonth,
    day: tDate,
    tMonth: today.getMonth(),
    tDay: today.getDate(),
  }
}

// 获取今天的时间 YYYY-MM-DD HH:MM:SS
export function getDate (day) {
  let myDate = new Date()
  let obj =  getDays(day)
  return obj.year + '-' + obj.month + '-' + obj.day + ' ' + myDate.getHours() + '-' + myDate.getMinutes() + '-' + myDate.getSeconds()
}

// 根据参数获取时间 YYYY-MM-DD HH:MM:SS
export function getDateStr (day) {
  let myDate = new Date(day)
  return myDate.getFullYear() + '-' + formatDig(myDate.getMonth() + 1) + '-' + formatDig(myDate.getDate()) + ' ' + formatDig(myDate.getHours()) + ':' + formatDig(myDate.getMinutes()) + ':' + formatDig(myDate.getSeconds())
}

function doHandleMonth (month){
  let m = month
  if(month.toString().length == 1){
    m = '0' + month
  }
  return m
}

// 今天是第几周（从第一天开始算，加上去年的最后一周）
export function getWeekOfYear (year, month, day) {
  let today = ''
  if (year) {
    today = new Date(year, month, day)
  } else {
    today = new Date()
  }
  let firstDay = new Date(today.getFullYear(), 0, 1)
  let dayOfWeek = firstDay.getDay()
  let spendDay = 1
  if (dayOfWeek != 0) {
    spendDay = 7 - dayOfWeek + 1
  }
  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
  let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
  let result = Math.ceil(d / 7)
  return result
};

// 获取月份
function getMonth (month) {
  var y = new Date(month)
  return y.getMonth()
}

// 月份日期前一位补0
export function formatDig (num) {
  return num>9?''+num:'0'+num
}

// 根据传入的时间，返回 MM-DD
function formatDate (mill){
  var y = new Date(mill)
  let raws = [
      // y.getFullYear(),
      formatDig(y.getMonth() + 1),
      formatDig(y.getDate()),
      // y.getDay() || 7,
  ]
  let format = ['-','-']
  return String.raw({raw:raws}, ...format)
}

// 数字转中文
export function toChinesNum (num ){
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = (temp) => {
  let strArr = temp.toString().split('').reverse()
  let newNum = ''
  for (var i = 0; i < strArr.length; i++) {
    newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
  }
   return newNum
 }
 let overWan = Math.floor(num / 10000)
 let noWan = num % 10000
 if (noWan.toString().length < 4) noWan = '0' + noWan
 return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

// 获取全年的周数
export function createWeeks (year){
  let arr = [{ year: `${year}` }]
  let index = 1
  const ONE_DAY = 24 * 3600 * 1000
  // 首先计算第一个礼拜一的日期，从这一天开始计算星期
  var da = new Date(year, 0, 1)
  var n = 7 - (da.getDay() + 6) % 7
  let start = new Date(year, 0, 1+n),
      end = new Date(year, 11, 31)
  let firstDay = start.getDay() || 7,
      lastDay = end.getDay() || 7
  let startTime=+start,
      endTime = startTime + (7 - firstDay) * ONE_DAY,
      _endTime = end - (7 - lastDay) * ONE_DAY
  let mIndex = 0
  let obj = {
    index: index,
    month: getMonth(startTime),
    startTime: formatDate(startTime),
    endTime: formatDate(endTime),
    title: '第'+toChinesNum(index)+'周',
    timeStamp: +startTime,
  }
  let mObj = {
    date: '1月',
    time: `${year}-${formatDig(mIndex+1)}`,
    timeStamp: (+new Date(year, mIndex, 1)),
    children: [],
  }
  mObj.children.push(obj)
  index++
  startTime = endTime + ONE_DAY
  endTime = endTime + 7 * ONE_DAY
  while (endTime < _endTime) {
    obj = {
      index: index,
      month: getMonth(startTime),
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
      title: '第'+toChinesNum(index)+'周',
      timeStamp: +startTime,
    }
    // 若月份变大，首先将原有的月份对象放入数组中，再重新生成新月份
    if (mIndex < obj.month) {
      arr.push(mObj)
      ++mIndex
      mObj = {
        date: `${mIndex+1}月`,
        time: `${year}-${formatDig(mIndex+1)}`,
        timeStamp: (+new Date(year, mIndex, 1)),
        children: [],
      }
    }
    mObj.children.push(obj)
    index++
    startTime = endTime + ONE_DAY
    endTime = endTime + 7 * ONE_DAY
  }
  // 最后一个月，需要计算最后一天是哪一天，进行补全
  let lastN = 6 - (da.getDay() + 6) % 7
  if (lastN > 0) {
    // 若为0，则不需要补全，不为0年份加一，月份为0
    end = new Date(year+1, 0, lastN)
  }
  mObj.children.push({
    index: index,
    month: getMonth(startTime),
    startTime: formatDate(startTime),
    endTime: formatDate(+end),
    title: '第'+toChinesNum(index)+'周',
    timeStamp: +startTime,
  })
  arr.push(mObj)
  index++
  return arr
}

// 根据传入的时间，获取到这个星期的起始时间和结束时间 MM-DD
export function getWeekStartAndEnd (day) {
  let date = new Date(day)
  let today = date.getDay()
  let firstDay = +new Date(+date - (today-1)*24*3600*1000)
  let lastDay = firstDay + 6*24*3600*1000
  return {
    startTime: formatDate(firstDay),
    endTime: formatDate(lastDay),
  }
}