<template>
  <div>
    <basic-container>
      <iep-page-header title="友情链接管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" v-if="this.type==0" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
          <iep-button type="primary" v-if="this.type==1" plain @click="handleTypeAdd" icon="el-icon-plus">新增分类</iep-button>
          <iep-button @click="handleListManagement">列表管理</iep-button>
          <iep-button @click="handleTypeManagement">分类管理</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search>
          </operation-search>
        </template> -->
      </operation-container>
      <iep-table v-if="this.type==0" :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" type="primary" plain>编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <iep-table v-if="this.type==1" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnTypeMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleTypeEdit(scope.row)" type="primary" plain>编辑</iep-button>
              <iep-button @click="handleTypeDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-type-form ref="DialogTypeForm" @load-page="loadPage"></dialog-type-form>
  </div>
</template>
<script>
import { getPage, postPage, updatePage, deleteFLinkById } from '@/api/conm/f_link_controller'
import { getTypePage, postTypePage, updateTypePage, deleteFLinkTypeById } from '@/api/conm/f_link_type_controller'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, columnTypeMap } from './options'
import DialogForm from './DialogForm'
import DialogTypeForm from './DialogTypeForm'
export default {
  mixins: [mixins],
  components: { DialogForm, DialogTypeForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      columnTypeMap,
      type: 0,
      pagedTable: [
      ],
      isLoadTable: false,
      siteId: '',
    }
  },
  created () {
    this.siteId = this.$route.params.id
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].formRequestFn = postPage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleTypeAdd () {
      this.$refs['DialogTypeForm'].siteId = this.siteId
      this.$refs['DialogTypeForm'].formRequestFn = postTypePage
      this.$refs['DialogTypeForm'].dialogShow = true
      this.$refs['DialogTypeForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].id = row.friendlinkId
      this.$refs['DialogForm'].formRequestFn = updatePage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleTypeEdit (row) {
      this.$refs['DialogTypeForm'].siteId = this.siteId
      this.$refs['DialogTypeForm'].id = row.friendlinktypeId
      this.$refs['DialogTypeForm'].formRequestFn = updateTypePage
      this.$refs['DialogTypeForm'].dialogShow = true
      this.$refs['DialogTypeForm'].loadTypeList()
      this.$refs['DialogTypeForm'].methodName = '编辑'
    },
    handleListManagement () {
      this.type = 0
      this.loadPage()
    },
    handleTypeManagement () {
      this.type = 1
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.friendlinkId, deleteFLinkById)
    },
    handleTypeDelete (row) {
      this._handleGlobalDeleteById(row.friendlinktypeId, deleteFLinkTypeById)
    },
    // async loadPage () {
    //   getPageById(this.siteId).then((data) => {
    //     const newData = data.data.data
    //     this.pagedTable = newData
    //   })

    // },
    async loadPage (param = this.searchForm) {
      (this.type == 0) ? await this.loadTable({ ...param, siteId: this.siteId }, getPage) :
        await this.loadTable({ ...param, siteId: this.siteId }, getTypePage)
    },
  },
}
</script>