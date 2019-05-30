const checkContactUser = (label) => {
  return function (rule, value, callback) {
    if (!value.id) {
      return callback(new Error(`${label}不能为空`))
    }
    callback()
  }
}
export { checkContactUser }