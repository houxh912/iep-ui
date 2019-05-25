<template>
  <div>
    <operation-container>
      <template slot="left">
        <span class="label" slot="label">请选择年份：</span>
        <!-- <el-select v-model="budgetId" placeholder="请选择年份" size="small" @change="handleChange">
          <el-option v-for="item in yearList" :key="item.budgetId" :label="item.budgetTime+'年'" :value="item.budgetId">
          </el-option>
        </el-select> -->
        <div class="block">
          <el-date-picker v-model="value3" type="year" placeholder="选择年">
          </el-date-picker>
        </div>
      </template>
    </operation-container>
    <el-table class="income-table" v-loading="loading" :data="budgetTableRelation" style="width: 100%" :height="tableHeight" show-summary row-key="id">
      <el-table-column label="2018年收入账单">
        <el-table-column prop="num" label="序号">
        </el-table-column>
        <el-table-column prop="subjects" label="财务科目">
        </el-table-column>
        <el-table-column label="金额（元）">
          <el-table-column prop="reality" label="实际">
          </el-table-column>
          <el-table-column prop="expect" label="预计">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="num2" label="序号">
        </el-table-column>
        <el-table-column prop="subjects2" label="财务科目">
        </el-table-column>
        <el-table-column label="金额（元）">
          <el-table-column prop="reality2" label="实际">
          </el-table-column>
          <el-table-column prop="expect2" label="预计">
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value3: '',
      budgetId: '',
      budgetTime: '',
      yearList: [],
      budgetTableRelation: [
        {
          id: 1,
          num: '1',
          subjects: '项目收入',
          reality: '419203',
          expect: '50000',
          num2: '1',
          subjects2: '项目收入',
          reality2: '244563',
          expect2: '5088',
          children: [
            {
              id: 31,
              subjects: '外部项目收入',
              reality: '876322',
              expect: '5000',
            },
            {
              id: 32,
              subjects: '内部项目收入',
              reality: '876322',
              expect: '5000',
            },
          ],
        },
        {
          id: 2,
          num: '2',
          subjects: '政府补贴',
          reality: '876322',
          expect: '5000',
          num2: '5',
          subjects2: '政府补贴',
          reality2: '242563',
          expect2: '50288',
        },
        {
          id: 3,
          num: '3',
          subjects: '政府补贴',
          reality: '876322',
          expect: '5000',
          num2: '5',
          subjects2: '政府补贴',
          reality2: '242563',
          expect2: '50288',
        },
      ],
      tableHeight: 'calc(100vh - 260px)',
    }
  },
  methods: {
    load (tree, treeNode, resolve) {
      resolve([
        {
          id: 31,
          subjects: '外部项目收入',
          reality: '876322',
          expect: '5000',
        },
        {
          id: 32,
          subjects: '内部项目收入',
          reality: '876322',
          expect: '5000',
        },
      ])
    },
  },
}
</script>
<style lang="css" scoped>
.label {
  min-width: 100px;
  text-align: right;
}
.income-table >>> .el-table .cell {
  text-align: center;
}
</style>



