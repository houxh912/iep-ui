<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" size="small" type="danger">新增</iep-button>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="客户名称">
              <el-input v-model="paramForm.clientName" placeholder="关键字"></el-input>
            </el-form-item>
            <!-- <el-form-item label="业务类型">
              <el-select v-model="paramForm.businessType" multiple placeholder="请选择岗位类别">
                <el-option label="咨询" value="1"></el-option>
                <el-option label="数据" value="2"></el-option>
                <el-option label="事项" value="3"></el-option>
                <el-option label="平台" value="4"></el-option>
                <el-option label="软件" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="意向程度">
              <el-select v-model="paramForm.intentionLevel" placeholder="请选择岗位名称">
                <el-option label="高" value="1"></el-option>
                <el-option label="中" value="2"></el-option>
                <el-option label="低" value="3"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="项目名称">
              <el-input v-model="paramForm.projectName" placeholder="关键字"></el-input>
            </el-form-item>
            <!-- <el-form-item label="客户经理">
              <el-input v-model="paramForm.publisher" placeholder="关键字"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
      <el-table-column prop="operation" label="操作" min-width="80" align="center">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleDetail(scope.row)" size="small">查看</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap, initSearchForm } from '../options'
import { businessList, createData } from '@/api/crms/business'
export default {
  name: 'business',
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
      paramForm: initSearchForm(),
      type: 1,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
      this.$emit('clear-search-param')
    },
    loadPage (param = { type: this.type }) {
      this.loadTable(param, businessList, m => {
        return Object.assign(m, { businessTypeC: m.businessType.map(m => m.commonName).join('，') })
      })
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: createData,
        methodName: '新增',
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    searchPage () {
      this.loadTable({ ...this.paramForm, type: this.type }, businessList)
    },
  },

}
</script>
