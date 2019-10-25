<template>
  <div class="aside-main">
    <operation-container>
      <template slot="left">
        <iep-button v-if="info_article_add" type="primary" plain @click="handleAdd">新增</iep-button>
        <iep-button :disabled="disabled" @click="handleTransfer">文章迁移</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="title">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @sort-change='sortChange' @selection-change="selectionChange">
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
        <el-table-column label="发布时间" width="150" sortable='custom' prop="createTime">
          <template slot-scope="scope">{{scope.row.createTime|parseToDay}}</template>
        </el-table-column>
        <el-table-column label="修改时间" width="150">
          <template slot-scope="scope">{{scope.row.updateTime|parseToDay}}</template>
        </el-table-column>
        <el-table-column label="浏览量" sortable='custom' width="120" prop='views'>
          <template slot-scope="scope">{{scope.row.views}}</template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button v-if="info_article_edit" @click="handleEdit(scope.row)">编辑</iep-button>
            <iep-button v-if="info_article_del" @click="handleFalseDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-transfer-form ref="DialogTransferForm" @load-transfer="loadTransfer"></dialog-transfer-form>
  </div>
</template>
<script>
import { getPage, logicDeleteNodeById } from '@/api/conm/article_controller'
import { columnsMap, dictsMap } from './options'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
import DialogTransferForm from './DialogTransferForm'
export default {
  mixins: [mixins],
  components: {
    DialogTransferForm,
  },
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [
      ],
      id: '',
      siteId: '',
      nodeName: '',
      defaultValue: new Date(new Date().toLocaleDateString()).getTime(),
      info_article_add: false,
      info_article_edit: false,
      info_article_del: false,
      sortList: {
        order: '',
        fieldName: '',
      },
      multipleSelection: [],
    }
  },
  created () {
    this.info_article_add = this.permissions['info_article_add']
    this.info_article_edit = this.permissions['info_article_edit']
    this.info_article_del = this.permissions['info_article_del']
    this.id = this.$route.params.id
    this.siteId = this.$route.query.siteId
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    disabled () {
      return this.multipleSelection.length == 0 ? true : false
    },
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/comn/document_management_edit/0',
        query: { nodeId: this.id, siteId: this.siteId },
      })
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleEdit (row) {
      this.$router.push({
        path: `/comn/document_management_edit/${row.id}`,
        query: { nodeId: this.id, siteId: this.siteId },
      })
    },
    handleTransfer () {
      this.$refs['DialogTransferForm'].dialogShow = true
      this.$refs['DialogTransferForm'].methodName = '迁移'
      this.$refs['DialogTransferForm'].articleIds = this.multipleSelection
      this.$refs['DialogTransferForm'].loadPage()
    },
    loadTransfer () {
      this.$refs['DialogTransferForm'].dialogShow = false
      this.loadPage()
    },
    sortChange (val) {
      this.sortList.order = val.order
      this.sortList.fieldName = val.prop
      this.loadPage()
      this.sortList = {
        order: '',
        fieldName: '',
      }
    },
    handleFalseDelete (row) {
      this._handleGlobalDeleteById(row.id, logicDeleteNodeById)
    },
    handleDetail (row) {
      this.$router.push(`/comn/document_management_detail/${row.id}`)
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ ...this.sortList, ...param, nodeId: this.id, siteId: this.siteId }, getPage)
    },
  },
}
</script>
<style scoped>
.aside-main >>> .el-table th > .cell {
  display: -webkit-box;
}
</style> 