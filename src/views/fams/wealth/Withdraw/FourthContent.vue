<template>
  <div>
    <iep-result type="success" :description="description" :title="title">
      <template slot="action">
        <a-button type="primary" @click="handleBack">返回列表</a-button>
      </template>
    </iep-result>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data () {
    return {
      description: '核准通过，等待财务发放。',
    }
  },
  computed: {
    title () {
      const titleMap = {
        1: '待发放',
      }
      return titleMap[this.data.status]
    },
  },
  methods: {
    handleBack () {
      this.$emit('on-data')
    },
  },
}
</script>
