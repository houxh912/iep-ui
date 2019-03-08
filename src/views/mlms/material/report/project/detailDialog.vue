<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in weeklyList" :key="index" :title="`${item.name}（${item.date}）`" :name="index">
        <div class="content">
          <div class="form">
            <div class="title">客户需求</div>
              <pre>{{item.xuqiu}}</pre>
            <div class="title">本周工作总结</div>
              <pre>{{item.benzhouzongjie}}</pre>
            <div class="title">下周工作计划</div>
              <pre>{{item.xiazhouzongjie}}</pre>
            <div class="title">备注</div>
              <pre>{{item.beizhu}}</pre>
          </div>
          <div class="edit">
            <i class="el-icon-edit" @click="update"></i>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <iep-button type="danger" class="iep-button" @click="handleCreate"><i class="el-icon-plus"></i>创建项目周报</iep-button>
    <create-dialog ref="createDialog"></create-dialog>
  </div>
</template>

<script>
  import CreateDialog from './createDialog'
  export default {
    components: { CreateDialog },
    data () {
      return {
        activeName: '-1',
        weeklyList: [
          {
            name: '公共平台第七周周报',
            date: '2019-02-25 09:00:22',
            xuqiu: '客户需求',
            benzhouzongjie: '本周工作总结',
            xiazhouzongjie: '下周工作总结',
            beizhu: '备注',
          }, {
            name: '内网第七周周报',
            date: '2019-02-25 09:00:22',
            xuqiu: '客户需求',
            benzhouzongjie: '本周工作总结',
            xiazhouzongjie: '下周工作总结',
            beizhu: '备注',
          }, {
            name: '个人管理系统第七周周报',
            date: '2019-02-25 09:00:22',
            xuqiu: '客户需求',
            benzhouzongjie: '本周工作总结',
            xiazhouzongjie: '下周工作总结',
            beizhu: '备注',
          }, 
        ],
      }
    },
    methods: {
      update () {
        this.$emit('handleUpdate', true)
      },
      handleCreate () {
        this.$refs['createDialog'].dialogShow = true
      },
    },
  }
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .form {
    flex: 1;
    .title {
      margin-bottom: 20px;
    }
    pre {
      padding-left: 20px;
      line-height: 20px;
      margin: 0;
      min-height: 50px;
    }
    .title {
      font-weight: 700;
      margin-top: 10px;
    }
  }
  .edit {
    width: 30px;
    text-align: center;
    font-size: 18px;
    i {
      cursor: pointer;
    }
  }
}
.iep-button {
  margin-top: 20px;
}
</style>
