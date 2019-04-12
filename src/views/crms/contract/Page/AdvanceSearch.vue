<template>
  <div>
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="合同名称">
        <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
      </el-form-item>
      <el-form-item label="签订日期">
        <el-date-picker v-model="form.signTime" align="right" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="业务类型">
        <iep-dict-select v-model="form.businessTypeKey" dict-name="crms_business_type" multiple></iep-dict-select>
      </el-form-item>
      <el-form-item label="合同状态">
        <iep-dict-select v-model="form.contractStatus" dict-name="mlms_contract_status"></iep-dict-select>
      </el-form-item>
      <el-form-item label="合同级别">
        <iep-dict-select v-model="form.contractLevel" dict-name="mlms_contract_level"></iep-dict-select>
      </el-form-item>
      <!-- <el-form-item label="签署部门">
        <iep-dict-select v-model="form.signDeptName" dict-name="crms_client_opportunity_status" placeholder="请选择认领状态"></iep-dict-select>
      </el-form-item>
      <el-form-item label="市场经理">
        <el-input v-model="form.directorId" placeholder="请输入市场经理"></el-input>
      </el-form-item> -->
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { initSearchForm } from '../options'
export default {
  props: ['type'],
  data () {
    return {
      form: initSearchForm(),
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', { type: this.type, ...this.form })
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
