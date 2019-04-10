
import { postApproval } from '@/api/hrms/wel'
import { formToDto } from './options'
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handleSubmit () {
      postApproval(formToDto(this.form, this.type)).then(() => {
        this.$openPage('/wel/approval/initiate')
      })
    },
  },
}