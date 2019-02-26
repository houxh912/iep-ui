<template>
  <div class="consultation">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="head">
        <p class="title">{{item.title}}</p>
        <p class="date">{{item.date}}</p>
      </div>
      <div class="content">
        <div class="msg">{{item.msg}}</div>
        <div class="code">
          <el-tag class="code-item" type="info" v-for="(code, index) in item.code" :key="index">{{code}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consultation',
  data () {
    return {
      list: [
        {
          id: 1,
          title: '关于新项目的资讯',
          date: '2019-10-19',
          code: ['网站评测', '政务服务'],
          msg: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述',
        }, {
          id: 1,
          title: '关于新项目的资讯',
          date: '2019-10-19',
          code: ['网站评测', '政务服务'],
          msg: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.consultation {
  .item {
    margin-bottom: 10px;
    .head {
      display: flex;
      .title {
        flex: 1;
        font-weight: 700;
      }
      .date {
        width: 80px;
      }
    }
    .content {
      background-color: #f3f3f3;
      padding: 20px;
      .code {
        text-align: right;
        .code-item {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
