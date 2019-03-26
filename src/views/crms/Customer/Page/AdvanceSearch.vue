<template>
  <el-form :model="form" label-width="80px" size="mini">
    <el-form-item label="客户名称">
      <el-input v-model="form.clientName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
    <!-- <el-form-item label="业务类型">
              <el-select v-model="form.businessType" placeholder="选择业务类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域类型">
              <el-select v-model="form.districtType" placeholder="选择区域类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户关系">
              <el-select v-model="form.clientRela" placeholder="选择客户关系">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟进状态">
              <el-select v-model="form.followUpStatus" placeholder="选择跟进状态">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item> -->
    <!-- <el-form-item label="市场经理">
              <el-input v-model="form.marketManager" placeholder="请输入市场经理"></el-input>
            </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="searchPage">搜索</el-button>
      <el-button @click="clearSearchParam">清空</el-button>
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
      // this.$emit('clear-search-param')
    },
  },
}
</script>
