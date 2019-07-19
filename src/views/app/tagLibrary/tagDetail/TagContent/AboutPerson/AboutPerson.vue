<template>
  <div class="about-person">
    <iep-no-data v-if="!data.length"></iep-no-data>
    <span v-for="(item) in data" :key="item.commonId" @click="TagsDetail(item)">
      {{item.commonName}}
    </span>
    <!-- <span>更多...</span> -->
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    TagsDetail (item) {
      // return
      this.$router.push({
        path: `/app/personal_style/${item.commonId}`,
      })
    },
  },
}
</script>
<style scoped lang="scss">
.about-person {
  span {
    display: inline-block;
    padding: 5px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    color: #666;
    cursor: pointer;
  }
  & span:hover {
    color: #c73e3e;
    border: 1px solid #c73e3e;
  }
}
</style>
