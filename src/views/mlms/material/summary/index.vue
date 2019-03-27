<template>
  <basic-container>
    <div v-if="pageState==='list'">
      <page-header title="纪要" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="handleDeleteByIds">删除</div></el-dropdown-item>
              <el-dropdown-item divided><div @click="handleCollectAll">收藏</div></el-dropdown-item>
              <el-dropdown-item><div @click="handleAllShare">分享</div></el-dropdown-item>
              <el-dropdown-item>下载为图片</el-dropdown-item>
              <el-dropdown-item>导出为文本</el-dropdown-item>
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
            <operation-wrapper>
              <iep-button type="warning" @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
              <iep-button type="warning" v-else>已收藏</iep-button>
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
    </div>
    <detail-page ref="detailPage" v-if="pageState==='detail'" @backPage="pageState = 'list'"></detail-page>
    <main-dialog ref="mainDialog" v-if="pageState==='form'" @load-page="loadPage"></main-dialog>
    <share-dialog ref="share"></share-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="meeting" :requestFn="createCollect"></collection-dialog>
  </basic-container>
</template>
<script>
import { dictsMap, columnsMap, initSearchForm } from './options'
import mixins from '@/mixins/mixins'
import { mapState } from 'vuex'
import { getTableData, createData, updateData, deleteData, getDataById, createCollect } from '@/api/mlms/material/summary'
import MainDialog from './mainDialog'
import ShareDialog from './shareDialog'
import CollectionDialog from '../components/collectionDialog'
import DetailPage from './detail'

export default {
  mixins: [mixins],
  components: { MainDialog, ShareDialog, CollectionDialog, DetailPage },
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
      this.pageState = 'form'
      this.$nextTick(() => {
        this.$refs['mainDialog'].methodName = '创建'
        this.$refs['mainDialog'].formRequestFn = createData
        this.$refs['mainDialog'].dialogShow = true
      })
    },
    handleEdit (row) {
      getDataById(row.id).then(({data}) => {
        this.pageState = 'form'
        this.$nextTick(() => {
          data.data.receiverList = {
            orgs: data.data.receiver.orgs ? data.data.receiver.orgs: [],
            users: data.data.receiver.user ? data.data.receiver.user: [],
          }
          data.data.attendeeList = {
            orgs: data.data.attendee.orgs ? data.data.attendee.orgs: [],
            users: data.data.attendee.user ? data.data.attendee.user: [],
          }
          data.data.hostList = data.data.host[0]
          this.$refs['mainDialog'].formData = {...data.data}
          this.$refs['mainDialog'].methodName = '修改'
          this.$refs['mainDialog'].formRequestFn = updateData
          this.$refs['mainDialog'].dialogShow = true
        })
      })
    },
    handleDetail (row) {
      this.pageState = 'detail'
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
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
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
