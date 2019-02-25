<template>
  <div class="contacts">
    <el-table
     :data="tableData">
      <el-table-column
          :label="item.label"
          v-for="(item, index) in columnsMap"
          :key="index"
          :prop="item.prop">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDeleteById(scope.row)" size="small">删除</el-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-contacts"><i class="el-icon-plus"></i>添加联系人</div>
  </div>
</template>

<script>
import OperationWrapper from '@/components/Operation/Wrapper'
export default {
  name: 'contacts',
  components: { OperationWrapper },
  data () {
    return {
      isLoadTable: false,
      tableData: [
        { id:1, name: '马云' },
        { id:2, name: '丁磊' },
        { id:3, name: '马化腾' },
      ],
      columnsMap: [
        { label: '联系人姓名', prop: 'name' },
        { label: '联系人职务', prop: 'zhiwu' },
        { label: '关联职务', prop: 'guanlian' },
        { label: '电话', prop: 'tel' },
      ],
    }
  },
  methods: {
    getList () {
    },
  },
}
</script>

<style lang="scss">
.contacts {
  .add-contacts {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
}
</style>
