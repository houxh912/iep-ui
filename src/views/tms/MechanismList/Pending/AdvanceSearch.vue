<template>
  <el-form class="form" :model="form" label-width="100px" size="mini">
    <el-form-item label="申请对象：">
      <el-input v-model="form.applyUserId"></el-input>
    </el-form-item>
    <el-form-item label="机构分类：">
      <el-input v-model="form.type"></el-input>
    </el-form-item>
    <el-form-item label="所属省：">
      <el-input v-model="form.province"></el-input>
    </el-form-item>
    <el-form-item label="行业：">
      <el-input v-model="form.line"></el-input>
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
import { dictsMap, initSearchForm } from '../options'
export default {
  data () {
    return {
      dictsMap,
      form: initSearchForm(),
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
<style scoped>
.form >>> .el-select {
  width: 100%;
}
</style>

