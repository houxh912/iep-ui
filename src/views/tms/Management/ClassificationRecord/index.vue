
<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search placeHolder="请输入关键词" prop="creatorName" @search-page="searchPage" advance-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="记录时间">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope">
            {{scope.row.creatorName}}
          </template>
        </el-table-column>
        <el-table-column label="操作类型">
          <template slot-scope="scope">
            {{scope.row.operateType}}
          </template>
        </el-table-column>
        <el-table-column label="阈值">
          <template slot-scope="scope">
            {{scope.row.threshold}}%
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button type="warning" plain @click="handleDetail(scope.row)">查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <detail ref="OpenDetail" @load-page="loadPage"></detail>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getClassificationPage } from '@/api/tms/management'
import AdvanceSearch from './AdvanceSearch'
import Detail from './Detail'
export default {
  mixins: [mixins],
  components: { AdvanceSearch, Detail },
  data () {
    return {
      columnsMap: [
        {
          prop: 'termsPercent',
          label: '标准库/基础库',
        },
        {
          prop: 'addedCenterSize',
          label: '新增中心词',
        },
        {
          prop: 'newSatelliteSize',
          label: '归类卫星词',
        },
      ],
    }
  },
  computed: {
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getClassificationPage)
    },
    handleDetail (row) {
      this.$refs['OpenDetail'].dialogShow = true
      this.$refs['OpenDetail'].id = row.id
      this.$refs['OpenDetail'].loadPage()
    },
  },
}
</script>

