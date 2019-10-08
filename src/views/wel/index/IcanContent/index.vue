<template>
  <div>
    <org-profile></org-profile>
    <last></last>
    <so-data></so-data>
  </div>
</template>
<script>
import OrgProfile from './OrgProfile'
import Last from './Last'
import SoData from './SoData'
export default {
  components: {
    OrgProfile,
    Last,
    SoData,
  },
}
</script>
