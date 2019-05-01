<template>
  <div>
    <bread-crumb></bread-crumb>
    <div class="tag-detail">
      <tag-content></tag-content>
      <about-tags></about-tags>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import BreadCrumb from './BreadCrumb'
import AboutTags from './TagRight'
import TagContent from './TagContent'
export default {
  components: {
    BreadCrumb,
    AboutTags,
    TagContent,
  },
}
</script>
<style scoped lang="scss">
.tag-detail {
  width: 1200px;
  padding: 10px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 320px) minmax(100px, 500px) minmax(
      100px,
      380px
    );
}
</style>
