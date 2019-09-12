export const initFormData = () => {
  return {
    tagId: '',
    description: '',
  }
}

export const rules = {
  tagId: [
    { required: true, message: '请输入文件标题', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请选择文件类别', trigger: 'blur' },
  ],
}
