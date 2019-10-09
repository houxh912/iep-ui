<template>
  <div>
    <org-profile></org-profile>
    <last></last>
    <so-data></so-data>
    <information></information>
    <material></material>
    <thought-list></thought-list>
  </div>
</template>
<script>
import OrgProfile from './OrgProfile'
import Last from './Last'
import SoData from './SoData'
import Information from './Information'
import Material from './Material'
import thoughtList from './thoughtList'
export default {
  components: {
    OrgProfile,
    Last,
    SoData,
    Information,
    Material,
    thoughtList,
  },
}
</script>
