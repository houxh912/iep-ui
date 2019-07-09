<template>
  <iep-app-layout class="organizational-list">
    <organizational-list-top></organizational-list-top>
    <organizational-con></organizational-con>
  </iep-app-layout>
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

