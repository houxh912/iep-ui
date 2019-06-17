<template>
  <div class="organizational-list">
    <organizational-list-top></organizational-list-top>
    <organizational-con></organizational-con>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import OrganizationalCon from './OrganizationalCon'
import OrganizationalListTop from './OrganizationalListTop'
export default {
  name: 'Organizational-list',
  components: { OrganizationalCon, OrganizationalListTop },
  data () {
    return {
    }
  },
  created () {
  },
}
</script>

