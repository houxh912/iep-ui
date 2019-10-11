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
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap" @selection-change="selectionChange">
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button size="small" @click="handleTop(scope.row)" v-if="scope.row.status === 0">{{scope.row.isTop === 2 ? '取消置顶' : '置顶'}}</iep-button>
              <iep-button size="small" @click="handleDeleteById(scope.row)">删除</iep-button>
              <iep-button size="small" @click="handleOpen(scope.row)">{{openStatus[scope.row.status]}}</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <open-select ref="optenSelect" @opten-select="optenSelct">
    </open-select>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { getManagePage, thoughtsDelete, topUpThoughts, postStatusBatch } from '@/api/cpms/thoughts'
import { mapGetters } from 'vuex'
import OpenSelect from './OpenSelect'

export default {
  mixins: [mixins],
  components: { OpenSelect },
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
      status: '',
      ids: '',
      openStatus: ['生态开放', '不开放', '对组织开放', '对联盟开放'],
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
      topUpThoughts({ id: row.thoughtsId, type: row.isTop === 2 ? 1 : 2 }).then(() => {
        this.loadPage()
      })
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById([row.thoughtsId], thoughtsDelete)
    },
    // 清空搜索
    clearSearchParam () { },
    // 更改公开状态
    handleOpen (row) {
      if (row.isTop === 2) {
        this.$message.error('请先取消置顶状态！')
        return
      }
      this.$refs['optenSelect'].dialogShow = true
      this.ids = [row.thoughtsId]
    },
    optenSelct (status) {
      this.status = status
      postStatusBatch({
        status: this.status,
        ids: this.ids,
      }).then(() => {
        this.loadPage()
        this.$message.success('更改成功')
        this.status = ''
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
