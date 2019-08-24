<template>
  <!-- <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <menus></menus>
    </el-col>
  <el-col :span="20">-->
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" plain @click="handleAdd">新增</iep-button>
        <!-- <iep-button>移动</iep-button> -->
        <!-- <el-dropdown size="medium">
            <iep-button type="default">
              更多操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
      </template>
      <!-- <template slot="right">
        <operation-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template> -->
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="ID" width="90px">
          <template slot-scope="scope">
            <div>{{scope.row.id}}</div>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="200px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.title}}</iep-table-link>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">{{scope.row.updateTime|parseToDay}}</template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <operation-wrapper>
            <!-- <iep-button>查看评论</iep-button> -->
            <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button @click="handleFalseDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- </el-col>
    </el-row>-->
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
// import Menus from './Menus'
import { addObj, getPage, logicDeleteNodeById, updateObj } from '@/api/conm/article_controller'
import { columnsMap, initSearchForm, dictsMap } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  // components: { Menus },
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      pagedTable: [
      ],
      id: '',
      siteId: '',
      nodeName: '',
      defaultValue: new Date(new Date().toLocaleDateString()).getTime(),
    }
  },
  created () {
    this.id = this.$route.params.id
    this.siteId = this.$route.query.siteId
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form.updateTime = this.$refs['DialogForm'].createTimeDefault()
      this.$refs['DialogForm'].nodeId = this.id
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleFalseDelete (row) {
      this._handleGlobalDeleteById(row.id, logicDeleteNodeById)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].id = row.id
      this.$refs['DialogForm'].nodeId = this.id
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].formRequestFn = updateObj
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDetail (row) {
      this.$router.push(`/comn/document_management_detail/${row.id}`)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ ...param, nodeId: this.id, siteId: this.siteId }, getPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.aside-main {
  display: flex;
  margin: 0 !important;
  padding: 20px;
  width: 100%;
  height: 100vh;
}
.sub-menu-left {
  margin: -20px 15px -20px -20px;
  padding-top: 12px;
  border-right: 1px solid #ebeef5;
  .el-card {
    border: 0;
  }
}
</style>
<style scoped>
.aside-main >>> .ant-menu-inline {
  border-right: none;
}
</style> 