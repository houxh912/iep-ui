<template>
  <div class="top-class">
    <div class="top-class-list" v-for="item in items" :key="item.id">
      <span class="num">{{item.num}}</span>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          id: '1',
          num: '498',
          name: '国脉同学',
        },
        {
          id: '2',
          num: '28',
          name: '外部同学',
        },
        {
          id: '3',
          num: '88',
          name: '国脉专家',
        },
        {
          id: '4',
          num: '228',
          name: '国脉校友',
        },
        {
          id: '5',
          num: '33',
          name: '组织',
        },
        {
          id: '6',
          num: '28',
          name: '入驻机构',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.top-class {
  display: flex;
  padding: 20px 200px;
  border-bottom: 1px solid #ebeef5;
  justify-content: space-between;
  text-align: center;
  .top-class-list {
    .num,
    .name {
      display: block;
    }
    .num {
      font-size: 26px;
    }
    .name {
      font-size: 16px;
    }
    &:nth-child(1) .num {
      color: #cb3737;
    }
  }
}
</style>
