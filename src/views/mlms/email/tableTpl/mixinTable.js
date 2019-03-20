import { isReadeBatch, deleteEmailByIds } from '@/api/mlms/email/index'

export default {
  data () {
    return {
      dialogShow: true,
      forwardShow: true,
      replyShow: true,
    }
  },
  methods: {
    handleDetail (row) {
      this.dialogShow = false
      this.$refs['mainDialog'].formData = row
    },
    backPage (state) {
      this.dialogShow = true
      this.forwardShow = true
      this.replyShow = true
      if (state) {
        this.$refs['table'].loadPage({})
      }
    },
    multipleSelect (val, list) {
      this.multipleSelection = val
      this.selectList = list
    },
    // 批量标记已读
    allRead () {
      isReadeBatch(this.multipleSelection).then(() => {
        this.$notify({
          title: '成功',
          message: '操作成功！',
          type: 'success',
          duration: 2000,
        })
        this.$refs['table'].loadPage({})
      })
    },
    // 批量删除
    allDelete () {
      deleteEmailByIds(this.multipleSelection).then(() => {
        this.$notify({
          title: '成功',
          message: '操作成功！',
          type: 'success',
          duration: 2000,
        })
        this.$refs['table'].loadPage({})
      })
    },
    loadPage (state) {
      this.dialogShow = true
      this.forwardShow = true
      this.replyShow = true
      if (state) {
        this.$refs['table'].loadPage({})
      }
    },
    // 转发
    forward () {
      // 首先判断是否勾选
      if (this.selectList.length !== 1) {
        this.$message.error('请选择且只能选择一条邮件进行转发！')
        return
      }
      this.dialogShow = true
      this.forwardFn(this.selectList[0])
    },
    // 查看详情的时候转发
    detailForward (row) {
      this.dialogShow = true
      this.forwardFn(row)
    },
    // 转发
    forwardFn (row) {
      this.forwardShow = false
      this.$refs['updateDialog'].resetForm()
      this.$refs['updateDialog'].pageState = 'forward'
      this.$refs['updateDialog'].backOption.isBack = true
      this.$refs['updateDialog'].formData.content = row.content
      this.$refs['updateDialog'].formData.kind = 2
    },
    // 回复
    detailReply (row) {
      this.dialogShow = true
      this.replyShow = false
      this.$refs['updateDialog'].resetForm()
      this.$refs['updateDialog'].pageState = 'reply'
      this.$refs['updateDialog'].backOption.isBack = true
      this.$refs['updateDialog'].formData.receiverList = row
      this.$refs['updateDialog'].formData.kind = 1
    },
  },
}
