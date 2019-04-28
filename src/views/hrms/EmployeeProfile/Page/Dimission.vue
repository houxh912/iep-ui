<template>
  <inline-form-table :table-data="value.dimission" :columns="dimissionColumns" requestName="dimission" type="employee_profile" :rid="value.id" @load-page="handleSave"></inline-form-table>
</template>
<script>
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { dimissionColumns} from '@/views/hrms/Components/options'
export default {
  components: {InlineFormTable},
  props: ['value'],
  data () {
    return {
      dimissionColumns,
    }
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>
