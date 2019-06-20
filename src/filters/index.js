import moment from 'moment'

export function parseDate (date, formatString) {
  if(moment(date).isValid()) {
    return moment(date).format(formatString)
  } else {
    return '暂无'
  }
}

export function parseToTimeSeconds (time) {
  return parseDate(time, 'YYYY-MM-DD HH:mm:ss')
}
export function parseToTimeMinutes (time) {
  return parseDate(time, 'YYYY-MM-DD HH:mm')
}
export function parseToDay (time) {
  return parseDate(time, 'YYYY-MM-DD')
}
export function parseToMonth (time) {
  return parseDate(time, 'YYYY-MM')
}
export function parseToYear (time) {
  return parseDate(time, 'YYYY')
}
export function parseToMonthDay (time) {
  return parseDate(time, 'MM-DD')
}

export function formatTime (time) {
  return moment(time).fromNow()
}

export function parseToMoney (money) {
  return new Intl.NumberFormat().format(money)
}