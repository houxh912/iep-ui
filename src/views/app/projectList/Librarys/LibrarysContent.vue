<template>
  <div class="librarys-content">
    <IepNoData v-if="dataList.length === 0"></IepNoData>
    <div v-else>
      <div class="content-page">
        <div v-for="(item,index) in dataList" :key="index" class="piece">
          <a-skeleton :loading="loading" active />
          <div v-if="!loading" style="cursor: pointer;" @click="handleOpen(item)">
            <div class="title">
              <span class="stage" v-if="item.projectStage==1">初步意向</span>
              <span class="stage" v-else-if="item.projectStage==2">方案提交</span>
              <span class="stage" v-else-if="item.projectStage==3">正在执行</span>
              <span class="stage" v-else>项目完结</span>
              <h4 class="name">{{item.projectName}}</h4><span class="sub-title">{{item.serialNo}}</span>
            </div>
            <div class="item">
              <span class="label">项目等级：{{transform(item.projectLevel, 'prms_project_level')}}</span>
            </div>
            <div class="item">
              <span class="label">项目经理：{{item.manager}}</span>
            </div>
            <div class="box">
              <span class="label">项目类型：{{transform(item.projectType, 'prms_project_type')}}</span>
              <span><i class="iconfont icon-shijian"></i>{{dateFormat(item.publishTime)}}</span>
              <el-tag type='info' v-for="(tag, index) in item.projectTagList.slice(0,5)" :key="index">{{tag}}</el-tag>
            </div>
          </div>
          <iep-button class="pk-btn" type="danger" plain @click="joinPK(item)" :disabled="item.isClick==true">加入pk</iep-button>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectPage } from '@/api/app/prms/'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { dateFormat } from '@/util/date'

export default {
  data () {
    return {
      loading: true,
      dataList: [],
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      dateFormat,
      idList: [],
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    ...mapState({
      alreadyList: state => state.gpms.dataList,
    }),
  },
  methods: {
    ...mapMutations({
      setProjectJoinPk: 'SET_PROJECT_JOIN_PK',
    }),
    transform (value, dict) {
      if (value == '') return '暂无'
      for (let item of this.dictGroup[dict]) {
        if (item.value === value) {
          return item.label
        }
      }
      return value
    },
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/project_list/project_details/${row.id}`,
      })
    },
    loadPage () {
      this.loading = true
      getProjectPage(Object.assign({}, this.paramForm, this.params)).then(({ data }) => {
        // this.dataList = data.data.records.map(m => {
        //   return {
        //     ...m,
        //     isClick: false,
        //   }
        // })
        this.dataList = data.data.records
        this.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    joinPK (val) {
      let already = false
      for (var i = this.alreadyList.length - 1; i > -1; i--)
        if (this.alreadyList[i].id == val.id) {
          already = true
        }
      if (already) {
        this.$message.error('您已添加此项目，请勿重复添加！')
      }
      else {
        const joinObject = { id: val.id, projectName: val.projectName, isClick: true }
        this.setProjectJoinPk(joinObject)
      }
      // this.idList.push(val.id)
      // getProjectJoinList(this.idList).then(({ data }) => {
      //   this.$emit('joinUpOne', data, this.idList, true)
      // })
      this.$emit('joinUpOne', this.idList)
      // val.isClick = true
    },
  },
  created () {
    if (this.$route.query.id) {
      this.params.orgId = this.$route.query.id
    }
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.content-page {
  min-height: 320px;
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .label {
      margin-right: 20px;
      margin-bottom: 5px;
    }
  }
}
.stage {
  margin-right: 10px;
  padding: 1px 6px;
  font-size: 12px;
  color: #cb3737;
  background: #fef0f0;
  border: 1px solid #cb3737;
  border-radius: 3px;
}
.piece {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  position: relative;
  & > p {
    font-size: 14px;
    color: #666;
    line-height: 28px;
  }
}
.title {
  .name {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    font-size: 18px;
    color: #333;
    &:hover {
      color: #cb3737;
    }
  }
  i {
    margin-right: 10px;
    font-size: 22px;
    color: #aaa;
    vertical-align: -2px;
  }
  .sub-title {
    font-size: 12px;
  }
}
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    line-height: 24px;
    color: #aaa;
    i {
      margin-right: 5px;
      font-size: 16px;
      color: #aaa;
      vertical-align: -2px;
    }
  }
}
.pk-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
<style scoped>
.librarys-content >>> .el-tag--info {
  background-color: #fff;
}
.librarys-content >>> .el-tag {
  height: 28px;
  margin-right: 10px;
}
</style>

