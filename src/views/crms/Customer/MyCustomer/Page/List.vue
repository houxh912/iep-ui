<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" icon="el-icon-plus" type="danger" plain>新增</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleImport">导入</el-dropdown-item>
            <el-dropdown-item command="handleAllDelete">删除</el-dropdown-item>
            <el-dropdown-item>转移</el-dropdown-item>
            <el-dropdown-item divided @click.native="handleCooperation(id)">添加协作人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="客户名称">
              <el-input v-model="paramForm.clientName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index isMutipleSelection @selection-change="handleSelectionChange">
      <template slot="before-columns">
        <el-table-column label="客户名称" width="250px">
          <template slot-scope="scope">
            <div class="custom-name" @click="customDetail(scope.row)">{{scope.row.clientName}}</div>
            <el-col class="custom-tags">
              <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tags" :key="index">{{item.commonName}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- 导入弹窗 -->
    <iep-dialog :dialog-show="dialogShow" title="导入" @close="close">
      <excel-import :urlName="url" @close="handleCloseImport"></excel-import>
    </iep-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { myTableOption, dictsMap, initSearchForm } from '../../options'
import { fetchList, deleteDataById } from '@/api/crms/custom'
import IepDialog from '@/components/IepDialog/'
export default {
  name: 'custom',
  mixins: [mixins],
  components: { IepDialog },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: myTableOption,
      ids: [],
      id: '',
      paramForm: initSearchForm(),
      dialogShow: false,
      url: '/api/crm/crms/iepclientinfoexcel/upload',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$emit('onAdvance')
    },
    handleEdit (row) {
      this.$emit('onEdit', { id: row.clientId })
    },
    handleCooperation (id) {
      this.$emit('onCooper', { id: id })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientId, deleteDataById)
    },
    handleSelectionChange (val) {
      console.log(val)
      let id = val[0].clientId
      this.id = id
      // let ids = []
      // val.forEach((item) => {
      //   ids.push(item.id)
      // })
      // this.ids = ids
    },
    loadPage (param = { ...this.paramForm, type: 2 }) {
      this.loadTable(param, fetchList, m => {
        return Object.assign(m, { businessTypeC: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    searchPage () {
      this.loadTable({ ...this.paramForm, type: 2 }, fetchList, m => {
        return Object.assign(m, { businessTypeC: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
    customDetail (row) {
      // fertchInfo(row.clientId).then((res) => {
      //   console.log(res)
      // })
      this.$emit('onDetail', row)
    },
    handleCommand (command) {
      this[command]()
    },
    // 添加协作人
    collaborator () {
      this.$refs['collaboratorDialog'].loadPage()
    },
    // 批量删除
    handleAllDelete () {
      console.log('ids: ', this.ids)
    },
    //导入
    handleImport () {
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    },
    handleCloseImport (res) {
      this.dialogShow = false
      this.loadPage()
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
          duration: 15000,
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
          duration: 15000,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
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
