<template>
  <div class="master">
    <page-header title="推荐师父">
    </page-header>
    <div v-loading="loadState" v-if="loadState"></div>
    <div v-else>
      <div class="master-con" v-if="masterList.length !== 0">
        <el-card shadow="hover" v-for="master in masterList" :key="master.id">
          <div>
            <div class="name">
              <span class="img" @click="getPerson()">
                <iep-img :src="master.avatar" alt=""></iep-img>
              </span>
              <span class="text">{{master.realName}}<span class="num">{{master.num}}</span></span>
            </div>
            <span></span>
          </div>
          <div class="classTag">
            <span class="name">标签：</span>
            <el-tag type="white" v-for="(tag, index) in master.masterTagAbil" :key="index">{{tag}}</el-tag>
          </div>
          <div class="btn-group">
            <el-button size="mini" @click="getPerson(master)">个人风采</el-button>
            <el-button type="danger" plain size="mini" @click="handleApprentice(master)">拜师</el-button>
          </div>
        </el-card>
      </div>
      <div class="img-tip" v-else>
        <iep-img :src="'../img/default/nodata.png'" class="img"></iep-img>
      </div>
    </div>
    <!-- 拜师 -->
    <el-dialog title="拜师" :visible.sync="apprenticeShow" width="330px" center>
      <div style="text-align: center;">是否确认向 【{{userInfo.realName}}】 拜师</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="apprenticeShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleApprenticeConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addMasterWorker, getPageRecommend } from '@/api/cpms/characterrelations'

export default {
  data () {
    return {
      apprenticeShow: false,
      loadState: true,
      userInfo: {},
      masterList: [],
    }
  },
  methods: {
    getPerson (row) {
      this.$router.push({
        path: `/app/personal_style/${row.userId}`,
      })
    },
    handleApprentice (row) {
      this.userInfo = row
      this.apprenticeShow = true
    },
    handleApprenticeConfirm () {
      addMasterWorker({ masterWorker: [this.userInfo.userId] }).then(() => {
        this.$message.success('拜师成功！')
        this.apprenticeShow = false
      })
    },
    getPageRecommend () {
      getPageRecommend().then(({data}) => {
        this.loadState = false
        this.masterList = data.records
      })
    },
  },
  created () {
    this.getPageRecommend()
  },
}
</script>
<style lang="scss" scoped>
.master {
  margin: 20px 20px 40px;
}
.master-con {
  display: grid;
  margin-top: 20px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
  .name {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: center;
    .text {
      display: flex;
      margin-left: 15px;
      justify-content: flex-start;
      font-size: 16px;
      letter-spacing: 3px;
      align-items: flex-end;
    }
    .num {
      margin-left: 6px;
      font-size: 14px;
      color: #999;
      letter-spacing: 0.5px;
    }
  }
  .img {
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .classTag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    .name {
      margin-bottom: 8px;
      color: #999;
    }
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .classTag .el-tag--white {
    border: 1px solid #dcdfe6;
    height: 28px;
    line-height: 26px;
    background: #fff;
    color: #606266;
  }
  .el-button--danger {
    color: #cb3737;
    border-color: #cb3737;
    &:hover,
    &:focus {
      background-color: #cb3737;
      color: #fff;
    }
  }
}
.img-tip {
  text-align: center;
}
</style>
