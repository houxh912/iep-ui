<template>
  <div class="organization-middle">
    <team :orgId="data.orgId"></team>
  </div>
</template>
<script>
import Team from './team/'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { Team },
}
</script>
