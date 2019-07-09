<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <h2 class="sub-title">组织收支</h2>
      </div>
      <el-form ref="form" class="form-detail" :model="form" size="small" label-width="80px">
        <iep-form-item label-name="组织" v-show="isAbled">
          <iep-select
            size="small"
            v-model="orgIds"
            autocomplete="off"
            prefix-url="admin/org/all"
            @change="listPage()"
            placeholder="所有"
          ></iep-select>
        </iep-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column prop="actualIncome" label="实际收入"></el-table-column>
        <el-table-column prop="actualExpenditure" label="实际支出"></el-table-column>
        <el-table-column prop="budgetExpenditure" label="预算支出"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import mixins from '@/mixins/mixins'
import { getBudgetList, getBossBudgetList } from '@/api/fams/statistics'
export default {
  mixins: [mixins],
  data () {
    return {
      orgIds: '',
      form: {
        organization: '',
        birthday: '',
      },
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      tableData: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    ...mapState({
      orgId: state => state.user.userInfo.orgIds,
    }),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3 || this.userInfo.userId === 451
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    listPage () {
      this.loadPage()
    },
    async loadPage () {
      if (this.isAbled) {
        const { data } = await getBossBudgetList()
        this.tableData = data.data
      } else {
        const { data } = await getBudgetList()
        this.tableData = data.data
      }
    },
  },
}
</script>
<style scoped lang='scss'>
.sub-title {
  font-size: 16px;
}
.form-detail {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .search-btn {
    margin-left: 10px;
    margin-bottom: 18px;
  }
}
.gird-item .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.gird-item >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gird-item >>> .el-card__body {
  height: 288px;
}
.gird-item >>> .el-table::before {
  background: none;
}
.gird-item >>> .el-table th {
  background-color: #f5f7fa;
}
.gird-item >>> .el-card__header,
.gird-item >>> .el-card__body {
  padding: 18px 0;
}
</style>
