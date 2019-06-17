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
          title: '审批信息',
          lists: [
            {
              post: '审批状态',
              name: '未提交',
            },
            {
              post: '申请人',
              name: '北方业务一部',
            },
            {
              post: '审批人',
              name: '无',
            },
            {
              post: '申请时间',
              name: '2019-06-22  16:30',
            },
            {
              post: '审批不通过理由',
              name: '无',
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
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
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
