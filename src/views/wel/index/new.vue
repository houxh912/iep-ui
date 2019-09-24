<template>
  <div class="wel-content-grid-wrapper">
    <account></account>
    <quick></quick>
    <notice></notice>
    <instruction></instruction>
    <system v-if="false"></system>
    <material></material>
    <wealth></wealth>
    <in-box v-if="false"></in-box>
    <report v-if="false"></report>
    <my-data></my-data>
    <task v-if="false"></task>
    <relationship></relationship>
    <business></business>
    <opportunity></opportunity>
    <training v-if="false"></training>
    <project></project>
    <find-project></find-project>
  </div>
</template>

<script>

import Account from './Components/Account'
import Quick from './Components/Quick'
import Notice from './Components/Notice'
import Instruction from './Components/Instruction'
import System from './Components/System'
import Wealth from './Components/Wealth'
import InBox from './Components/InBox'
import Report from './Components/Report'
import Material from './Components/Material'
import MyData from './Components/Data'
import Task from './Components/Task'
import Relationship from './Components/Relationship'
import Business from './Components/Business'
import Opportunity from './Components/Opportunity'
import Training from './Components/Training'
import Project from './Components/Project'
import FindProject from './Components/FindProject'
export default {
  components: {
    Account,
    Quick,
    Notice,
    Instruction,
    System,
    Wealth,
    InBox,
    Report,
    Material,
    MyData,
    Task,
    Relationship,
    Business,
    Opportunity,
    Training,
    Project,
    FindProject,
  },
}
</script>

<style lang="scss" scoped>
// 注意，设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
.wel-content-grid-wrapper {
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  // grid-template-rows: 200px repeat(auto-fit, 250px);
  grid-template-rows:
    160px
    repeat(auto-fill, 220px);
  grid-gap: 20px;
  background-color: #eee;
  > div {
    height: 220px;
    background-color: #fff;
    &:nth-child(1),
    &:nth-child(2) {
      height: 160px;
    }
  }
}
</style>
