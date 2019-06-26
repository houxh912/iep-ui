<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="时间：">
      <iep-date-picker v-model="form.date" type="month" placeholder="请选择年与月"></iep-date-picker>
    </el-form-item>
    <el-form-item label="只选当年：">
      <el-checkbox v-model="form.onlyYear">只选年</el-checkbox>
    </el-form-item>
    <el-form-item label="签订状态：">
      <el-select v-model="form.signatureStatus">
        <el-option label="全部" value=""></el-option>
        <el-option label="待签" value="2"></el-option>
        <el-option label="已签" value="1"></el-option>
      </el-select>
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
export default {
  data () {
    return {
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