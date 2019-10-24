<template>
  <basic-container>
    <iep-page-header title="组织说说"></iep-page-header>
    <thought-list></thought-list>
  </basic-container>
</template>
<script>
import thoughtList from './thoughtList'
export default {
  components: {
    thoughtList,
  },
}
</script>
