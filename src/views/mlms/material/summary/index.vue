<template>
  <div>
    <basic-container v-if="pageState==='list'">
      <page-header title="纪要" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds">删除</el-dropdown-item>
              <el-dropdown-item divided @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item @click.native="handleAllShare">分享</el-dropdown-item>
              <el-dropdown-item @click.native="downloadPic">下载为图片</el-dropdown-item>
              <el-dropdown-item @click.native="downloadPic">导出为文本</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :paramForm="paramForm" prop="title" advance-search>
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
            <operation-wrapper v-if="scope.row.status===0">
              <iep-button type="warning" @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
              <iep-button type="warning" v-else>已收藏</iep-button>
              <iep-button @click="handleShare(scope.row)">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDeleteById(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCopy(scope.row)">复制</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDownload(scope.row)">下载为图片</el-dropdown-item>
                  <el-dropdown-item @click.native="handleExport(scope.row)">导出为文本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
            <operation-wrapper v-else>
              <iep-button type="warning" @click="handleEdit(scope.row)">修改草稿</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail-page ref="detailPage" v-if="pageState==='detail'" @backPage="pageState = 'list'"></detail-page>
    <share-dialog ref="share" type="summary"></share-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="meeting" :requestFn="createCollect"></collection-dialog>
  </div>
</template>
<script>
import { dictsMap, columnsMap, initSearchForm } from './options'
import mixins from '@/mixins/mixins'
import { mapState } from 'vuex'
import { getTableData, deleteData, createCollect, copyData } from '@/api/mlms/material/summary'
import ShareDialog from './shareDialog'
import CollectionDialog from '../components/collectionDialog'
import DetailPage from './detail'

export default {
  mixins: [mixins],
  components: { ShareDialog, CollectionDialog, DetailPage },
  data () {
    return {
      data: [ 20, 3 ], // 头部
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      selectList: [],
      pageState: 'list',
      createCollect,
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
      this.$router.push('/mlms_spa/summary/create?back=/wel/material/summary')
    },
    handleEdit (row) {
      this.$router.push(`/mlms_spa/summary/create?back=/wel/material/summary&id=${row.id}`)
    },
    handleDetail (row) {
      // this.pageState = 'detail'
      // getDataById(row.id).then(({data}) => {
      //   this.$refs['detailPage'].formData = data.data
      // })
      // 切换详情查看的方式，使用路由进入到页面中来
      this.$router.push(`/mlms_spa/summary/detail/${row.id}`)
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
      this.pageState = 'list'
      this.loadTable(param, getTableData)
    },
    // 收藏
    handleCollection (row) {
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量收藏
    handleCollectAll () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要收藏的选项')
        return
      }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
    },
    // 分享
    handleShare (row) {
      this.$refs['share'].open([row])
    },
    // 批量分享
    handleAllShare () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要收藏的选项')
        return
      }
      this.$refs['share'].open(this.selectList)
    },
    // 头部subTitle方法
    replaceText (arr) {
      return `（本周收到 ${arr[0]} 篇纪要，发布 ${arr[1]} 篇纪要）`
    },
    // 批量下载为图片
    downloadPic () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
    // 下载为图片
    handleDownload () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
    // 复制
    handleCopy (row) {
      copyData(row.id).then(() => {
        this.$message.success('复制成功！')
        this.loadPage()
      })
    },
    // 导出为文本
    handleExport () {
      this.$message.error('抱歉，此功能尚未开发！')
    },
  },
}
</script>
