<template>
  <div class="wonderful">
    <IepAppTabsCard :linkName="linkName" isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='Organization'" v-slot:Organization>
          <organization v-loading="activeTab !=='Organization'"></organization>
        </template>
        <template v-if="activeTab ==='Empolyee'" v-slot:Empolyee>
          <empolyee v-loading="activeTab !=='Empolyee'"></empolyee>
        </template>
        <template v-if="activeTab ==='Specialist'" v-slot:Specialist>
          <specialist v-loading="activeTab !=='Specialist'"></specialist>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Organization from './Organization'
import Empolyee from './Empolyee'
import Specialist from './Specialist'
import { getRecruitCount } from '@/api/app/hrms/'

export default {
  components: {
    Organization,
    Empolyee,
    Specialist,
  },
  computed: {
    tabList () {
      return [{
        label: `组织风采(${this.countObj.orgCount})`,
        value: 'Organization',
      }, {
        label: `员工风采(${this.countObj.userCount})`,
        value: 'Empolyee',
      }, {
        label: `专家风采(${this.countObj.expertCount})`,
        value: 'Specialist',
      }]
    },
  },
  data () {
    return {
      countObj: {
        orgCount: 0,
        userCount: 0,
        expertCount: 0,
      },
      activeTab: 'Organization',
      linkName: '/app/organizational_list',
    }
  },
  methods: {
    loadCount () {
      getRecruitCount().then(({ data }) => {
        this.countObj = data.data
      })
    },
  },
  created () {
    this.loadCount()
  },
  watch: {
    activeTab (newVal) {
      if (newVal === 'Organization') {
        this.linkName = '/app/organizational_list'
      } else if (newVal === 'Empolyee') {
        this.linkName = '/app/resource/expert?type=1'
      } else if (newVal === 'Specialist') {
        this.linkName = '/app/resource/expert'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.wonderful {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
}
</style>

<style scoped>
.wonderful >>> .el-card {
  height: 290px;
}
.wonderful >>> .el-carousel__arrow {
  top: 40%;
}
</style>

