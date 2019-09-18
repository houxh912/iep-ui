<template>
  <iep-dialog :dialog-show="dialogShow" title="拜师" width="520px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <h3>是否确认向【{{person.name}}】拜师？</h3>
      <el-form-item label="拜师理由：" prop="reason">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">确认</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { addMasterWorker } from '@/api/cpms/characterrelations'

function initForm () {
  return {
    id: 0,
    reason: '',
  }
}

export default {
  name: 'RewardDialog',
  data () {
    return {
      form: initForm(),
      rules: {
        reason: [
          { required: true, message: '请输入你的拜师理由', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.cpms.apprenticeShow,
      reason: state => state.cpms.apprenticeReason,
      person: state => state.cpms.apprenticePerson,
    }),
  },
  methods: {
    ...mapMutations({
      setApprenticeDialogShow: 'SET_APPRENTICE_SHOW',
    }),
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          addMasterWorker({ masterWorker: [this.person.id], refuseContent: this.form.reason }).then(({ data }) => {
            if (data.data) {
              this.$message.success('拜师申请已提交成功')
              this.setApprenticeDialogShow(false)
              this.form = initForm()
            } else {
              this.$message(data.msg)
              this.setApprenticeDialogShow(false)
              this.form = initForm()
            }
          })
        }
      })
    },
    close () {
      this.form = initForm()
      this.setApprenticeDialogShow(false)
    },
  },
  watch: {
    dialogShow (newVal) {
      if (newVal) {
        // this.form.targetUser = this.person
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
