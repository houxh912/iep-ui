<template>
  <div>
    <basic-container>
      <iep-page-header title="我的审批" :data="[10 ,5]"></iep-page-header>
      <iep-tabs :value="activeTab" :tab-list="tabList" @tab-click="handleTabClick">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import ExaminApproval from './ExaminApproval/'
import AlreadyApproval from './AlreadyApproval/'
export default {
  components: { ExaminApproval, AlreadyApproval },
  data () {
    return {
      tabList: [{
        label: '待审批',
        value: 'ExaminApproval',
      }, {
        label: '已审批',
        value: 'AlreadyApproval',
      }],
    }
  },
  computed: {
    activeTab () {
      return this.$route.query.activeTab || 'ExaminApproval'
    },
  },
  methods: {
    handleTabClick (vC) {
      this.$router.push({
        query: {
          activeTab: vC.name,
        },
      })
    },
  },
}
</script>
