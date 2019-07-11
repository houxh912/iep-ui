<template>
  <div>
    <basic-container>
      <iep-page-header title="发行记录"></iep-page-header>
      <operation-container>
        <template slot="left">
          <operation-wrapper>
            <iep-button type="primary" @click="handleIssued" icon="el-icon-plus" plain>发币</iep-button>
            <iep-button @click="handleSearchAmount">查询成员余额</iep-button>
          </operation-wrapper>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="hash" placeholder="输入Hash值查询交易信息">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <search-form ref="SearchForm" @load-page="loadPage"></search-form>
  </div>
</template>
<script>
import { columnsMap } from './options'
import { getCoinPage } from '@/api/fams/block_chain'
import mixins from '@/mixins/mixins'
import SearchForm from './SearchForm'
import DialogForm from './DialogForm'
export default {
  components: { DialogForm, SearchForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSearchAmount () {
      this.$refs['SearchForm'].dialogShow = true
    },
    handleIssued () {
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      try {
        await this.loadTable(param, getCoinPage)
      } catch (error) {
        this.$message(error.message)
      }
    },
  },
}
</script>
