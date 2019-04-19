
import { mapGetters } from 'vuex'
import { postApproval, putApproval } from '@/api/hrms/wel'
import { formToDto, initForm, formToVo, selfToVo } from './options'
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
      fnSelf: getEmployeeProfileSelf,
      selfToVo,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    id () {
      return +this.$route.params.id
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
        this.loadSelf()
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
    // 处理时间段
    dealTime (val1, val2) {
      var str1 = val1.replace(/-/g, '/')
      var time1 = Date.parse(new Date(str1))
      var str2 = val2.replace(/-/g, '/')
      var time2 = Date.parse(new Date(str2))
      var duration = Math.floor((time2 - time1) / 60000)
      var hours = Math.floor(duration / 60)
      var minutes = duration - hours * 60
      if (time2 < time1) {
        this.$message.error('开始时间不能大于结束时间！！！')
        return
      }
      this.form.duration = hours + '小时' + minutes + '分钟'
    },
    startChange (val) {
      this.startTime = val
      this.dealTime(val, this.endTime)
    },
    endChange (val) {
      this.endTime = val
      this.dealTime(this.startTime, val)
    },
  },
}