<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="620px" @close="isClose" center>
    <div class="center-box">
      <el-radio-group v-model="isOpen" class="isOpen">
        <el-radio :label="'3'">对联盟开放</el-radio>
        <el-radio :label="'2'">对组织开放</el-radio>
        <el-radio :label="'0'">生态开放</el-radio>
        <el-radio :label="'1'">关闭</el-radio>
      </el-radio-group>
    </div>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      <iep-button @click="isClose">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>

export default {
  data () {
    return {
      title: '公开状态',
      isOpen: 0,
      dialogShow: false,
    }
  },
  methods: {
    handleSubmit () {
      if (this.isOpen == '') return this.$message('请选择状态')
      this.$emit('opten-select', this.isOpen)
      this.isClose()
    },
    isClose () {
      this.isOpen = ''
      this.dialogShow = false
    },
  },
}
</script>
<style lang="scss" scoped>
.center-box {
  text-align: center;
  padding: 0 20px;
  .isOpen {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>