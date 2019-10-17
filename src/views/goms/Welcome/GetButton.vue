<template>
  <iep-button class="money" type="primary" @click="handleGet(1)" :loading="loading" round>立即领取</iep-button>
</template>
<script>
import { getOrgGuideStep } from '@/api/admin/guide'
export default {
  props: ['rules', 'id'],
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    async handleGet () {
      this.loading = true
      const { data } = await getOrgGuideStep(this.id)
      this.loading = false
      if (data.data) {
        this.$message.success(`领取成功，+ ${this.rules[this.id]}贝`)
        this.$emit('load-page')
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
