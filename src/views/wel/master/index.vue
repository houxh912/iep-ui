<template>
  <div class="master">
    <iep-page-header title="推荐师父">
    </iep-page-header>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleClick2">我的师徒</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
        <iep-button @click="handleClick">国脉人</iep-button>
      </template>
    </operation-container>
    <div v-loading="loadState" v-if="loadState"></div>
    <div v-else>
      <div class="master-con" v-if="masterList.length !== 0">
        <el-card shadow="hover" v-for="master in masterList" :key="master.id">
          <div>
            <div class="name">
              <span class="img" @click="getPerson()">
                <iep-img :src="master.avatar" alt=""></iep-img>
              </span>
              <span class="text">{{master.realName}}<span class="num">{{master.num}}</span></span>
            </div>
            <span></span>
          </div>
          <div class="classTag">
            <span class="name">标签：</span>
            <el-tag type="white" v-for="(tag, index) in master.masterTagAbil" :key="index">{{tag}}</el-tag>
          </div>
          <div class="btn-group">
            <el-button size="mini" @click="getPerson(master)">个人风采</el-button>
            <el-button type="danger" plain size="mini" @click="handleApprentice(master)">拜师</el-button>
          </div>
        </el-card>
      </div>
      <div class="img-tip" v-else>
        <IepNoData></IepNoData>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageRecommend } from '@/api/cpms/characterrelations'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loadState: true,
      masterList: [],
      params: {
        name: '',
      },
      mark: 'master',
    }
  },
  methods: {
    ...mapActions(['ApprenticeApply']),
    handleApprentice (row) {
      this.ApprenticeApply({ id: row.userId, name: row.realName })
    },
    getPerson (row) {
      this.$openPage(`//www.icanvip.net/master/${row.userId}.html`, 'bind')
    },
    getPageRecommend () {
      getPageRecommend(this.params).then(({ data }) => {
        this.loadState = false
        this.masterList = data.records
      })
    },
    handleClick () {
      this.$router.push('/app/resource/expert?type=1')
    },
    handleClick2 () {
      this.$router.push({
        path: '/wel/relationship_manage',
        query: { mark: this.mark },
      })
    },
    searchPage (val) {
      this.params = val
      this.getPageRecommend()
    },
  },
  created () {
    this.getPageRecommend()
  },
}
</script>
<style lang="scss" scoped>
.master {
  margin: 20px 20px 40px;
}
.master-con {
  display: grid;
  margin-top: 20px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .text {
      display: flex;
      margin-left: 15px;
      justify-content: flex-start;
      font-size: 16px;
      letter-spacing: 3px;
      align-items: flex-end;
    }
    .num {
      margin-left: 6px;
      font-size: 14px;
      color: #999;
      letter-spacing: 0.5px;
    }
  }
  .img {
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .classTag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    .name {
      color: #999;
    }
    .el-tag {
      margin-right: 5px;
      cursor: pointer;
      &:hover {
        color: $--menu-color-primary;
        background: #fef0f0;
        border-color: $--menu-color-primary;
      }
    }
  }
  .classTag .el-tag--white {
    border: 1px solid #dcdfe6;
    height: 28px;
    line-height: 26px;
    background: #fff;
    color: #606266;
  }
  .el-button--danger {
    color: $--menu-color-primary;
    border-color: $--menu-color-primary;
    &:hover,
    &:focus {
      background-color: $--menu-color-primary;
      color: #fff;
    }
  }
}
.img-tip {
  text-align: center;
}
</style>
