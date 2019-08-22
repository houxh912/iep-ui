<template>
  <iep-dialog title="申请" :dialog-show="DialogShow" width="520" @close="close()">
    <el-form ref="form" :model="form" size="small" label-width="120px">
      <iep-form-item label-name="组织名称">
        <iep-div-detail :value="form.name"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="组织介绍">
        <div>{{form.intro}}</div>
      </iep-form-item>
      <iep-form-item label-name="组织标签">
        <!-- (卓越) -->
        <iep-tag-detail class="tag" :value="form.abilityTag"></iep-tag-detail>
      </iep-form-item>
      <iep-form-item label-name="申请理由">
        <iep-input-area placeholder="请输入申请理由" v-model="form.message"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="handleSubmitApply">申 请</iep-button>
      <iep-button @click="DialogShow = false">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { applyObj } from '@/api/goms/org'
export default {
  data () {
    return {
      DialogShow: false,
      form: {
        name: '',
        orgId: '',
        intro: '',
        message: '',
      },
    }
  },
  methods: {
    close () {
      this.DialogShow = false
      this.$emit('load-page')
    },
    handleSubmitApply () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          applyObj(this.form).then(({ data }) => {
            if (data.data) {
              this.$message.success('申请提交成功，请等待审核通过')
              this.close()
            } else {
              this.$message.warning(data.msg)
            }
          })
        }
      })
    },
  },
}
</script>