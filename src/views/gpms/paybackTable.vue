<template>
  <div>
    <iep-table :isLoadTable="false" border :pagedTable="dataList" :isPagination="false">
      <el-table-column label="回款金额">
        <template slot-scope="scope">
          {{ scope.row.paymentAmount }}
        </template>
      </el-table-column>
      <el-table-column label="回款时间">
        <template slot-scope="scope">
          {{ scope.row.projectPaymentTime }}
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
export default {
  name: 'collectionTable',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {

    }
  },
  methods: {
  },
}
</script>
