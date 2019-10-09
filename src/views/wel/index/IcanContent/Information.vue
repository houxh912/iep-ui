<template>
  <div>
    <div v-for="item in collections" :key="item.id">{{item.name}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collections: [
        {
          id: 1,
          name: '动态',
        },
        {
          id: 2,
          name: '公告',
        },
        {
          id: 3,
          name: '任务',
        },
        {
          id: 4,
          name: '机会',
        },
        {
          id: 5,
          name: '需求',
        },
        {
          id: 6,
          name: '问卷',
        },
        {
          id: 7,
          name: '考试',
        },
      ],
    }
  },
}
</script>
