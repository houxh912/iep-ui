<template>
  <!-- <el-row class="aside-main" :gutter="8">
    <el-col class="sub-menu-left" :span="4">
      <menus></menus>
    </el-col>
  <el-col :span="20">-->
  <div class="column-management">
    <basic-container>
      <iep-page-header title="栏目管理" :replaceText="replaceText" :data="statistics" :backOption="backOption"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="handleAdd">新增</iep-button>
          <!-- <el-dropdown size="medium">
              <iep-button type="default">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>移动</el-dropdown-item>
                <el-dropdown-item  @click.native="handleMerge">合并</el-dropdown-item>
                <el-dropdown-item>上移</el-dropdown-item>
                <el-dropdown-item>下移</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>-->
        </template>
        <!-- <template slot="right">
          <operation-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template> -->
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection is-tree>
        <template slot="before-columns">
          <el-table-column label="ID" width="90px">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="320" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click.stop="handleAdd(scope.row)">添加子栏目</iep-button>
              <!-- <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button> -->
              <iep-button @click="handleDoc(scope.row)">文档管理</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default">
                  <i class="el-icon-more-outline"></i>
                </iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-merge ref="DialogMerge" @load-page="loadPage"></dialog-merge>
  </div>
  <!-- </el-col>
  </el-row>-->
</template>
<script>
// import Menus from './Menus'
import { addObj, getPage, deleteNodeById, updateObj } from '@/api/conm/node_controller'
import { columnsMap, initSearchForm, dictsMap, toNewParentForm } from './options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
import DialogMerge from './DialogMerge'
export default {
  components: { DialogForm, DialogMerge },
  mixins: [mixins],
  data () {
    return {
      backOption: {
        isBack: true,
      },
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [0],
      replaceText: (data) => `（共${data[0]}条）`,
      pagedTable: [
      ],
      siteId: '',
    }
  },
  created () {
    this.siteId = this.$route.params.id
    this.loadPage()
  },
  methods: {
    handleAdd (row) {
      this.$refs['DialogForm'].form = toNewParentForm(row)
      this.$refs['DialogForm'].form.parentId = row.id
      this.$refs['DialogForm'].form.parentName = row.nodeName
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].formRequestFn = addObj
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].id = row.id
      this.$refs['DialogForm'].siteId = row.siteId
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].formRequestFn = updateObj
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleMerge () {
      this.$refs['DialogMerge'].dialogShow = true
      this.$refs['DialogMerge'].methodName = '合并'
    },
    handleDoc (row) {
      this.$router.push({
        path: `/comn/document_management/${row.id}`,
        query: { siteId: this.siteId, nodeName: row.nodeName },
      })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteNodeById)
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable({ ...param, siteId: this.siteId }, getPage)
      this.$set(this.statistics, 0, data.total)
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
.column-management >>> .table .cell {
  flex-wrap: inherit;
}
</style> 