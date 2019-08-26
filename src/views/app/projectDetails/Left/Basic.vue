<template>
  <div class="survey">
    <div class="survey-item" v-for="item in itemList" :key="item.id">
      <span class="sub-title">{{item.title}}</span>
      <div class="item-con">
        <span class="item-list" v-for="list in item.lists" :key="list.id">
          <span class="title" v-if="list.replace">
            {{projectData[list.replace]?list.replaceLabel:list.post}}：
          </span>
          <span class="title" v-else-if="projectData[list.name]">
            {{list.post}}：
          </span>
          <span class="content" :class="list.show">
            <span class="classTag" v-if="list.show=='show'">
              <el-tag type="white" v-for="(item, index) in projectData[list.name]" :key="index">{{item}}</el-tag>
            </span>
            <span class="classList" v-else-if="list.list">
              {{ projectData[list.name].map(m => m[list.list]).join('、') }}
            </span>
            <span v-else-if="list.dict">{{dictMap[list.dict][projectData[list.name]]}}</span>
            <span v-else-if="list.replace">{{projectData[list.replace]?projectData[list.replace]:projectData[list.name]}}</span>
            <span v-else-if="projectData[list.name]">{{projectData[list.name]}}</span>
            <span v-else>暂无</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from '@/util/store'
const dicData = getStore({ name: 'dictGroup' })
function changeDict (list) {
  let data = {}
  for (let item of list) {
    data[item.value] = item.label
  }
  return data
}
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
            }, {
              post: '项目编号',
              name: 'serialNo',
            }, {
              post: '项目类型',
              name: 'projectType',
              dict: 'prms_project_type',
            }, {
              post: '项目标签',
              name: 'projectTagList',
              show: 'show',
            }, {
              post: '客户名称',
              name: 'relatedClientName',
              replace: 'attendeeByName',
              replaceLabel: '委托组织',
            }, {
              post: '项目等级',
              name: 'projectLevel',
              dict: 'prms_project_level',
            }, {
              post: '项目预算',
              name: 'projectBudget',
              replace: 'contractAmount',
              replaceLabel: '合同金额',
            }, {
              post: '项目经理',
              name: 'projectManagerName',
            }, {
              post: '项目督导',
              name: 'projectMentorList',
              list: 'name',
            }, {
              post: '市场经理',
              name: 'mktManagerList',
              list: 'name',
            }, {
              post: '执行项目经理',
              name: 'projectHandlesList',
              list: 'name',
            }, {
              post: '团队成员',
              name: 'membersList',
              list: 'name',
            },
          ],
        },
      ],
      dictMap: {
        is_yes: {
          1: '是',
          2: '否',
        },
        prms_project_type: changeDict(dicData.prms_project_type),
        prms_project_level: changeDict(dicData.prms_project_level),
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
    .title {
      min-width: 70px;
    }
    .content {
      flex: 1;
    }
  }
}
</style>
<style scoped>
.survey >>> .el-card {
  border: 0;
}
</style>
