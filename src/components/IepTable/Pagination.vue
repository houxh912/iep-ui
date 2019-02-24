<template>
  <div class="content-footer">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next" :total="paginationOption.total" :pager-count="5" prev-text="上一页" next-text="下一页" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    paginationOption: {
      type: Object,
      require: true,
      default: () => { },
    },
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
  },
}
</script>
<style scoped>
.content-footer {
  padding-bottom: 5px;
  background: #fff;
  position: relative;
  height: 25px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px 20px;
}
.content-footer >>> .el-pagination {
  text-align: right;
}
.content-footer >>> .btn-prev {
  padding: 0 15px;
}
.content-footer >>> .btn-next {
  padding: 0 15px;
}
</style>
