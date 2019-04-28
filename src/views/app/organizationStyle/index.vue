<template>
  <div>
    <organizational-top></organizational-top>
    <organizational-content></organizational-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import OrganizationalContent from './OrganizationalContent/'
import OrganizationalTop from './OrganizationalTop'
export default {
  name: 'organizational',
  components: { OrganizationalContent, OrganizationalTop },
}
</script>
