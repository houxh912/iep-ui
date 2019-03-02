<template>
  <div class="myCustom">
    <info-column class="info-head"></info-column>
    <el-row class="info-middle">
      <el-col class="info-left" :span=14>
        <survey-column class="survey-column"></survey-column>
        <remind-column class="remind-column"></remind-column>
      </el-col>
      <el-col :span=10>
        <contract-colmun class="contract-colmun"></contract-colmun>
      </el-col>
    </el-row>
    <custom-column class="custom-column"></custom-column>
  </div>
</template>

<script>
import InfoColumn from './component/infoColumn'
import SurveyColumn from './component/surveyColumn'
import RemindColumn from './component/remindColumn'
import ContractColmun from './component/contractColumn'
import CustomColumn from './component/customColumn'
export default {
  name: 'myCustom',
  components: { InfoColumn, SurveyColumn, RemindColumn, ContractColmun, CustomColumn },
  data () {
    return {
      infoList: {
        name: '某某某',
        num: 12,
        cent: '30%',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.myCustom {
  .info-head {
    margin-bottom: 25px;
  }
  .info-middle {
    .info-left {
      padding-right: 20px;
    }
    .survey-column {
      height: 120px;
    }
    .remind-column {
      height: 200px;
    }
    .contract-colmun {
      height: 320px;
    }
  }
  .custom-column {
    height: 200px;
  }
}
</style>
