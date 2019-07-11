<template>
  <div>
    <iep-table :isLoadTable="false" :isPagination="false" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
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
    }
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
      color: #ba1b21;
    }
  }
}
</style>
