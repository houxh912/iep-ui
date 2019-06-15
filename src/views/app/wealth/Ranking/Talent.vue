<template>
  <div class="search">
    <IepAppRankingCard :dataList="dataList" @click="handleDetail"></IepAppRankingCard>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dataList: [
        { id:2,name: '郑爱军', grade: '3580', color: 'red' },
        { id:3,name: '杨冰之', grade: '3420', color: 'red' },
        { id:4,name: '谢海艳', grade: '2988', color: 'red' },
        { id:5,name: '黄磊', grade: '2455', color: '' },
        { id:6,name: '王路燕', grade: '2200', color: '' },
        { id:7,name: '李凯', grade: '1982', color: '' },
        { id:8,name: '刘佳', grade: '1852', color: '' },
        { id:9,name: '潘超巧', grade: '1650', color: '' },
        { id:10,name: '邵万炯', grade: '1250', color: '' },
        { id:11,name: '丁斌', grade: '1122', color: '' },
      ],
    }
  },
  methods:{
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
  },
}
</script>


