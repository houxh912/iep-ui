<template>
  <div class="survey">
    <div class="survey-item" v-for="item in itemList" :key="item.id">
      <span class="sub-title">{{item.title}}</span>
      <div class="item-con">
        <span class="item-list" v-for="list in item.lists" :key="list.id">
          <span>
            {{list.post}}：
          </span>
          <span :class="list.show">
            {{list.name}}
            <span class="classTag" v-show="list.show=='show'">
              <el-tag type="white">{{list.tag1}}</el-tag>
              <el-tag type="white">{{list.tag2}}</el-tag>
              <el-tag type="white">{{list.tag3}}</el-tag>
            </span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemList: [
        {
          title: '基本信息',
          lists: [
            {
              post: '项目名称',
              name: '北京市政务服务管理办公室五个主体事项梳理',
            },
            {
              post: '项目标签',
              tag1: '大数据',
              tag2: '政务规划',
              tag3: '人工智能',
              show: 'show',
            },
            {
              post: '发布人',
              name: '超级管理员',
            },
            {
              post: '发布时间',
              name: '2019-06-22  16:30',
            },
            {
              post: '编号',
              name: 'GM20190622',
            },
            {
              post: '客户名称',
              name: '战略合作伙伴',
            },
            {
              post: '项目预算',
              name: '60,000,00',
            },
            {
              post: '是否关联产品',
              name: '是',
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
.item-con {
  display: grid;
  padding: 20px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr);
  background-color: #fafafa;
  .item-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
<style scoped>
.survey >>> .el-card {
  border: 0;
}
</style>
