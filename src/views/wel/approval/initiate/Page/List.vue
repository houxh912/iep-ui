<template>
  <div>
    <basic-container>
      <page-header title="我发起的"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="danger" icon="el-icon-plus" plain>发起申请</iep-button>
          <!-- <el-button @click="rowCell(scope.row,scope.index)">发起申请</el-button> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="申请类型">
                <el-select v-model="paramForm.type" placeholder="选择申请类型">
                  <el-option label="类型1" value="类型1"></el-option>
                  <el-option label="类型1" value="类型1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请结果">
                <el-select v-model="paramForm.type" placeholder="申请结果">
                  <el-option label="通过" value="通过"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发起时间">
                <div class="block">
                  <el-date-picker v-model="dateVal" type="daterange" align="left" unlink-panels>
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="120px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="warning" plain @click="handleEdit(scope.row,scope.index)">修改</el-button>
            <el-button size="small">删除</el-button>
            <el-button size="small">提交</el-button>
          </template>
        </el-table-column>
      </iep-table>
      <initiate-request ref="initiateRequest" @load-page="loadPage"></initiate-request>
      <initiate-edit ref="initiateEdit" @load-page="loadPage"></initiate-edit>
    </basic-container>
  </div>
</template>

<script>
import { getAlreadyApprovalPage, postApproval } from '@/api/admin/approval'
import mixins from '@/mixins/mixins'
import { mergeByFirst } from '@/util/util'
import { columnsMap, initSearchForm, initForm } from '../options'
import initiateRequest from './initiate_request'
import initiateEdit from './initiate_edit'
export default {
  components: {
    initiateRequest,
    initiateEdit,
  },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      dateVal: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      console.log(row)
      this.$emit('onDetail')
    },
    // handleShare (row) { },
    loadPage (param) {
      this.loadTable(param, getAlreadyApprovalPage)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
     handleEdit (row) {
      this.$refs['initiateEdit'].form = mergeByFirst(initForm(), row)
      this.$refs['initiateEdit'].methodName = '修改'
      this.$refs['initiateEdit'].formRequestFn = postApproval
      this.$refs['initiateEdit'].dialogShow = true
    },
    handleAdd () {
      this.$refs['initiateRequest'].methodName = '创建'
      this.$refs['initiateRequest'].formRequestFn = postApproval
      this.$refs['initiateRequest'].dialogShow = true
    },
  },
}
</script>
<style scoped>
</style>
