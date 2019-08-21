<template>
  <div class="organizational-top">
    <div class="organizational-top-con">
      <div class="img">
        <iep-img class="img-avatar" :src="data.logo" alt=""></iep-img>
        <div class="integrity">
          <div class="integrity-desc">资料完善度{{`${data.integrity}%`}}</div>
          <el-progress :percentage="data.integrity" color="#66cb68" :show-text="false"></el-progress>
        </div>
      </div>
      <div class="text">
        <span class="title">{{data.name}}</span>
        <!-- <span class="sub-title">{{data.intro}}</span> -->
        <span class="sub-title">
          <span class="creatorName">负责人：{{data.creatorName}}</span>
          <span>成立时间：{{formatDate(data.establishTime)}}</span>
        </span>
        <div class="classTag">
          <div class="label">卓越标签：</div>
          <div class="span">
            <el-tag type="white" @click="handleDetail(item)" v-for="(item, index) in data.abilityTag" :key="index">{{item}}</el-tag>
          </div>
        </div>
        <div class="classTag">
          <div class="label">专业标签：</div>
          <div class="span">
            <el-tag type="white" @click="handleDetail(item)" v-for="(item, index) in data.projectTag" :key="index">{{item}}</el-tag>
          </div>
        </div>
        <div class="classTag">
          <div class="label">进步标签：</div>
          <div class="span">
            <el-tag type="white" @click="handleDetail(item)" v-for="(item, index) in data.learningTag" :key="index">{{item}}</el-tag>
          </div>
        </div>
      </div>
      <el-row class="operation">
        <ranking></ranking>
        <div class="el-row">
          <el-button type="danger" plain size="small" @click="handleProposal">建议</el-button>
          <el-button type="danger" plain size="small" @click="handlePk">PK</el-button>
          <el-button type="danger" size="small" @click="handleInvestment">投资</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '@/util/date'
import Ranking from './OrganizationalContent/Ranking'

// 月份日期前一位补0
function formatDig (num) {
  return num > 9 ? '' + num : '0' + num
}

// 根据传入的时间，返回 MM-DD
function formatDate (mill) {
  var y = new Date(mill)
  let raws = [
    y.getFullYear(),
    formatDig(y.getMonth() + 1),
    formatDig(y.getDate()),
    '',
  ]
  let format = ['年', '月', '日']
  return String.raw({ raw: raws }, ...format)
}

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  components: { Ranking },
  data () {
    return {
      dateFormat,
      formatDate,
      projectTag: [
        {
          item: '111',
        },
        {
          item: '111',
        },
      ],
    }
  },
  methods: {
    handleInvestment () {
      this.$router.push('/app/wealth')
    },
    handleProposal () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
    handleDetail (row) {
      this.$openTagDetail(row)
    },
    handlePk () {
      this.$router.push('/app/organizational_list')
    },
  },
}
</script>

<style lang="scss" scoped>
.organizational-top {
  display: flex;
  align-items: center;
  align-content: center;
  min-height: 220px;
  text-align: center;
  background: #fafafa url(./img/zzbg.png) no-repeat;
  background-size: 100% 100%;
  padding: 15px 0;
  .organizational-top-con {
    display: flex;
    margin: 0 auto;
    width: 1200px;
    justify-content: space-between;
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
      .classTag {
        margin-bottom: 5px;
        display: flex;
        .label {
          width: 80px;
          text-align: left;
        }
        .span {
          flex: 1;
          text-align: left;
        }
        .el-tag {
          cursor: pointer;
          position: relative;
          margin-right: 5px;
          margin-bottom: 5px;
          padding: 0 5px;
          border: 0;
          height: auto;
          line-height: 20px;
          background: none;
          color: #606266;
          &:hover {
            opacity: 0.7;
          }
          &:before {
            position: absolute;
            content: "";
            top: 10px;
            right: -8px;
            width: 15px;
            height: 1px;
            background-color: #aaa;
            -webkit-transform: rotate(110deg);
            transform: rotate(110deg);
          }
          &:last-child {
            &:before {
              background: none;
            }
          }
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
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: 0.5s;
      }
      .img-avatar {
        padding: 4px;
        width: 196px;
        height: 124px;
        background-color: #fff;
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
      .integrity {
        margin-top: 15px;
        font-size: 12px;
        text-align: center;
        width: 100%;
        .integrity-desc {
          margin-bottom: 5px;
        }
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
  background: none;
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
.organizational-top >>> .el-button--danger {
  background: #cb3737;
  border-color: #ba1b21;
  padding: 7px 15px;
  min-width: 62px;
}
.organizational-top .el-row {
  text-align: right;
}
</style>
