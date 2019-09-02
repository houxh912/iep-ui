<template>
  <div>
    <div v-show="pageState=='list'">
      <operation-container>
        <template slot="left">
          
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :paramForm="searchForm" prop="content"></operation-search>
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
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button size="small" @click="handleTop(scope.row)">{{scope.row.isTop === 2 ? '取消置顶' : '置顶'}}</iep-button>
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
import { getManagePage, thoughtsDelete, topUpThoughts } from '@/api/cpms/thoughts'
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
      getTableDataFn: getManagePage,
      searchForm: {
        content: '',
      },
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
      this.loadTable(Object.assign({}, param, this.searchForm), this.getTableDataFn)
    },
    // 详情
    handleDetail (row) {
      this.$router.push(`/mlms_spa/thought/detail/${row.thoughtsId}`)
    },
    // 置顶
    handleTop (row) {
      topUpThoughts({ id: row.thoughtsId, type: row.isTop === 2 ? 1: 2 }).then(() => {
        this.loadPage()
      })
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById([row.thoughtsId], thoughtsDelete)
    },
    // 清空搜索
    clearSearchParam () {},
  },
}
</script>

<style lang="scss" scoped>

</style>
