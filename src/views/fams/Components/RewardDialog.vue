<template>
  <iep-dialog :dialog-show="dialogShow" title="打赏" width="520px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="打赏金额：" prop="amount">
        <iep-input-amount v-model="form.amount" :max="maxAmount" :precision="0"></iep-input-amount>
      </el-form-item>
      <el-form-item label="打赏对象：" prop="targetUserList">
        <iep-contact-multiple-user v-model="form.targetUserList"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="备注：" prop="message">
        <iep-input-area v-model="form.message"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">打赏</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { reward } from '@/api/fams/total'
function initForm () {
  return {
    amount: 0,
    targetUserList: [],
    message: '',
  }
}
function toDtoForm (row) {
  const newForm = row
  newForm.targetUserIds = row.targetUserList.map(m => m.id)
  return newForm
}
export default {
  name: 'RewardDialog',
  data () {
    const checkContact = (rule, value, callback) => {
      if (!value.id) {
        return callback(new Error('打赏用户不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: initForm(),
      rules: {
        amount: [
          { type: 'number', required: true, message: '请输入的打赏金额不少于 1 元', trigger: 'blur', min: 1 },
        ],
        targetUser: [
          { required: true, validator: checkContact, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.fams.rewardDialogShow,
      maxAmount: state => state.fams.withdrawableCash,
      person: state => state.fams.ARewardedPerson,
    }),
  },
  methods: {
    ...mapMutations({
      setRewardDialogShow: 'SET_REWARD_DIALOG_SHOW',
    }),
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          reward(toDtoForm(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message.success('打赏成功')
              this.setRewardDialogShow(false)
              this.form = initForm()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
    close () {
      this.form = initForm()
      this.setRewardDialogShow(false)
    },
  },
  watch: {
    dialogShow (newVal) {
      if (newVal) {
        this.form.targetUserList = [...this.person]
      }
    },
  },
}
</script>
