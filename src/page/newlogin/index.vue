<template>
  <iep-page-layout>
    <top-wrapper>
      <template slot="top-left">
        <top-logo></top-logo>
      </template>
      <template slot="top-right">
      </template>
    </top-wrapper>
  </iep-page-layout>
</template>
<script>
import TopWrapper from '@/page/Components/TopWrapper'
import TopLogo from '@/page/Components/TopLogo'
import IepPageLayout from '@/page/Components/IepPageLayout'
export default {
  components: {
    TopWrapper,
    TopLogo,
    IepPageLayout,
  },
}
</script>
