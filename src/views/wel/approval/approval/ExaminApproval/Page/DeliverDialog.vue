<template>
  <iep-dialog :dialog-show="dialogShow" title="转交" width="500px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="80px">
      <el-form-item label="转交人" prop="user">
        <iep-contact-select v-model="form.user" :filter-user-list="filterUserList">
        </iep-contact-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { mapGetters } from 'vuex'
import { checkContactUser } from '@/util/rules'
import { initDeliverForm, toDeliverForm } from '../options'
export default {
  mixins: [formMixins],
  data () {
    return {
      id: '',
      userId: '', // 申请人ID
      dialogShow: false,
      rules: {
        user: [
          { required: true, validator: checkContactUser('转交人'), trigger: 'blur' },
        ],
      },
      formRequestFn: () => { },
      form: initDeliverForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    filterUserList () {
      return [this.userInfo.userId, this.userId]
    },
  },
  methods: {
    loadPage () {
      this.form = initDeliverForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        this.formRequestFn(toDeliverForm(this.form)).then(({ data }) => {
          if (data.data) {
            this.$message.success('转交成功')
            this.loadPage()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
}
</script>

