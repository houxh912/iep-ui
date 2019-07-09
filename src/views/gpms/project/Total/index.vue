<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" @click="handleCreate"  plain>新增</iep-button>
        <iep-button v-if="onlyResponsible==true" @click="handleDeleteAll" >批量删除</iep-button>
        <iep-button v-if="onlyResponsible==true" @click="transferMentor" >批量移交</iep-button>
      </template>
      <template slot="right">
        <el-checkbox v-model="onlyResponsible" @change="changeResponsible()">仅看我负责的项目</el-checkbox>
        <operation-search @search-page="searchPage" @closed="dialogIsShow = true" advance-search placeHolder="请输入项目名称" :dialogIsShow="dialogIsShow" prop="projectName">
          <!--title-->
          <!-- <el-row class="search">
            <el-col :span="23">高级搜索</el-col>
            <el-col :span="1">
              <i class="iconfon el-icon-plus" @click="closeDialog" style="cursor: pointer;"></i>
            </el-col>
          </el-row> -->
          <!--表单-->
          <!-- <search-form></search-form> -->
            <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection @selection-change="selectionChange" :dictsMap="dictMap">
      <el-table-column label="项目名称" slot="before-columns" width="300px">
        <template slot-scope="scope">
          <div style="cursor: pointer;width: 100%;" @click="handleDetail(scope.row)">
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目经理">
        <template slot-scope="scope">
          <span>{{ scope.row.projectManagerList.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="立项时间" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.approvalTime || parseToDay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleUpdate(scope.row)" v-if="userInfo.userId==scope.row.projectManagerList.id">编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)" v-if="userInfo.userId==scope.row.projectManagerList.id">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <transfer-dialog-form ref="TransferDialogForm" @load-page="loadPage"></transfer-dialog-form>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dictMap, columnsMap, paramForm } from './const.js'
import { getTableData, deleteData } from '@/api/gpms/index'
import { getProjectPage } from '@/api/gpms/fas'
import AdvanceSearch from './AdvanceSearch'
import { mapGetters } from 'vuex'
import TransferDialogForm from '../TransferDialogForm'
export default {
  components: { AdvanceSearch, TransferDialogForm },
  props: {
    tabType: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(['permissions','userInfo']),
  },
  data () {
    return {
      isLoadTable: false,
      dictMap,
      columnsMap,
      dialogIsShow: true,
      paramForm: paramForm(),
      value: '',
      searchForm: {},
      onlyResponsible:false,
    }
  },
  mixins: [mixins],
  methods: {
    loadPage (params = {}) {
      if (this.tabType === 3) {
        this.loadTable(Object.assign({}, params, this.searchForm), getProjectPage)
      } else {
        this.loadTable(Object.assign({}, params, this.searchForm), getTableData)
      }
    },
    closeDialog () {
      this.dialogIsShow = false
      this.paramForm = paramForm()
    },
    searchPage (val) {
      this.searchForm = Object.assign({}, this.searchForm, val)
      this.loadPage()
    },
    //勾选行执行
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$router.push(`/gpms_spa/project/detail_test/${row.id}`)
    },
    handleCreate () {
      this.$router.push('/gpms_spa/project/add')
    },
    handleUpdate (row) {
      this.$router.push(`/gpms_spa/project/add/${row.id}`)
    },
    handleDelete (val) {
      this._handleGlobalById(val.id, deleteData)
    },
    handleDeleteAll () {
      this._handleGlobalAll(deleteData)
    },
    //移交
    transferMentor () {
      if ( this.multipleSelection === undefined || this.multipleSelection.length === 0) {
        this.$message('请先选择需要移交的选项')
        return
      }
      this.$refs['TransferDialogForm'].methodName = '项目经理'
      this.$refs['TransferDialogForm'].ids = this.multipleSelection
      this.$refs['TransferDialogForm'].dialogShow = true
    },
    changeResponsible () {
      if(this.onlyResponsible){
        this.searchForm.listType = 1
        this.loadPage()
      }
      else{
        this.searchForm.listType = 2
        this.loadPage()
      }
      this.onlyResponsible!=this.onlyResponsible
      return false
    },
  },
  mounted () {
    this.searchForm.listType = this.tabType
    this.loadPage()
  },
  created () {
  },
}
</script>

<style scoped>
.search {
  height: 35px;
  line-height: 26px;
  color: #666;
  font-weight: 900;
  font-size: 17px;
  border-bottom: 1px solid #cdcdcd;
  margin-bottom: 20px;
}
.searchbot {
  margin-right: 20px !important;
}
.num {
  width: 47%;
}
.smallcol {
  width: 110px !important;
}
.blackColor {
  color: #666;
}
.cell {
  padding: 0;
}
.cell .el-button {
  margin-left: 0;
  display: inline;
}
.el-button--small {
  padding: 8px 10px;
}
</style>