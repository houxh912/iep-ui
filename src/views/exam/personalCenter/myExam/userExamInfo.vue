<template>
  <el-card class="box-card" shadow="never">
    <el-row>
      <el-col :span="4" class="dotted">
        <div class="left">
          <div class="img">
            <iep-img-avatar :size="110" :src="userInfo.avatar" alt="头像"></iep-img-avatar>
          </div>
          <iep-div-detail class="iep-ellipsis" :value="indexData.staffId"></iep-div-detail>
        </div>
      </el-col>

      <el-col :span="20" style="border-left: 1px dashed #eee;">
        <div class="right">
          <div class="user-poster">
            <div class="user">
              <p class="iep-ellipsis">{{indexData.name}}</p>
              <div class="user-right-info">
                <div class="user-info">
                  <iep-div-detail class="iep-ellipsis" :value="indexData.title" nullmsg="暂无职称"></iep-div-detail>
                  <iep-div-detail class="iep-ellipsis" :value="indexData.job" nullmsg="暂无岗位"></iep-div-detail>
                </div>
              </div>
            </div>
            <el-switch
              class="btnSwitch"
              v-model="reviewCenter"
              active-color="#D56268"
              inactive-color="#EBEEF5"
              :active-text="switchText"
              @change="switchChange"
            ></el-switch>
          </div>

          <hr>

          <div class="examination-status">
            <el-row>
              <el-col :span="7">
                <div class="iep-ellipsis">最近参加的考试</div>
              </el-col>
              <el-col :span="4">
                <div class="iep-ellipsis">状态</div>
              </el-col>
              <el-col :span="4">
                <div class="iep-ellipsis">日期</div>
              </el-col>
              <el-col :span="5">
                <div class="iep-ellipsis">完成度</div>
              </el-col>
              <el-col :span="3"></el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <div class="iep-iellipsis">2018第三季国脉内网能力考试</div>
              </el-col>
              <el-col :span="4">
                <div class="iep-iellipsis">
                  <span>正在进行</span>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="iep-iellipsis">2018.12.15</div>
              </el-col>
              <el-col :span="5">
                <el-progress
                  class="iep-iellipsis"
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="30"
                  color="#D56268"
                ></el-progress>
              </el-col>
              <el-col :span="3">
                <iep-button type="primary" icon="el-icon-edit" style="margin-left:57px">继续考试</iep-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getIndex } from '@/api/wel/index'
const initIndexForm = () => {
  return {
    name: '',//名字
    staffId: '',//工号
    title: '',//职称
    job: '',//职位
  }
}
export default {
  data () {
    return {
      pageLoading: true,
      reviewCenter: false,//审阅中心
      switchText: '考试中心',
      indexData: initIndexForm(),
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    //滑块滑动事件
    switchChange (status) {
      if (status == true) {
        this.switchText = '审阅中心'
      } else {
        this.switchText = '考试中心'
      }
      this.$emit('showCard',status)
    },
    async loadPage () {
      this.pageLoading = true
      await getIndex().then(({data}) => {
        // console.log(data)
        this.indexData = this.$mergeByFirst(initIndexForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>


<style lang="scss" scoped>
.el-row {
  .el-col {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0;
  }
  .left {
    width: 100%;
    .img {
      margin: 0 auto;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #ebeef5;
    }
    .iep-ellipsis {
      width: 100%;
      text-align: center;
      color: rgb(136, 136, 136);
      font-size: 13px;
    }
  }
  .right {
    margin-left: 46px;
    width: 90%;
    > div {
      padding-top: 5px;
    }
    .user-poster {
      display: flex;
      justify-content: space-between;
      .user {
        display: flex;
        p {
          font-size: 24px;
          margin: 0px;
        }
        .user-right-info {
          margin: 16px 0 7px 15px;
          .iep-ellipsis {
            font-size: 14px;
            color: rgb(136, 136, 136);
          }
        }
      }
    }
    .user-info {
      display: flex;
      justify-content: flex-start;
      .iep-ellipsis {
        font-size: 15px;
        margin-right: 8px;
      }
    }
    hr {
      margin-top: 10px;
      margin-bottom: 0px;
    }
    .examination-status {
      font-size: 14px;
      > .el-row:last-child {
        .iep-iellipsis:first-child {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-right: 10px;
        }
      }
      .iep-ellipsis{
        padding: 6px 0;
        color: rgb(136, 136, 136);
      }
      .iep-iellipsis {
        padding: 5px 0;
        font-size: 15px;
      }
      .el-progress {
        width: 80%;
      }
      .el-button {
        margin-top: -10px;
      }
    }
  }
}

@media (min-width: 0px) and (max-width: 769px) {
  .dotted {
    display: none !important;
  }
}
.btnSwitch {
  padding-top: 27px;
}
</style>