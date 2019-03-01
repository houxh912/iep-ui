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
      <el-table-column prop="operation" label="操作" min-width="60" align="center">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small">编辑</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <main-form-dialog ref="mainDialog" @load-page="loadPage"></main-form-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { myTableOption, dictsMap } from './const/index'
import { fetchList, updateData } from '@/api/crms/custom'
import mainFormDialog from './mainDialog'

export default {
  name: 'custom',
  mixins: [mixins],
  components: { mainFormDialog },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: myTableOption,
    }
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    handleEdit (row) {
      this.$refs['mainDialog'].formData = row
      this.$refs['mainDialog'].methodName = '编辑'
      this.$refs['mainDialog'].formRequestFn = updateData
      this.$refs['mainDialog'].dialogShow = true
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
