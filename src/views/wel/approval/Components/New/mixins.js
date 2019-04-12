
import { postApproval } from '@/api/hrms/wel'
import { formToDto, initForm, formToVo } from './options'
import { getEmployeeProfileSelf } from '@/api/hrms/employee_profile'
import { getAdministrativeApprovalById } from '@/api/hrms/administrative_approval'
export default {
  props: {
    type: {
      type: String,
      default: '1',
    },
  },
  data () {
    return {
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
  computed: {
    id () {
      return this.$route.query.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        getAdministrativeApprovalById(this.id).then(({ data }) => {
          this.form = formToVo(data.data)
        })
      } else {
        getEmployeeProfileSelf().then(({ data }) => {
          this.form = formToVo(data.data)
        })
      }
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