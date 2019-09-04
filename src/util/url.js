export const getLocation = () => {
  if (isUrl(document.domain)) {
    const hostArr = location.host.split('.')
    return hostArr.length === 2 ? hostArr.join('.') : hostArr.slice(1).join('.')
  }
  return document.domain
}

function isUrl (url) {
  return /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/.test(url)
}