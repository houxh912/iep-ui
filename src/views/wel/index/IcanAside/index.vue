<template>
  <div class="wel-aside-wrapper">
    <!-- 所属组织 -->
    <i-can-org />
    <!-- 快捷入口 -->
    <i-can-created />
    <!-- 我要找 -->
    <i-can-find />
    <!-- 领导批示-->
    <i-can-instructions></i-can-instructions>
    <!-- 我的财富 -->
    <i-can-wealth />
    <!-- 我的数据 -->
    <i-can-data />
    <i-can-relationship></i-can-relationship>
  </div>
</template>
<script>
import ICanCreated from './ICanCreated'
import ICanFind from './ICanFind'
import ICanInstructions from './ICanInstructions'
import ICanRelationship from './ICanRelationship'
import ICanWealth from './ICanWealth'
import ICanOrg from './ICanOrg'
import ICanData from './ICanData'
export default {
  components: {
    ICanCreated,
    ICanFind,
    ICanInstructions,
    ICanRelationship,
    ICanWealth,
    ICanData,
    ICanOrg,
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.wel-aside-wrapper {
  margin: 20px 0;
  border: 1px solid #ececec;
  & > div {
    padding: 10px 10px 20px 10px;
    border-bottom: none;
  }
}
</style>
