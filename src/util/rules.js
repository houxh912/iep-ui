const checkContactUser = (label) => {
  return function (rule, value, callback) {
    if (!value.id) {
      return callback(new Error(`${label}不能为空`))
    }
    callback()
  }
}
const checkContactUsers = (label) => {
  return function (rule, value, callback) {
    if (!value.length) {
      return callback(new Error(`${label}不能为空`))
    }
    callback()
  }
}
const checkContact = (label) => {
  return function (rule, value, callback) {
    if (!value.orgs.length && !value.unions.length &&!value.users.length) {
      return callback(new Error(`${label}不能为空`))
    }
    callback()
  }
}
export { checkContactUser, checkContactUsers, checkContact }