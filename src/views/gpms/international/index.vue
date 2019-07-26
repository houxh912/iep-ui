<template>
  <basic-container>
    <iep-page-header title="项目公海"></iep-page-header>
    <operation-container>
      <template slot="left">
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" advance-search placeHolder="请输入项目名称" prop="projectName">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictMap="dictMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column label="项目名称" slot="before-columns" width="300px">
        <template slot-scope="scope">
          <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目金额" slot="before-columns">
        <template slot-scope="scope">
          <span v-if="scope.row.contractAmount">{{ scope.row.contractAmount }}（合同）</span>
          <span v-else>{{ scope.row.projectBudget }}（预算）</span>
        </template>
      </el-table-column>
      <el-table-column label="立项时间" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.approvalTime | parseToDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目状态">
        <template slot-scope="scope">
          <span v-if="scope.row.projectStatus==1">待提交</span>
          <span v-if="scope.row.projectStatus==2">待审核</span>
          <span v-if="scope.row.projectStatus==3">已立项</span>
          <span v-if="scope.row.projectStatus==4">审核未通过</span>
          <span v-if="scope.row.projectStatus==5">锁定</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <iep-button @click="handleDefine(scope.row)">认领</iep-button>
        </template>
      </el-table-column>
    </iep-table>
  </basic-container>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getProjectPage, statusDefine } from '@/api/gpms/fas'
import { columnsMap, dictMap } from './option'

export default {
  mixins: [mixins],
  data () {
    return {
      // replaceText: (data) => `[共${data[0]}条数据]`,
      columnsMap,
      dictMap,
    }
  },
  created () {
  },
  methods: {
    async loadPage (params = {}) {
      await this.loadTable(Object.assign({}, params, this.searchForm), getProjectPage)
      // this.statistics = data.total
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    handleDefine (row) {
      this.$confirm('是否确认认领此数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        statusDefine([row.id]).then(() => {
          this.$message.success('取消成功！')
          this.loadPage()
        })
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/gpms_spa/project/detail/${row.id}`,
      })
    },
  },
  mounted () {
    this.searchForm.listType = 3
    this.loadPage()
  },
}
</script>
<style scoped>
</style>
