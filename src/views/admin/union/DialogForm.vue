<template>
  <iep-dialog :dialog-show="dialogShow" title="查看联盟" width="50%" @close="loadPage">
    <el-form class="form-detail" :model="form" ref="form" size="small" label-width="100px" disabled>
      <iep-form-item label-name="联盟名称">
        <iep-div-detail :value="form.name"></iep-div-detail>
      </iep-form-item>
      <iep-form-item label-name="联盟Logo">
        <iep-img-avatar :src="form.logo" shape="square" :size="64"></iep-img-avatar>
      </iep-form-item>
      <iep-form-item label-name="联盟描述">
        <div>{{form.intro}}</div>
      </iep-form-item>
      <iep-form-item label-name="所属组织">
        <div>{{form.orgName}}</div>
      </iep-form-item>
      <iep-form-item label-name="使用模块">
        <div v-if="!form.modules.length">暂无模块</div>
        <a-tag v-for="item in form.modules" :key="item.value">{{item.label}}</a-tag>
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
