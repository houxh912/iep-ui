<template>
  <div class="person-con">
    <person-left :counts="userInfo.map" :userId="userInfo.id" :visitVOs="userInfo.visitVOs"></person-left>
    <person-right :userId="userInfo.id" :similarUser="userInfo.similarUsers"></person-right>
  </div>
</template>

<script>
import PersonLeft from './PersonLeft/'
import PersonRight from './PersonRight/'
export default {
  props: {
    userInfo: {
      type: Object,
    },
  },
  components: {
    PersonLeft, PersonRight,
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.person-con {
  display: grid;
  margin: 0 auto;
  padding-top: 20px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 40px;
  grid-column-gap: 40px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
</style>
