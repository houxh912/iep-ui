<template>
  <div>
    <div v-if="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds" v-if="lookByMeOnly || permission_delete">删除</el-dropdown-item>
              <el-dropdown-item @click.native="handleExportAll">导出</el-dropdown-item>
              <el-dropdown-item @click.native="handleCollectAll">收藏</el-dropdown-item>
              <el-dropdown-item @click.native="handleShareAll">分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-checkbox v-model="lookByMeOnly" @change="changeGetWay">只看我的</el-checkbox>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection @selection-change="selectionChange">
        <template slot="before-columns">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <div class="row-tpl" @click="handleDetail(scope.row)">
                <div class="custom-name">{{scope.row.name}}</div>
                <el-col class="custom-tags">
                  <el-tag type="warning" size="mini">{{scope.row.creatorRealName}}</el-tag>
                  <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tagKeyWords" :key="index">{{item}}</el-tag>
                </el-col>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="300">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleCollection(scope.row)" v-if="scope.row.collection===0">收藏</iep-button>
              <iep-button type="warning" plain size="small" v-else>已收藏</iep-button>
              <!-- <iep-button size="small">分享</iep-button> -->
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)" v-if="lookByMeOnly || permission_edit">修改</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDeleteById(scope.row)" v-if="lookByMeOnly || permission_delete">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleContribute(scope.row)">投稿</el-dropdown-item>
                  <el-dropdown-item @click.native="handleEdition(scope.row)">上传新版本</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <main-dialog ref="mainDialog" @load-page="loadPage" v-if="pageState=='dialog'"></main-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="honor" :requestFn="createCollect"></collection-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, getTableDataOnlyMe, createData, updateData, deleteData, getDataById } from '@/api/mlms/material/datum/aptitude'
import { createCollect } from '@/api/mlms/material/summary'
import MainDialog from './mainDialog'
import CollectionDialog from '../../components/collectionDialog'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixins],
  components: { MainDialog, CollectionDialog },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      selectList: [],
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      createCollect,
      getTableDataFn: getTableData,
      permission_edit: false,
      permission_delete: false,
      lookByMeOnly: false,
    }
  },
  methods: {
    handleAdd () {
      this.pageState = 'dialog'
      this.$nextTick(() => {
        this.$refs['mainDialog'].methodName = '新增'
        this.$refs['mainDialog'].formRequestFn = createData
      })
    },
    handleEdit (row) {
      this.pageState = 'dialog'
      getDataById(row.id).then(({ data }) => {
        this.$refs['mainDialog'].formData = data.data
        this.$refs['mainDialog'].methodName = '编辑'
        this.$refs['mainDialog'].formRequestFn = updateData
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
      this.loadTable(param, this.getTableDataFn)
    },
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
    // 批量导出
    handleExportAll () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 批量分享
    handleShareAll () {
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
    // 只看我的
    changeGetWay (val) {
      this.getTableDataFn = val ? getTableDataOnlyMe : getTableData
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
    this.permission_edit = this.permissions['mlms_datum_edit']
    this.permission_delete = this.permissions['mlms_datum_delete']
  },
}
</script>

<style lang="scss" scoped>
.row-tpl {
  width: 100%;
  cursor: pointer;
  .custom-name {
    margin-bottom: 10px;
    width: 100%;
  }
  .custom-tags {
    margin: 0;
    .el-tag {
      margin: 0 5px 5px 0;
      height: 26px;
      line-height: 26px;
    }
  }
}
</style>
