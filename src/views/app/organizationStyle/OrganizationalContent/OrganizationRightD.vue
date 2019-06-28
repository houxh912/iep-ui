<template>
  <div class="organization-right">
    <products-services :orgId="data.orgId"></products-services>
    <!-- <reward></reward> -->
    <collaborative-record></collaborative-record>
  </div>
</template>
<script>
import ProductsServices from './ProductsServices'
// import Reward from './Reward'
import CollaborativeRecord from './CollaborativeRecord'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { ProductsServices, CollaborativeRecord },
}
</script>
