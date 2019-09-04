export const getLocation = () => {
  if (isUrl(document.domain)) {
    var arr = document.domain.split('.')
    if (arr.length === 2) {
      return document.domain
    }
    if (arr.length > 2 && arr[0] !== 'www') {
      return arr.slice(1).join('.')
    }
    return arr.slice(1).join('.')
  }
  return document.domain
}

function isUrl (url) {
  return /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/.test(url)
}