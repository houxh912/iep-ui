<template>
  <div class="resource">
    <div class="title">{{title}}</div>
    <div class="con">
      <div class="item" v-for="item in itemList" :key="item.id">
        <span class="name">{{item.name}}：</span>
        <span class="num">{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getResourceCount } from '@/api/app/cpms/channel'
export default {
  data () {
    return {
      title: '资源构成',
      itemList: [
        {
          name: '材料库',
          prop: 'countMaterial',
          count: '--',
        },
        {
          name: '培训库',
          prop: 'countTraining',
          count: '--',
        },
        {
          name: '客户库',
          prop: 'countClient',
          count: '--',
        },
        {
          name: '资质库',
          prop: 'countHonor',
          count: '--',
        },
        {
          name: '商机库',
          prop: 'countOpportunity',
          count: '--',
        },
        {
          name: '专家库',
          prop: 'countExpert',
          count: '--',
        },
        {
          name: '模块库',
          prop: 'countProduct',
          count: '--',
        },
        {
          name: '政策库',
          prop: '',
          count: '--',
        },
      ],
    }
  },
  methods: {
    getCount () {
      getResourceCount().then(({data}) => {
        for (let item of this.itemList) {
          if (item.prop) {
            item.count = data.data[item.prop]
          }
        }
      })
    },
  },
  created () {
    this.getCount()
  },
}
</script>
<style lang="scss" scoped>
.resource {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: #333;
  }
  .con {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 2fr 2fr;
  }
  .item {
    margin-right: -1px;
    margin-bottom: -1px;
    padding: 20px;
    border: 1px solid #eee;
  }
  .num {
    font-size: 16px;
    color: #c73e3e;
  }
}
</style>