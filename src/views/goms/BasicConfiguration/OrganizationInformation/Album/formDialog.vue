<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="40%" @close="resetForm">

    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="120px" style="margin-bottom: 50px;" class="form-detail">
      <iep-form-item label-name="上传图片" prop="imageUrl">
        <iep-avatar v-model="form.imageUrl"></iep-avatar>
      </iep-form-item>
      <iep-form-item label-name="标题" prop="title">
        <el-input v-model="form.title" :maxlength="50"></el-input>
      </iep-form-item>
      <iep-form-item label-name="日期" prop="publishTime">
        <IepDatePicker v-model="form.publishTime"></IepDatePicker>
      </iep-form-item>
      <iep-form-item label-name="说明" prop="synopsis">
        <el-input type="textarea" v-model="form.synopsis" :maxlength="2000" :rows="5"></el-input>
      </iep-form-item>

    </el-form>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm()" v-loading="loadState">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { rules, initForm } from './options'
import { orgCreate, orgUpdate } from '@/api/goms/org_album'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogShow: false,
      rules,
      form: initForm(),
      requestFn: () => { },
      title: '',
      loadState: false,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    open (row) {
      if (row) {
        this.requestFn = orgUpdate
        this.title = '修改'
        this.form = { ...row }
      } else {
        this.requestFn = orgCreate
        this.title = '新增'
        this.form.orgId = this.userInfo.orgId
      }
      this.dialogShow = true
    },
    resetForm (state = false) {
      this.form = initForm()
      this.dialogShow = false
      if (state) {
        this.$emit('load-page', state)
      }
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loadState = true
          this.requestFn(this.form).then(({ data }) => {
            this.loadState = false
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.resetForm(true)
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
