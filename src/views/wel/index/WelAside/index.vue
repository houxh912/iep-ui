<template>
  <div class="wel-aside-wrapper">
    <!-- 所属组织 -->
    <my-org />
    <!-- 我要创建 -->
    <my-created />
    <!-- 我要找 -->
    <my-find />
    <!-- 我的区块链 -->
    <my-block-clain />
    <!-- 我的财富 -->
    <!-- <my-treasure /> -->
    <!-- 我的机会 -->
    <my-chance ref="myChance" :opportunity="opportunity" />
    <!-- 我的数据 -->
    <my-data />
  </div>
</template>
<script>
import { getAside } from '@/api/wel/index'
import MyCreated from './MyCreated'
import MyFind from './MyFind'
// import MyTreasure from './MyTreasure'
import MyBlockClain from './MyBlockClain'
import MyChance from './MyChance'
import MyOrg from './MyOrg'
import MyData from './MyData'
export default {
  components: {
    MyCreated,
    MyFind,
    MyBlockClain,
    MyChance,
    MyData,
    MyOrg,
  },
  data () {
    return {
      opportunity: [],
      appraise: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSome1 () {
      this.$router.push('/wel/material/report')
    },
    loadPage () {
      getAside().then(({ data }) => {
        const rawData = data.data
        this.opportunity = rawData.opportunity || []
        this.appraise = rawData.appraise || []
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.wel-aside-wrapper {
  & > div {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ececec;
  }
}
</style>
