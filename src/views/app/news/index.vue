<template>
  <basic-container>
    <template>
      <news-top></news-top>
    </template>
    <template>
      <news-content></news-content>
    </template>
  </basic-container>
</template>

<script>
import NewsContent from './NewsContent/'
import NewsTop from './NewsTop/'
export default {
  name: 'News',
  components: { NewsContent, NewsTop },
}
</script>
