<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
        <iep-button icon="el-icon-delete" @click="handleMoreDelete">删除</iep-button>
        <iep-button icon="el-icon-remove-outline" @click="handleMoreLock">禁用</iep-button>
        <iep-button icon="el-icon-edit" @click="handleMoreReLock">启用</iep-button>
        <iep-button icon="el-icon-upload" @click="handleImport">Excel导入</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="name" advance-search placeholder="请输入机构名称进行搜索">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
      <template slot="before-columns">
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <div class="box">
              <span v-if="scope.row.claimStatus==='1'" class="claim">认</span>
              <span class="main-name">{{scope.row.orgName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="机构分类">
          <template slot-scope="scope">
            <span>{{dictsMap.type[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="行业">
          <template slot-scope="scope">
            <span>{{dictGroup['POLICY_INDUSTRY'].map(m => m.label)[scope.row.line]}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="primary" plain>编辑</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            <iep-button @click="handleLockOrReLock(scope.row)">{{scope.row.isForbidden=='0'?'启用':'禁用'}}</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <form-dialog ref="formDialog" @load-page="loadPage"></form-dialog>
  </div>
</template>>
<script>
import { columnsMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import formDialog from './formDialog'
import { getPage, deletePage, getforbide } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'
export default {
  components: { AdvanceSearch, formDialog },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap,
      orgId: [],
      multipleSelection: [],
    }

  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/tms/list_edit/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/tms/list_edit/${row.orgId}`,
      })
    },
    handleMoreLock () {
      getforbide({ set: 0, ids: this.multipleSelection }).then(() => {
        this.loadPage()
      })
    },
    handleMoreReLock () {
      getforbide({ set: 1, ids: this.multipleSelection }).then(() => {
        this.loadPage()
      })
    },
    selectionChange (val) {
      this.multipleSelection = val.map(m => m.orgId)
    },
    handleLockOrReLock (row) {
      if (row.isForbidden === '0') {
        getforbide({ set: 1, ids: [row.orgId] }).then(() => {
          this.loadPage()
        })
      }
      if (row.isForbidden === '1') {
        getforbide({ set: 0, ids: [row.orgId] }).then(() => {
          this.loadPage()
        })
      }
    },
    handleDelete (row) {
      this.orgId = [row.orgId]
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deletePage(this.orgId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    handleMoreDelete () {
      deletePage(this.multipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleImport () {
      this.$refs['formDialog'].importDialogShow = true
    },
    async loadPage (param = this.searchForm) {
      await this.loadTable({ param, sort: 'allOrg' }, getPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.claim {
  margin-right: 10px;
  padding: 2px 5px;
  border-radius: 3px;
  background-color: #cf3f26;
  color: #fff;
}
</style>