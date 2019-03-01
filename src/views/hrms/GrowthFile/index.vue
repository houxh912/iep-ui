<template>
  <div>
    <basic-container>
      <page-header title="员工成长档案" :backOption="backOption"></page-header>
      <div class="staff-headers">
        <div class="left">
          <span class="img-header zoom"><img src="blob:http://127.0.0.1:8090/75f6d98a-d778-4f3f-903e-ffc602f595fc" alt="" /></span>
          <div class="name-info">
            <span class="name">李颖<a class="state" href="javescript:void(0);">（在职）</a></span>
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
                <a href="javescript:void(0);" target="_blank">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
export default {
  components: { PageHeader },
  data () {
    return {
      labellist: [
        { 
          id: '1',
          label: '产品设计',
        },
        { 
          id: '1',
          label: '项目管理',
        },
        { 
          id: '1',
          label: '原型设计',
        },
        { 
          id: '1',
          label: '平台规划',
        },
        { 
          id: '1',
          label: '平台规划',
        },
        { 
          id: '1',
          label: '平台规划',
        },
        { 
          id: '1',
          label: '平台规划',
        },
        { 
          id: '1',
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
    console.log(this.$route)
  },
}
</script>
<style lang="scss" scoped>
.staff-headers {
  padding: 20px;
  background-color: #fff;
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
      .list-right {margin-left: 30px;}
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
    .name, .num {
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
  &:hover {
    box-shadow: 0 0 1px 1px #eee;
  }
  .label-item {
    span, ul, li {
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
