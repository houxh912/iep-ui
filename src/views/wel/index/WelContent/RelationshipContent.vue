<template>
  <div class="relationshipContent">
    <div v-if="mark==0">
      <div class="relationship-item">
        <div><span class="title">我的师父</span></div>
        <ul>
          <li class="name" v-for="(item,index) in masterData" :key="index" @click="gotoDetails(item.id)">{{item.name}}</li>
        </ul>
      </div>
      <div class="relationship-item">
        <div><span class="title">我的徒弟</span></div>
        <ul>
          <li class="name" v-for="(item,index) in apprenticeData" :key="index" @click="gotoDetails(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <iep-no-data v-if="!contentData.length" message="暂无内容"></iep-no-data>
      <ul v-else class="relationship-item">
        <li class="name" v-for="(item,index) in contentData" :key="index" @click="gotoDetails(item.id)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMyMasterContactList, getMyApprenticeContactList } from '@/api/wel/relationship_manage'
export default {
  props: {
    contentData: {
      type: Array,
      default: () => [],
    },
    mark: {
      type: Number,
      default: 0,
    },
  },
  created () {
    this.loadPage()
  },
  data () {
    return {
      masterData: [],
      apprenticeData: [],
    }
  },
  methods: {
    gotoDetails (val) {
      this.$router.push({
        path: `/app/personal_style/${val}`,
      })
    },
    loadPage () {
      getMyMasterContactList().then(({ data }) => {
        this.masterData = data.data.slice(0, 10)
      })
      getMyApprenticeContactList().then(({ data }) => {
        this.apprenticeData = data.data.slice(0, 10)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
ul,
ol,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.relationshipContent {
  padding: 18px 0;
  height: 120px;
  .relationship-item {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .title {
    display: inline-block;
    margin-bottom: 5px;
    padding: 5px 15px;
    width: 100px;
    font-size: 14px;
    text-align: center;
    background-color: #eee;
    &:hover {
      color: #cb3737;
    }
  }
  ul {
    display: flex;
    width: 70%;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .name {
    margin: 0 10px 5px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
@media (min-width: 0px) and (max-width: 1025px) {
  .relationshipContent {
    ul {
      width: 80%;
    }
  }
}
</style>
