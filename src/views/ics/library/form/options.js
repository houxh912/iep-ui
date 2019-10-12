export const dictsMap = {
  type: {
    '1': '类型1',
    '2': '类型2',
  },
  isYes: [
    { value: 0, lable: '否' },
    { value: 1, label: '是' },
  ],
  isOpen: [
    { value: 0, lable: '开放' },
    { value: 1, label: '关闭' },
  ],
  secrecyLevel: [
    { value: 0, lable: '不保密' },
    { value: 1, label: '保密' },
  ],
}

export const initFormData = () => {
  return {
    uploader: '',
    id: '',
    content: '',
  }
}

var tagKeyWords = (rule, value, callback) => {
  if (value.length < 3) {
    callback(new Error())
  } else {
    callback()
  }
}

export const rules = {
  materialName: [
    { required: true, message: '请输入材料名称', trigger: 'blur' },
  ],
  tagKeyWords: [
    { required: true, message: '请输入至少3个标签', trigger: 'change' },
    { validator: tagKeyWords, message: '请输入至少3个标签', trigger: 'change' },
  ],
}
