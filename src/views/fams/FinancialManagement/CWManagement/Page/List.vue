<template>
  <div class="set-containter">
    <basic-container>
      <page-header title="提现" :replaceText="replaceText" :data="[10 ,300000]"></page-header>
      <operation-container>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="申请人：">
                <el-input v-model="paramForm.person"></el-input>
              </el-form-item>
              <el-form-item label="所属部门：">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请时间：">
                <el-date-picker v-model="value6" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期：">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="审核时间：">
                <el-date-picker v-model="value6" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="提现金额：">
                <el-col :span="11">
                  <el-input v-model="paramForm.sum" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="paramForm.sum2" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="审核状态：">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票抵税：">
                <el-radio-group v-model="form.tax">
                  <el-radio :label="0">有</el-radio>
                  <el-radio :label="1">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="流水号" width="100px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handlePass(scope.row)">通过</iep-button>
              <iep-button @click="handleRefuse(scope.row)">拒绝</iep-button>
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
import passDialogForm from './passDialogForm'
import refuseDialogForm from './refuseDialogForm'
export default {
  mixins: [mixins],
  components: { refuseDialogForm, passDialogForm },
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
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '提现申请',
        id: false,
      })
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
<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
<style scoped>
.set-containter >>> .data-title {
  margin-bottom: 0;
}
.set-containter >>> .data-title .page-title {
  display: none;
}
.set-containter >>> .data-title .title-col {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.set-containter >>> .operation-container {
  margin-top: 20px;
}
</style>
