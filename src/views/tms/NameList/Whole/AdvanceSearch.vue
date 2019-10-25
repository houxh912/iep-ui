<template>
  <el-form class="form" :model="form" label-width="100px" size="mini">
    <el-form-item label="性别：">
      <el-select v-model="form.sex">
        <el-option v-for="(v,k) in dictsMap.sex" :key="k+v" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属省：">
      <iep-cascader v-model="form.currentParmas" prefix-url="admin/city"></iep-cascader>
    </el-form-item>
    <el-form-item label="联系电话：">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="毕业学校：">
      <el-input v-model="form.university"></el-input>
    </el-form-item>
    <el-form-item label="状态：">
      <el-select v-model="form.lockFlag">
        <el-option v-for="(v,k) in dictsMap.lockFlag" :key="k+v" :label="v" :value="+k">
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
      this.form = initSearchForm()
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