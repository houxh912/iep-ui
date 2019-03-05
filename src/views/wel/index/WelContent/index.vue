<template>
  <div class="wel-content">
    <div class="information">
      <el-row>
        <el-col :span="4" class="dotted">
          <div class="left">
            <div class="img zoom"><img id="information-avatar" alt="头像"></div>
            <div class="code-name">GM000117</div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="right">
            <div class="user-poster">早上好，国脉人，人人都要成为专家</div>
            <div class="user-info">
              <el-progress :percentage="80" color="#68C769"></el-progress>
              <span :class="item.type=='button'?'border':'color'" v-for="(item,index) in infoList" :key="index">{{item.label}}</span>
              <router-link class="more" to="">更多<i class="el-icon-d-arrow-right"></i></router-link>
            </div>
            <div class="user-data">
              <router-link class="inline task" to="">
                <i class="icon-weath1 icon padding"></i>
                <span>每日任务，领积分<i class="el-icon-d-arrow-right"></i></span>
              </router-link>
              <router-link class="inline change" to="">
                切换至领导桌面
              </router-link>
              <div class="inline data">
                <div class="data-lab" :class="index==2?'hideLine':''" v-for="(item,index) in labList" :key="index">
                  <div class="count">{{item.data}}</div>
                  <div class="labTitle"><span>{{item.name}}</span><span class="span"><i class="el-icon-question"></i></span></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <span class="shrinkage">...</span>
    </div>
    <about-task></about-task>
    <project></project>
    <customer></customer>
    <material></material>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { handleImg } from '@/util/util'
import AboutTask from './AboutTask'
import Project from './Project'
import Customer from './Customer'
import Material from './Material'
export default {
  components: { AboutTask, Project, Customer, Material },
  data () {
    return {
      infoList: [{
        label: '股东', type: 'button',
      }, {
        label: '资料达人', type: 'button',
      }, {
        label: '身份勋章', type: 'button',
      }, {
        label: '国脉集团副总经理/国脉集团研发中心主任', type: '',
      }],
      labList: [
        { data: 25, name: '标签' },
        { data: 1268, name: '材料' },
        { data: 23, name: '个人信用' },
      ],
    }
  },
  created () {
    handleImg(this.userInfo.avatar, 'information-avatar')
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.wel-content {
  width: 100%;
  height: auto;
  background: white;
  font-size: 12px;
}
.information {
  width: 100%;
  background: white;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  .el-row {
    margin: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #eee;
    box-shadow: 0 0 1px 1px #eee;
    .el-col {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0;
      margin: 0;
      .left {
        width: 100%;
        text-align: center;
        .img {
          margin: 0 auto;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        .code-name {
          padding-top: 10px;
        }
      }
      .right {
        padding-left: 30px;
        > div {
          padding: 5px 0;
        }
        .el-progress {
          width: 120px;
        }
        .user-poster {
          font-size: 14px;
        }
        .user-info {
          display: flex;
          align-items: center;
          span {
            margin: 0 4px;
          }
          .border {
            padding: 3px 12px;
            border-radius: 40px;
            border: 1px solid #eee;
            font-size: 13px;
            text-align: center;
            vertical-align: middle;
            background-color: #f5f7fa;
            color: #333;
          }
          .color {
            color: #7a7a7a;
          }
          .more {
            padding: 0 10px;
            color: #4692f5;
            &:hover {
              color: #1477f7;
            }
          }
        }
        .user-data {
          display: flex;
          align-items: center;
          .inline {
            display: flex;
            align-items: center;
            .padding {
              padding-right: 5px;
              font-size: 18px;
            }
          }
          .task {
            width: 160px;
            background: #f9eae7;
            padding: 3px 10px;
            font-size: 14px;
            border-radius: 3px;
            .icon {
              font-size: 20px !important;
              color: #ffbc01;
            }
            &:focus,
            &:hover {
              opacity: 0.9;
              outline: none;
            }
          }
          .change {
            padding: 4px 10px;
            border-radius: 3px;
            font-size: 14px;
            text-align: center;
            color: #ba1928;
            margin-left: 10px;
            border: 1px solid #ba1928;
            -webkit-transition: all 0.5s;
            transition: all 0.5s;
            &:focus,
            &:hover {
              background-color: #ba1928;
              color: #fff;
              outline: none;
            }
          }
          .data {
            padding-left: 20px;
            .data-lab {
              padding: 5px 24px;
              position: relative;
              text-align: center;
              &:after {
                content: "";
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                background: #ccc;
                height: 100%;
              }
              .count {
                font-size: 24px;
                color: #484848;
              }
              .labTitle {
                color: #bbb;
                .span {
                  padding-left: 5px;
                }
              }
            }
            .hideLine:after {
              width: 0;
            }
          }
        }
      }
    }
  }
  .dotted {
    border-right: 2px dotted #eee;
    box-sizing: border-box;
  }
  .shrinkage {
    width: 50px;
    height: 50px;
    position: absolute;
    right: -30px;
    top: 50%;
    display: none;
    background: #eee;
    margin-top: -25px;
    text-align: center;
    line-height: 10px;
    border-radius: 50%;
    transform: rotate(-90deg);
    font-size: 20px;
    color: #c0c0c0;
  }
  .el-icon-question {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
@media (min-width: 0px) and (max-width: 1025px) {
  .information {
    font-size: 14px;
    .dotted {
      margin-left: 25px !important;
      padding-right: 25px !important;
    }
    .el-col-3 {
      width: auto;
    }
  }
}
@media (min-width: 769px) and (max-width: 1026px) {
}
@media (min-width: 0px) and (max-width: 769px) {
  .information {
    font-size: 12px;
    .dotted {
      display: none !important;
    }
    .el-row {
      .el-col-21 {
        width: 100%;
        .right {
          margin: 0 auto;
          padding: 5px;
        }
      }
    }
  }
}
</style>
