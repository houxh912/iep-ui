<template>
  <iep-dialog :dialog-show="dialogShow" :title="`审核`" width="35%">
    <el-radio-group v-model="status" class="status">
      <el-radio :label="3">审核通过</el-radio>
      <el-radio :label="4">审核不通过</el-radio>
    </el-radio-group>
    <div class="button-group">
      <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="handleCancel">取消</el-button>
    </div>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      status,
    }
  },
  methods: {
    handleSubmit () {

    },
    handleCancel () {

    },
  },
}
</script>
<style lang="scss" scoped>
.status {
  margin: 10px;
}
.content {
  margin: 20px 0;
}
.button-group {
  display: flex;
  justify-content: center;
}
</style>
