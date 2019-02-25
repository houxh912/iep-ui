<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search="search"></operation-search>
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
      <template slot="before-columns">
        <el-table-column label="客户名称" width="150px">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" min-width="160">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import OperationContainer from '@/components/Operation/Container'
import OperationSearch from '@/components/Operation/Search'
import IepTable from '@/components/IepTable/'
import OperationWrapper from '@/components/Operation/Wrapper'
import mixins from './mixins'
import { allTableOption } from './const/index'
import { fetchList } from '@/api/crms/custom'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { OperationContainer, OperationSearch, IepTable, OperationWrapper },
  computed: {},
  data () {
    return {
      dictsMap: {},
      columnsMap: allTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
}
</script>
