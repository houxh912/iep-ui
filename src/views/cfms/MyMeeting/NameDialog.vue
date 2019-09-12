<template>
  <iep-dialog :dialog-show="dialogShow" title="名单管理" width="80%" @close="resetForm">
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
        <iep-button @click="handleSign" plain>签到</iep-button>
        <iep-button @click="handleDelte" plain>删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" advance-search prop="inName">
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsName" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" :isMutipleSelection="isTrue" @selection-change="handleSelectionChange">
      <!-- <el-table-column prop="operation" label="操作" width="250">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click=" handleEdit(scope.row)">修改</iep-button>
            <iep-button type="warning" plain @click=" handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column> -->
    </iep-table>
    <edit-dialog ref="EditDialog"></edit-dialog>
  </iep-dialog>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsName } from './option'
import { geTmeetingsignup, postMeetingsignupStatus, deleteMeetingsignup } from '@/api/mcms/meeting'
import AdvanceSearch from './AdvanceSearch'
import EditDialog from './EditDialog'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, EditDialog },
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
    this.loadPage()
  },
  methods: {
    loadPage (param = {}) {
      this.loadTable(param, geTmeetingsignup)
    },
    resetForm () {
      this.dialogShow = false
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
        this.loadPage()
      } else {
        this.$message({
          message: '请先勾选数据',
          type: 'waring',
        })
      }

    },
    handleDelte () {
      if(this.multipleSelection.length > 0){
         deleteMeetingsignup({ id: this.multipleSelection }).then((res) => {
        this.$message({
          message: res.data.msg,
          type: 'success',
        })
      })
      this.loadPage()
      }else{
        this.$message({
          message: '请先勾选数据',
          type: 'waring',
        })
      }
    },
  },
}
</script>

