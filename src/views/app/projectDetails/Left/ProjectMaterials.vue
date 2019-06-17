<template>
  <div class="survey">
    <div class="survey-item" v-for="item in itemList" :key="item.id">
      <span class="sub-title">{{item.title}}</span>
      <div class="item">
        <el-card class="list" shadow="hover" v-for="list in item.lists" :key="list.id">
          <span class="sub-title-list">{{list.subTitle}}</span>
          <div class="item-info">
            <span><i class="iconfont" :class="list.icon"></i>{{list.con1}}</span>
            <span><i class="iconfont" :class="list.icon"></i>{{list.con2}}</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '项目材料',
      itemList: [
        {
          title: '关联产品',
          lists: [
            {
              subTitle: '关联产品',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
          ],
        },
        {
          title: '会议纪要',
          lists: [
            {
              subTitle: '关联产品',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
            {
              subTitle: '会议纪要',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
            {
              subTitle: '关联材料',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
            {
              subTitle: '关联合同',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
            {
              subTitle: '规范性材料',
              icon: 'icon-guanlian',
              con1: '421',
              con2: '产品421',
            },
          ],
        },
      ],
    }
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
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.list {
  margin-bottom: 20px;
}
</style>
