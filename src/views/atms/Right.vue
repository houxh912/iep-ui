<template>
  <div>
    <el-card shadow="never">
      <div class="person-info">
        <span class="img"><img :src="img" alt=""></span>
        <div class="info">
          <span class="info-con"><span class="post">{{post}}</span><span class="name">{{name}}</span></span>
          <el-button type="danger" size="mini" plain>转移</el-button>
        </div>
      </div>
      <similar-tasks></similar-tasks>
      <circulation-log></circulation-log>
      <div class="bottom">
        <span>{{handleTitle}}</span>
        <div class="con"></div>
        <div class="btn-con">
          <el-button type="danger" size="mini">发表</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import SimilarTasks from './SimilarTasks'
import CirculationLog from './CirculationLog'
export default {
  components: {
    SimilarTasks,
    CirculationLog,
  },
  data () {
    return {
      img: '../img/person/p09.jpg',
      post: '负责人',
      name: '潘超巧',
      handleTitle: '@提及他人',
    }
  },
}
</script>
<style lang="scss" scoped>
.person-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .info {
    .info-con {
      display: block;
      margin-bottom: 10px;
    }
  }
  .img {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border: 1px solid #ebeef5;
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
  .post {
    margin-right: 5px;
    color: #999;
  }
  .name {
    font-size: 18px;
  }
  .el-button--danger.is-plain {
    color: #cb3737;
    background: #f8e8e9;
    border-color: #e3a4a6;
    &:hover {
      background: #cb3737;
      color: #fff;
    }
  }
  .el-button--danger {
    color: #fff;
    background: #cb3737;
    border-color: #cb3737;
    &:hover {
      color: #cb3737;
      background: #f8e8e9;
      border-color: #e3a4a6;
    }
  }
}
.bottom {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  .con {
    margin: 10px 0;
  }
  .btn-con {
    text-align: right;
  }
}
</style>
