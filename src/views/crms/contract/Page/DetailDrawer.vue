<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="'合同详情'" width="50%" @close="loadPage">
    <el-form :model="formData" label-width="150px" disabled>
      <el-form-item label="合同名称：">
        <el-input v-model="formData.contractName"></el-input>
      </el-form-item>
      <el-form-item label="合同说明 / 收款方式：">
        <el-input type="textarea" v-model="formData.contractExpl"></el-input>
      </el-form-item>
      <el-form-item label="业务类型：">
        <el-radio-group v-model="formData.businessType">
          <el-radio v-for="item in dictGroup['mlms_business_type']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同标签：">
        <a-tag v-for="(item,index) in formData.tagKeyWords" :key="index">{{item}}</a-tag>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签订日期：">
            <el-input v-model="formData.signTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="完结日期：">
            <el-input v-model="formData.finishTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="委托单位：">
            <el-input v-model="formData.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="签署单位：">
            <el-input v-model="formData.signCompanyRealName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="签署部门：">
            <el-input v-model="formData.signDeptOrgName.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="承接部门：">
            <a-tag v-for="(item,index) in formData.underTakeDeptName" :key="index">{{item.name}}</a-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="市场经理：">
            <el-input v-model="formData.Manager"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同金额：">
            <el-input v-model="formData.contractAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="合同级别：">
            <iep-dict-select dict-name="mlms_contract_level" v-model="formData.contractLevel"></iep-dict-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="合同状态：">
            <iep-dict-select dict-name="mlms_contract_status" v-model="formData.contractStatus"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <el-form-item label="保证金：">
            <el-input v-model="formData.deposit" placeholder="保证金"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span=12>
          <el-form-item label="合同附件：" prop="baozhengjin">
            <iep-upload v-model="formData.fileList" :limit="1">
              <slot name="tip"><span>文件类型为excel，每次上传数量不超过一个</span></slot>
            </iep-upload>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
  </iep-drawer>
</template>
<script>
import { initFormData } from '../options'
import { mapGetters } from 'vuex'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      drawerShow: false,
      formData: initFormData(),
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  created () {
  },
  methods: {
    loadPage () {
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>

