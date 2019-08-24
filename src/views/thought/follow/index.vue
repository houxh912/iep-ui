<template>
  <basic-container>
    <operation-container>
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
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain size="small" @click="handleUnfollow(scope.row)">取关</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getFollowPage, unfollowById } from '@/api/cpms/iepuserfollow'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixins],
  computed: {
    ...mapGetters(['permissions', 'userInfo']),
  },
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
      getTableDataFn: getFollowPage,
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
    // 清空搜索
    clearSearchParam () {},
    // 取关
    handleUnfollow (row) {
      this.$confirm('是否确认取关此人?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        unfollowById(row.id).then(({ data }) => {
          if (data.data) {
            this.$message.success('取关成功！')
            this.loadPage()
          } else {
            this.$message.error('取关失败，请重试！')
            this.loadPage()
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
