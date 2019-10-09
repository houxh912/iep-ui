<template>
  <div>
    <org-profile></org-profile>
    <last></last>
    <so-data></so-data>
    <thought-list></thought-list>
  </div>
</template>
<script>
import OrgProfile from './OrgProfile'
import Last from './Last'
import SoData from './SoData'
import thoughtList from './thoughtList'
export default {
  components: {
    OrgProfile,
    Last,
    SoData,
    thoughtList,
  },
}
</script>
