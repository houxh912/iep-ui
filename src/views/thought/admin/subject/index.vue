<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <!-- <searchForm @searchPage="searchPage"></searchForm> -->
        </template>
      </operation-container>
      <iep-table 
        :isLoadTable="isLoadTable" 
        :pagination="pagination" 
        :columnsMap="columnsMap" 
        :pagedTable="pagedTable" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        isMutipleSelection 
        :dictsMap="dictsMap" 
        @selection-change="selectionChange">
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button size="small" @click="handleTop(scope.row)">{{scope.row.status === 2 ? '取消置顶' : '置顶'}}</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleDeleteById(scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="handleHideById(scope.row)">{{scope.row.status === 0 ? '取消隐藏' : '隐藏'}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getTableData, deleteData, handleTopUp, handleHide } from '@/api/cpms/iepcommontopic'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixins],
  components: {  },
  computed: {
    ...mapGetters(['permissions', 'userInfo']),
  },
  data () {
    return {
      pageState: 'list',
      dictsMap,
      columnsMap: tableOption,
      selectList: [],
      firstClass: [],
      getTableDataFn: getTableData,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    selectionChange (val) {
      this.selectList = val
      this.multipleSelection = val.map(m => m.id)
    },
    loadPage (param = this.searchForm, state) {
      if (!state) {
        this.pageState = 'list'
      }
      this.loadTable(param, this.getTableDataFn)
    },
    // 详情
    handleDetail (row) {
      this.$router.push({ path: '/mlms_spa/subject/detail', query: { title: row.content, id: row.topicId } })
    },
    // 置顶
    handleTop (row) {
      handleTopUp({ id: row.topicId, type: row.status === 2 ? 1: 2 }).then(() => {
        this.loadPage()
      })
    },
    // 隐藏
    handleHideById (row) {
      handleHide({ id: row.topicId, type: row.status === 0 ? 1: 0 }).then(() => {
        this.loadPage()
      })
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.topicId, deleteData)
    },
    // 清空搜索
    clearSearchParam () {},
  },
}
</script>

<style lang="scss" scoped>

</style>
