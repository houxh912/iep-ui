<template>
  <div>
    <iep-table :isLoadTable="isLoadTable" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
    </iep-table>
    <div class="counts">
      <span>
        <span class="size">{{size}}</span>个模块
      </span>
      <span>
        共计:
        <span class="count">{{count}}</span>
      </span>
    </div>
  </div>

</template>
<script>
const columnsMap = [
  {
    prop: 'moduleName',
    label: '模块名称',
  },
  {
    prop: 'guidePrice',
    label: '指导价格',
  },
  {
    prop: 'preferentialPrice',
    label: '优惠价格',
  },
]
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      size: '',
      count: '',
      pagedTable: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.$emit('load-table')
      console.log(this.pagedTable)
      this.size = this.pagedTable.length ? this.pagedTable.length : 0
      let arr = []
      this.pagedTable.forEach(item => {
        arr.push(item.preferentialPrice)
        let result = arr.reduce((total, currentValue) => {
          return total + currentValue
        })
        this.count = result
      })
    },
  },
}
</script>
<style scoped lang='scss'>
.counts {
  padding: 15px;
  text-align: right;
  & > span {
    margin-right: 15px;
    font-size: 14px;
    .size,
    .count {
      font-size: 16px;
    }
    .count {
      color: $--color-primary;
    }
  }
}
</style>
