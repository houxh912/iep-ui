<template>
  <iep-app-layout>
    <news-top></news-top>
    <news-content></news-content>
  </iep-app-layout>
</template>

<script>
import NewsContent from './NewsContent/'
import NewsTop from './NewsTop/'
export default {
  name: 'News',
  components: { NewsContent, NewsTop },
}
</script>
