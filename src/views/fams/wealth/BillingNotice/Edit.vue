<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`${methodName}开票通知-${dictsMap.invoicingType[this.form.invoicingType]}`" :back-option="backOption">
        <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">保存</iep-button>
      </iep-page-header>
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="240px" size="small">
        <h4 class="iep-sub-title">购买方信息</h4>
        <iep-form-item label-name="名称" prop="buyerName" class="form-half">
          <el-input v-model="form.buyerName" placeholder="请输入购买方信息名称"></el-input>
        </iep-form-item>
        <iep-form-item label-name="纳税人识别号" prop="buyerNumber" class="form-half">
          <el-input v-model="form.buyerNumber" placeholder="请输入购买方纳税人识别号"></el-input>
        </iep-form-item>
        <iep-form-item label-name="地址" prop="buyerAddress">
          <el-input v-model="form.buyerAddress" placeholder="请输入购买方地址"></el-input>
        </iep-form-item>
        <iep-form-item label-name="电话号码" prop="buyerPhone" class="form-half">
          <el-input v-model="form.buyerPhone" placeholder="请输入购买方电话号码"></el-input>
        </iep-form-item>
        <iep-form-item label-name="开户行及账户" prop="buyerAccount" class="form-half">
          <el-input v-model="form.buyerAccount" placeholder="请输入购买方开户行及账户"></el-input>
        </iep-form-item>
        <iep-form-item label-name="发票邮寄地址、联系人、电话" prop="buyerMail">
          <el-input v-model="form.buyerMail" placeholder="请输入购买方发票邮寄地址、联系人、电话"></el-input>
        </iep-form-item>
        <h4 class="iep-sub-title">货物或应税劳务、服务名称</h4>
        <iep-form-item label-name="一级科目" prop="firstSubject" class="form-half">
          <iep-dict-select v-model="form.firstSubject" dict-name="fams_tax_subject" placeholder="鉴证咨询服务和软件科目，北京公司不开"></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="二级科目" prop="secondSubject" class="form-half">
          <el-input v-model="form.secondSubject" placeholder="请输入二级科目"></el-input>
        </iep-form-item>
        <iep-form-item label-name="税率" prop="rate" class="form-half">
          <el-select v-model="form.rate" placeholder="请输入税率">
            <el-option v-for="item in dictGroup['fams_billing_rate']" :key="item.value" :label="item.label+'%'" :value="(+item.label/100)">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="单位" prop="unit" class="form-half">
          <el-input v-model="form.unit" placeholder="单位诠释：项、个"></el-input>
        </iep-form-item>
        <iep-form-item label-name="金额" prop="amount" class="form-half">
          <iep-input-amount v-model="form.amount"></iep-input-amount>
        </iep-form-item>
        <iep-form-item label-name="金额大写" class="form-half">
          {{form.amount | parseToHanZiMoney}}
        </iep-form-item>
        <iep-form-item label-name="发票种类" prop="invoicingType">
          <el-select v-model="form.invoicingType" disabled>
            <el-option v-for="(v, k) in dictsMap['invoicingType']" :key="k" :label="v" :value="+k">
            </el-option>
          </el-select>
        </iep-form-item>
        <iep-form-item label-name="关联项目" prop="projectId">
          <iep-project-select v-model="form.projectId" :project-name="form.projectName"></iep-project-select>
        </iep-form-item>
        <h4 class="iep-sub-title">销售方</h4>
        <iep-form-item label-name="销售方组织" prop="orgId">
          <iep-select v-model="form.orgId" filterable autocomplete="off" prefix-url="admin/org/all" placeholder="请选择销售方组织"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="销售方公司" prop="companyId">
          <iep-select v-model="form.companyId" filterable autocomplete="off" prefix-url="fams/company/all" @change="handleChangeCompanyId" placeholder="请选择销售方公司"></iep-select>
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
import { initForm, dictsMap, initRule } from './options'
import { mapGetters, mapState } from 'vuex'
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
      dictsMap,
      form: initForm(),
      companyForm: initCompanyForm(),
      backOption: {
        isBack: true,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
    id () {
      return +this.$route.params.id
    },
    invoicingType () {
      return this.$route.query.invoicingType ? +this.$route.query.invoicingType : this.form.invoicingType
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    formRequestFn () {
      return this.id ? putBilling : postBilling
    },
    rules () {
      return initRule(this.invoicingType)
    },
    // companyOption () {
    //   if (this.form.orgId) {
    //     return {
    //       disabled: false,
    //       prefixUrl: `fams/company/${this.form.orgId}`,
    //     }
    //   } else {
    //     return {
    //       disabled: true,
    //     }
    //   }
    // },
  },
  created () {
    if (this.id) {
      this.loadPage()
    } else {
      this.form.invoicingType = this.invoicingType
      this.form.orgId = this.orgId
    }
  },
  methods: {
    loadPage () {
      getBillingById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.handleChangeCompanyId(this.form.companyId)
      })
    },
    handleChangeCompanyId (value) {
      getCompanyById(value).then(({ data }) => {
        this.companyForm = data.data
      })
    },
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.$router.history.go(-1)
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>