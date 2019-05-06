function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return `${time} 多${label}`
}

function parseDate (date) {
  return new Date(date)
}

/**
 * 日期格式化
 */
export function dateFormat (date) {
  const newDate = parseDate(date)
  let format = 'yyyy-MM-dd hh:mm:ss'
  if (date != 'Invalid Date') {
    var o = {
      'M+': newDate.getMonth() + 1, // month
      'd+': newDate.getDate(), // day
      'h+': newDate.getHours(), // hour
      'm+': newDate.getMinutes(), // minute
      's+': newDate.getSeconds(), // second
      'q+': Math.floor((newDate.getMonth() + 3) / 3), // quarter
      S: newDate.getMilliseconds(), // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (newDate.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  }
  return ''
}

export function timeAgo (time) {
  const newDate = parseDate(time)
  const between = (Date.now() - Number(newDate)) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), '分钟前')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时前')
  } else {
    return pluralize(~~(between / 86400), '天前')
  }
}
export function parseTime (time, cFormat) {
  if (!time) {
    return '暂无'
  }
  let newDate = parseDate(time)
  if (arguments.length === 0) {
    return null
  }

  if ((newDate + '').length === 10) {
    newDate = +newDate * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof newDate === 'object') {
    date = newDate
  } else {
    date = new Date(parseInt(newDate))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a')
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  let newDate = parseDate(time)
  newDate = +newDate * 1000
  const now = Date.now() * 1000
  const diff = (now - newDate) / 1000 / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 16) {
    return Math.ceil(diff / 3600 / 24) + '天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return parseTime(time)
  }
}

/* 数字 格式化 */
export function nFormatter (num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
