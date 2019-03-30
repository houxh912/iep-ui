<template>
  <div class="wrap">
    <page-header :title="`合同${methodName}`" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="130px" style="margin-bottom: 50px;">

      <el-form-item label="合同名称：" prop="contractName">
        <el-input v-model="formData.contractName" placeholder="当天日期（八位数字）+客户名称+项目内容名称+“合同”，如“20180306农业部政务资源目录梳理合同”。"></el-input>
      </el-form-item>
      <!-- <el-form-item label="关联项目：" prop="guanlian">
        <el-input v-model="formData.guanlian" placeholder="关联项目"></el-input>
      </el-form-item> -->
      <el-form-item label="合同说明 / 收款方式：" prop="contractExpl">
        <el-input type="textarea" v-model="formData.contractExpl" placeholder="合同说明/收款方式" rows=5></el-input>
      </el-form-item>
      <el-form-item label="业务类型：" prop="businessType">
        <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签订日期：" prop="signTime">
            <IepDatePicker v-model="formData.signTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：" prop="finishTime">
            <IepDatePicker v-model="formData.finishTime"></IepDatePicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：" prop="companyOrgId">
            <!-- <el-select v-model="formData.companyOrgId" placeholder="请选择">
              <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <iep-dept-select v-model="formData.companyOrgId"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：" prop="signCompanyOrgId">
            <!-- <el-select v-model="formData.signCompanyOrgId" placeholder="请选择">
              <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <iep-dept-select v-model="formData.signCompanyOrgId"></iep-dept-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署部门：" prop="signDeptOrgId">
            <!-- <el-select v-model="formData.signDeptOrgId" placeholder="请选择">
              <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <iep-dept-select v-model="formData.signDeptOrgId"></iep-dept-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：" prop="underTakeDeptId">
            <!-- <el-select v-model="formData.underTakeDeptId" placeholder="请选择" multiple>
              <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <iep-dept-select v-model="formData.underTakeDeptId"></iep-dept-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：" prop="directorId">
            <!-- <el-select v-model="formData.directorId" placeholder="请选择">
              <el-option v-for="item in dicData.jingli" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <iep-contact-select v-model="formData.directorId"></iep-contact-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同金额：" prop="contractAmount">
            <el-input v-model="formData.contractAmount" placeholder="合同金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同级别：" prop="contractLevel">
            <el-select v-model="formData.contractLevel" placeholder="请选择">
              <el-option v-for="item in dictGroup['mlms_contract_level']" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：" prop="contractStatus">
            <el-select v-model="formData.contractStatus" placeholder="请选择">
              <el-option v-for="item in dictGroup['mlms_contract_status']" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="保证金：" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="保证金"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span=20>
          <el-form-item label="合同上传：" prop="baozhengjin">
            <el-upload
              class="upload-demo"
              action="11111"
              :on-change="handleChange"
              :file-list="formData.list"
              :on-remove="onRemove">
              <iep-button size="small" type="primary">点击上传</iep-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row> -->
      <span>合同项目款</span>
      <el-row>
        <el-col :span=12>
          <el-form-item label="实际金额" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="回款率" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同收款" prop="deposit">
            <el-table :data="tableData" border>
              <el-table-column prop="time" label="到账时间" width="180">
              </el-table-column>
              <el-table-column prop="jine" label="到账金额" width="180">
              </el-table-column>
              <el-table-column prop="leiji" label="累计到账">
              </el-table-column>
              <el-table-column prop="bili" label="到账比例">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="集团项目管理费" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="费率" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="开票费" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="费率" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="税费" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="费率" prop="deposit">
            <el-input v-model="formData.deposit" placeholder="金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="项目主要支付" prop="deposit">
            <el-table :data="tableData" border>
              <el-table-column prop="time" label="到账时间" width="180">
              </el-table-column>
              <el-table-column prop="jine" label="到账金额" width="180">
              </el-table-column>
              <el-table-column prop="leiji" label="累计到账">
              </el-table-column>
              <el-table-column prop="bili" label="到账比例">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <footer-toolbar>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, rules, deptList } from './options'
import FooterToolbar from '@/components/FooterToolbar/'
import { mapState } from 'vuex'
export default {
  components: { FooterToolbar },
  data () {
    return {
      dialogShow: false,
      methodName: '详情',
      formRequestFn: () => { },
      formData: initFormData(),
      rules: rules,
      deptList,
      dicData: {
        select: [
          { value: 1, label: '选项1' },
          { value: 2, label: '选项2' },
        ],
        dept: [
          { value: 1, label: '部门1' },
          { value: 2, label: '部门2' },
        ],
        jingli: [
          { value: 1, label: '经理1号' },
          { value: 2, label: '经理2号' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
      tableData: [{ time: 'sad', jine: 'dasa', leiji: 'sad', bili: 'sasda' }],
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    console.log(this.dictGroup)
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData()
      this.$emit('detail')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
// .wrap {
//   padding: 0 50px;
// }
</style>

