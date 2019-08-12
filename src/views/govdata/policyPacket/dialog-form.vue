<template>
  <el-form :model="formData" label-width="120px" ref="form" :rules="rules" :class="isReadonly ? 'readonly-form' : ''">
    <el-form-item label="政策标题" prop="taskName">
      <el-input v-model="formData.taskName" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item>

    <!-- <el-form-item label="政策url" prop="url">
      <el-input v-model="formData.url" maxlength="255" :readonly="isReadonly"></el-input>
    </el-form-item> -->

    <el-form-item label="红包政策" class="formWidth" prop="dispatchList">
      <mutiply-select class="mutiplySelect" v-model="formData.dispatchList" :selectObjs="formData.dispatchsList" :options="政策options" :otherProps="orgOption" v-if="!isReadonly"></mutiply-select>
      <el-select style="width: 100%" v-model="formData.dispatchList" multiple disabled v-else>
        <el-option v-for="item in formData.dispatchsList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="红包政策" prop="id">
      <el-select style="width: 100%" v-model="tagValue" multiple placeholder="请选择" :disabled="isReadonly">
        <el-option v-for="item in resdata" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->

    <div class="code-box">
      <div class="label">二维码</div>
      <div class="code">
        <qrcode :value="url" v-if="url" :options="{width:120}"></qrcode>
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
import { postPacket, putPacket } from '@/api/govdata/policy_packet'
import { getOrganizationPage } from '@/api/govdata/common'
import Qrcode from '@chenfengyuan/vue-qrcode'
import MutiplySelect from '@/components/deprecated/mutiply-select'
import multiplyMixin from '@/views/govdata/policyManage/multiply_mixin'
const orgOption = [
  {
    prop: 'label',
    label: '机构分类',
  }, {
    prop: 'organizationUrl',
    label: '机构网址',
  }]
const rules = {
  title: [{ required: true, message: '请输入通用政策正文' }],
}
export default {
  mixins: [multiplyMixin],
  components: { Qrcode, MutiplySelect },
  props: ['formData', 'isEdit', 'isReadonly'],
  data () {
    return {
      loading: false,
      rules,
      //   url: 'http://gc.govmade.cn/detail/general/408919',
      url: '',
      orgOption,
      政策options: {
        name: '政策',
        labelName: '政策名称',
        labelProp: 'name',
        valueName: '政策ID',
        valueProp: 'id',
        getRequestName: getOrganizationPage,
        pageLimit: 6,
      },
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    _processForm (rows) {
      // rows.target = this.encodeSplitStr(rows.target)
      rows.industry = this.encodeSplitStr(rows.industry)
    },


    /**
     * 生成二维码
     */
    getCode () {
      const urls = location.href.split('#').toString()
      this.url = urls + '/' + `${this.formData.id}`
      console.log('url', this.url)
    },

    /**
     * 验证并提交
     */
    handleSubmit (formName) {
      this.loading = true
      const submitForm = JSON.parse(JSON.stringify(this.formData))
      //this._processForm(submitForm)
      console.log('dispatchsList', this.formData.dispatchList)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          const requestFun = this.isEdit ? putPacket : postPacket
          requestFun(submitForm).then(() => {
            this.submitMessage()
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
.code-box {
  width: 200px;
  height: 120px;
  margin: 0px 52px 25px;
  display: flex;
  .code {
    width: 127px;
    height: 127px;
    margin-left: 25px;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    position: relative;
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