<template>
  <div class="organization-left">
    <talent-demand :orgId="data.orgId"></talent-demand>
    <texture-score></texture-score>
  </div>
</template>
<script>
import TalentDemand from './TalentDemand'
import TextureScore from './TextureScore'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { TalentDemand, TextureScore },
}
</script>
