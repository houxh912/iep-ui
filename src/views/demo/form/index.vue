<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :list-query="listQuery"
        label-width="80px"
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
            <gov-button type="text" @click="handleDelete(scope.row.id)" text="删除"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog ref="mainDialog" :state="dialogStatus"></main-dialog>
  </gov-layout-main>
</template>

<script>
import mixin from '@/mixins/mixin'
import mainDialog from './mainDialog'
import { mainTableOption, searchOption } from './const/index'

export default {
  name: 'demoForm',
  mixins: [mixin],
  components: { mainDialog },
  data () {
    return {
      tableLoading: true,
      listQuery: {},
      mainTableData: [],
    }
  },
  computed: {
    searchOption () {
      return searchOption
    },
    mainTableOption () {
      return mainTableOption
    },
  },
  methods: {
    getList () {
      setTimeout(() => {
        this.pagination.total = 1
        this.mainTableData =  [{id: 1, name: '名称1'}]
        this.tableLoading = false
      }, 1000)
    },
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$refs.mainDialog.open(row)
    },
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$refs.mainDialog.open(row)
    },
    handleDelete () {
      this.$confirm('确定要删除吗').then(() => {
        // deleteData(id).then(() => {
        //   this.$message('删除成功！')
        //   this.getList()
        // })
      }).catch(() => {})
    },
  },
  created () {
    this.getList()
  },
}
</script>

