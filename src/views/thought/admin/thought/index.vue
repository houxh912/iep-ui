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
              <iep-button size="small" @click="handleDeleteById(scope.row)">删除</iep-button>
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
import { geTallPage, thoughtsDelete, topUpThoughts } from '@/api/cpms/thoughts'
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
      getTableDataFn: geTallPage,
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
    handleDetail () {
      
    },
    // 置顶
    handleTop (row) {
      topUpThoughts({ id: row.thoughtsId, type: row.status === 2 ? 1: 2 }).then(() => {
        this.loadPage()
      })
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.topicId, thoughtsDelete)
    },
    // 清空搜索
    clearSearchParam () {},
  },
}
</script>

<style lang="scss" scoped>

</style>
