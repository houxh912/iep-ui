<template>
  <el-form class="form" :model="form" label-width="100px" size="mini">
    <el-form-item label="机构分类：">
      <el-input v-model="form.type"></el-input>
    </el-form-item>
    <el-form-item label="所属省：">
      <iep-cascader v-model="form.currentParmas" prefix-url="admin/city"></iep-cascader>
    </el-form-item>
    <el-form-item label="行业：">
      <el-input v-model="form.line"></el-input>
    </el-form-item>
    <el-form-item label="认证状态：">
      <el-select v-model="form.claimStatus">
        <el-option v-for="(v,k) in dictsMap.claimStatus" :key="k+v" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="form.isForbidden">
        <el-option v-for="(v,k) in dictsMap.isForbidden" :key="k+v" :label="v" :value="+k">
        </el-option>
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
.form >>> .el-cascader {
  width: 100%;
}
</style>

