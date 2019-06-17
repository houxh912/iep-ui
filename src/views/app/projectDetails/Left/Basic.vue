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
            <span class="classTag" v-if="list.show=='show'">
              <el-tag type="white" v-for="(item, index) in projectData.projectTagList" :key="index">{{item}}</el-tag>
            </span>
            <span v-else-if="list.dict">{{dictMap[list.dict][projectData[list.name]]}}</span>
            <span v-else>{{projectData[list.name]}}</span>
          </span>
        </span>
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
      itemList: [
        {
          title: '基本信息',
          lists: [
            {
              post: '项目名称',
              name: 'projectName',
            },
            {
              post: '项目标签',
              name: 'projectTagList',
              show: 'show',
            },
            {
              post: '发布人',
              name: 'publisherName',
            },
            {
              post: '发布时间',
              name: 'publishTime',
            },
            {
              post: '编号',
              name: 'serialNo',
            },
            {
              post: '客户名称',
              name: 'groupExternalCooperatePartnerName',
            },
            {
              post: '项目预算',
              name: 'projectBudget',
            },
            {
              post: '是否关联产品',
              name: 'isRelevanceProduct',
              dict: 'is_yes',
            },
          ],
        },
      ],
      dictMap: {
        is_yes: {
          1: '是',
          2: '否',
        },
      },
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
