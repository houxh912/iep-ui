<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}字典`" width="500px" @close="close">
    <el-form class="form-detail" :model="form" ref="form" size="small" label-width="100px">
      <iep-form-item label-name="字典值" prop="value">
        <el-input v-model="form.value"></el-input>
      </iep-form-item>
      <iep-form-item label-name="字典名" prop="label">
        <el-input v-model="form.label"></el-input>
      </iep-form-item>
      <iep-form-item label-name="排序" prop="sort">
        <el-input v-model="form.sort"></el-input>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { _initRow } from './options'
import { postChild, putChild } from '@/api/exam/setting/setting'
export default {
  data () {
    return {
      dialogShow: false,
      form: _initRow(),
      methodName: '新增',
    }
  },
  methods: {
    //保存
    handleSubmit () {
      let submitChild = null
      if (this.form.id) {
        submitChild = putChild
      } else {
        submitChild = postChild
      }
      submitChild(this.form).then(() => {
        this.close()
      })
    },
    //关闭弹窗
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
