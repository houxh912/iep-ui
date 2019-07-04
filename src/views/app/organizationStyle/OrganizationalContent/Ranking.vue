<template>
  <div class="ranking">
    <el-card shadow="never">
      <div class="labs-con">
        <div class="data-lab" v-for="(lab, index) in labList" :key="index">
          <div class="count">{{OrgAssets[lab.prop]}}</div>
          <div class="labTitle"><span>{{lab.labTitle}}</span></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getOrgAssetsById } from '@/api/fams/statistics'
export default {
  data () {
    return {
      OrgAssets: {
        hyd: 0,
        sjzc: 0,
        xyz: 0,
        zcpm: 0,
      },
      labList: [
        {
          prop: 'xyz',
          labTitle: '信用值',
        },
        {
          prop: 'hyd',
          labTitle: '活跃度',
        },
        {
          prop: 'zcpm',
          labTitle: '资产排名',
        },
        {
          prop: 'sjzc',
          labTitle: '数据资产',
        },
      ],
    }
  },
  methods: {
    getOrgAssetsById (id) {
      getOrgAssetsById(id).then(({data}) => {
        this.OrgAssets = data.data
      })
    },
  },
  created () {
    this.getOrgAssetsById(this.$route.params.id)
  },
}
</script>
<style lang="scss" scoped>
.ranking {
  margin-bottom: 30px;
  .el-card {
    background: none;
    background-color: whitesmoke;
    border: 0;
  }
  .labs-con {
    display: flex;
    justify-content: space-between;
    .count {
      font-size: 24px;
    }
    .data-lab {
      padding: 0 10px;
      border-right: 1px solid #eee;
      text-align: center;
      .labTitle {
        color: #999;
      }
      &:nth-child(4) {
        border: 0;
      }
    }
  }
}
</style>
<style scoped>
.ranking >>> .el-card__body {
  padding: 15px;
}
</style>
