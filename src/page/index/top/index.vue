<template>
  <top-wrapper>
    <template slot="top-left">
      <top-logo></top-logo>
    </template>
    <template slot="top-center">
      <top-navbar v-if="!noOrg"></top-navbar>
    </template>
    <template slot="top-right">
      <!-- <top-search-icon v-if="!noOrg"></top-search-icon> -->
      <!-- <top-scan></top-scan>
      <top-guide></top-guide> -->
      <top-guide disabled></top-guide>
      <top-chat v-if="!noOrg"></top-chat>
      <top-message></top-message>
      <top-email></top-email>
      <top-user></top-user>
    </template>
  </top-wrapper>
</template>
<script>
import TopWrapper from '@/page/Components/TopWrapper'
import TopLogo from '@/page/Components/TopLogo'
import TopNavbar from './TopNavbar'
import TopMessage from './TopMessage'
import TopEmail from './TopEmail'
import TopGuide from './TopGuide'
// import TopScan from './TopScan'
// import TopSearchIcon from './TopSearchIcon'
import TopUser from './TopUser'
import TopChat from './TopChat'
import { mapGetters } from 'vuex'
export default {
  components: {
    TopWrapper,
    TopLogo,
    TopNavbar,
    TopMessage,
    TopEmail,
    // TopSearchIcon,
    TopGuide,
    // TopScan,
    TopUser,
    TopChat,
  },
  name: 'Top',
  computed: {
    ...mapGetters([
      'noOrg',
    ]),
  },
}
</script>
