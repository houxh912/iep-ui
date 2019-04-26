<template>
  <div>
    <basic-container>
      <page-header title="发票" :replaceText="replaceText" :data="[10 ,5,10,25,15,31421.00,4733.00,355]"></page-header>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="申请人：">
                <el-input v-model="paramForm.applicant"></el-input>
              </el-form-item>
              <el-form-item label="申请时间：">
                <el-date-picker v-model="paramForm.applyTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="审核人：">
                <el-input v-model="paramForm.auditor"></el-input>
              </el-form-item>
              <el-form-item label="审核时间：">
                <el-date-picker v-model="paramForm.auditTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="所属部门：">
                <el-select v-model="paramForm.type" placeholder="国脉海洋">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抬头：">
                <el-select v-model="paramForm.type" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票类型：">
                <el-select v-model="paramForm.type" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票金额：">
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
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
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
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain v-if="scope.row.status==1 || scope.row.status==2" @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="warning" plain v-if="scope.row.status==0" @click="handleReview(scope.row)">审核</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <iep-review-confirm ref="iepReviewForm" @load-page="loadPage"></iep-review-confirm>
    <!-- <new-approval ref="NewApproval" @load-page="loadPage"></new-approval> -->
  </div>
</template>

<script>
import { getFinancialManagementPage, reviewApprovaBatch } from '@/api/fams/financial_management'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      classify: '',
      paramForm: initSearchForm(),
      replaceText: (data) => `（待审核：${data[0]}笔，已通过：${data[1]}笔，未通过：${data[2]}笔，废弃：${data[3]}笔，总计：${data[4]}，有效发票：￥${data[5]}元，已用发票：￥${data[6]}元，剩余发票：￥${data[7]}元）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail () {
      this.$emit('onDetail', {
        formRequestFn: getFinancialManagementPage,
        methodName: '查看明细',
      })
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getFinancialManagementPage)
    },
    handleReview (row) {
      this.$refs['iepReviewForm'].title = '审核'
      this.$refs['iepReviewForm'].id = row.id
      this.$refs['iepReviewForm'].formRequestFn = reviewApprovaBatch
      this.$refs['iepReviewForm'].dialogShow = true
    },
  },
}
</script>
<style scoped>
</style>
