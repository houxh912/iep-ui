<template>
  <div>
    <div v-if="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="danger" @click="handleAdd"><i class="el-icon-plus"></i> 新增</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="handleDeleteByIds">删除</div></el-dropdown-item>
              <el-dropdown-item divided>导出</el-dropdown-item>
              <el-dropdown-item><div @click="handleCollectAll">收藏</div></el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
              <el-dropdown-item>下载</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
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
        isMutipleSelection
        @selection-change="selectionChange">
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
              <iep-button size="small">分享</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><div @click="handleEdit(scope.row)">修改</div></el-dropdown-item>
                  <el-dropdown-item><div @click="handleDeleteById(scope.row)">删除</div></el-dropdown-item>
                  <el-dropdown-item>投稿</el-dropdown-item>
                  <el-dropdown-item>上传新版本</el-dropdown-item>
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
import { getTableData, createData, updateData, deleteData, getDataById } from '@/api/mlms/material/datum/aptitude'
import { createCollect } from '@/api/mlms/material/summary'
import MainDialog from './mainDialog'
import CollectionDialog from '../../components/collectionDialog'

export default {
  mixins: [mixins],
  components: { MainDialog, CollectionDialog },
  computed: {},
  data () {
    return {
      selectList: [],
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      createCollect,
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
      getDataById(row.id).then(({data}) => {
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
      this.loadTable(param, getTableData)
    },
    // 收藏
    handleCollection (row) {
      row.title = row.name
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 批量收藏
    handleCollectAll () {
      for(let item of this.selectList) {
        item.title = item.name
      }
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList(this.selectList)
    },
  },
  created () {
    this.loadPage()
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
