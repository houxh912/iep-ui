<template>
  <div>
    <basic-container>
      <page-header title="提现" :replaceText="replaceText" :data="[10 ,300000]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-index>
        <el-table-column prop="operation" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleGrant(scope.row)">发放</iep-button>
              <iep-button @click="handlePass(scope.row)">通过</iep-button>
              <iep-button @click="handleRefuse(scope.row)">拒绝</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <grant-dialog-form ref="grantDialogForm" @load-page="loadPage"></grant-dialog-form>
    <pass-dialog-form ref="passDialogForm" @load-page="loadPage"></pass-dialog-form>
    <refuse-dialog-form ref="refuseDialogForm" @load-page="loadPage"></refuse-dialog-form>
  </div>
</template>
<script>
import { getWithdrawPage } from '@/api/fams/withdraw'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options.js'
import grantDialogForm from './grantDialogForm'
import passDialogForm from './passDialogForm'
import refuseDialogForm from './refuseDialogForm'
export default {
  mixins: [mixins],
  components: { grantDialogForm, refuseDialogForm, passDialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（提现数：${data[0]}笔，总金额合计：￥${data[1]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getWithdrawPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '提现申请',
        id: false,
      })
    },
    handleGrant () {
      this.$refs['grantDialogForm'].dialogShow = true
    },
    handlePass () {
      this.$refs['passDialogForm'].dialogShow = true
    },
    handleRefuse () {
      this.$refs['refuseDialogForm'].dialogShow = true
    },
  },
}
</script>