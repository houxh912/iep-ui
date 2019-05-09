<template>
  <div>
    <basic-container>
      <page-header title="我发出的建议"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleReview(scope.row)" plain>查看</iep-button>
              <iep-button :disabled="scope.row.status===3" @click="handleDeliver(scope.row)">转交</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
import { dictsMap, columnsMap } from './options'
export default {
  components: {
    AdvanceSearch,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable:[
        {name:'aaaa',theme:'内网2.0开发进度安排建议',status:'1',sendTime:'2019-05-09'},
        {name:'aaaa',theme:'内网2.0开发进度安排建议',status:'1',sendTime:'2019-05-09'},
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {

    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleAdd () {

    },
  },
}
</script>
<style scoped>
</style>
