<template>
  <div class="top-class">
    <div class="top-class-list" :class="item.router ? 'canRouter' : ''" v-for="item in items" :key="item.id" @click="handleDetail(item)">
      <span class="num">{{countObj[item.prop]}}</span>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { getRecruitCount } from '@/api/app/hrms/'

export default {
  data () {
    return {
      items: [
        {
          id: '1',
          name: '国脉同学',
          prop: 'userCount',
          router: '/app/resource/expert',
        },
        {
          id: '2',
          name: '外部同学',
          prop: 'externalCount',
        },
        {
          id: '3',
          name: '国脉专家',
          prop: 'expertCount',
          router: '/app/resource/expert',
        },
        {
          id: '4',
          name: '国脉校友',
          prop: 'alumnusCount',
        },
        {
          id: '5',
          name: '组织',
          prop: 'orgCount',
        },
        {
          id: '6',
          name: '入驻机构',
          prop: 'institutionCount',
        },
      ],
      countObj: {
        userCount: 0,
        externalCount: 0,
        expertCount: 0,
        alumnusCount: 0,
        orgCount: 0,
        institutionCount: 0,
      },
    }
  },
  methods: {
    handleDetail (row) {
      if (row.router) {
        this.$router.push(row.router)
      }
    },
  },
  created () {
    getRecruitCount().then(({data}) => {
      this.countObj = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.top-class {
  display: flex;
  margin: 0 auto;
  width: 1200px;
  padding: 20px 100px;
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
  .canRouter {
    cursor: pointer;
  }
}
</style>
