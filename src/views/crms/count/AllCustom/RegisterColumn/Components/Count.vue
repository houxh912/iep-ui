<template>
  <div>
    <!-- <div class="top flag">
      <span>部门统计</span>
      <div class="more">
        <span class="border" @click="left"><i class="el-icon-arrow-left"></i></span>
        <span class="border" @click="right"><i class="el-icon-arrow-right"></i></span>
      </div>
    </div> -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="clientQuantitySort" label="排名">
      </el-table-column>
      <el-table-column prop="department" label="负责部门">
      </el-table-column>
      <el-table-column prop="clientQuantity" label="客户数量">
      </el-table-column>
      <el-table-column prop="contactQuantity" label="联系人数量">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllDept } from '@/api/crms/count'
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      // tableData: [{
      //   rank: 1,
      //   position: '北方三部',
      //   client: 22,
      //   cntact: 39,
      // }, {
      //   rank: 2,
      //   position: '北方二部',
      //   client: 15,
      //   cntact: 26,
      // }, {
      //   rank: 3,
      //   position: '北方四部',
      //   client: 9,
      //   cntact: 14,
      // }, {
      //   rank: 4,
      //   position: '北方一部',
      //   client: 7,
      //   cntact: 15,
      // }, {
      //   rank: 5,
      //   position: '北方一部',
      //   client: 4,
      //   cntact: 12,
      // }],
      tableData: [],
      pageOption: {
        current: 1,
        size: 5,
      },
    }
  },
  created () {
    this.load()
  },
  watch: {
    current (current) {
      this.pageOption.current = current
      this.load()
    },
  },
  methods: {
    load () {
      getAllDept(this.pageOption).then(res => {
        console.log(res)
        this.tableData = res.data.records
      })
    },
  },
}
</script>

<style>
</style>
