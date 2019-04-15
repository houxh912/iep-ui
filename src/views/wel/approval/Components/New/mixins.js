
import { mapGetters } from 'vuex'
import { postApproval, putApproval } from '@/api/hrms/wel'
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
    ...mapGetters([
      'userInfo',
    ]),
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
      const submitFunction = this.id ? putApproval : postApproval
      this.$refs['form'].validate((valid) => {
        if (valid) {
          submitFunction(formToDto(this.form, this.type, this.userInfo.userId)).then(() => {
            this.$openPage('/wel/approval/initiate')
          })
        }
      })
    },
  },
}