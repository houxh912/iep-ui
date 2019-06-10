<template>
  <div>
    <basic-container>
      <page-header title="银行户头设置"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="danger" @click="handleAdd()" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <!-- <el-table-column label="公司名称">
          <template slot-scope="scope">
            <iep-tag-detail :value="scope.row.companyName.map(m => m.name)"></iep-tag-detail>
          </template>
        </el-table-column> -->
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.updateTime"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getBankAccountPage, postBankAccount, putBankAccount, deleteBankAccountById, getBankAccountById } from '@/api/fams/bank_account'
import DialogForm from './DialogForm'
import { columnsMap, initForm } from './options'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteBankAccountById)
    },
    handleEdit (row) {
      getBankAccountById(row.id).then(({ data }) => {
        this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), data.data)
        // this.$refs['DialogForm'].form.companyIds = row.companyName.map(m => m.id)
        this.$refs['DialogForm'].formRequestFn = putBankAccount
        this.$refs['DialogForm'].methodName = '编辑'
        this.$refs['DialogForm'].dialogShow = true
      })
    },
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postBankAccount
      this.$refs['DialogForm'].methodName = '新增'
      this.$refs['DialogForm'].dialogShow = true
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getBankAccountPage)
    },
  },
}
</script>