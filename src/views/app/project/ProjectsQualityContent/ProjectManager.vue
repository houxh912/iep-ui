<template>
  <div class="project-manager">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div>
        <div class="project-managerList">
          <div v-for="(item,index) in projectManagerList" :key="index" class="piece" @click="handleOpen()">
            <div class="img-con">
              <iep-img :src="item.avatar" class="img" alt=""></iep-img>
            </div>
            <div class="text">
              <span class="name">{{item.projectManagerName}}<span class="num">{{`执行项目（${item.time}个）`}}</span></span>
              <span class="department">{{item.orgName}}</span>
            </div>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getProjectProjectManager } from '@/api/app/prms/'

export default {
  data () {
    return {
      title: '项目经理',
      data: '(9个)',
      linkName: '',
      projectManagerList: [],
    }
  },
  methods: {
    handleOpen () {
      this.$router.push({
        path: '',
      })
    },
  },
  created () {
    getProjectProjectManager().then(({data}) => {
      this.projectManagerList = data.data.slice(0, 9)
    })
  },
}
</script>
<style lang="scss" scoped>
.data-con {
  font-size: 12px;
}
.project-manager {
  .pieceDeletion {
    display: inline;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 18px 0 6px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
  }
  .name {
    font-size: 16px;
  }
  .num {
    margin-left: 5px;
    font-size: 14px;
    color: #999;
  }
}
.project-managerList {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 20px 0 13px;
  .piece {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .img-con {
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      overflow: hidden;
    }
    .img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .text {
      margin-left: 20px;
      width: 70%;
    }
    .department {
      display: block;
      margin-top: 5px;
      color: #999;
    }
  }
}
.btn {
  float: right;
  padding: 5px 0;
  color: #cb3737;
  &:hover {
    color: #f56c6c;
  }
}
.cardTitle {
  font-size: 18px;
  .datas {
    color: #999;
  }
}
</style>
<style scoped>
.project-manager >>> .el-card {
  height: 410px;
}
</style>
