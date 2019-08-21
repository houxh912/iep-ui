<template>
  <div>
    <basic-container>
      <iep-page-header title="我发起的"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>发起申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="150px">
            <template slot-scope="scope">
              <div>{{scope.row.name}}
                <a-tag v-if="scope.row.isDraft" color="orange">草稿</a-tag>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="审核人" width="100px">
          <template slot-scope="scope">
            <div>
              <span v-if="!scope.row.approveResult">{{scope.row.approverNameList.join('、')}}</span>
              <span v-else>{{scope.row.approverName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="审批结果" width="100px">
          <template slot-scope="scope">
            {{dictsMap.approveResult[scope.row.approveResult]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="scope.row.isDraft===0 && scope.row.approveResult===0" plain @click="handleCancel(scope.row)">撤销</iep-button>
              <iep-button v-if="scope.row.isDraft===1" plain @click="handleEdit(scope.row)">修改</iep-button>
              <iep-button v-if="scope.row.isDraft===1" plain @click="handleDelete(scope.row)">删除</iep-button>
              <iep-button v-if="scope.row.isDraft===1" plain @click="handleSubmit(scope.row)">提交</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getInitiatePage, deleteApprovalById, submitApprovalById, cancelApprovalById } from '@/api/hrms/wel'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapMutations({
      setApprovalDialogShow: 'SET_APPROVAL_DIALOG_SHOW',
    }),
    handleCancel (row) {
      this._handleGlobalById(row.id, cancelApprovalById, 'cancel')
    },
    handleSubmit (row) {
      this._handleGlobalById(row.id, submitApprovalById, 'submit')
    },
    handleDetail (row) {
      this.$router.push({
        path: `/hrms_spa/approval_detail/${row.id}`,
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/hrms_spa/approval/${row.id}`,
        query: {
          type: row.typeId,
        },
      })
    },
    handleAdd () {
      this.setApprovalDialogShow(true)
    },
    handleDelete (row) {
      this._handleComfirm(row.id, deleteApprovalById, '删除')
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInitiatePage)
    },
  },
}
</script>
<style scoped>
</style>
