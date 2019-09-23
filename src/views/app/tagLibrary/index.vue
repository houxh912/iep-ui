<template>
  <IepAppLayout>
    <tag-search @search-page="searchPage"></tag-search>
    <recommend></recommend>
    <all-tags ref="tags"></all-tags>
  </IepAppLayout>
</template>
<script>
import TagSearch from './TagSearch'
import Recommend from './Recommend'
import AllTags from './AllTags'
export default {
  components: {
    TagSearch,
    Recommend,
    AllTags,
  },
  methods: {
    searchPage (form) {
      this.$refs['tags'].search(form)
    },
  },
}
</script>
