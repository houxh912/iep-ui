<template>
  <div></div>
</template>
<script>
import { bindAccount } from '@/api/admin/sys-social-details'
export default {
  data () {
    return {
      state: this.$route.query.state,
      code: this.$route.query.code,
    }
  },
  created () {
    if (this.$route.query.type === 'bind') {
      this.bindAccount()
    } else {
      this.loginAccount()
    }
  },
  methods: {
    async loginAccount () {
      window.close()
      window.opener.location.href = `${window.location.origin}/login${window.location.search}`
    },
    async bindAccount () {
      const { data } = await bindAccount({
        state: this.state,
        code: this.code,
      })
      if (data.data) {
        this.$message.success('绑定成功')
      } else {
        this.$message(data.msg)
      }
      this.$openPage(this.$route.query.redirect)
    },
  },
}
</script>
