
import { postApproval } from '@/api/wel/administrative_approval'
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
        this.$router.push({
          path: this.$route.query.redirect,
        })
      })
    },
  },
}