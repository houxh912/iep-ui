<template>
  <div>
    <basic-container>
      <page-header title="我发出的建议"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="收件人" width="120px">
            <template slot-scope="scope">
              {{scope.row.attendeeList[0]}}
            </template>
          </el-table-column>
          <el-table-column label="主题">
            <template slot-scope="scope">
              {{scope.row.theme}}<i class="iconfont icon-fujian" v-show="scope.row.annex"></i>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button @click="handleEdit(scope.row)" v-if="scope.row.status==0">修改</iep-button>
              <iep-button @click.native="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { getSuggestionIssuePage } from '@/api/hrms/suggestion'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from './options'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, getSuggestionIssuePage)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleAdd () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
    handleEdit (row) {
      this.$router.push(`/hrms_spa/suggestion_edit/${row.id}`)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/suggestion_detail/${row.id}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
