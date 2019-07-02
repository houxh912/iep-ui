<template>
  <div class="organization-right">
    <organization-introduction :data="data"></organization-introduction>
    <organize-events :orgId="data.orgId"></organize-events>
    <business-layout></business-layout>
  </div>
</template>
<script>
import OrganizationIntroduction from './OrganizationIntroduction'
import BusinessLayout from './BusinessLayout'
import OrganizeEvents from './OrganizeEvents/'
// import Reward from './Reward'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { OrganizationIntroduction, BusinessLayout, OrganizeEvents },
}
</script>
