<template>
  <div>
    <basic-container>
      <page-header title="合同"></page-header>
      <operation-container>
        <template v-if="+type !=0" slot="left">
          <iep-button type="danger" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" :isMutipleSelection="showSelect?true:false" isIndex>

        <el-table-column v-if="+type !== 0" prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="+type === 1" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId } from '../columns'
import { getContractPage, postContract, putContract, deleteContractById } from '@/api/crms/contract'
import { initSearchForm } from '../options'
export default {
  name: 'List',
  mixins: [mixins],
  data () {
    return {
      type: '0',
      showSelect: false,
      paramForm: initSearchForm(),
      tabList: [
        {
          label: '全部合同',
          value: '0',
        },
        {
          label: '我的合同',
          value: '1',
        },
      ],
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
    }
  },
  computed: {
    columnsMap () {
      return columnsMapByTypeId
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    changeType () {
      this.loadPage()
      if (this.type === '1') {
        this.showSelect = true
      } else { this.showSelect = false }
    },
    handleAdd () {
      this.$emit('onForm', {
        formRequestFn: postContract,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onForm', {
        formRequestFn: putContract,
        methodName: '修改',
        id: row.contractId,
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', { id: row.id })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteContractById)
    },
    loadPage (param = { ...this.searchForm, type: this.type }) {
      this.loadTable(param, getContractPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 5px;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>

