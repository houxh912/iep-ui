<template>
  <div>
    <operation-container>
      <template slot="left">
        <div>2018年季度预算</div>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="年份">
              <el-select v-model="value" placeholder="请选择年份">
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
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="budgetItem"
          label="预算项">
        </el-table-column>
        <el-table-column label="一季度">
          <el-table-column
            prop="budget"
            label="预算">
          </el-table-column>
          <el-table-column
            prop="actual"
            label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="二季度">
          <el-table-column
            prop="budget"
            label="预算">
          </el-table-column>
          <el-table-column
            prop="actual"
            label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="三季度">
          <el-table-column
            prop="budget"
            label="预算">
          </el-table-column>
          <el-table-column
            prop="actual"
            label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="四季度">
          <el-table-column
            prop="budget"
            label="预算">
          </el-table-column>
          <el-table-column
            prop="actual"
            label="实际">
          </el-table-column>
        </el-table-column>
        <el-table-column label="年度预算">
          <el-table-column
            prop="budget"
            label="预算">
          </el-table-column>
          <el-table-column
            prop="actual"
            label="实际">
          </el-table-column>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      classify: '',
      value: '',
      tableData:[{
          budgetItem: '办公房租',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '人工成本',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '员工福利',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '办公费用',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '公司车辆费用',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '合计',
          budget: '王小虎',
          actual: '上海',
        }, {
          budgetItem: '年度合计',
          budget: '王小虎',
          actual: '上海',
        }],
    }
  },
  created () {
    // this.loadPage()
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
    // loadPage (param = this.paramForm) {
    //   this.loadTable(param,getInvoiceNotificationPage)
    // },
  },
}
</script>



