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
      /**
       * 创建组织 1 完善组织 2 成员 3 权限 4 部门 5
       * 创建组织 0 完善组织 1 成员 2 权限 3 部门 4
       * id 从 0 开始
       */
      const { data } = await getOrgGuideStep(this.id + 1)
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
