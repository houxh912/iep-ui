
import { postApproval } from '@/api/hrms/wel'
import { formToDto, initForm, formToVo } from './options'
export default {
  props: {
    fn: {
      type: Function,
      required: true,
    },
    type: {
      type: String,
    },
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      form: initForm(),
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
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.fn().then(({ data }) => {
        this.form = formToVo(data.data)
      })
    },
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