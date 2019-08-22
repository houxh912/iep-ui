export const rules = {
  imageUrl: [
    { required: true, message: '请选择图片', trigger: 'blur' },
  ],
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  publishTime: [
    { required: true, message: '请输入日期', trigger: 'blur' },
  ],
  synopsis: [
    { required: true, message: '请输入说明', trigger: 'blur' },
  ],
}

export const initForm = () => {
  return {
    imageUrl: '',
    title: '',
    publishTime: '',
    synopsis: '',
    orgId: 0,
  }
}
