<template>
  <div>
    <basic-container>
      <iep-page-header title="投资管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="orgName"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column prop="company" label="组织名" width="250">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.orgLogo" :name="scope.row.orgName" v-on:m-click="handleDetail(scope.row)"></iep-table-link-img-desc>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">{{scope.row.status===1? '编辑': '查看'}}</iep-button>
              <iep-button v-if="scope.row.status===1" @click="handleUp(scope.row)">上架</iep-button>
              <iep-button v-if="scope.row.status===2" @click="handleRollback(scope.row)">撤回</iep-button>
              <iep-button v-if="scope.row.status===3" type="warning" @click="handleDown(scope.row)" plain>下架</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getInvestmentPage, upInvestmentById, downInvestmentById, rollbackInvestmentById, postInvestment } from '@/api/fams/investment'
import { columnsMap, dictsMap, initForm } from './options'
import DialogForm from './DialogForm'
import mixins from '@/mixins/mixins'
export default {
  components: { DialogForm },
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleRollback (row) {
      rollbackInvestmentById(row.id).then(({ data }) => {
        if (data.data) {
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleUp (row) {
      upInvestmentById(row.id).then(({ data }) => {
        if (data.data) {
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleDown (row) {
      downInvestmentById(row.id).then(({ data }) => {
        if (data.data) {
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleChange () {
      this.loadPage()
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].formRequestFn = postInvestment
      this.$refs['DialogForm'].dialogShow = true
    },
    handleEdit (row) {
      this.$router.push({
        path: `/fams_spa/management_edit/${row.id}`,
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/app/wealth/wealth_details/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getInvestmentPage)
    },
  },
}
</script>
