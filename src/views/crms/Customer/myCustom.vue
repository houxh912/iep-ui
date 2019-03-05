<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" size="small" type="danger">新增</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导入</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item>转移</el-dropdown-item>
            <el-dropdown-item divided>添加协作人</el-dropdown-item>
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
      is-index
      isMutipleSelection
      @selection-change="selectionChange">
      <template slot="before-columns">
        <el-table-column label="客户名称" width="300px">
          <template slot-scope="scope">
            <div class="custom-name" @click="customDetail(scope.row)">{{scope.row.name}}</div>
            <el-col class="custom-tags">
              <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
    <custom-detail ref="detailDialog" @update-form="handleEdit"></custom-detail>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { myTableOption, dictsMap } from './const/index'
import { fetchList, createData, updateData, deleteDataById, fetchDetail } from '@/api/crms/custom'
import mainFormDialog from './mainDialog'
import CustomDetail from './detail/index'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { mainFormDialog, CustomDetail },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: myTableOption,
    }
  },
  methods: {
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = createData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '编辑'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    customDetail (row) {
      fetchDetail(row.id).then((res) => {
        console.log('res: ', res)
        this.$refs.detailDialog.open(res)
      })
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
