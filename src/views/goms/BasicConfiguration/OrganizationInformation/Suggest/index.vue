<template>
  <div>
    <basic-container>
      <operation-container>
        <template slot="left">
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="发件人" width="220px">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="主题">
            <template slot-scope="scope">
              {{scope.row.theme}}<i class="iconfont icon-fujian" v-show="scope.row.annex"></i>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" @click="handleDetail(scope.row)" plain>查看</iep-button>
              <iep-button v-if="scope.row.status==0">修改</iep-button>
              <iep-button @click.native="handleDelete(scope.row)">删除</iep-button>
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
        {name:'aaaa',theme:'内网2.0开发进度安排建议',annex:true,status:'1',sendTime:'2019-05-09'},
        {name:'aaaa',theme:'内网2.0开发进度安排建议',annex:false,status:'2',sendTime:'2019-05-09'},
        {name:'aaaa',theme:'内网2.0开发进度安排建议',annex:false,status:'1',sendTime:'2019-05-09'},
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
      this.$router.push('/hrms_spa/suggestion_new')
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id)
    },
    handleDetail () {
      this.$router.push({
        path: '/hrms_spa/suggestion_detail',
      })
    },
  },
}
</script>
<style scoped>
</style>
