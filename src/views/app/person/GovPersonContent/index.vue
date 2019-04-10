<template>
  <div class="GovPerson-content">
    <div class="top-content">
      <gov-person-img></gov-person-img>
      <gov-person-notice></gov-person-notice>
      <glow-person></glow-person>
    </div>
  </div>
</template>
<script>
import GovPersonImg from './GovPersonImg'
import GovPersonNotice from './GovPersonNotice'
import GlowPerson from './GlowPerson'
export default {
  components: { GovPersonImg, GovPersonNotice, GlowPerson },
}
</script>
<style lang="scss" scoped>
.GovPerson-content {
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  .top-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 30px;
    grid-column-gap: 30px;
    grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
  }
}
</style>

