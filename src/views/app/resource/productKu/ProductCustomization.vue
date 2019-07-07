<template>
  <div class="pro-cus">
    <basic-container>
      <h2>定制产品</h2>
      <operation-container></operation-container>
      <iep-table
        :isLoadTable="false"
        :pagination="pagination"
        :isPagination="false"
        :dictsMap="dictsMap"
        :columnsMap="columnsMap"
        :pagedTable="pagedTable"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        is-mutiple-selection
      >
        <el-table-column prop="operation" label="操作" width="260">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <div class="count">
        <span>
          <span class="size">{{size}}</span>个模块
        </span>
        <span>
          共计:
          <span class="count">{{count}}</span>
        </span>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { dictsMap, columnsMap } from './options'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      size: 5,
      count: 10000,
      pagedTable: [
        { modelName: 'xsada', guidancePrice: '1000000', favorablePrice: '2133332' },
        { modelName: 'xsada', guidancePrice: '1000000', favorablePrice: '2133332' },
        { modelName: 'xsada', guidancePrice: '1000000', favorablePrice: '2133332' },
      ],
    }
  },
  methods: {
    handleDeleteById () {
      //   this._handleGlobalDeleteById(row.roleId, delObj)
    },
  },
}
</script>
<style scoped>
.pro-cus >>> .title-col {
  text-align: center;
}
</style>
<style scoped lang='scss'>
.pro-cus {
  width: 1200px;
  margin: 0 auto;
  .count {
    padding: 15px;
    text-align: right;
    &>span {
      margin-right: 15px;
      font-size: 14px;
      .size,
      .count {
        font-size: 16px;
      }
      .count {
        color: #ba1b21;
      }
    }
  }
  h2 {
    text-align: center;
  }
}
</style>
