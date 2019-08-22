<template>
  <iep-dialog :dialog-show="dialogShow" title="查看联盟" width="50%" @close="loadPage">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <iep-img-avatar :size="128" :src="form.logo"></iep-img-avatar>
    </div>
    <el-form class="form-detail" :model="form" ref="form" size="small" label-width="100px" disabled>
      <iep-form-item label-name="联盟名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="组织描述" prop="intro">
        <iep-input-area v-model="form.intro"></iep-input-area>
      </iep-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      form: initForm(),
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
