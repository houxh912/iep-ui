<template>
  <div class="metting">
    <IepAppListCard :dataList="dataList"></IepAppListCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        '2019首届长三角地区营商环境论坛',
        '2019珠三角营商环境与数字政府理论与实践',
        '全球敏捷运维峰会',
        '2019首届长三角地区营商环境专题论坛',
        '2019首届长三角地区营商环境论坛',
        '2019珠三角营商环境与数字政府理论与实践',
        '全球敏捷运维峰会',
        '2019珠三角营商环境与数字政府理论与实践',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
