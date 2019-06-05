import moment from 'moment'

function parseDate (date) {
  return new Date(date)
}
export function parseToTimeSeconds (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('YYYY-MM-DD HH:mm:ss')
}
export function parseToTimeMinutes (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('YYYY-MM-DD HH:mm')
}
export function parseToDay (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('YYYY-MM-DD')

}
export function parseToMonth (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('YYYY-MM')
}

export function parseToYear (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('YYYY')
}
export function parseToMonthDay (time) {
  let newDate = parseDate(time)
  return moment(newDate).format('MM-DD')
}

export function formatTime (time) {
  let newDate = parseDate(time)
  return moment(newDate).fromNow()
}

export function parseDateYMD (time) {
  return moment(time).format('YYYY-MM-DD')
}

export function parseToMoney (money) {
  return new Intl.NumberFormat().format(money)
}