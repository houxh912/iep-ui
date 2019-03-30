
import { postApproval } from '@/api/wel/administrative_approval'
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handleSubmit () {
      postApproval({ ...this.form, type: this.type }).then(() => {
        this.$router.push({
          path: this.$route.query.redirect,
        })
      })
    },
  },
}