<template>
  <div>
    <basic-container>
      <iep-statistics-header title="变更股东" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button @click="onGoBack">返回</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <operation-container style="margin-top: 10px;">
        <template slot="left">
          <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>新增股东</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" prop="realName">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable">
        <template slot="before-columns">
          <el-table-column label="股东">
            <template slot-scope="scope">
              <iep-div-detail v-if="scope.row.holdType === '2'" :value="scope.row.orgName"></iep-div-detail>
              <iep-div-detail v-if="scope.row.holdType === '3'" :value="scope.row.userName"></iep-div-detail>
              <iep-div-detail v-if="scope.row.holdType === '4'" :value="scope.row.externalShareholder"></iep-div-detail>
            </template>
          </el-table-column>
          <el-table-column label="持股比例" width="90px">
            <template slot-scope="scope">
              <iep-div-detail :value="parseToPercent(scope.row.investmentNumber / scope.row.allSharesNumber, 2)"></iep-div-detail>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="230px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelelte(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
import { getInvestmentById, getReleasePage, postShareholder, putShareholder, delShareholder } from '@/api/fams/investment'
import DialogForm from './DialogForm'
import { initForm } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: {
    IepStatisticsHeader,
    DialogForm,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      columnsMap: [
        {
          prop: 'holdType',
          label: '持股类型',
          type: 'dictGroup',
          dictName: 'FAMS_HOLD_TYPE',
        },
        {
          prop: 'investmentNumber',
          label: '非流通股本',
        },
      ],
      statistics: [0, 0, 0, 0],
      parseToPercent: this.$options.filters.parseToPercent,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    financialData () {
      return {
        '集团非流通股份': this.statistics[0],
        '已发行流通股份': this.statistics[1],
        '集团非流通股份比例': this.parseToPercent(this.statistics[2], 2),
        '已发行流通股份比例': this.parseToPercent(this.statistics[3], 2),
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelelte (row) {
      this._handleGlobalDeleteById(row.id, delShareholder)
    },
    handleEdit (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].form.user = {
        id: row.userId,
        name: row.userName,
      }
      this.$refs['DialogForm'].form.investmentId = this.id
      this.$refs['DialogForm'].isEdit = true
      this.$refs['DialogForm'].formRequestFn = putShareholder
      this.$refs['DialogForm'].allSharesNumber = this.form.allSharesNumber
      this.$refs['DialogForm'].dialogShow = true
    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.investmentId = this.id
      this.$refs['DialogForm'].isEdit = false
      this.$refs['DialogForm'].formRequestFn = postShareholder
      this.$refs['DialogForm'].allSharesNumber = this.form.allSharesNumber
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable({ ...param, investmentId: this.id }, getReleasePage)
      this.statistics = data.statistics
      getInvestmentById(this.id).then(({ data }) => {
        this.form = data.data
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
