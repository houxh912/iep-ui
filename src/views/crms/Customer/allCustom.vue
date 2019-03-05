<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search="searchPage"></operation-search>
      </template>
    </operation-container>
    <iep-table 
      :isLoadTable="isLoadTable"
      :pagination="pagination"
      :dictsMap="dictsMap"
      :columnsMap="columnsMap"
      :pagedTable="pagedTable"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      is-index>
      <template slot="before-columns">
        <el-table-column label="客户名称" width="300px">
          <template slot-scope="scope">
            <div class="custom-name">{{scope.row.name}}</div>
            <el-col class="custom-tags">
              <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap } from './const/index'
import { fetchList } from '@/api/crms/custom'

export default {
  name: 'custom',
  mixins: [mixins],
  components: {  },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
  // text-decoration: underline;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
