<template>
  <div class="organization-list-con">
    <search @click="handleSearch"></search>
    <div class="module">
      <el-card class="module-item" v-for="(item,index) in moduleList" :key="index" shadow="hover">
        <div class="content">
          <div class="img">
            <iep-img :src="item.logo" alt="" />
            <div class="title">{{item.name}}</div>
          </div>
          <!-- <span class="effect">
            <span class="item-effect" v-for="effect in effects" :key="effect.id">
              <span class="num">{{effect.num}}</span>
              <span>{{effect.name}}</span>
            </span>
          </span> -->
          <div>
            <div class="organization-tag">
              <span class="tag-name">组织标签：</span>
              <span class="tag-con">
                <span v-for="(t, i) in item.abilityTag.slice(0, 3)" :key="i">{{t}}</span>
              </span>
            </div>
            <div class="bottom">
              <span class="time">
                <!-- <span>成立时间：</span>
                <span>{{item.time}}</span> -->
              </span>
              <span class="person">
                <span>负责人：</span>
                <span>{{item.creator}}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="hover">
          <h4 class="sub-title">{{item.name}}</h4>
          <div class="con">{{item.intro}}</div>
          <el-button class="btn" type="danger" plain @click="handleDetail(item)">组织风采<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.size" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Search from './Search'
import { getRectagsOrgPage } from '@/api/app/upms/'

export default {
  components: {
    Search,
  },
  data () {
    return {
      effects: [
        {
          num: '--',
          name: '信用值',
        },
        {
          num: '--',
          name: '贡献',
        },
        {
          num: '--',
          name: '综合排名',
        },
        {
          num: '--',
          name: '业绩排名',
        },
      ],
      moduleList: [],
      total: 0,
      params: {
        current: 1,
        size: 12,
      },
    }
  },
  methods: {
    getRecruitPage () {
      getRectagsOrgPage(this.params).then(({ data }) => {
        this.moduleList = data.data.records
        this.total = data.data.total
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/organization_style/${row.orgId}`)
    },
    currentChange (val) {
      this.params.current = val
      this.getRecruitPage()
    },
    handleSearch (params) {
      this.params = Object.assign({}, this.params, params)
      this.getRecruitPage()
    },
  },
  created () {
    this.getRecruitPage()
  },
}
</script>

<style scoped lang="scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.organization-list-con {
  margin: 0 auto 30px auto;
  width: 1200px;
}
.dn {
  display: none;
}
.module {
  display: grid;
  margin: 25px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 3fr) minmax(
      100px,
      3fr
    );
  .module-item {
    position: relative;
    &:hover .hover {
      opacity: 1;
    }
  }
  .content {
    // height: 380px;
    height: 270px;
    cursor: pointer;
  }
  .title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }
  .img {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .effect {
    display: flex;
    justify-content: space-around;
    align-self: center;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .item-effect {
      display: flex;
      flex-direction: column;
      align-self: center;
      padding: 0 18px;
      text-align: center;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: 0;
      }
      .num {
        font-size: 20px;
      }
    }
  }
  .organization-tag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .tag-name {
      width: 70px;
    }
    .tag-con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        position: relative;
        padding: 0 8px;
        line-height: 14px;
        &:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &::before {
          position: absolute;
          content: "";
          top: 5px;
          right: -6px;
          width: 15px;
          height: 1px;
          background-color: #aaa;
          transform: rotate(110deg);
        }
        &:last-child:before {
          background: none;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hover {
    position: absolute;
    top: 0;
    left: 0;
    margin-bottom: 15px;
    padding: 20px;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    transition: all 0.5s;
    .sub-title {
      margin-top: 10px;
      font-size: 18px;
    }
    .btn {
      padding: 10px 30px;
      border-color: #cb3737;
      color: #cb3737;
      &:hover {
        background-color: #cb3737;
        color: #fff;
      }
    }
    .con {
      margin-bottom: 15px;
      height: 276px;
      line-height: 24px;
      text-indent: 2em;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 11;
      -webkit-box-orient: vertical;
    }
  }
}
.page {
  text-align: center;
}
</style>