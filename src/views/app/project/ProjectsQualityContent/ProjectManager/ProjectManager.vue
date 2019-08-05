<template>
  <div>
    <!-- <IepNoData></IepNoData> -->
    <div class="manager">
      <div class="card">
        <el-tag type="info" v-for="(item, index) in tagList" :key="index">{{item}}</el-tag>
      </div>
      <div class="module">
        <el-card class="module-item" v-for="(item,index) in list" :key="index" shadow="hover">
          <div class="content">
            <div class="avatar">
              <iep-img class="img" :src="item.avatar"></iep-img>
            </div>
            <div class="title">
              <span class="name">{{item.projectManagerName}}</span><span class="sub-name">(担任{{item.projectCount}}次)</span>
            </div>
            <div class="depart">{{item.attendeeByName}}</div>
          </div>
          <div class="hover" @mouseenter="handleProject(item)" @mouseleave="handleProjectLeave">
            <div class="piece" v-for="(t, i) in projectList" :key="i">{{t}}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectEmployee, getProjectByemployee } from '@/api/app/prms/'
export default {
  data () {
    return {
      tagList: ['数据基因', '营商通', '流程再造'],
      list: [],
      projectList: [],
    }
  },
  methods: {
    handleProject (row) {
      getProjectByemployee({ type: 'manager', userId: row.projectManager }).then(({ data }) => {
        this.projectList = data.data
      })
    },
    handleProjectLeave () {
      this.projectList = []
    },
  },
  created () {
    getProjectEmployee().then(({ data }) => {
      this.list = data.data.records.slice(0, 4)
    })
  },
}
</script>

<style lang="scss" scoped>
.manager {
  .card {
    height: 35px;
    margin-bottom: 10px;
    .el-tag {
      margin-right: 10px;
    }
  }
  .module {
    display: flex;
  }
}
.module-item {
  position: relative;
  width: 24%;
  margin: 0 0.5%;
  &:hover .hover {
    opacity: 1;
  }
  .content {
    .avatar {
      width: 120px;
      height: 120px;
      margin: 35px auto 20px;
      .img {
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .title {
      text-align: center;
      margin-bottom: 5px;
      .name {
        font-size: 16px;
      }
      .sub-name {
        color: #999;
        font-size: 12px;
      }
    }
    .depart {
      text-align: center;
    }
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
      height: 166px;
      line-height: 24px;
      text-indent: 2em;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 11;
      -webkit-box-orient: vertical;
    }
    .piece {
      position: relative;
      margin-left: 15px;
      text-align: left;
      &:before {
        content: "";
        position: absolute;
        left: -15px;
        top: 10px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #999;
      }
    }
  }
}
.el-card {
  border: 0;
}
</style>
<style scoped>
.module >>> .el-card {
  margin: 3px;
}
.module >>> .el-card__body {
  height: 240px !important;
}
</style>
