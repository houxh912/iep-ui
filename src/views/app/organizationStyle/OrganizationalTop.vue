<template>
  <div class="organizational-top">
    <div class="organizational-top-con">
      <div class="img">
        <iep-img :src="data.logo" alt=""></iep-img>
      </div>
      <div class="text">
        <span class="title">{{data.name}}</span>
        <!-- <span class="sub-title">{{data.intro}}</span> -->
        <span class="sub-title">
          <span class="creatorName">负责人：{{data.creatorName}}</span>
          <span>成立时间：{{formatDate(data.establishTime)}}</span>
        </span>
        <div class="tags-con">
          <span>卓越：</span>
          <span class="tags" v-for="(item, index) in data.abilityTag" :key="index">
            {{item}}
          </span>
        </div>
        <div class="tags-con">
          <span>专业：</span>
          <span class="tags" v-for="(item2, index) in data.learningTag" :key="index">
            {{item2}}
          </span>
        </div>
        <div class="tags-con">
          <span>进步：</span>
          <span class="tags" v-for="(item3, index) in data.projectTag" :key="index">
            {{item3}}
          </span>
        </div>
      </div>
      <el-row class="operation">
        <el-button type="danger" plain size="small" @click="handleProposal">建议</el-button>
        <el-button type="info" plain size="small" disabled>pk</el-button>
        <el-button type="danger" plain size="small" @click="handleInvestment">投资</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '@/util/date'

// 月份日期前一位补0
function formatDig (num) {
  return num>9?''+num:'0'+num
}

// 根据传入的时间，返回 MM-DD
function formatDate (mill){
  var y = new Date(mill)
  let raws = [
      y.getFullYear(),
      formatDig(y.getMonth() + 1),
      formatDig(y.getDate()),
      '',
  ]
  let format = ['年','月', '日']
  return String.raw({raw:raws}, ...format)
}

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      dateFormat,
      formatDate,
    }
  },
  methods: {
    handleInvestment () {
      this.$router.push('/app/wealth')
    },
    handleProposal () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
  },
}
</script>

<style lang="scss" scoped>
.organizational-top {
  display: flex;
  align-items: center;
  align-content: center;
  height: 180px;
  text-align: center;
  background: #fafafa url(./img/zzbg.png) no-repeat;
  background-size: 100% 100%;
  .organizational-top-con {
    display: flex;
    margin: 0 auto;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .text {
      display: flex;
      flex: 2;
      margin-left: 30px;
      flex-direction: column;
      align-items: flex-start;
      flex-wrap: wrap;
      .title {
        display: block;
        margin-bottom: 18px;
        font-size: 20px;
      }
      .sub-title {
        display: block;
        margin-bottom: 5px;
        padding: 0 10px 0 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .creatorName {
          margin-right: 50px;
        }
      }
      .tags-con {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
      .tags {
        position: relative;
        display: inline-block;
        margin-bottom: 5px;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
          color: #ba1b21;
        }
        &:nth-child(1) {
          padding-left: 0;
        }
        &::before {
          position: absolute;
          content: "";
          top: 10px;
          right: -7px;
          width: 15px;
          height: 1px;
          background-color: #666;
          transform: rotate(125deg);
          -o-transform: rotate(125deg);
          -moz-transform: rotate(125deg);
          -webkit-transform: rotate(125deg);
        }
        &:last-child::before {
          display: none;
        }
      }
    }
    .img {
      padding: 5px;
      width: 196px;
      height: 124px;
      border: 1px solid #ebeef5;
      overflow: hidden;
      background-color: #fff;
      &:hover {
        box-shadow: 0 1px 1px 1px #eee;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: 0.5s;
      }
    }
  }
}
</style>
<style scoped>
.organizational-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.organizational-top >>> .el-input--small input {
  height: 40px !important;
}
.organizational-top >>> .el-card {
  background-color: #fafafa;
}
.organizational-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.organizational-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.organizational-top >>> .el-button--danger.is-plain:hover,
.organizational-top >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>
