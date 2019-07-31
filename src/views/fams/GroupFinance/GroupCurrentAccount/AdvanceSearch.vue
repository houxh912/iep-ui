<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="往来分类：">
      <iep-dict-select v-model="form.category" dict-name="fams_current_bill_flow_type" clearable></iep-dict-select>
    </el-form-item>
    <el-form-item label="往来类别：">
      <el-select v-model="form.type" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.type" :key="k" :label="v" :value="k">
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
import { initSearchForm, dictsMap } from './options'
export default {
  data () {
    return {
      dictsMap,
      form: initSearchForm(),
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', (this.form))
    },
    clearSearchParam () {
      this.form = initSearchForm()
    },
  },
}
</script>
