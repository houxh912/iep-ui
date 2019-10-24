export const initFormData = () => {
  return {
    tagId: '',
    description: '',
  }
}

export const rules = {
  tagId: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入标签介绍', trigger: 'blur' },
  ],
}
