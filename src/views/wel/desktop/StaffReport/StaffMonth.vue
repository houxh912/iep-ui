<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-select v-show="isAbled" size="small" v-model="orgIds" autocomplete="off" prefix-url="admin/org/all" @change="listPage()" placeholder="所有" clearable></iep-select>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" prop="realName" placeholder="根据姓名进行搜索" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :cell-style="mixinsCellPointerStyle" isMutipleSelection>
      <template slot="before-columns">
        <el-table-column label="标题" width="400">
          <template slot-scope="scope">
            <iep-div-detail :value="scope.row.title"></iep-div-detail>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">{{scope.row.createTime|parseToDay}}</template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="100">
        <template slot-scope="scope">
          <iep-button @click="handleClick(scope.row)">查看</iep-button>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
import { getTableData } from '@/api/mlms/leader_report/'
import mixins from '@/mixins/mixins'
import AdvanceSearch from '../Components/AdvanceSearch'
import { mapGetters, mapState } from 'vuex'
import { columnsMap } from './options'
export default {
  mixins: [mixins],
  components: {
    AdvanceSearch,
  },
  data () {
    return {
      columnsMap,
      orgIds: '',
      realName: '',
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    ...mapState({
      orgId: state => state.user.userInfo.orgIds,
    }),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ realName: this.realName, orgId: this.orgIds, reportType: 1, ...param }, getTableData)
    },
    handleClick (row) {
      this.$router.push({
        path: `/wel/staff_month_detail/${row.reportId}`,
      })
    },
    listPage () {
      this.realName = ''
      this.loadPage()
    },
    searchPage (val) {
      this.loadPage(val)
    },
  },
}
</script>