<template>
  <basic-container>
    <div class="content">
      <operation-container>
        <template slot="left">
          <el-dropdown size="medium" class="left">
            <iep-button size="small" class="button" type="primary" plain @click="handleCreate">新增</iep-button>
          </el-dropdown>
        </template>
        <template slot="right">
          <iep-button size="small" class="button" plain @click="handleReturn">返回</iep-button>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection @selection-change="selectionChange">
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain size="small" @click="handleUpdate(scope.row)">编辑</iep-button>
              <iep-button size="small" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <form-tpl ref="form" @load-page="loadPage"></form-tpl>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import FormTpl from './form'

export default {
  components: { FormTpl },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
    }
  },
  methods: {
    loadPage () {},
    handleUpdate () {},
    handleDelete () {},
    searchPage () {},
    selectionChange () {},
    handleCreate () {
      this.$refs['form'].open('create')
    },
    handleReturn () {
      this.$emit('load-page', true)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.left {
  .button {
    margin-right: 10px;
  }
}
</style>
