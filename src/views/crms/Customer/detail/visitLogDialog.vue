<template>
  <div class="visitLog">
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
    <el-row class="add-visit">
      <el-col class="right button"><i class="el-icon-plus"></i> 拜访日志</el-col>
      <el-col class="left button"><i class="el-icon-plus"></i> 联系记录</el-col>
    </el-row>
  </div>
</template>

<script>
import OperationWrapper from '@/components/Operation/Wrapper'
export default {
  name: 'visitLog',
  components: { OperationWrapper },
  data () {
    return {
      isLoadTable: false,
      tableData: [
        { id:1, name: '拜访日志1' },
        { id:2, name: '拜访日志2' },
        { id:3, name: '拜访日志3' },
      ],
      columnsMap: [
        { label: '主题', prop: 'name' },
        { label: '拜访时间', prop: 'zhiwu' },
        { label: '类型', prop: 'guanlian' },
      ],
    }
  },
  methods: {
    getList () {
    },
  },
}
</script>

<style lang="scss" scoped>
.visitLog {
  .add-visit {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    .button {
      cursor: pointer;
      padding: 5px;
      margin: 0 20px;
    }
    .right {
      text-align: right;
      color: #db7a7e;
    }
    .left {
      text-align: left;
    }
  }
}
</style>
