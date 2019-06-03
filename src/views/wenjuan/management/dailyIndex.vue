<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter">
      </gov-search-bar>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        @selection-change="selectionChange"
        :option="tableOption"
        :data="tableList"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="scope.row.status > 2" @click="handleDetail(scope.row)" type="text">开始评测</gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <daily-evaluating ref="dailyEvaluating">

    </daily-evaluating>
  </gov-layout-main>
</template>
<script>
/*eslint-disable*/
import mixin from '@/wenjuan/mixins/mixin'
import scopeMixin from './const/listMixin'
import { getDailyList } from '@/api/evaluate/management'
import dailyEvaluating from './dailyEvaluating'
export default {
  components: { dailyEvaluating },
  mixins: [mixin,scopeMixin],
  data () {
    return {
      tableList: [],
    }
  },
  created () {
    this.getList()
  },
  computed: {

  },

  methods: {

    // 读取数据
    getList () {
      this.tableLoading = true
      getDailyList(this.listQuery).then(({data})=>{
        this.tableList = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },

    handleDetail (row) {
      this.$refs['dailyEvaluating'].open(row)
    },
  },
}
</script>
<style scoped lang="scss">

</style>
