const initForm = (IS_ICAN) => {
  return {
    name: '',
    logo: IS_ICAN ? 'http://cloud.govmade.com/upload/iep/20199112/9ebf7e08-7f25-4f50-920d-d7f48ede356c_1.png' : '',
    intro: '',
    orgType: '1',
    isICan: 0,
  }
}

export { initForm }
