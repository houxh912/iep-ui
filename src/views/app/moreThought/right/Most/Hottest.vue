<template>
  <div class="hottest">
    <IepAppRankingCard :dataList="list" @click="handleDetail" grade="value"></IepAppRankingCard>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [
        {
          id: 1,
          name: 'asd',
          value: 10,
        },
      ],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
}
</script>
<style scoped>

</style>


