<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="发送者：">
      <iep-contact-select v-model="form.send"></iep-contact-select>
    </el-form-item>
    <el-form-item label="接受者：">
      <iep-contact-select v-model="form.receive"></iep-contact-select>
    </el-form-item>
    <el-form-item label="时间范围：">
      <iep-date-picker v-model="form.rangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </iep-date-picker>
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
import { initSearchForm, toDtoSearchForm } from './options'
import { pickerOptions } from '@/const/formConfig.js'
export default {
  data () {
    return {
      form: initSearchForm(),
      pickerOptions,
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', toDtoSearchForm(this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
      // this.$emit('clear-search-param')
    },
  },
}
</script>
