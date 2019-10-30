<template>
  <iep-dialog :dialog-show="dialogShow" :title="title" width="40%" @close="resetForm">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="120px" style="margin-bottom: 50px;" class="form-detail">
      <iep-form-item label-name="上传图片" prop="imageUrl">
        <iep-avatar v-model="form.imageUrl"></iep-avatar>
      </iep-form-item>
      <iep-form-item label-name="标题" prop="title">
        <el-input v-model="form.title" :maxlength="50" placeholder="请输入标题"></el-input>
      </iep-form-item>
      <iep-form-item label-name="日期" prop="publishTime">
        <iep-date-picker v-model="form.publishTime" placeholder="请输入日期" :picker-options="pickerDisabledDateOptions()"></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="说明" prop="synopsis">
        <iep-input-area v-model="form.synopsis" :maxlength="2000"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()" v-loading="loadState">确定</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { pickerDisabledDateOptions } from '@/util/date'
import { rules, initForm } from './options'
import { orgCreate, orgUpdate } from '@/api/goms/org_album'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      pickerDisabledDateOptions,
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
