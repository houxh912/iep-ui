<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}自定义分组`" width="500px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" :rules="rules" label-width="140px">
      <iep-form-item label-name="自定义分组名" prop="name">
        <el-input v-model="form.name" maxlength="10"></el-input>
      </iep-form-item>
      <iep-form-item label-name="是否公开" v-if="permissions.relationship_manage_add">
        <el-switch style="display: block" v-model="form.isOpen" active-color="#13ce66" inactive-color="#ff4949" active-text="公开" inactive-text="不公开">
        </el-switch>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">确定</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, formToDto, rules } from './options'
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  // created () {
  //   this.loadPage()
  // },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: '操作成功',
              type: 'success',
            })
            this.loadPage()
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
        }
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.agree-wrapper {
  text-align: center;
}
</style>
