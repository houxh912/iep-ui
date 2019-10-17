<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button icon="el-icon-check" plain>认证</iep-button>
      </template>
      <template slot="right">
        <operation-search prop="name" placeholder="请输入机构名称进行搜索">
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection :dictsMap="dictsMap">
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleTypeEdit(scope.row)" type="primary" plain>编辑</iep-button>
            <iep-button @click="handleTypeDelete(scope.row)">认证</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap } from '../options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap: columnsPendingMap,
    }
  },
}
</script>>