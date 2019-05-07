<template>
  <div>
    <basic-container>
      <page-header title="线下公司设置"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="(scope.row)">编辑</iep-button>
              <iep-button @click="(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getCompanyPage } from '@/api/fams/company'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getCompanyPage)
    },
  },
}
</script>