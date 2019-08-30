<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="角色类型：">
      <el-select v-model="form.type" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.type" :key="k" :label="v" :value="+k">
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
      // this.$emit('clear-search-param')
    },
  },
}
</script>
