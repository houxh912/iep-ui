<template>
  <el-card shadow="always">
    <el-row class="remind">
      <el-col class="head" :span='24'>预警提醒
        <div class="more">
          <span class="border" @click="left"><i class="el-icon-arrow-left"></i></span>
          <span class="border" @click="right"><i class="el-icon-arrow-right"></i></span>
        </div>
      </el-col>
      <div v-for="(item, index) in infoList" :key="index" class="tip" @mouseenter="tipsSelect=index" @mouseleave="tipsSelect=-1">
        <i class="icon-tongzhi"></i>
        <span>功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中功能开发中</span>
        <iep-button type="primary" class="btn" size="mini" v-if="index==tipsSelect" @click="clear">忽略</iep-button>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getMyWarning } from '@/api/crms/count'
export default {
  mixins: [mixins],
  data () {
    return {
      infoList: '',
      tipsSelect: -1,
      current: 1,
      total: '',
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getMyWarning({ current: this.current, size: 5 }).then((res) => {
        this.infoList = res.data.data.records
        this.total = res.data.data.total
      })
    },
    clear () {
      this.$message.success('功能开发中')
    },
    left () {
      if (this.current > 1) {
        this.current -= 1
        this.load()
      } else {
        this.$message.warning('大兄弟！不能再往前了！！！')
        return false
      }

    },
    right () {
      var flag = Math.ceil(this.total / 5) - 1
      if (this.current > flag) {
        this.$message.warning('大兄弟！后面没有了！！！')
        return false
      } else {
        this.current += 1
        this.load()
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.remind {
  height: 220px;
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .more {
      float: right;
      .border {
        margin-left: 10px;
        i {
          display: inline-block;
          padding: 5px;
          border: 1px solid #9c9c9c;
          &:hover {
            border: 1px solid #d56368;
          }
        }
        &:hover {
          color: blue;
        }
      }
    }
  }
  .tip {
    line-height: 24px;
    margin-top: 10px;
    cursor: pointer;
    i {
      float: left;
    }
    span {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 80%;
      flex: 1;
      margin: 0;
      padding-left: 10px;
    }
    .btn {
      float: right;
    }
  }
  .tip:hover {
    color: #f00;
  }
}
.el-card {
  margin-right: 20px;
}
</style>
