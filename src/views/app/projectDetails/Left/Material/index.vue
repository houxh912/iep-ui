<template>
  <div class="survey">
    <div class="survey-item" v-for="item in itemList" :key="item.id">
      <span class="sub-title">{{item.title}}</span>
      <div class="item">
        <el-card class="list" shadow="hover">
          <div class="item-info">
            <span v-for="(t, i) in projectData[item.listName]" :key="i" @click="handleDetail(t, item)"><i class="iconfont" :class="item.icon"></i>{{t.name}}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    projectData: {
      type: Object,
    },
  },
  data () {
    return {
      title: '项目材料',
      itemList: [
        {
          title: '关联项目',
          icon: 'icon-guanlian',
          listName: 'projectList',
          path: '/app/resource/project_list/project_details/',
        },
        {
          title: '关联产品',
          icon: 'icon-guanlian',
          listName: 'productList',
          path: '/app/module_details/',
        },
        {
          title: '关联合同',
          icon: 'icon-guanlian',
          listName: 'contractList',
          path: '/mlms_spa/contract/detail/',
        },
        {
          title: '会议纪要',
          icon: 'icon-guanlian',
          listName: 'summaryList',
          path: '/mlms_spa/summary/detail/',
        },
        {
          title: '关联材料',
          icon: 'icon-guanlian',
          listName: 'materialList',
          path: '/app/resource/material/material_detail/',
        },
      ],
    }
  },
  methods: {
    handleDetail (row, item) {
      if (item.path) {
        this.$router.push(`${item.path}${row.id}`)
      }
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$router.replace(to.path)
    })
  },
}
</script>
<style lang="scss" scoped>
.survey {
  margin-bottom: 30px;
}
.classTag {
  .el-tag {
    margin-right: 5px;
    &:hover {
      color: #cb3737;
      background: #fef0f0;
      border-color: #cb3737;
    }
  }
}
.show {
  display: block;
}
.sub-title {
  display: block;
  margin-bottom: 20px;
}
.sub-title-list {
  display: block;
  margin-bottom: 15px;
}
.item-info {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    i {
      margin-right: 3px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.list {
  margin-bottom: 20px;
}
</style>
<style scoped>
.survey >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>
