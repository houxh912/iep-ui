<template>
  <div>
    <el-collapse v-model="activeNames" class="appraise">
      <el-collapse-item :title="appraise.time" :name="index" v-for="(appraise,index) in appraiseList" :key="index">
        <el-card shadow="never" v-for="(child, index2) in appraise.childList" :key="index2">
          <div class="conList">
            <div class="img"><iep-img :src="child.avatar" alt=""></iep-img></div>
            <div class="con">
              <h4>
                <span class="name">{{child.creatorName}}</span>
                <!-- <span class="department">{{child.department}}</span> -->
                <span class="time">
                  {{dateFormat(child.createTime)}}
                </span>
              </h4>
                <div>{{child.content}}</div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getOrgevaluatePage } from '@/api/admin/orgEvaluate'
import { dateFormat } from '@/util/date'
export default {
  data () {
    return {
      textarea: '',
      activeNames: [],
      appraiseList: [],
      params: {
        current: 1,
        size: 10,
        orgId: '',
      },
      total: 0,
      dateFormat,
    }
  },
  methods: {
    loadPage () {
      getOrgevaluatePage(this.params).then(({data}) => {
        if (data.data) {
          this.appraiseList = this.dealWithList(data.data.records)
          this.total = data.data.total
        }
      })
    },
    dealWithList (row) {
      if (row.length === 0) { // 不存在评价
        return []
      } else { // 存在评价
        let time = ''
        let obj = {
          time: '',
          childList: [],
        }
        let array = []
        for (let item of row) {
          if (dateFormat(item.createTime, 'yyyy-MM') === time) { // 当前月份已经存在
            obj.childList.push(item)
          } else { // 当前月份不存在，新建对象
            if (obj.time) { // 存在月份，，即不是第一次遍历进来，需要将原有的数据push进去数组
              array.push(obj)
              this.activeNames.push(array.length - 1)
            }
            time = dateFormat(item.createTime, 'yyyy-MM')
            obj = {
              time: time,
              childList: [item],
            }
          }
        }
        array.push(obj)
        this.activeNames.push(array.length - 1)
        return array
      }
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    this.params.orgId = this.$route.query.id
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.appraise {
  padding: 20px;
  .el-timeline {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    .shrink {
      position: absolute;
      top: 5px;
      left: 70px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .department,
  .subTime {
    margin-left: 5px;
    font-weight: 400;
    color: #999;
  }
  .subTime {
    flex: 2;
  }
  .conList {
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ebeef5;
    .con {
      flex: 2;
      margin-left: 20px;
      h4 {
        align-items: center;
      }
    }
  }
  .input {
    textarea {
      border: 0;
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #333;
  }
  .time {
    float: right;
    color:#999;
  }
  .img {
    width: 60px;
    height: 60px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .el-card {
    border: 0;
  }
}
</style>

<style scoped>
.appraise >>> .el-collapse-item__arrow{
  margin: 0 auto 0 8px;
}
.appraise>>>.el-collapse-item__content{
  padding-bottom: 0;
}
.appraise>>>.el-collapse-item__wrap{
  border-bottom: none;
}
.appraise >>> .el-upload-dragger{
  padding: 30px 100px 38px;
  width:inherit;
  height:inherit;
}
.appraise >>> .el-upload__text{
  line-height: 22px;
  color:#999;
}
.appraise >>> .el-collapse-item__header{
  font-size: 16px;
  color:#333;
}
</style>
