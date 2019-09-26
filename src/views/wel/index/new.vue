<template>
  <IepLayoutDrawerContainer>
    <wel-content></wel-content>
    <template v-slot:drawer>
      <wel-drawer></wel-drawer>
    </template>
  </IepLayoutDrawerContainer>
</template>

<script>

import WelContent from './WelContent/new'
import WelDrawer from './WelAside/new'
export default {
  components: {
    WelContent,
    WelDrawer,
  },
}
</script>
