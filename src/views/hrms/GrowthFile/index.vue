<template>
  <div>
    <basic-container>
      <page-header title="员工成长档案" :backOption="backOption"></page-header>
      <div class="staff-headers">
        <div class="left">
          <span class="img-header zoom"><img :src="avatar" alt="" /></span>
          <div class="name-info">
            <span class="name">李颖<a class="state" href="#">（在职）</a></span>
            <span class="num">GM1111111</span>
          </div>
        </div>
        <div class="right">
          <div class="list">
            <span>部门：国脉集团、国脉先锋队</span>
          </div>
          <div class="list">
            <span>岗位：产品经理</span>
            <span>职务职称：经理助理、助理咨询师</span>
          </div>
          <div class="label-item">
            <span>标签：</span>
            <ul>
              <li v-for="item in labellist" :key="item.id">
                <a href="#">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-checkbox-group class="check-group" v-model="checkList">
        <el-checkbox label="人事变动"></el-checkbox>
        <el-checkbox label="评价记录"></el-checkbox>
        <el-checkbox label="考试情况"></el-checkbox>
        <el-checkbox label="奖惩信息"></el-checkbox>
        <el-checkbox label="培训记录"></el-checkbox>
      </el-checkbox-group>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
const avatar = require('./timg.jpg')
export default {
  components: { PageHeader },
  data () {
    return {
      avatar,
      checkList: ['人事变动', '评价记录', '考试情况', '奖惩信息', '培训记录'],
      labellist: [
        {
          id: '1',
          label: '产品设计',
        },
        {
          id: '2',
          label: '项目管理',
        },
        {
          id: '3',
          label: '原型设计',
        },
        {
          id: '4',
          label: '平台规划',
        },
        {
          id: '5',
          label: '平台规划',
        },
        {
          id: '6',
          label: '平台规划',
        },
        {
          id: '7',
          label: '平台规划',
        },
        {
          id: '8',
          label: '平台规划',
        },
      ],
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
    // console.log(this.$route)
  },
}
</script>
<style lang="scss" scoped>
.check-group {
  padding: 20px 50px;
}
.block {
  padding: 0 50px;
  margin-top: 20px;
}
.staff-headers {
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 10px;
  box-shadow: 0 0 1px 1px #eee;
  .left {
    display: inline-flex;
    padding-right: 20px;
    width: 17%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;
  }
  .right {
    display: inline-block;
    padding-left: 35px;
    width: 73%;
    font-size: 14px;
    vertical-align: middle;
    border-left: 1px dashed #d7d7d7;
    .list {
      margin-bottom: 15px;
      .list-right {
        margin-left: 30px;
      }
    }
  }
  .img-header {
    display: inline-block;
    width: 70px;
    height: 70px;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 50%;
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 1s ease 0s;
    }
  }
  .name-info {
    display: inline-block;
    vertical-align: middle;
    .name,
    .num {
      display: block;
      margin-top: 8px;
    }
    .num {
      font-size: 14px;
    }
  }
  .state {
    color: #999;
  }
  .label-item {
    span,
    ul,
    li {
      display: inline-block;
      vertical-align: middle;
    }
    ul {
      width: 90%;
      height: 40px;
      overflow: hidden;
    }
    li {
      margin: 5px;
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    a {
      display: block;
      padding: 5px 10px;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      background-color: #f9f9f9;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      &:hover {
        border-color: #ea8d03;
        background-color: #fff7ec;
        color: #ea8d03;
      }
    }
  }
}
</style>
