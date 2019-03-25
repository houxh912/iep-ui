<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="客户名称">
              <el-input v-model="paramForm.clientName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="业务类型">
              <el-select v-model="paramForm.businessType" placeholder="选择业务类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域类型">
              <el-select v-model="paramForm.districtType" placeholder="选择区域类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户关系">
              <el-select v-model="paramForm.clientRela" placeholder="选择客户关系">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟进状态">
              <el-select v-model="paramForm.followUpStatus" placeholder="选择跟进状态">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="市场经理">
              <el-input v-model="paramForm.marketManager" placeholder="请输入市场经理"></el-input>
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
      <template slot="before-columns">
        <el-table-column label="客户名称" width="250px">
          <template slot-scope="scope">
            <div class="custom-name">{{scope.row.clientName}}</div>
            <el-col class="custom-tags">
              <el-tag type="info" size="mini" v-for="(item, index) in scope.row.tags" :key="index">{{item.commonName}}</el-tag>
            </el-col>
          </template>
        </el-table-column>
      </template>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { allTableOption, dictsMap, allSearchForm } from '../options'
import { fetchList } from '@/api/crms/custom'

export default {
  name: 'custom',
  mixins: [mixins],
  components: {},
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: allTableOption,
      paramForm: allSearchForm(),
      tags: [{ tag: '数据基因' }, { tag: '智慧城市' }, { tag: '通知公告' }],
    }
  },
  methods: {
    loadPage (param = this.paramForm) {
      this.loadTable(param, fetchList, m => {
        return Object.assign(m, { businessTypeC: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = allSearchForm()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 10px;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
