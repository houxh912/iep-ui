<template>
  <div>
    <basic-container>
      <page-header title="政策资讯"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable"
        @size-change="handleSizeChange" @current-change="handleCurrentChange"
        is-mutiple-selection is-index>
        <el-table-column prop="source" label="来源">
          <template slot-scope="scope">
            {{scope.row.source}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="资讯标题">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发文时间">
          <template slot-scope="scope">
            {{scope.row.publishTime}}
          </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="上传者">
          <template slot-scope="scope">
            {{scope.row.creatorName}}
          </template>
        </el-table-column>
        <el-table-column prop="examineUserName" label="审核人">
          <template slot-scope="scope">
            {{scope.row.examineUserName}}
          </template>
        </el-table-column>
        <el-table-column prop="examineDate" label="审核通过时间">
          <template slot-scope="scope">
            {{scope.row.examineDate}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleShow(scope.row)">查看</iep-button>
              <iep-button plain @click="handleEdit(scope.row)">修改</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getInformationPage,deleteInformationById } from '@/api/govdata/policyManage/information/information'
export default {
  mixins: [mixins],
  data () {
    return {}
  },
  created () {
    this.loadPage ()
  },
  methods: {
    /**
     * 获取政策数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInformationPage)
    },
    /**
     * 查看按钮
     */
    handleShow (rows) {
      console.log(rows)
    },
    /**
     * 修改按钮
     */
    handleEdit (rows) {
      console.log(rows)
    },
    /**
     * 删除按钮
     */
    handleDelete (rows) {
      console.log(rows)
      const id = rows.id
      this._handleGlobalDeleteById([id], deleteInformationById)
    },
  },
}
</script>
