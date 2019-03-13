<template>
  <div>
    <basic-container>
      <page-header title="组织管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>收藏</el-dropdown-item>
              <el-dropdown-item><div @click="handleAllShare">分享</div></el-dropdown-item>
              <el-dropdown-item>下载为图片</el-dropdown-item>
              <el-dropdown-item>导出为文本</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" :paramForm="paramForm" advance-search>
            <el-form :model="paramForm" label-width="80px" size="small">
              <el-form-item label="会议标题">
                <el-input v-model="paramForm.biaoti"></el-input>
              </el-form-item>
              <el-form-item label="会议类型">
                <el-input v-model="paramForm.type"></el-input>
              </el-form-item>
              <el-form-item label="会议时间">
                <el-input v-model="paramForm.shijian"></el-input>
              </el-form-item>
              <el-form-item label="会议标签">
                <el-input v-model="paramForm.code"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table 
        :isLoadTable="isLoadTable" 
        :pagination="pagination" 
        :dictsMap="dictsMap" 
        :columnsMap="columnsMap" 
        :pagedTable="pagedTable" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        @selection-change="handleSelectionChange" 
        is-mutiple-selection is-index>
        <template slot="before-columns">
          <el-table-column label="组织名称" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleCollection(scope.row)">收藏</iep-button>
              <iep-button @click="handleShare(scope.row)">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><div @click="handleEdit(scope.row)">修改</div></el-dropdown-item>
                  <el-dropdown-item><div @click="handleDeleteById(scope.row)"></div>删除</el-dropdown-item>
                  <el-dropdown-item>复制</el-dropdown-item>
                  <el-dropdown-item>下载为图片</el-dropdown-item>
                  <el-dropdown-item>导出为文本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <main-dialog ref="mainDialog"></main-dialog>
    <share-dialog ref="share"></share-dialog>
    <collection-dialog ref="collection"></collection-dialog>
  </div>
</template>
<script>
import { dictsMap, columnsMap, initSearchForm } from './options'
import mixins from '@/mixins/mixins'
import { getTableData, createData, updateData, deleteData } from '@/api/mlms/material/summary'
import MainDialog from './mainDialog'
import ShareDialog from './shareDialog'
import CollectionDialog from './collectionDialog'

export default {
  mixins: [mixins],
  components: { MainDialog, ShareDialog, CollectionDialog },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleAdd () {
      this.$refs['mainDialog'].methodName = '创建'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = {...row}
      this.$refs['mainDialog'].methodName = '修改'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTableData)
    },
    // 收藏
    handleCollection () {
      this.$refs['collection'].dialogShow = true
    },
    // 分享
    handleShare () {
      this.$refs['share'].dialogShow = true
    },
    // 批量分享
    handleAllShare () {},
  },
}
</script>
