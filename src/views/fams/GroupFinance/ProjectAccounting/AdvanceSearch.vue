<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="年度：">
      <iep-date-picker v-model="form.businessYear" type="year" placeholder="请选择年份">
      </iep-date-picker>
    </el-form-item>
    <el-form-item label="组织名称：">
      <el-input v-model="form.orgName" placeholder="请选择组织"></el-input>
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
      // this.$emit('clear-search-param')
    },
  },
}
</script>
