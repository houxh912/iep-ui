<template>
  <iep-dialog :dialog-show="dialogShow" title="名单管理" width="80%" @close="resetForm">
    <template slot="header">
      <operation-container>
        <template slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
          <iep-button @click="handleSign" plain>签到</iep-button>
          <iep-button @click="handleDelte" plain>删除</iep-button>
        </template>
        <template slot="right">
          <search advance-search @search-page="searchPage" prop='inName' :id="id">
            <advance-search @search-page="searchPage" :id="id"></advance-search>
          </search>
        </template>
      </operation-container>
    </template>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsName" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" :isMutipleSelection="isTrue" @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsName } from './option'
import { geTmeetingsignup, postMeetingsignupStatus, deleteMeetingsignup } from '@/api/mcms/meeting'
import AdvanceSearch from './AdvanceSearch'
import EditDialog from './EditDialog'
import Search from './Search'
import IepDialog from './IepDialog'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, EditDialog, Search, IepDialog },
  data () {
    return {
      dialogShow: false,
      columnsName,
      isLoadTable: false,
      id: '',
      multipleSelection: [],
      isTrue: true,
    }
  },
  created () {
  },
  methods: {
    loadPage (param = { meetingId: this.id }) {
      this.loadTable(param, geTmeetingsignup)
    },
    resetForm () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    handleAdd () {
      this.$refs['EditDialog'].dialogShow = true
      this.$refs['EditDialog'].id = this.id
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleSign () {
      let form = {
        id: this.multipleSelection,
        status: 2,
      }
      if (this.multipleSelection.length > 0) {
        postMeetingsignupStatus(form).then((res) => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
        })
        this.loadPage({ meetingId: this.id })
      } else {
        this.$message({
          message: '请先勾选数据',
          type: 'waring',
        })
      }

    },
    handleDelte () {
      if (this.multipleSelection.length > 0) {
        deleteMeetingsignup({ id: this.multipleSelection }).then((res) => {
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          if (res.data.data == true) {
            this.loadPage({ meetingId: this.id })
          }
        })
      } else {
        this.$message({
          message: '请先勾选数据',
          type: 'waring',
        })
      }
    },
  },
}
</script>

