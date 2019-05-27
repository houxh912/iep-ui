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
      description: '操作完成',
    }
  },
  computed: {
    title () {
      const titleMap = {
        2: '提交成功',
        3: '发放失败',
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
