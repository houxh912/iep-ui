<template>
  <div class="evaluate">
    <div>
      <div v-if="list.length !== 0">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(item, index) in list" :key="index" :title="item.time" :name="index">
            <div v-for="(t, i) in item.list" :key="i" class="item">
              <div class="avatar">
                <iep-img :src="t.avatar" class="img"></iep-img>
              </div>
              <div class="content">
                <div class="head">
                  <div class="left">
                    <div class="name">{{t.creatorName}}</div>
                    <div class="time">{{t.updateTime}}</div>
                  </div>
                  <div class="right">
                    <i class="icon-bianji" @click="handleUpdate(t)"></i>
                    <i class="icon-guanbi" @click="handleDelete(t)"></i>
                  </div>
                </div>
                <div class="area">{{t.content}}</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <IepNoData v-else></IepNoData>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
    <!-- 修改 -->
    <formDialog ref="form" @load-page="formLoadPage"></formDialog>
  </div>
</template>

<script>
import { getOrgevaluatePage, orgEvaluateDelete } from '@/api/admin/orgEvaluate'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/util/date'
import formDialog from './formDialog'
export default {
  components: { formDialog },
  data () {
    return {
      list: [],
      params: {
        current: 1,
        size: 10,
        orgId: '',
        content: '',
        createTime: '',
        updateTime: '',
      },
      total: 0,
      activeNames: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    loadPage () {
      getOrgevaluatePage(this.params).then(({ data }) => {
        if (data.data) {
          this.list = this.dealWithList(data.data.records)
          this.total = data.data.total
        }
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    // 根据时间分组
    dealWithList (row) {
      let list = []
      let obj = { time: dateFormat(row[0].createTime, 'yyyy-MM'), list: [] }
      this.activeNames = [0]
      for (let index in row) {
        let item = row[index]
        let startTime = dateFormat(item.createTime, 'yyyy-MM')
        if (obj.time == startTime) {
          obj.list.push(item)
        } else {
          this.activeNames.push(this.activeNames[this.activeNames.length - 1] + 1)
          list.push(obj)
          obj = { time: startTime, list: [item] }
        }
      }
      list.push(obj)
      return list
    },
    handleChange (val) {
      console.log(val)
    },
    handleDelete (row) {
      this.$confirm('是否确认删除此条评价', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        orgEvaluateDelete(row.id).then(({ data }) => {
          if (data.data) {
            this.$message.success('删除成功！')
            this.loadPage()
          } else {
            this.$mesage.error('操作出现问题，请重试！')
          }
        })
      }).catch(() => { })
    },
    handleUpdate (row) {
      this.$refs['form'].open(row)
    },
    formLoadPage (type) {
      if (type) {
        this.loadPage()
      }
    },
  },
  created () {
    this.params.orgId = this.userInfo.orgId
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.evaluate {
  padding: 0 70px 10px 30px;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    .avatar {
      margin-right: 10px;
      width: 70px;
      .img {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .content {
      flex: 1;
      padding: 0;
      .head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .left {
          display: flex;
          .name {
            margin-right: 30px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .right {
          i {
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $--menu-color-primary;
            }
          }
        }
      }
    }
  }
  .item:last-of-type {
    margin-bottom: 0;
  }
}
</style>

<style scoped>
.evaluate >>> .el-collapse-item__content {
  padding: 0;
}
.evaluate >>> .el-collapse-item__header {
  font-size: 18px;
  font-weight: 100;
  height: 70px;
}
</style>
