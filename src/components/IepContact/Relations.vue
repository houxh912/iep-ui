<template>
  <div>
    <div class="tab-title">我的关系</div>
    <a-button class="tab-content" v-for="(item) in relationList" :key="item.id" size="default" block>
      <a-icon type="team" />
      {{item.name}}</a-button>
  </div>
</template>
<script>
import { getRelationList } from '@/api/wel/relationship_manage'
export default {
  data () {
    return {
      relationList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getRelationList().then(({ data }) => {
        console.log(data.data)
        this.relationList = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-title {
  font-size: 16px;
  color: #3a3a3a;
  background-color: #eee;
  padding: 5px;
  padding-left: 15px;
  margin-top: 10px;
  border-radius: 5px;
}
.tab-content {
  cursor: pointer;
  margin-top: 5px;
}
</style>
