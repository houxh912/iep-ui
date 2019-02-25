<template>
  <div>
    <operation-container>
      <template slot="left">
        <el-button @click="handleAdd" size="small">新增</el-button>
        <el-dropdown size="medium">
          <el-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item>转移</el-dropdown-item>
            <el-dropdown-item divided>添加协作人</el-dropdown-item>
            <el-dropdown-item>收藏</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
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
      is-index
      isMutipleSelection
      @selection-change="selectionChange">
      <template slot="before-columns">
        <el-table-column label="客户名称" width="150px">
          <template slot-scope="scope">
            <span class="custom-name" @click="customDetail(scope.row)">{{scope.row.name}}</span>
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
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
    <custom-detail ref="detailDialog"></custom-detail>
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
import mainFormDialog from './mainDialog'
import CustomDetail from './detail/index'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { OperationContainer, OperationSearch, IepTable, OperationWrapper, mainFormDialog, CustomDetail },
  computed: {},
  data () {
    return {
      dictsMap: {},
      columnsMap: allTableOption,
    }
  },
  methods: {
    handleAdd () {
      this.$refs['mainDialog'].methodName = '新增'
      this.$refs['mainDialog'].formRequestFn = () => {}
      this.$refs['mainDialog'].dialogShow = true
    },
    handleEdit () {},
    handleDeleteById () {},
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    customDetail (row) {
      this.$refs.detailDialog.open(row)
    },
  },
}
</script>

<style lang="scss">
.custom-name {
  cursor: pointer;
  text-decoration: underline;
}
</style>
