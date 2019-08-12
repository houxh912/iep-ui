<template>
  <div class="survey">
    <div class="survey-item" v-for="item in itemList" :key="item.id">
      <span class="sub-title">{{item.title}}</span>
      <div class="item-con">
        <span class="item-list" v-for="list in item.lists" :key="list.id">
          <span v-show="projectData[list.name]">
            {{list.post}}：
          </span>
          <span :class="list.show">
            <span class="classTag" v-if="list.show=='show'">
              <el-tag type="white" v-for="(item, index) in projectData[list.name]" :key="index">{{item}}</el-tag>
            </span>
            <span v-else-if="list.dict">{{getDictLabel(projectData[list.name], dictMap[list.name])}}</span>
            <span v-else-if="projectData[list.name]">{{projectData[list.name]}}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { setUpOption, dictMap, getDictLabel } from './options'

export default {
  props: {
    projectData: {
      type: Object,
    },
  },
  data () {
    return {
      itemList: setUpOption,
      dictMap,
      getDictLabel,
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

