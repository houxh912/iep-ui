<template>
  <div>
    <div v-if="pageState=='list'">
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium">
            <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增{{routerData}}<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="localCreate">本地上传</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="newlyCreate">新建文档</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds">删除</el-dropdown-item>
              <el-dropdown-item divided @click.native="handleExport">导出</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item @click.native="handleAllShare">分享</el-dropdown-item>
              <el-dropdown-item>下载</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :paramForm="paramForm" advance-search>
            <el-form :model="paramForm" label-width="80px" size="small">
              <el-form-item label="材料名称">
                <el-input v-model="paramForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection @selection-change="selectionChange">
        <template slot="before-columns">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <div class="custom-name">{{scope.row.name}}</div>
              <el-col class="custom-tags">
                <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" size="small" @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
              <iep-button type="warning" size="small" v-else>已收藏</iep-button>
              <iep-button size="small" @click="handleShare(scope.row)">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDeleteById(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleContribute(scope.row)">投稿</el-dropdown-item>
                  <el-dropdown-item @click.native="handleEdition(scope.row)">上传新版本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <local-dialog ref="local" @load-page="loadPage" v-if="pageState=='local'" :firstClass="firstClass" :router='router'></local-dialog>
    <newly-dialog ref="newly" @load-page="loadPage" v-if="pageState=='newly'" :firstClass="firstClass"></newly-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="material" :requestFn="createCollect"></collection-dialog>
    <share-dialog ref="share" type="material"></share-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, createData, updateData, deleteData, getDataById } from '@/api/mlms/material/datum/material'
import { createCollect } from '@/api/mlms/material/summary'
import LocalDialog from './localDialog'
import NewlyDialog from './newlyDialog'
import CollectionDialog from '../../components/collectionDialog'
import ShareDialog from '../../summary/shareDialog'
import { getConfigureTree } from '@/api/mlms/material/datum/configure'

export default {
  mixins: [mixins],
  components: { LocalDialog, NewlyDialog, CollectionDialog, ShareDialog },
  computed: {},
  data () {
    return {
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      paramForm: {},
      selectList: [],
      createCollect,
      firstClass: [],
      routerData: {},
      router: false,
    }
  },
  created () {
    this.loadPage()
    this.getRouter()
    this.pageState = 'local'
    if (this.router) {
      this.pageState = 'local'
      let name = this.routerData.atchUpload
      this.$nextTick(() => {
        this.$refs[this.pageState].methodName = '新建'
        this.$refs['local'].formRequestFn = createData
        this.$refs['local'].formData.materialName = this.routerData.programName
        this.$refs['local'].formData.attachFileList = [{ name: name }]

      })
    }
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
  },
  methods: {
    getRouter () {
      this.routerData = this.$route.query.data
      this.router = this.$route.query.router
    },
    handleEdit (row) {
      // 0是本地，1是新建
      this.pageState = row.type === 0 ? 'local' : 'newly'
      getDataById(row.id).then((res) => {
        this.$refs[this.pageState].firstClassChange(res.data.data.firstClass)
        this.$refs[this.pageState].formData = res.data.data
        this.$refs[this.pageState].methodName = '编辑'
        this.$refs[this.pageState].formRequestFn = updateData
      })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteData)
    },
    // 批量删除
    handleDeleteByIds () {
      this._handleGlobalDeleteAll(deleteData)
    },
    selectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param) {
      this.pageState = 'list'
      this.loadTable(param, getTableData)
    },
    // 本地上传
    localCreate () {
      this.pageState = 'local'
      this.$nextTick(() => {
        this.$refs[this.pageState].methodName = '新建'
        this.$refs['local'].formRequestFn = createData
      })
    },
    // 新建文档
    newlyCreate () {
      this.pageState = 'newly'
      this.$nextTick(() => {
        this.$refs[this.pageState].methodName = '新建'
        this.$refs['newly'].formRequestFn = createData
      })
    },
    // 清空搜索
    clearSearchParam () { },
    // 收藏
    handleCollection (row) {
      row.title = row.name
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量收藏
    handleCollectAll () {
      if (this.selectList.length == 0) {
        this.$message.info('请先选择需要收藏的选项')
        return
      }
      for (let item of this.selectList) {
        item.title = item.name
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
        this.$message.error('请先选择需要分享的选项')
        return
      }
      this.$refs['share'].open(this.selectList)
    },
    // 导出
    handleExport () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 下载
    handleDownload () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 投稿
    handleContribute () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 上传新版本
    handleEdition () {
      this.$message.error('抱歉，此功能尚未开发')
    },

  },
  watch: {
    '$route': 'getRouter',
  },
}
</script>

<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  // text-decoration: underline;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
