<template>
  <el-form :model="formData" label-width="120px" ref="form" :rules="rules" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="红包简介" prop="description">
      <el-input v-model="formData.description" maxlength="255" :readonly="isReadonly" clearable></el-input>
    </el-form-item>

    <el-form-item label="关联政策" prop="relationList">
      <mutiply-select class="mutiplySelect" v-model="formData.relationList" :selectObjs="formData.relationPolicyList" :options="政策options" :otherProps="orgOption" v-if="!isReadonly" @changeSelectedObjs="changeData"></mutiply-select>
      <el-select style="width: 100%" v-model="formData.relationList" multiple disabled v-else>
        <el-option v-for="item in formData.relationPolicyList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="有效时间" class="formWidth" prop="modifiedTime">
      <el-date-picker type="date" style="width:100%" placeholder="选择日期" v-model="formData.modifiedTime" value-format="yyyy-M-d HH:mm:ss" :disabled="isReadonly"></el-date-picker>
    </el-form-item>

    <el-form-item label="红包总量" class="formWidth" prop="totalAmount">
      <el-input-number v-model.number="formData.totalAmount" style="width:100%" controls-position="right" :min="1" :max="100000"></el-input-number>
    </el-form-item>

    <el-form-item label="红包剩余数量" class="formWidth" prop="remainAmount" v-if="isAdd">
      <el-input-number v-model.number="formData.remainAmount" style="width:100%" controls-position="right" :min="1" :max="100000"></el-input-number>
    </el-form-item>

    <div class="code-container" v-if="!isAdd">
      <div class="label">二维码</div>
      <div class="code-box">
        <qrcode class="code" :value="url" v-if="url" :options="{width:120}"></qrcode>
        <div class="code-bgc" v-else></div>
      </div>
    </div>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmit('form')" v-if="!isReadonly">提交</el-button>
      <el-button type="primary" plain @click="$emit('hideDialog', false)">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { postPacket, putPacket, getpolicyPage } from '@/api/govdata/policy_packet'
import Qrcode from '@chenfengyuan/vue-qrcode'
import MutiplySelect from './mutiply-select'
import multiplyMixin from '@/views/govdata/policyManage/multiply_mixin'
const orgOption = [
  {
    prop: 'mark',
    label: '政策类型',
  }, {
    prop: 'issue',
    label: '发文号',
  }]
export default {
  mixins: [multiplyMixin],
  components: { Qrcode, MutiplySelect },
  props: ['formData', 'isAdd', 'isEdit', 'isReadonly'],
  data () {
    var checkTotalAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('红包总数量不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (this.isAdd) {
            if (this.formData.totalAmount !== this.formData.remainAmount) {
              callback(new Error('红包总数量必须等于剩余红包数量 !'))
            } else {
              callback()
            }

          } else {
            callback()
          }
        }
      }, 1000)
    }
    var checkRemainAmount = (rule, value, callback) => {
      if (this.isAdd && !value) {
        return callback(new Error('红包剩余数量不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (this.isAdd) {
            if (this.formData.totalAmount !== this.formData.remainAmount) {
              callback(new Error('红包总数量必须等于剩余红包数量 !'))
            } else {
              callback()
            }

          } else {
            callback()
          }
        }
      }, 1000)
    }

    return {
      flag: false,
      loading: false,
      url: '',
      orgOption,
      政策options: {
        name: '政策',
        labelName: '政策名称',
        labelProp: 'title',
        valueName: '政策ID',
        valueProp: 'id',
        getRequestName: getpolicyPage,
        pageLimit: 6,
      },
      rules: {
        description: [{ required: true, message: '请输入通用政策正文' }],
        totalAmount: [{ validator: checkTotalAmount, trigger: 'blur' }],
        remainAmount: [{ validator: checkRemainAmount, trigger: 'blur' }],
      },
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    /**
     * 生成二维码
     */
    getCode () {
      this.url = `https://gc.govmade.cn/policy-red-envelope-detail/${this.formData.id}`
    },

    _processForm (rows) {
      rows.relationPolicyList = rows.relationPolicyList.map(m => {
        return { policyId: m.id, title: m.name, policyType: m.mark }
      })
      rows.relationList = rows.relationPolicyList
      return rows
    },

    changeData (val) {
      console.log(22)
      this.flag = true
      this.formData.relationList = val.map(m => {
        return { policyId: m.value, title: m.label, policyType: m.mark }
      })
      console.log('22', this.formData.relationList)
    },

    /**
     * 验证并提交
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      if (!this.flag && this.formData.relationPolicyList && this.formData.relationPolicyList.length > 0) {
        console.log(22)
        this._processForm(submitForm)
        console.log(' this.formData.relationList', this.formData.relationList)
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdit ? putPacket : postPacket
          console.log('succes', this.formData.relationList)
          requestFun(submitForm).then(res => {
            if (res.data.data) {
              this.submitMessage()
            }
          }).catch(() => {
            this.msg('保存失败，请检查你的网络链接。', 'error')
          })
        } else {
          this.msg('填写错误或者填写不完整', 'warning')
          return false
        }
      })
    },

    /**
     * 提交成功时
     */
    submitMessage () {
      this.msg('提交成功!', 'success')
      this.$emit('hideDialog', false)
    },

    /**
     * 提示语
     */
    msg (msg, type) {
      this.$message({
        message: msg,
        type: type,
      })
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.formWidth {
  display: inline-block;
  width: 50%;
}
.code-container {
  width: 200px;
  height: 120px;
  margin: 0px 52px 25px;
  display: flex;
  .code-box {
    width: 127px;
    height: 127px;
    padding: 3px;
    margin-left: 25px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    position: relative;
    .code {
      cursor: pointer;
      transition: all 0.6s;
      &:hover {
        transform: scale(1.4);
      }
    }
    .code-bgc {
      width: 99%;
      height: 100%;
      background-image: url("./add.jpg");
      position: absolute;
    }
  }
}
</style>
<style scoped>
.mutiplySelect >>> .select-box {
  width: 100%;
}
</style>