<template>
  <div>
    <basic-container>
      <iep-statistics-header title="变更股东" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button type="primary" @click="handleChangeRelease" plain>变更发行</iep-button>
            <iep-button @click="$openPage(`/fams_spa/business_indicator`)">变更股东</iep-button>
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
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelelte(scope.row)">编辑</iep-button>
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
import { getInvestmentById, getReleasePage, postShareholder } from '@/api/fams/investment'
import DialogForm from './DialogForm'
import { initForm } from '../options'
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
          prop: 'userName',
          label: '股东',
        },
        {
          prop: 'shareRatio',
          label: '持股比例',
        },
        {
          prop: 'holdType',
          label: '持股类型',
          type: 'dictGroup',
          dictName: 'FAMS_HOLD_TYPE',
        },
        {
          prop: 'nonCirculationNumber',
          label: '非流通股本',
        },
      ],
      statistics: [],
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
        '发行股份': this.statistics[0],
        '已认购股份': this.statistics[1],
        '股东人数': this.statistics[2],
        '今日股价': this.statistics[3],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDelelte () {

    },
    handleEdit () {

    },
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].form.investmentId = this.id
      this.$refs['DialogForm'].formRequestFn = postShareholder
      this.$refs['DialogForm'].dialogShow = true
    },
    async loadPage (param = this.searchForm) {
      const data = await this.loadTable({ ...param, investmentId: this.id }, getReleasePage)
      this.statistics = data.data.statistics
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
