<template>
  <iep-dialog :dialog-show="dialogShow" title="能贝打赏" width="520px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="打赏金额：" prop="amount">
        <iep-input-amount v-model="form.amount" :max="maxAmount" :precision="0"></iep-input-amount>
      </el-form-item>
      <el-form-item label="打赏对象：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <!-- <el-form-item label="备注：" prop="message">
        <iep-input-area v-model="form.message"></iep-input-area>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">打赏</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { sendAmount as icanreward } from '@/api/fams/block_chain'

function initICanForm () {
  return {
    amount: 0,
    user: {
      id: '',
      name: '',
    },
    userId: 0,
  }
}
function toDtoICanForm (row) {
  const newForm = row
  newForm.userId = row.user.id
  return newForm
}
export default {
  name: 'IcanRewardDialog',
  data () {
    const checkContact = (rule, value, callback) => {
      if (!value.id) {
        return callback(new Error('打赏用户不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: initICanForm(),
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
      dialogShow: state => state.ican.rewardDialogShow,
      maxAmount: state => state.ican.withdrawableCash,
    }),
  },
  methods: {
    ...mapMutations({
      setIcanRewardDialogShow: 'SET_ICAN_REWARD_DIALOG_SHOW',
    }),
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          icanreward(toDtoICanForm(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message.success('打赏成功')
              this.setIcanRewardDialogShow(false)
              this.form = initICanForm()
            } else {
              this.$message(data.msg)
            }
          })
        }
      })
    },
    close () {
      this.form = initICanForm()
      this.setIcanRewardDialogShow(false)
    },
  },
}
</script>
