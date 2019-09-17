<template>
  <basic-container>
    <div class="content" v-if="pageState === 'list'">
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium" class="left">
            <iep-button size="small" class="button" type="primary" plain @click="handleCreate">新增</iep-button>
            <iep-button size="small" class="button" plain>批量删除</iep-button>
            <iep-button size="small" class="button" plain @click="handleClassified">分类管理</iep-button>
          </el-dropdown>
        </template>
        <template slot="right">
          <!-- <searchForm @searchPage="searchPage"></searchForm> -->
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="tableDictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection @selection-change="selectionChange">
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleUpdate(scope.row)">编辑</iep-button>
              <iep-button size="small" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <form-tpl ref="form" @load-page="loadPage" v-if="pageState === 'form'" :classifiedList="classifiedList"></form-tpl>
    <classified ref="classified" @load-page="loadPage" v-if="pageState === 'classified'"></classified>
  </basic-container>
</template>

<script>
import { getFilemanagePage, deleteFilemanage } from '@/api/hrms/iephrsystemfilemanage'
import { getClassManageList } from '@/api/hrms/iephrclassmanage'
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap, tableDictsMap, changeDict } from './option'
import FormTpl from './form'
import classified from '../classified'

export default {
  components: { FormTpl, classified },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      tableDictsMap,
      columnsMap: tableOption,
      pageState: 'list',
      classifiedList: [],
    }
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadClassList()
      this.pageState = 'list'
      this.loadTable(param, getFilemanagePage)
    },
    handleUpdate (row) {
      this.pageState = 'form'
      this.$nextTick(() => {
        this.$refs['form'].handleUpdate(row)
      })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.systemId, deleteFilemanage)
    },
    searchPage () {},
    selectionChange () {},
    handleCreate () {
      this.pageState = 'form'
    },
    // 分类管理
    handleClassified () {
      this.pageState = 'classified'
    },
    // 获取分类list
    loadClassList () {
      getClassManageList().then(({ data }) => {
        this.classifiedList = data.data
        this.$set(this.tableDictsMap, 'classId', changeDict(data.data, ['classId', 'className']))
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.left {
  .button {
    margin-right: 10px;
  }
}
</style>
