<template>
  <inline-form-table :table-data="value.transfer" :columns="transferColumns" requestName="transfer" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table>
  <!-- <inline-form-table-detail :data="value.transfer" :columns="transferColumns"></inline-form-table-detail> -->
</template>
<script>
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
// import InlineFormTableDetail from '@/views/hrms/Components/InlineFormTable/detail'
import { transferColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTable },
  props: ['value'],
  data () {
    return {
      transferColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
