<template>
  <div class="organiz-events">
    <IepAppTabsCard :linkName="linkName" isMore>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='OrganizeDynamic'" v-slot:OrganizeDynamic>
          <organize-dynamic v-loading="activeTab !=='OrganizeDynamic'" :orgId="orgId"></organize-dynamic>
        </template>
        <template v-if="activeTab ==='Events'" v-slot:Events>
          <events v-loading="activeTab !=='Events'"></events>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import OrganizeDynamic from './OrganizeDynamic'
import Events from './Events'

export default {
  components: {
    OrganizeDynamic,
    Events,
  },
  props: {
    orgId: {
      default: 0,
    },
  },
  data () {
    return {
      tabList: [{
        label: '组织动态',
        value: 'OrganizeDynamic',
      }],
      activeTab: 'OrganizeDynamic',
      linkName: `/app/organization_details/memorabilia?id=${this.$route.params.id}`,
    }
  },
}
</script>
<style lang="scss" scoped>
.organiz-events {
  margin-bottom: 20px;
}
</style>
<style scoped>
.organiz-events >>> .el-card {
  height: 275px;
}
</style>


