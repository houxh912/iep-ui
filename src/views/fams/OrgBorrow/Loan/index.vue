<template>
  <div>
    <basic-container>
      <iep-page-header title="待处理借款"></iep-page-header>
      <operation-container>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :cell-style="mixinsCellPointerStyle">
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgBorrowPage } from '@/api/fams/org_borrow'
import mixins from '@/mixins/mixins'
import { dictsMap, colMap, tabList } from './options'
import { formatBorrow } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      type: this.$route.query.type || 'outOrgId',
      tabList,
      dictsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    orgId () {
      return this.userInfo.orgId
    },
    typeQuery () {
      const type = this.type
      return {
        [type]: this.orgId,
      }
    },
    columnsMap () {
      return colMap[this.type]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    changeType (v) {
      this.$router.push({ query: { type: v } })
      this.loadPage()
    },
    handleAddOrgBorrow () {
      this.$router.push({
        path: '/fams_spa/org_borrow_detail/0',
      })
    },
    handleAddUnionBorrow () {
      this.$router.push({
        path: '/fams_spa/union_borrow_detail/0',
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: formatBorrow(row),
        query: { repayment: 'true' },
      })
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...this.typeQuery, ...param }, getOrgBorrowPage)
    },
  },
}
</script>
