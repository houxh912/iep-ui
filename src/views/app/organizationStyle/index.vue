<template>
  <div>
    <organizational-top></organizational-top>
    <organizational-content></organizational-content>
  </div>
</template>
<script>
import OrganizationalContent from './OrganizationalContent/'
import OrganizationalTop from './OrganizationalTop'
export default {
  name: 'News',
  components: { OrganizationalContent, OrganizationalTop },
}
</script>
