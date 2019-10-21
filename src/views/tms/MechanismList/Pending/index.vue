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
      <template slot="before-columns">
        <el-table-column label="机构名称">
          <template slot-scope="scope">
            <div class="box">
              <span class="main-name">{{scope.row.name}}</span>
              <span class="claim">认</span>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleTypeEdit(scope.row)" type="primary" plain>编辑</iep-button>
            <iep-button @click="handleClaim(scope.row)">认证</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <dialog-form ref="DialogForm"></dialog-form>
  </div>
</template>>
<script>
import { columnsPendingMap, dictsMap, initForm } from '../options'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      isLoadTable: false,
      dictsMap,
      columnsMap: columnsPendingMap,
      pagedTable: [
        { name: 'sssssssssxxxxxxxxxxxxxxxxxxxxxs' },
        { name: 'sssss' },
      ],
    }
  },
  methods: {
    handleClaim (row) {
      this.$refs['DialogForm'].form = this.$mergeByFirst(initForm(), row)
      this.$refs['DialogForm'].dialogShow = true
    },
  },
}
</script>>
<style lang="scss" scoped>
.box {
  display: flex;
}
.main-name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
}
.claim {
  color: #cf3f26;
  font-size: 16px;
}
</style>