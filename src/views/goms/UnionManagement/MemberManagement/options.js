const initForm = () => {
  return {
    assetOrg: '',
    phone: '',
    realName: '',
    staffNo: '',
    userId: 0,
    role: [],
    roleOrg: [],
  }
}
const toDtoForm = (row) => {
  const newForm = { ...row }
  delete newForm.assetOrg
  return newForm
}

export { initForm, toDtoForm }