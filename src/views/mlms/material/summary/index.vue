<template>
  <div>
    <basic-container v-if="pageState">
      <page-header title="纪要" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="handleDeleteByIds">删除</div></el-dropdown-item>
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
          <el-table-column label="会议标题">
            <template slot-scope="scope">
              <span @click="handleDetail(scope.row)">{{scope.row.title}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleCollection(scope.row)">收藏</iep-button>
              <iep-button @click="handleShare(scope.row)">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><div @click="handleEdit(scope.row)">修改</div></el-dropdown-item>
                  <el-dropdown-item><div @click="handleDeleteById(scope.row)">删除</div></el-dropdown-item>
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
    <detail-page ref="detailPage" v-else @backPage="pageState = true"></detail-page>
    <main-dialog ref="mainDialog" @load-page="loadPage"></main-dialog>
    <share-dialog ref="share"></share-dialog>
    <collection-dialog ref="collection"></collection-dialog>
  </div>
</template>
<script>
import { dictsMap, columnsMap, initSearchForm } from './options'
import mixins from '@/mixins/mixins'
import { mapState } from 'vuex'
import { getTableData, createData, updateData, deleteData, getDataById } from '@/api/mlms/material/summary'
import MainDialog from './mainDialog'
import ShareDialog from './shareDialog'
import CollectionDialog from './collectionDialog'
import DetailPage from './detail'

export default {
  mixins: [mixins],
  components: { MainDialog, ShareDialog, CollectionDialog, DetailPage },
  data () {
    return {
      data: [ 20, 3 ], // 头部
      dictsMap,
      columnsMap,
      // dicData: this.dictGroup['hrms_highest_educational'],
      paramForm: initSearchForm(),
      selectList: [],
      pageState: true,
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
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
      getDataById(row.id).then(({data}) => {
        console.log('data: ', data)
        this.$refs['mainDialog'].formData = {...data.data}
        this.$refs['mainDialog'].methodName = '修改'
        this.$refs['mainDialog'].formRequestFn = updateData
        this.$refs['mainDialog'].dialogShow = true
      })
    },
    handleDetail (row) {
      this.pageState = false
      getDataById(row.id).then(({data}) => {
        this.$refs['detailPage'].formData = data.data
      })
    },
    // 批量删除
    handleDeleteByIds () {
      this._handleGlobalDeleteAll(deleteData)
    },
    // id删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    handleSelectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTableData)
    },
    // 收藏
    handleCollection () {
      this.$refs['collection'].dialogShow = true
    },
    // 分享
    handleShare (row) {
      this.$refs['share'].dialogShow = true
      this.$refs['share'].list = [{ id: row.id, name: row.title }]
    },
    // 批量分享
    handleAllShare () {
      this.$refs['share'].dialogShow = true
      let list = []
      for (let item of this.selectList) {
        list.push({
          id: item.id,
          name: item.title,
        })
      }
      this.$refs['share'].list = list
    },
    // 头部subTitle方法
    replaceText (arr) {
      return `（本周收到 ${arr[0]} 篇纪要，发布 ${arr[1]} 篇纪要）`
    },
  },
}
</script>
