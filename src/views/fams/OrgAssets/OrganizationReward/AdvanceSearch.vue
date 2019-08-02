<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="所属组织：">
      <iep-select v-model="form.orgId" prefix-url="admin/org/all" clearable></iep-select>
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
import { initSearchForm } from './options'
export default {
  data () {
    return {
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
