const initForm = (username = null) => {
  return {
    username,
    password: '',
    newPassword1: '',
    newPassword2: '',
  }
}

export { initForm }