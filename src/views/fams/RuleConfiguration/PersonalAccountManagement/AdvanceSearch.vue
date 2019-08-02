<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="组织名称：">
      <el-input v-model="form.orgName" placeholder="请输入组织名称"></el-input>
    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="form.accountStatus" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.accountStatus" :key="k" :label="v" :value="+k">
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
import { dictsMap, initSearchForm } from './options'
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
