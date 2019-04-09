<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${$route.query.name}申请单`" :backOption="backOption"></page-header>
      <component :is="name" :type="current.value" :fn="fn"></component>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Positive from './Positive/'
import Leaving from './Leaving/'
import Transfer from './Transfer/'
import Leave from './Leave/'
import Overtime from './Overtime/'
import BusinessTrip from './BusinessTrip/'
import ItemUse from './ItemUse/'
import Reimburse from './Reimburse/'
// hrms_applic_type
import { getEmployeeProfileSelf } from '@/api/hrms/employee_profile'
const componentMap = {
  转正: 'Positive',
  请假: 'Leaving',
  调岗: 'Transfer',
  离职: 'Leave',
  加班: 'Overtime',
  出差: 'BusinessTrip',
  物品领用: 'ItemUse',
  报销: 'Reimburse',
}
export default {
  components: {
    Positive,
    Leaving,
    Transfer,
    Leave,
    Overtime,
    BusinessTrip,
    ItemUse,
    Reimburse,
  },
  data () {
    return {
      name: componentMap[this.$route.query.name],
      fn: getEmployeeProfileSelf,
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
    hrms_applic_type () {
      return this.dictGroup['hrms_applic_type']
    },
    current () {
      const current = this.hrms_applic_type.find(m => {
        return m.label.startsWith(this.$route.query.name)
      })
      return current
    },
  },
}
</script>
