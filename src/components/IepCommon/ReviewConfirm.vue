<template>
  <iep-dialog :dialog-show="dialogShow" :title="`审核`" width="35%">
    <el-radio-group v-model="status" class="status">
      <el-radio :label="0">审核通过</el-radio>
      <el-radio :label="2">审核不通过</el-radio>
    </el-radio-group>
    <el-input v-if="status === 4" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="content">
    </el-input>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      <iep-button @click="handleCancel">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      requestFn: () => { },
      dialogShow: false,
      status: 1, // 待审核
      content: '',
      id: null,
      ids: [],
    }
  },
  computed: {
    currentIds () {
      if (this.id) {
        return [this.id]
      } else {
        return this.ids
      }
    },
  },
  methods: {
    loadPage () {
      this.status = 1
      this.content = ''
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleSubmit () {
      this.requestFn({
        'ids': this.currentIds,
        'status': this.status, // 用来变更状态
        'content': this.content,
      }).then(({ data }) => {
        if (data.data) {
          // console.log('true')
        } else {
          // console.log('false')
        }
        this.loadPage()
      })
    },
    handleCancel () {
      this.loadPage()
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
