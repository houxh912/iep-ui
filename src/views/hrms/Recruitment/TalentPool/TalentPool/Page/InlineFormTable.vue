<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" style="margin: -5px 0" :value="scope.row[item.prop]" :placeholder="item.label" @change="e => handleChange(e.target.value, record.key, col)"></el-input>
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
              <a @click="saveRow(scope.row.key)">添加</a>
              <el-popover title="是否要删除此行？">
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text">取消</el-button>
                  <el-button type="primary" size="mini">确定</el-button>
                </div>
                <iep-button size="mini" slot="reference">删除</iep-button>
              </el-popover>
            </span>
            <span v-else>
              <a @click="saveRow(scope.row.key)">保存</a>
              <a @click="cancel(scope.row.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <iep-button size="mini" @click="toggle(scope.row.key)">编辑</iep-button>
            <el-popover placement="top" width="160">
              <p>是否要删除此行？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">取消</el-button>
                <el-button type="primary" size="mini">确定</el-button>
              </div>
              <el-button slot="reference">删除</el-button>
            </el-popover>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <iep-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" icon="el-icon-plus" plain>新增</iep-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        startTime: '2016-05-02',
        content: '王小虎',
        place: '上海市普陀区金沙江路 1518 弄',
      }, {
        startTime: '2016-05-04',
        content: '王小虎',
        place: '上海市普陀区金沙江路 1517 弄',
      }, {
        startTime: '2016-05-01',
        content: '王小虎',
        place: '上海市普陀区金沙江路 1519 弄',
      }, {
        startTime: '2016-05-03',
        content: '王小虎',
        place: '上海市普陀区金沙江路 1516 弄',
      }],
      columns: [
        {
          prop: 'place',
          label: '学习(教育)单位',
        }, {
          prop: 'startTime',
          label: '起始时间',
        }, {
          prop: 'content',
          label: '学习内容',
        },
      ],
    }
  },
}
</script>
