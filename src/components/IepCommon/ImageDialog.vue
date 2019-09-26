<template>
  <div class="equity">
    <el-dialog :visible.sync="dialogShow" :before-close="close">
      <img :src="information.annex" :alt="information.name">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'IepImageDialog',
  data () {
    return {
      information: {},
      dialogShow: false,
    }
  },
  methods: {
    close () {
      this.dialogShow = false
    },
  },
}
</script>
<style lang="scss" scoped>
.equity ::v-deep .el-dialog__body {
  padding: 0;
}
.equity ::v-deep .el-dialog__header {
  padding: 0;
  top: 5px;
  right: -30px;
}
img {
  width: 100%;
}
</style>
