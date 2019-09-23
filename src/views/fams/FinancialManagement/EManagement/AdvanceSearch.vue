<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="时间：">
      <iep-date-picker v-model="form.rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </iep-date-picker>
    </el-form-item>
    <el-form-item label="类型：">
      <iep-dict-cascader dictName="fams_expenditure_type" v-model="form.type" clearable></iep-dict-cascader>
    </el-form-item>
    <el-form-item label="线下公司：">
      <el-input v-model="form.companyName" clearable></el-input>
    </el-form-item>
    <el-form-item label="支出方式：">
      <el-select v-model="form.expenditureMode" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.expenditureMode" :key="k" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="银行账户：">
      <el-input v-model="form.bankAccount" clearable></el-input>
    </el-form-item>
    <el-form-item label="备注：">
      <el-input v-model="form.remarks" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <operation-wrapper>
        <iep-button type="primary" @click="searchPage">搜索</iep-button>
        <iep-button @click="clearSearchParam">清空</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>

<script>
import { dictsMap, initSearchForm, toDtoSearchForm } from './options'
import { pickerOptions } from '@/const/formConfig.js'
export default {
  data () {
    return {
      pickerOptions,
      dictsMap,
      form: initSearchForm(),
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
