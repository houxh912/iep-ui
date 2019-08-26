<template>
  <div class="relation">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right" @click="show" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></el-button>
      <div class="item" v-for="(row, index) in titleList" :key="index" v-show="isShow">
        <span class="title">{{row.title1}}</span>
        <div>
          <div v-if="row.list.length !== 0" class="person-list">
            <div class="person" v-for="(item, index1) in row.list" :key="index1">
              <div class="img" @click="$openPage(`/app/personal_style/${item.id}`)">
                <iep-img :src="item.avatar" alt=""></iep-img>
                <div class="shifu" v-if="item.show">师</div>
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
import { getCommunication, getSimilarUsers } from '@/api/app/hrms/'

export default {
  props: {
    similarUser: {
      type: Array,
      default: () => [],
    },
    userId: {
      type: Number,
    },
  },
  data () {
    return {
      isShow: true,
      title: '人物关系',
      MentorsList: [],
      cooperationList: [],
      relation: {
        masters: [],
        pupils: [],
      },
    }
  },
  computed: {
    titleList () {
      return [
        {
          title1: `TA的师徒（${this.relation.masters.length}/${this.relation.pupils.length}）`,
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
      this.getCommunication(newVal)
      this.getSimilarUsers(newVal)
    },
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
    loadRelation (id) {
      getproductMentors(id).then(({ data }) => {
        for (let item of data.data.masters) {
          item.show = true
        }
        this.relation = data.data
        this.MentorsList = data.data.masters.concat(data.data.pupils)
      })
    },
    getCommunication (id) {
      getCommunication(id).then(({ data }) => {
        this.cooperationList = data.data
      })
    },
    getSimilarUsers (id) {
      getSimilarUsers(id).then(({ data }) => {
        this.similarUser = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  padding: 0;
  color: #999;
}
.relation {
  margin-bottom: 20px;
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
        width: 54px;
        height: 54px;
        border: 1px solid #ebeef5;
        //overflow: hidden;
        position: relative;
        .el-image {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          &:hover {
            opacity: 0.7;
          }
        }
        .shifu {
          position: absolute;
          right: -8px;
          top: -8px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          background-color: #c9484d;
          color: #fff;
          text-align: center;
          line-height: 20px;
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
