<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="520px" @close="handleCancel" center>
    <div class="center-box">
      <el-radio-group v-model="status" class="status">
        <el-radio :label="1">审核通过</el-radio>
        <el-radio :label="2">审核不通过</el-radio>
      </el-radio-group>
      <el-input v-if="status === 2" class="content" type="textarea" autosize placeholder="请输入内容" v-model="content">
      </el-input>
    </div>
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
      title: '',
      formRequestFn: () => { },
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
      this.status = 0
      this.content = ''
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleSubmit () {
      this.formRequestFn({
        ids: this.currentIds,
        status: this.status, // 用来变更状态
        content: this.content,
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
.center-box {
  text-align: center;
  padding: 0 20px;
  .status {
    margin-bottom: 20px;
  }
  .content {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
