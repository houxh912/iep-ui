<template>
  <iep-dialog :dialog-show="dialogShow" title="提示" width="600px" @close="loadPage">
    <span>{{prompt}}</span>
    <template slot="footer">
      <operation-wrapper>
        <iep-button v-show="childrenCount==0" type="primary" @click="handleDelete(id,'')">确定</iep-button>
        <iep-button v-show="childrenCount!=0" type="primary" @click="handleDelete(id,'1')">保留</iep-button>
        <iep-button v-show="childrenCount!=0" @click="handleDelete(id,'2')">不保留</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { deleteAtmsById } from '@/api/atms/index'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      childrenCount:'',
      prompt:'',
      id:'',
    }
  },
  updated () {
    this.childrenCount!=0 ? this.prompt='此任务包含子任务，是否保留子任务？' : this.prompt='此操作将永久删除该任务, 是否继续?'
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleDelete (id,reserved) {
      deleteAtmsById(id,reserved).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.loadPage()
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
    },
    // handleReserved (id) {
    //   deleteAtmsById(id,'1').then(res => {
    //       if (res.data.data) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!',
    //         })
    //         this.loadPage()
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: `删除失败，${res.data.msg}`,
    //         })
    //       }
    //       this.loadPage()
    //     })
    // },
    // handleNoReserved (id) {
    //   deleteAtmsById(id,'2').then(res => {
    //       if (res.data.data) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!',
    //         })
    //         this.loadPage()
    //       } else {
    //         this.$message({
    //           type: 'info',
    //           message: `删除失败，${res.data.msg}`,
    //         })
    //       }
    //       this.loadPage()
    //     })
    // },
  },
}
</script>
<style lang="scss" scoped>
</style>
