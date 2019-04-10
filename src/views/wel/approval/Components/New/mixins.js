
import { postApproval } from '@/api/hrms/wel'
import { formToDto } from './options'
export default {
  props: {
    type: {
      type: String,
    },
  },
  data () {
    return {
      rules: {
        reason: [
          { required: true, message: '请输入原因', trigger: 'change' },
        ],
        approver: [
          { required: true, message: '请选择审批人', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          postApproval(formToDto(this.form, this.type)).then(() => {
            this.$openPage('/wel/approval/initiate')
          })
        }
      })
    },
  },
}