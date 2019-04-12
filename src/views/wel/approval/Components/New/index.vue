<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${currentName}单`" :backOption="backOption"></page-header>
      <component :is="currentLabel" :type="$route.query.type" :fn="fn"></component>
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
  转正申请: 'Positive',
  请假申请: 'Leaving',
  调岗申请: 'Transfer',
  离职申请: 'Leave',
  加班申请: 'Overtime',
  出差申请: 'BusinessTrip',
  物品领用申请: 'ItemUse',
  报销申请: 'Reimburse',
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
    currentName () {
      const hrms_applic_type = this.dictGroup['hrms_applic_type']
      return hrms_applic_type.find(m => m.value == this.$route.query.type).label
    },
    currentLabel () {
      return componentMap[this.currentName]
    },
  },
}
</script>
