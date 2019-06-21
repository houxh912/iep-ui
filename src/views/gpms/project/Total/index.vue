<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleCreate" class="add" type="primary" v-if="gpms_project_add">新增</iep-button>
        <iep-button @click="handleDeleteAll" class="add" v-if="gpms_project_edit_del">批量删除</iep-button>
      </template>
      <template slot="right">
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
          <div style="cursor: pointer;" @click="handleDetail(scope.row)">
            <span>{{ scope.row.projectName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="warning" plain size="small" @click="handleDetail(scope.row)">详情</el-button> -->
          <el-button size="small" @click="handleUpdate(scope.row)" v-if="gpms_project_edit_del">编辑</el-button>
          <el-button size="small" @click="handleDelete(scope.row)" v-if="gpms_project_edit_del">删除</el-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dictMap, columnsMap, paramForm } from './const.js'
import { getTableData, deleteData } from '@/api/gpms/index'
import AdvanceSearch from './AdvanceSearch'
import { mapGetters } from 'vuex'
const optNameMap = {
  delete: '删除',
}
export default {
  components: {AdvanceSearch},
  props: {
    tabType: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      addDialogShow: false,
      isLoadTable: false,
      dictMap,
      columnsMap,
      dialogIsShow: true,
      paramForm: paramForm(),
      value: '',
      searchForm: '',
      gpms_project_add: false,
      gpms_project_view: false,
      gpms_project_edit_del: false,
    }
  },
  mixins: [mixins],
  methods: {
    loadPage (params = {}) {
      this.loadTable(Object.assign({}, params, this.searchForm), getTableData)
    },
    closeDialog () {
      this.dialogIsShow = false
      this.paramForm = paramForm()
    },
    searchPage (val) {
      if (val.projectName) this.loadPage(val)
    },
    //勾选行执行
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      // this.$store.commit('SET_ACCESS_TOKEN',row)
      if (this.gpms_project_view) {
        this.$router.push(`/gpms_spa/project/detail/${row.id}`)
      }
    },
    handleCreate () {
      this.$emit('toggle-show', 'create')
    },
    handleUpdate (row) {
      this.$emit('toggle-show', 'update', row)
    },
    handleDelete (val) {
      this._handleGlobalById1(val.id, deleteData)
    },
    _handleGlobalById1 (id, optFunction, opt = 'delete') {
      const optName = optNameMap[opt]
      this.$confirm(`此操作将永久${optName}该数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(id).then(res => {
          if (res.data.data.data) {
            this.$message({
              type: 'success',
              message: `${optName}成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `${optName}失败，${res.data.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    handleDeleteAll () {
      this._handleGlobalAll(deleteData)
    },
  },
  mounted () {
    this.searchForm.listType = this.tabType
    this.loadPage()
  },
  created () {
    this.gpms_project_add = this.tabType == 1 ? true : this.permissions.gpms_project_add
    this.gpms_project_view = this.tabType == 1 ? true : this.permissions.gpms_project_view
    this.gpms_project_edit_del = this.tabType == 1 ? true : this.permissions.gpms_project_edit_del
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