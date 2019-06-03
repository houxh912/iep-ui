<template>
  <div>
    <basic-container>
      <page-header title="投资管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="danger" icon="el-icon-plus" plain @click="handleAdd">
            新增
          </iep-button>
          <iep-button @click="handleDelete()" plain>
            删除
          </iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="status" size="small" @change="handleChange">
            <el-radio-button v-for="(v,k) in dictsMap.status" :label="k" :key="k">{{v}}</el-radio-button>
            <el-radio-button label="">全部</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table class="dept-table" :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column prop="company" label="组织名" width="250">
            <template slot-scope="scope">
              <iep-table-link-img-desc :img="scope.row.orgLogo" :name="scope.row.orgName" v-on:m-click="handleDetail"></iep-table-link-img-desc>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="scope.row.status===1" type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="scope.row.status===2 || scope.row.status===5" @click="handleUp(scope.row)">上架</iep-button>
              <iep-button v-if="scope.row.status===4" @click="handleDown(scope.row)">下架</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getInvestmentPage, deleteInvestmentBatch, upInvestmentById, downInvestmentById } from '@/api/fams/investment'
import { columnsMap, dictsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      status: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
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
    handleDelete () {
      this._handleGlobalDeleteAll(deleteInvestmentBatch)
    },
    handleChange () {
      this.loadPage()
    },
    handleAdd () {
      this.$router.push({
        path: '/fams_spa/management_edit/0',
      })
    },
    handleEdit (row) {
      this.$router.push({
        path: `/fams_spa/management_edit/${row.id}`,
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/management_detail/${row.id}`,
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ status: this.status, ...param }, getInvestmentPage)
    },
  },
}
</script>
