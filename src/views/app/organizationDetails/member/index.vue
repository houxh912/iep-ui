<template>
  <div class="member">
    <div class="block">
      <span class="details-title">{{subTitle1}}（{{datailList.length}}）</span>
      <div class="con">
        <div class="item" v-for="detail in datailList" :key="detail.id" @click="handleDetail(detail)">
          <div class="img">
            <iep-img :src="detail.avatar" alt=""></iep-img>
          </div>
          <span class="name">{{detail.name}}</span>
          <!-- <span class="post">{{detail.post}}</span> -->
        </div>
      </div>
    </div>
    <div class="block">
      <span class="details-title">{{subTitle2}}（{{datailList2.length}}）</span>
      <div class="con">
        <div class="item" v-for="detail2 in datailList2" :key="detail2.id" @click="handleDetail(detail2)">
          <div class="img">
            <iep-img :src="detail2.avatar" alt=""></iep-img>
          </div>
          <span class="name">{{detail2.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrgDetail } from '@/api/app/upms/'

export default {
  data () {
    return {
      subTitle1: '组织成员',
      subTitle2: '协作成员',
      datailList: [],
      datailList2: [],
    }
  },
  methods: {
    loadData () {
      getOrgDetail(this.$route.query.id).then(({ data }) => {
        this.datailList = data.data.members
        this.datailList2 = data.data.cooperations
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/personal_style/${row.id}`)
    },
  },
  created () {
    this.loadData()
  },
}
</script>

<style lang="scss" scoped>
.member {
  margin: 20px;
  .block {
    margin-bottom: 40px;
    .con {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      .item {
        display: flex;
        margin: 0 20px 25px;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .name {
          margin-top: 10px;
        }
        .post {
          margin-top: 2px;
          color: #999;
        }
      }
    }
  }
  .details-title {
    display: block;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .img {
    width: 80px;
    height: 80px;
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
}
</style>
<style scoped>
.organizationDetails >>> .con {
  margin-top: 0;
}
</style>
