<template>
  <div class="relation">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right" @click="show" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></el-button>
      <div class="item" v-for="(row, index) in titleList" :key="index" v-show="isShow">
        <span class="title">{{row.title1}}</span>
        <div>
          <div v-if="row.list.length !== 0" class="person-list">
            <div class="person" v-for="(item, index1) in row.list" :key="index1">
              <div class="img">
                <iep-img :src="item.avatar" alt=""></iep-img>
              </div>
              <span class="name">{{item.name}}</span>
            </div>
          </div>
          <IepNoData v-else></IepNoData>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getproductMentors } from '@/api/app/cpms/channel'

export default {
  props: {
    similarUser: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      isShow: true,
      title: '人物关系',
      MentorsList: [],
      cooperationList: [],
    }
  },
  computed: {
    titleList () {
      return [
        {
          title1: 'TA的师徒',
          list: this.MentorsList,
        },
        {
          title1: '标签相似',
          list: this.similarUser,
        },
        {
          title1: '交流密切',
          list: this.cooperationList,
        },
      ]
    },
  },
  watch: {
    userId (newVal) {
      this.loadRelation(newVal)
    },
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
    loadRelation (id) {
      getproductMentors(id).then(({data}) => {
        this.MentorsList = data.data.masters.concat(data.data.pupils)
      })
    },
  },
  created () {
    this.loadRelation(this.$route.params.id)
  },
}
</script>
<style lang="scss" scoped>
.btn {
  padding: 0;
  color: #999;
}
.relation {
  margin-bottom: 25px;
  .item {
    .title {
      display: block;
      margin-bottom: 10px;
    }
    .person-list {
      display: grid;
      grid-auto-flow: row dense;
      grid-row-gap: 15px;
      grid-column-gap: 15px;
      grid-template-columns: 2fr 2fr 2fr 2fr;
      margin-bottom: 18px;
    }
    .person {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      .img {
        width: 60px;
        height: 60px;
        border: 1px solid #ebeef5;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
      .name {
        margin-top: 5px;
        font-size: 13px;
      }
      &:hover {
        color: #999;
      }
    }
  }
}
</style>
