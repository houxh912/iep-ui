export const getLocation = () => {
  var arr = document.domain.split('.')
  if (arr.length === 2) {
    return document.domain
  }
  if (arr.length > 2 && arr[0] !== 'www') {
    return arr.slice(1).join('.')
  }
  return arr.slice(1).join('.')
}