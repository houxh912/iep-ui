<template>
  <div class="contract">
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" size="small" type="danger">新增</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleDetail(scope.row)" size="small">详情</iep-button>
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap } from '../options'
import { fetchList, deleteDataById, getDataById } from '@/api/crms/contract'

export default {
  name: 'contract',
  mixins: [ mixins ],
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    handleAdd () {
      this.$emit('onCreate')
    },
    handleEdit (row) {
      getDataById(row.id).then(({data}) => {
        this.$emit('onEdit', data.data)
      })
    },
    handleDetail (row) {
      row.list = [{name: '文件1'}]
      row.startTime = '2018-09-11'
      row.endTime = '2018-09-11'
      row.jibie = 1
      row.type = 1
      row.tableData = [
        { daozhangshijian: '2019-09-01', daozhangjine: '2000', leijidaozhang: '20000', daozhangbili: 0.8 },
      ]
      this.$emit('onDetail')
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
