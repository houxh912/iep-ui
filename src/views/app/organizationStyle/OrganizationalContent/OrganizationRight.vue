<template>
  <div class="organization-right">
    <ranking></ranking>
    <organization-introduction></organization-introduction>
    <business-layout></business-layout>
    <products-services></products-services>
    <organize-events></organize-events>
    <reward></reward>
    <collaborative-record></collaborative-record>
  </div>
</template>
<script>
import Ranking from './Ranking'
import OrganizationIntroduction from './OrganizationIntroduction'
import BusinessLayout from './BusinessLayout'
import ProductsServices from './ProductsServices'
import OrganizeEvents from './OrganizeEvents'
import Reward from './Reward'
import CollaborativeRecord from './CollaborativeRecord'
export default {
  components: { Ranking, OrganizationIntroduction, BusinessLayout, ProductsServices, OrganizeEvents, Reward, CollaborativeRecord },
}
</script>
