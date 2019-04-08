<template>
  <div>
    <tags-hot></tags-hot>
    <important-news></important-news>
    <hot-news></hot-news>
  </div>
</template>
<script>
import HotNews from './HotNews'
import TagsHot from './TagsHot'
import ImportantNews from './ImportantNews'
export default {
  components: { TagsHot, ImportantNews, HotNews },
}
</script>