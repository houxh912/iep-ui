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
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
            <gov-button type="text" @click="handleUpdate(scope.row)" text="编辑"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :state="state" @successSubmit="getList" :dept-list="deptList"></main-dialog>
  </div>
</template>

<script>
import { mainTableOption, searchOption } from './const/cooperation'
import mainDialog from './dialog/mainDialog'
import mixin from '@/mixins/mixin'
import _ from 'lodash'

export default {
  name: 'Demand',
  mixins: [mixin],
  components: { mainDialog },
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
      state: 'create',
      deptList: [],
    }
  },
  methods: {
    handleUpdate (row) {
      this.state = 'update'
      this.$refs['mainDialog'].open(_.cloneDeep(row))
    },
    handleDetail () {
      
    },
    // 获取主表数据
    getList () {
      // getTableData(this.listQuery).then((res) => {
      //   this.pagination.total = res.data.data.total
      //   this.mainTableData = res.data.data.records
      //   this.tableLoading = false
      // })
        this.pagination.total = 2
        this.mainTableData = [{}, {}]
        this.tableLoading = false
    },
  },
  created () {
    this.getList()
  },
}
</script>
