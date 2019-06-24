<template>
  <div class="fund">
    <div class="content">
      <el-card shadow="never">
        <operation-container>
          <template slot="left">
            <span class="sub-title">项目核算</span>
          </template>
          <template slot="right">
            <operation-search @search-page="searchPage" prop="projectName">
            </operation-search>
          </template>
        </operation-container>
        <iep-divider />
        <div class="chart">
          <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">          </iep-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getProjectPage,getBossProjectPage } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
const columnsMap = [
	{
		prop: 'projectNum',
		label: '项目编号',
	},
	{
		prop: 'projectName',
		label: '项目名称',
	},
	{
		prop: 'createTime',
		label: '创建时间',
	},
	{
		prop:'amount',
		label:'合同金额',
	},
	{
		prop:'invoiceAmount',
		label:'开票金额',
	},
]
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      userId: '',
    }
  },
  created () {
    this.userId = this.userInfo.userId
    this.loadPage()
  },
  computed: {
     ...mapGetters([
      'userInfo',
    ]),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  methods: {
    loadPage (param = this.searchParam) {
      if(this.isAbled){
        getBossProjectPage(this.userId).then(({data})=>{
          const { records, size, total, current } = data.data
          const isBug = total / size + 1 === current
          if (isBug && total !== 0) {
            this.searchPage() // 防止分页为空页的情况
          } else {
            this.pagination = { current, size, total }
          }
          this.pagedTable = records
        })
        // this.loadTable({id:this.userId, ...param}, getBossProjectPage)
      }else{
        this.loadTable(param, getProjectPage)
      }
    },
    handleDetail (row) {
      this.$router.push({
        path: `/fams_spa/project_accounting/${row.id}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.fund {
  .sub-title {
    font-size: 16px;
  }
  .chart {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    // grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  }
}
</style>
<style scoped>
.fund >>> .time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
}
.fund >>> .time .el-button {
  padding: 5px 20px;
}
.fund >>> .time .el-button.active,
.fund >>> .time .el-button:focus {
  border-color: #cb3737;
  color: #cb3737;
}
.fund >>> .block {
  width: 200px;
}
.fund >>> .el-date-editor.el-input__inner {
  width: 100%;
}
.fund >>> .el-card__body {
  height: 100%;
}
</style>

