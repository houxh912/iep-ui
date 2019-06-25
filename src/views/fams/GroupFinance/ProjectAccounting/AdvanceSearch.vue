<template>
  <el-form class="form-detail" :model="form" label-width="100px" size="mini">
    <el-form-item label="时间：">
      <iep-date-picker v-model="form.businessDate" type="month">
      </iep-date-picker>
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
