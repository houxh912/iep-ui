<template>
  <div>
    <div class="title">
      <span>部门统计</span>
      <div>
        <span class="border" @click="left"><i class="el-icon-arrow-left"></i></span>
        <span class="border" @click="right"><i class="el-icon-arrow-right"></i></span>
      </div>
    </div>
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
  data () {
    return {
      tableData: [],
      current:1,
      total:'',
      pageOption: {
        current: 1,
        size: 5,
      },
    }
  },
  created () {
    this.load ()
  },
  methods: {
    load () {
      getAllDept(this.pageOption).then(res => {
        this.tableData = res.data.records
        this.total= res.data.total/5
      })
    },
    left () {
      if (this.current > 1) {
        this.current--
        this.pageOption.current = this.current
        this.load()
      } else {
        this.$message.success('已到首页')
      }
    },
    right () {
      if (this.current < this.total) {
        this.current++
        this.pageOption.current = this.current
        this.load()
      } else {
        this.$message.success('已到尾页')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title{
  width: 100%;
  height:50px;
  display: flex;
  justify-content: space-between;
  padding:10px;
}
.border {
  cursor:pointer;
  margin-left: 10px;
  i {
    display: inline-block;
    padding: 5px;
    border: 1px solid #9c9c9c;
  }
  &:hover {
    color: blue;
  }
}
</style>
