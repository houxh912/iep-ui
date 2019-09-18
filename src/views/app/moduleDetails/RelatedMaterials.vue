
<template>
  <div class="related-materials">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <IepAppListCard @click="handleDetail" :dataList="form.materialRelations"></IepAppListCard>
  </div>
</template>
<script>
export default {
  props: ['form'],
  data () {
    return {
      title: '相关材料',
    }
  },
  methods: {
    handleDetail (val) {
      this.$router.push(`/mlms_spa/material/detail/${val.id}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.related-materials {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
}
</style>
<style scoped>
</style>
