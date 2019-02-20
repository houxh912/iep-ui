<template>
  <div class="wel-content">
    <div class="information">
      <el-row>
        <el-col :span="3" class="dotted">
          <div class="grid-content bg-purple left">
            <div class="img"><img src="./timg.jpg" alt="头像"></div>
            <div class="code-name">GM000117</div>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple right">
            <div class="user-poster">早上好，国脉人，人人都要成为专家</div>
            <div class="user-info">
              <el-progress :percentage="80" color="#68C769"></el-progress>
              <span :class="item.type=='button'?'border':'color'" v-for="(item,index) in infoList" :key="index">{{item.label}}</span>
              <span class="more">更多<i class="el-icon-d-arrow-right"></i></span>
            </div>
            <div class="user-data">
              <div class="inline task">
                <i class="el-icon-tickets padding"></i>
                <span>每日任务，领积分<i class="el-icon-d-arrow-right"></i></span>
              </div>
              <div class="inline change">
                切换至领导桌面
              </div>
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
    <about-task>
    </about-task>
    <project></project>
    <customer></customer>
    <material></material>
  </div>
</template>

<script>
import aboutTask from './aboutTask'
import project from './project'
import customer from './customer'
import material from './material'
export default {
  components: { aboutTask, project, customer, material },
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

}
</script>

<style lang="scss" scoped>
.wel-content {
  width: 100%;
  height: auto;
  background: white;
  padding: 10px;
  font-size: 12px;
}
.information {
  width: 100%;
  height: 155px;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #eee;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      display: flex;
      align-items: center;
      .left {
        width: 100%;
        text-align: center;
        .img {
          width: 80px;
          height: 80px;
          margin: 0 auto;
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
            text-align: center;
            vertical-align: middle;
          }
          .color {
            color: #7a7a7a;
          }
          .more {
            padding: 0 10px;
            color: blue;
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
            padding: 5px 10px;
            border-radius: 5px;
          }
          .change {
            padding: 5px 10px;
            border-radius: 5px;
            text-align: center;
            color: #ba1928;
            margin-left: 10px;
            border: 1px solid #ba1928;
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
                color: #d1d1d1;
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
    background: #eee;
    margin-top: -25px;
    text-align: center;
    line-height: 10px;
    border-radius: 50%;
    transform: rotate(-90deg);
    font-size: 20px;
    color: #c0c0c0;
  }
}
</style>
