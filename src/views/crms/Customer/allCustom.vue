<template>
  <div>
    <gov-layout-header>
      <gov-search-bar
        :list-query="listQuery"
        label-width="100px"
        :form-props="searchOption"
        :is-string="false"
        :reset-ignore="['isAsc', 'limit', 'page']"
        @handleFilter="handleFilter">
      </gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :data="mainTableData"
        :option="mainTableOption"
        :table-loading="tableLoading"
        @size-change="sizeChange" 
        @current-change="currentChange" 
        :page="pagination"
        @refresh-change="getList">
      </avue-crud>
    </gov-layout-body>
  </div>
</template>

<script>
import { mainTableOption, searchOption } from './const/allcustom'
import mixin from '@/mixins/mixin'
// import _ from 'lodash'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: {  },
  computed: {
    searchOption () {
      return searchOption
    },
    mainTableOption () {
      return mainTableOption
    },
  },
  data () {
    return {
      tableLoading: true,
      mainTableData: [], // 主表数据
      deptList: [],
    }
  },
  methods: {
    // 获取主表数据
    getList () {
      // getTableData(this.listQuery).then((res) => {
      //   this.pagination.total = res.data.data.total
      //   this.mainTableData = res.data.data.records
      //   this.tableLoading = false
      // })
        this.pagination.total = 2
        this.mainTableData = [{name: '111'}, {name: '222'}]
        this.tableLoading = false
    },
  },
  created () {
    this.getList()
  },
}
</script>
