
<template>
  <div :class="dialogShow?'dispaly-show':'dispaly-none'">
    <basic-container>
      <iep-page-header :title="`详情`" :backOption="backOption"></iep-page-header>
      <central-word :information="information"></central-word>
      <operation-container>
        <template slot="right">
          <operation-search placeHolder="请输入关键词" prop="creatorName" @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template slot="before-columns">
          <el-table-column label="ID" width="80">
            <template slot-scope="scope">
              {{scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column label="标签名称">
            <template slot-scope="scope">
              {{scope.row.tagName}}
            </template>
          </el-table-column>
          <el-table-column label="属性">
            <template slot-scope="scope">
              {{scope.row.type}}
            </template>
          </el-table-column>
          <el-table-column label="归入标签">
            <template slot-scope="scope">
              <div>{{scope.row.fallName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="合并标签">
            <template slot-scope="scope">
              <div>{{scope.row.mergeName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="190">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
        </template>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { getSortById, getSortPageByTagId } from '@/api/tms/management'
import CentralWord from './CentralWord'
import AdvanceSearch from './AdvanceSearch'
export default {
  mixins: [mixins],
  components: { CentralWord, AdvanceSearch },
  data () {
    return {
      columnsMap: [
        // {
        //   prop: 'createTime',
        //   label: '记录时间',
        // },
      ],
      backOption: {
        isBack: true,
        backPath: '',
        backFunction: () => {
          this.close()
        },
      },
      information: {
      },
      id: '',
      dialogShow: false,
    }
  },
  created () {
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param }, getSortPageByTagId(this.id))
      getSortById(this.id).then(({ data }) => {
        this.information = data.data
      })
    },
  },
}
</script>
<style scoped>
.dispaly-none {
  display: none;
}
.dispaly-show {
  width: 100%;
  height: 100%;
  padding-right: 40px;
  z-index: 99;
  position: fixed;
  top: 0;
  background: #fff;
}
</style>

