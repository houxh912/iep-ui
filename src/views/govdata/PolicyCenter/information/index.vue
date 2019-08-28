<template>
  <div class="wrapper">
    <div class="container">
      <el-row style="width:100%">
        <el-col :span="18">
          <div class="left">
            <div class="page-top">
              <el-row style="width:100%">
                <el-col :span="7" class="page-header">
                  政策资讯<span>共有{{paginationOption.total}}条政策</span>
                </el-col>
                <el-col :span="17" class="page-header-btn">
                  <span class="header-btn">
                    <el-radio-group v-model="pageOption.sort" size="mini" @change="handleChangeSort">
                      <el-radio-button label="time">发文时间</el-radio-button>
                      <el-radio-button label="views">热门</el-radio-button>
                    </el-radio-group>
                  </span>
                </el-col>
              </el-row>
            </div>

            <div class="tip" v-if="paginationOption.total == 0">暂无数据</div>

            <div class="text-container" v-for="(item, index) in resdata" :key="index">
              <h3 @click="handleOpenLink(item)">
                <span class="istop" v-if="item.isTop === 1">
                  <el-tag>置顶</el-tag>
                </span>
                {{item.title}}
              </h3>
              <div class="text-des">
                {{item.summary}}
              </div>
              <div class="detail">
                <div :class="{'distance-right':item.dispatchList.length>0}" v-if="item.dispatchList"><i class="el-icon-setting" v-for="(item, index) in item.dispatchList" :key="index">{{item.dispatchName}}</i></div>
                <div :class="{'distance-right':item.publishTime}"><i class="el-icon-time"></i>{{item.publishTime | dateFormat}}</div>
                <div v-if="item.views">浏览次数: {{item.views}}</div>
              </div>
              <div class="tag">
                标签:
                <el-tag type="info" v-for="(item, index) in item.tagList" :key="index">{{item.commonName}}</el-tag>
              </div>
              <!-- <div class="comparison">
                <el-button plain type="danger" size="mini" icon="el-icon-sort">比对</el-button>
              </div> -->
            </div>

            <div class="page-wrapper">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationOption.total">
              </el-pagination>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="right">
            <div class="title">推荐政策<span @click="changeData">换一换</span></div>
            <hr style="margin:-5px 20px">
            <div class="hotPolicy">
              <el-row v-for="(item,index) in policyList" :key="index">
                <el-col :span="1"><i class="el-icon-caret-right"></i></el-col>
                <el-col :span="23">
                  <div class="content">{{item.title}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { dateFormat } from '@/util/date'
import { getInformationCenterPage } from '@/api/govdata/information'
export default {
  mixins: [mixins],
  data () {
    return {
      title: '',
      show: false,
      pageOption: {
        page: 1,
        limit: 10,
        sort: 'time',
      },
      paginationOption: {
        current: 1,
        size: 0,
        total: 0,
      },
      changeOption: {
        limit: 10,
        page: 1,
        views: 1,
      },
      resdata: [],
      policyList: [],
    }
  },
  computed: {

  },
  filters: {
    dateFormat (time) {
      var date = new Date(time)
      return dateFormat(date, 'yyyy年MM月dd日')
    },
  },
  created () {
    this.load()
    this.hotPolicy()
  },
  methods: {
    /**
     * 获取热门政策
     */
    hotPolicy (option = this.changeOption) {
      getInformationCenterPage(option).then(res => {
        this.policyList = res.data.records
        this.pages = res.data.pages
      })
    },

    /**
     * 换一换
     */
    changeData () {
      if (this.changeOption.page + 1 > this.pages) {
        this.changeOption.page = 1
      } else {
        this.changeOption.page++
      }
      this.changeOption = { ...this.changeOption }
      this.hotPolicy()
    },

    /**
     * 获取获取列表数据
     */
    async load () {
      this.isLoadTable = true
      const res = await getInformationCenterPage({
        ...this.pageOption,
        ...this.paginationOption,
      })
      const { data } = res
      this.paginationOption.current = data.current
      this.paginationOption.size = data.size
      this.paginationOption.total = data.total
      this.resdata = data.records
    },

    /**
     * 根据标题去搜索
     */
    search () {
      this.pageOption.title = this.title
      this.load()
    },

    /**
     * 打开详情页
     */
    handleOpenLink (item) {
      this.$router.push({
        path: `/app/detail/${item.id}`,
        query: {
          type: 'information',
          id: item.id,
        },
      })
    },
    /**
     * 控制页面数据(10条/页)
     */
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },

    /**
     * 控制去到第几页
     */
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },

    /**
     * 排序触发时的回调
     */
    handleChangeSort (val) {
      this.pageOption.sort = val
      this.load()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
  .left {
    border: 1px solid #ddd;
    border-radius: 3px;
    .page-top {
      display: flex;
      margin: 20px 20px -20px 20px;
      padding-bottom: 13px;
      .page-header {
        align-items: baseline;
        font-size: 22px;
        color: #222;
        span {
          font-size: 13px;
          margin-left: 16px;
          color: #999;
          font-weight: 400;
        }
      }
      .page-header-btn {
        text-align: left;
        span {
          float: right;
        }
      }
    }
    .tip {
      text-align: center;
      padding: 10px 0;
      font-size: 40px;
      color: #eee;
    }
    .text-container {
      margin: 20px 20px;
      border-top: 1px solid #eee;
      h3 {
        line-height: 30px;
        font-size: 18px;
        color: #222;
        margin-top: 15px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .text-des {
        font-size: 14px;
        color: #999;
        padding-right: 6px;
        line-height: 26px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .detail {
        display: flex;
        font-size: 14px;
        color: #999;
        margin: 20px 0;
        .distance-right {
          margin-right: 20px;
        }
        .el-icon-setting:before {
          margin-right: 5px;
        }
        .el-icon-time {
          margin-right: 5px;
        }
      }
      .tag {
        font-size: 13px;
        color: #666;
      }
      .comparison {
        text-align: right;
        margin: 0px 10px 20px 10px;
      }
    }
    .page-wrapper {
      display: flex;
      justify-content: center;
      margin: 30px auto;
    }
  }
  .right {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-left: 25px;
    .title {
      margin: 20px;
      font-size: 16px;
      font-weight: 700;
      color: #2c3e50;
      span {
        font-size: 14px;
        font-weight: 300;
        color: #4ea4eb;
        cursor: pointer;
        float: right;
      }
    }
    .hotPolicy {
      margin: 20px;
      .content {
        font-size: 13.3px;
        color: #2c3e50;
        margin-bottom: 10px;
        padding-left: 9px;
        &:hover {
          color: #4ea4eb;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
<style  scoped>
.header-btn >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  border-color: #ba1b21;
  background-color: #ba1b21;
}
.istop >>> .el-tag {
  height: 27px;
  line-height: 26px;
}
.tag >>> .el-tag {
  margin-left: 10px;
  height: 24px !important;
  line-height: 22px !important;
}
.hotPolicy >>> .el-icon-caret-right {
  margin-left: -4px;
  color: #4ea4eb;
}
</style>