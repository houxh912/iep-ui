<template>
  <iep-dialog :dialog-show="dialogShow" title="转发说说" width="50%" @close="resetForm">
    <contentTpl :data="contentData"></contentTpl>
  </iep-dialog>
</template>

<script>
import contentTpl from './content'
export default {
  components: { contentTpl },
  data () {
    return {
      dialogShow: false,
      loadState: false,
      row: {
        images: [],
      },
    }
  },
  methods: {
    open (row) {
      this.dialogShow = true
      this.contentData = row
    },
    resetForm () {
      
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
