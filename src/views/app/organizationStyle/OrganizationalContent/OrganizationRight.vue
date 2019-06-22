<template>
  <div class="organization-right">
    <organization-introduction :data="data"></organization-introduction>
    <organize-events :orgId="data.orgId"></organize-events>
    <business-layout></business-layout>
    <products-services :orgId="data.orgId"></products-services>
    <!-- <reward></reward> -->
    <collaborative-record></collaborative-record>
  </div>
</template>
<script>
import OrganizationIntroduction from './OrganizationIntroduction'
import BusinessLayout from './BusinessLayout'
import ProductsServices from './ProductsServices'
import OrganizeEvents from './OrganizeEvents/'
// import Reward from './Reward'
import CollaborativeRecord from './CollaborativeRecord'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { OrganizationIntroduction, BusinessLayout, OrganizeEvents, ProductsServices, CollaborativeRecord },
}
</script>
