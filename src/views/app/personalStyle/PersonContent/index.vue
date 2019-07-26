<template>
  <div class="person-con">
    <person-left :counts="userInfo.map" :userId="userInfo.id" :visitVOs="userInfo.visitVOs" :userInfo="userInfo"></person-left>
    <person-right :userId="userInfo.id" :similarUser="userInfo.similarUsers" :userInfo="userInfo"></person-right>
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
  grid-row-gap: 20px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 875px) minmax(100px, 300px);
}
</style>
