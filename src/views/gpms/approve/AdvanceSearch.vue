<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="审批状态">
        <el-select v-model="form.projectStatus" placeholder="请选择审批状态" clearable>
          <el-option v-for="(v,k) in dictsMap.projectStatus" :key="k" :label="v" :value="+k">
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
  </div>
</template>
<script>
import { initSearchForm, dictsMap } from './option'
export default {
  data () {
    return {
      form: initSearchForm(),
      dictsMap,
    }
  },
  computed: {
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
    handleSelect (item) {
      console.log(item)
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

