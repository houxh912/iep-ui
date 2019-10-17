<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
        <iep-button icon="el-icon-delete">删除</iep-button>
        <iep-button icon="el-icon-remove-outline">禁用</iep-button>
        <iep-button icon="el-icon-edit">启用</iep-button>
        <iep-button icon="el-icon-upload">Excel导入</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="name" advance-search placeholder="请输入机构名称进行搜索">
          <advance-search></advance-search>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap">
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleTypeEdit(scope.row)" type="primary" plain>编辑</iep-button>
            <iep-button @click="handleTypeDelete(scope.row)">删除</iep-button>
            <iep-button @click="handleTypeDelete(scope.row)">禁用</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>>
<script>
import { columnsMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
import AdvanceSearch from './AdvanceSearch'
export default {
  components: { AdvanceSearch },
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap,
    }
  },
  methods: {
    handleAdd () {
      this.$router.push({
        path: '/tms/list_edit/0',
      })
    },
  },
}
</script>>