<template>
  <div>
    <basic-container>
      <page-header title="站群管理" :replaceText="replaceText" :data="statistics"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="warning" plain @click="handleAdd">新增</iep-button>
          <iep-button>删除</iep-button>
        </template>
        <template slot="right">
          <operation-search>
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
          </operation-search>
        </template>
      </operation-container>
      <iep-table
        :isLoadTable="false"
        :pagination="pagination"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        is-mutiple-selection
      >
        <template slot="before-columns">
          <el-table-column label="ID" width="90px">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template>
            <operation-wrapper>
              <iep-button @click="handleEdit">编辑</iep-button>
              <iep-button @click="handleDelete">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap, initForm } from './options'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      statistics: [20],
      replaceText: (data) => `（共${data[0]}条）`,
      pagedTable: [
        { id: 1, name: 'saaa', domainName: 'aad', organization: 'sad', status: '1' },
        { id: 2, name: 'saaa', domainName: 'aad', organization: 'sad', status: '0' },
      ],
    }
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit () {
      this.$refs['DialogForm'].form = initForm()
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDelete () {
       this.$message.success('功能开发中')
    },
  },
}
</script>
