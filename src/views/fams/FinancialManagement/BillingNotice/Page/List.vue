<template>
  <div>
    <basic-container>
      <page-header title="开票通知"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>发起申请</iep-button> -->
          <!-- <el-button @click="rowCell(scope.row,scope.index)">发起申请</el-button> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="购买方">
                <el-input v-model="paramForm.purchaser"></el-input>
              </el-form-item>
              <el-form-item label="申请时间">
                <el-date-picker v-model="paramForm.applyTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="销售方">
                <el-input v-model="paramForm.seller"></el-input>
              </el-form-item>
              <el-form-item label="审核时间">
                <el-date-picker v-model="paramForm.auditDate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="开票金额">
                <el-col :span="11">
                  <el-input v-model="paramForm.sum1" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="paramForm.sum2" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="paramForm.status" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :dictsMap="dictsMap" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="small" type="warning" plain v-if="scope.row.status==1||scope.row.status==2" @click="handleDetail(scope.row)">查看</el-button>
            <el-dropdown size="small" v-if="scope.row.status==0">
              <iep-button plain>
                审核<i class="el-icon-arrow-down el-icon--right"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>通过</el-dropdown-item>
                <el-dropdown-item>驳回</el-dropdown-item>
                <el-dropdown-item>转交</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <!-- <new-approval ref="NewApproval" @load-page="loadPage"></new-approval> -->
  </div>
</template>

<script>
// import { getInvoiceNotificationPage } from '@/api/fams/invoice_notification'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      paramForm: initSearchForm(),
      classify: '',
      pagedTable:[
        {'id': 1,'purchaser': '','seller': '提交','money': 80,'applyData': 6,'status': 1,'auditor': 111,'auditDate': 11},
        {'id': 2,'purchaser': '','seller': '提交','money': 80,'applyData': 77,'status': 0,'auditor': 111,'auditDate': 11},
        {'id': 3,'purchaser': '','seller': '提交','money': 80,'applyData': 88,'status': 2,'auditor': 111,'auditDate': 11},
        {'id': 4,'purchaser': '','seller': '提交','money': 80,'applyData': 99,'status': 1,'auditor': 111,'auditDate': 11}],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleDetail () {
      // this.$emit('onDetail', {
      //   formRequestFn: putApprovalInitiate,
      //   methodName: '查看明细',
      //   id: row.id,
      // })
    },
    handleEdit () {
      // this.$emit('onEdit', {
      //   formRequestFn: putApprovalInitiate,
      //   methodName: '编辑规则',
      //   id: row.id,
      // })
    },
    // loadPage (param = this.searchForm) {
    //   this.loadTable(param,getInvoiceNotificationPage)
    // },
  },
}
</script>
<style scoped>
</style>
