<template>
  <div class="set-containter">
    <basic-container>
      <page-header title="工资"></page-header>
      <operation-container>
        <template slot="left">
          <h4>说明：每月5日前需完成上月工资，可更新上传，发送后无法修改已上传的工资单。若当月工资核算有误，在下月工资调整匹配。</h4>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="月份" width="150px">
            <template slot-scope="scope">
              <iep-table-link>{{scope.row.time}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button @click="handleUpload(scope.row)">上传</iep-button>
              <iep-button @click="handleSend(scope.row)">发送</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <pass-dialog-form ref="passDialogForm" @load-page="loadPage"></pass-dialog-form>
    <refuse-dialog-form ref="refuseDialogForm" @load-page="loadPage">
    </refuse-dialog-form>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      value6: '',
      department: [
        {
          value: '选项1',
          label: '国脉海洋信息发展有限公司',
        },
      ],
      classify: [
        {
          value: '选项1',
          label: '待审核',
        },
        {
          value: '选项2',
          label: '已审核',
        },
      ],
      form: {
        name: '',
      },
      columnsMap,
      paramForm: initSearchForm(),
      value: '',
      value1: '',
      replaceText: (data) => `提现数：${data[0]}笔，总金额合计：￥${data[1]}元`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleSend (row) {
      this.$emit('onSend', row)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '提现申请',
        id: false,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
<style scoped>
.set-containter >>> .data-title {
  margin-bottom: 0;
}
.set-containter >>> .el-input-group__append {
  padding: 0 15px;
}
</style>
