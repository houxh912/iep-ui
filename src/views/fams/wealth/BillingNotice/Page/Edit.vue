<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}开票通知`" :back-option="backOption">
        <iep-button type="primary" @click="handleSubmit()">保存</iep-button>
      </page-header>
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="200px" size="small">
        <h4 class="iep-sub-title">购买方信息</h4>
        <iep-form-item label-name="名称" prop="buyerName" class="form-half">
          <el-input v-model="form.buyerName"></el-input>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号" prop="buyerNumber" class="form-half">
          <el-input v-model="form.buyerNumber"></el-input>
        </iep-form-item>
        <iep-form-item label-name="地址" prop="buyerAddress">
          <el-input v-model="form.buyerAddress"></el-input>
        </iep-form-item>
        <iep-form-item label-name="电话号码" prop="buyerPhone" class="form-half">
          <el-input v-model="form.buyerPhone"></el-input>
        </iep-form-item>
        <iep-form-item label-name="开户行及账户" prop="buyerAccount" class="form-half">
          <el-input v-model="form.buyerAccount"></el-input>
        </iep-form-item>
        <iep-form-item label-name="发票邮寄地址" prop="buyerMail">
          <el-input v-model="form.buyerMail"></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">货物或应税劳务、服务名称</h4>
        <iep-form-item label-name="一级科目" prop="firstSubject" class="form-half">
          <iep-dict-select v-model="form.firstSubject" dict-name="fams_tax_subject"></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="二级科目" prop="secondSubject" class="form-half">
          <el-input v-model="form.secondSubject"></el-input>
        </iep-form-item>
        <iep-form-item label-name="税率" prop="rate" class="form-half">
          <el-select v-model="form.rate">
            <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="单位" prop="unit" class="form-half">
          <el-input v-model="form.unit"></el-input>
        </iep-form-item>
        <iep-form-item label-name="金额" prop="amount" class="form-half">
          <iep-input-number v-model="form.amount"></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="发票种类" prop="invoicingType">
          <el-select v-model="form.invoicingType">
            <el-option v-for="(v, k) in dictsMap['invoicingType']" :key="k" :label="v" :value="+k">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="关联项目" prop="projectId">
          <iep-project-select v-model="form.projectId"></iep-project-select>
        </iep-form-item>
        <h4 class="iep-sub-title">销售方</h4>
        <iep-form-item label-name="销售方公司" prop="companyId">
          <iep-select v-model="form.companyId" autocomplete="off" prefix-url="fams/company" @change="handleChangeCompanyId" placeholder="请选择销售方公司"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号">
          <span>{{companyForm.taxpayerNumber}}</span>
        </iep-form-item>
        <iep-form-item label-name="电话">
          <span>{{companyForm.phone}}</span>
        </iep-form-item>
        <iep-form-item label-name="地址">
          <span>{{companyForm.address}}</span>
        </iep-form-item>
        <iep-form-item label-name="开户行及账号">
          <span>{{companyForm.name}}</span>
        </iep-form-item>
        <iep-form-item label-name="经营范围">
          <span>{{companyForm.businessScope}}</span>
        </iep-form-item>
        <iep-form-item label-name="备注">
          <iep-input-area v-model="form.remarks" placeholder="请输入备注"></iep-input-area>
        </iep-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm, rules, dictsMap } from '../options'
import { mapGetters } from 'vuex'
import { postBilling, putBilling, getBillingById } from '@/api/fams/billing'
import { getCompanyById } from '@/api/fams/company'
import formMixins from '@/mixins/formMixins'
function initCompanyForm () {
  return {
    taxpayerNumber: '请选择一个销售方公司',
    phone: '请选择一个销售方公司',
    address: '请选择一个销售方公司',
    name: '请选择一个销售方公司',
    businessScope: '请选择一个销售方公司',
  }
}
export default {
  mixins: [formMixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      rules,
      dictsMap,
      form: initForm(),
      companyForm: initCompanyForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    id () {
      return +this.record.id
    },
    isEdit () {
      return this.id ? true : false
    },
    formRequestFn () {
      return this.isEdit ? putBilling : postBilling
    },
    methodName () {
      return this.isEdit ? '修改' : '新增'
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.isEdit) {
        getBillingById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initForm(), data.data)
        })
      }
    },
    handleChangeCompanyId (value) {
      getCompanyById(value).then(({ data }) => {
        this.companyForm = data.data
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.formRequestFn(this.form).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.handleGoBack()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
      }
    },
  },
}
</script>