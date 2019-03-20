<template>
  <div>
    <basic-container>
      <page-header title="抄送我的" ></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="danger" icon="el-icon-plus" plain>发起申请</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="申请人">
                <el-input v-model="paramForm.theme" placeholder="请输入申请人姓名"></el-input>
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
            <el-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </iep-table>
      <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    </basic-container>
  </div>
</template>

<script>
import { getAlreadyApprovalPage, postApproval } from '@/api/admin/approval'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
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
    handleAdd () {
      this.$refs['DialogForm'].methodName = '创建'
      this.$refs['DialogForm'].formRequestFn = postApproval
      this.$refs['DialogForm'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getAlreadyApprovalPage)
    },
  },
}
</script>
<style scoped>
</style>
