<template>
  <div class="LatestInvestment">
    <iep-table :isLoadTable="false" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false">

    </iep-table>

  </div>
</template>
<script>


const dictsMap = {
  status: {
    '1': '现金',
    '2': '国脉贝',
  },
}
const columnsMap = [
  {
    prop: 'id',
    label: '序号',
  },
  {
    prop: 'userName',
    label: '投资人',
  },
  {
    prop: 'totalAmount',
    label: '投资金额（元）',
  },
  {
    prop: 'status',
    label: '支付方式',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '投资时间',
  },
]
export default {
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {
      columnsMap,
      dictsMap,
      pagedTable: [],
    }
  },
  computed: {
  },
  created () {
    this.isLoadTable = true
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.pagedTable = this.dataList
      this.isLoadTable = false
      var recordLen = this.pagedTable.length
      for (var i = 0; i < recordLen; i++) {
        var surname = this.pagedTable[i].userName.substring(0, 1)
        this.pagedTable[i].userName = surname + '**'
      }
    },
  },
}
</script>
<style scoped>
.LatestInvestment >>> .iep-ellipsis {
  width: 100%;
  text-align: left;
}
</style>

