<template>
  <div>
    <basic-container>
      <iep-page-header title="考试统计"></iep-page-header>
      <operation-container>
        <template slot="left">
          <div class="total">共进行了<span>{{totalNum}}</span>场考试</div>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" :params="searchForm.title" prop="title" advanceSearch>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :dictsMap="dictsMap" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <el-table-column prop="operation" label="操作" width="120">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button size="mini" type="warning" plain @click="handleView(scope.row)">考试详情</iep-button>
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
import { getPage } from '@/api/exam/testStatistics/examStatistics'
const columnsMap = [
  {
    label: '考试名称',
    prop: 'title',
  },
  {
    label: '考试科目',
    prop: 'fieldName',
    width: 120,
  },
  {
    label: '考试类型',
    prop: 'examType',
    type: 'dict',
    width: 120,
  },
  {
    label: '阅卷状态',
    prop: 'markingState',
    type: 'dict',
    width: 80,
  },
  {
    label: '报名人数',
    prop: 'totalEnrollment',
    width: 80,
  },
  {
    label: '实考人数',
    prop: 'totalExam',
    width: 80,
  },
  {
    label: '及格人数',
    prop: 'isPassTotal',
    width: 80,
  },
  {
    label: '及格率',
    prop: 'passRateView',
    width: 80,
  },
  {
    label: '平均分',
    prop: 'avgPenScoreName',
    width: 80,
  },
]
const dictsMap = {
  examType: {
    0: '考试模式',
    1: '练习模式',
  },
  markingState: {
    0: '已阅卷',
    1: '正在阅卷',
  },
}
export default {
  mixins: [mixins],
  props: ['record'],
  components: { AdvanceSearch },
  data () {
    return {
      totalNum: 0,
      columnsMap,
      dictsMap,
    }
  },
  created () {
    if (this.record) {
      this.loadPageByRecord()
    } else {
      this.loadPage()
    }

  },
  methods: {
    /**
     * 根据历史翻页保存翻页前的分页
     */
    loadPageByRecord () {
      const param = {
        title: this.record.search,
      }
      this.searchForm.title = this.record.search
      this.pageOption.current = this.record.current
      this.pageOption.size = this.record.size
      this.loadTables({ ...param, ...this.pageOption }, getPage)

    },

    loadPage (param = this.searchForm) {
      this.loadTables(param, getPage)
    },

    async loadTables (param, getPage, fn = m => m) {
      this.isLoadTable = true
      const { data } = await getPage({ ...param, ...this.pageOption })
      const { records, size, total, current } = data.data
      const isBug = total / size + 1 === current
      if (isBug && total !== 0) {
        this.searchPage() // 防止分页为空页的情况
      } else {
        this.pagination = { current, size, total }
      }
      this.pagedTable = records.map(fn)
      this.isLoadTable = false
      this.totalNum = total
      return data.data
    },

    /**
     * 跳转考试详情
     */
    handleView (row) {
      this.$emit('onChange', {
        row,
        current: this.pageOption.current,
        size: this.pageOption.size,
        search: this.searchForm.title,
      })
    },

    selectionChange (val) {
      console.log(val)
    },
  },
}
</script>
<style lang="scss" scoped>
.total {
  span {
    color: #ba1b21;
    font-size: 17px;
    margin: 0 6px;
  }
}
</style>