<template>
  <iep-dialog :dialog-show="dialogShow" :title="`添加协作人`" width="50%" @close="close">
    <el-form size="small">
      <el-row>
        请选择需要添加的协作人：
      </el-row>
      <el-row>
        <el-form-item>
          <iep-contact-multiple-user v-model="user"></iep-contact-multiple-user>
        </el-form-item>
      </el-row>
    </el-form>

    <template slot="footer">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="primary" @click="submitForm">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { AddCollaborator } from '@/api/crms/customer'
export default {
  name: 'collaborator',
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      user: [],
      dialogShow: false,
      Data: {
        clientId: '',
        userId: [],
      },
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.user = []
    },
    submitForm () {
      for (let i = 0; i < this.user.length; i++) {
        this.Data.userId.push(this.user[i].id)
      }
      let array = Array.from(new Set(this.Data.userId))
      this.Data.userId = array
      AddCollaborator(this.Data).then(res => {
        if (res.data.data) {
          this.$message.success('添加协作人成功！')
          this.dialogShow = false
          this.user = []
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
<style  scoped>
.el-row {
  padding: 5px 0;
}
</style>

