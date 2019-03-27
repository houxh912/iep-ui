<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="danger" icon="iconfont icon-send" size="mini">发送</iep-button>
        <iep-button type="default" size="small">撤回</iep-button>
        <iep-button type="default" size="small">删除</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="关键字">
              <el-input v-model="paramForm.keyword"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发票金额">
              <el-col :span="11">
                <el-input v-model="paramForm.sum" style="width: 100%;"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="paramForm.sum2" style="width: 100%;"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="提交类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发票抬头">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in invoiceRise" :key="item.value" :label="item.label" :value="item.value">
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
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
      <template slot="before-columns">
        <el-table-column label="发送人" width="90px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
    </iep-table>
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
      form: {
        name: '',
      },
      columnsMap,
      paramForm: initSearchForm(),
      classify: [
        {
          value: '选项1',
          label: '所有',
        },
      ],
      state: [
        {
          value: '选项1',
          label: '待审核',
        },
      ],
      invoiceRise: [
        {
          value: '选项1',
          label: '浙江蟠桃会网络技术有限公司',
        },
      ],
      value: '',
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
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
