<template>
  <BasicAsideContainer>
    <template>
      <wel-content></wel-content>
    </template>
    <template v-slot:aside>
      <wel-aside></wel-aside>
    </template>
  </BasicAsideContainer>
</template>

<script>
import WelAside from './WelAside/'
import WelContent from './WelContent/'
export default {
  name: 'Wel',
  components: { WelAside, WelContent },
}
</script>
