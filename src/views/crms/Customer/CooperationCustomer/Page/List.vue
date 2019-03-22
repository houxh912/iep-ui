<template>
  <div>
    <operation-container>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="客户名称">
              <el-input v-model="paramForm.clientName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
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
      <el-table-column prop="operation" label="操作" min-width="60" align="center">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning">编辑</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { collaborationTableOption, dictsMap, initSearchForm } from '../options'
import { collaborationFetchList } from '@/api/crms/custom'

export default {
  name: 'custom',
  mixins: [mixins],
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: collaborationTableOption,
      paramForm: initSearchForm(),
    }
  },
  methods: {
    // loadPage (param) {
    //   this.loadTable(param, collaborationFetchList)
    // },
    loadPage (param = this.paramForm) {
      this.loadTable(param, collaborationFetchList, m => {
        return Object.assign(m, { businessTypeC: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleEdit (row) {
      this.$emit('onEdit', row)
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
  // text-decoration: underline;
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
