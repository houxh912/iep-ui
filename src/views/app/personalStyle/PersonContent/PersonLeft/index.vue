<template>
  <div>
    <div class="person-list">
      <IepAppTabsCard>
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='Project'" v-slot:Project>
            <project v-loading="activeTab !=='Project'" :userId="userId"></project>
          </template>
          <template v-if="activeTab ==='Material'" v-slot:Material>
            <material v-loading="activeTab !=='Material'" :userId="userId"></material>
          </template>
          <template v-if="activeTab ==='Train'" v-slot:Train>
            <train v-loading="activeTab !=='Train'" :userId="userId"></train>
          </template>
          <template v-if="activeTab ==='News'" v-slot:News>
            <news v-loading="activeTab !=='News'" :userId="userId"></news>
          </template>
          <template v-if="activeTab ==='Customer'" v-slot:Customer>
            <customer v-loading="activeTab !=='Customer'" :userId="userId"></customer>
          </template>
          <template v-if="activeTab ==='Business'" v-slot:Business>
            <business v-loading="activeTab !=='Business'" :userId="userId"></business>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
    <new-down></new-down>
  </div>
</template>
<script>
import Project from './Project'
import Material from './Material'
import Train from './Train'
import News from './News'
import Customer from './Customer'
import Business from './Business'
import NewDown from './NewDown'
export default {
  components: {
    Project,
    Material,
    Train,
    News,
    Customer,
    Business,
    NewDown,
  },
  props: {
    counts: {
      type: Object,
      default: () => {
        return {
          projectCount: 0,
        }
      },
    },
    userId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    tabList () {
      return [
        {
          label: `项目(${this.counts.projectCount})`,
          value: 'Project',
        },
        {
          label: `材料(${this.counts.materialCount})`,
          value: 'Material',
        },
        {
          label: `培训(${this.counts.trainingCount})`,
          value: 'Train',
        },
        {
          label: '新闻(0)',
          value: 'News',
        },
        {
          label: `客户(${this.counts.clientCount})`,
          value: 'Customer',
        },
        {
          label: `商机(${this.counts.opportunityCount})`,
          value: 'Business',
        },
      ]
    },
  },
  data () {
    return {
      activeTab: '',
    }
  },
  watch: {
    userId (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.activeTab = 'Material'
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.person-list {
  margin-bottom: 30px;
}
</style>
