<template>
  <div class="events">
    <i class="el-icon-time"></i>
    <span class="line"></span>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="events.time" :name="index" class="item" v-for="(events,index) in eventsList" :key="index">
        <el-timeline>
          <el-timeline-item v-for="activity in events.activities" :key="activity.id" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            <h3 class="title">{{activity.title}}</h3>
            <div class="content">{{activity.content}}</div>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getOrgEventsByOrgId } from '@/api/admin/orgEvents'
import { dateFormat } from '@/util/date'
export default {
  data () {
    return {
      activeNames: [],
      eventsList: [],
    }
  },
  methods: {
    getOrgEventsByOrgId (id) {
      getOrgEventsByOrgId(id).then(({data}) => {
        let row = data.data
        if (row.length === 0) { // 不存在大事件
          this.eventsList = []
        } else { // 存在大事件
          let time = ''
          let obj = {
            time: '',
            activities: [],
          }
          for (let item of row) {
            if (dateFormat(item.happenTime, 'yyyy') === time) { // 当前年份已经存在
              obj.activities.push({
                title: item.title,
                content: item.content,
                timestamp: dateFormat(item.happenTime, 'MM-dd'),
              })
            } else { // 当前年份不存在，新建对象
              if (obj.time) { // 存在年份，，即不是第一次遍历进来，需要将原有的数据push进去数组
                this.eventsList.push(obj)
                this.activeNames.push(this.eventsList.length - 1)
              }
              time = dateFormat(item.happenTime, 'yyyy')
              obj = {
                time: time,
                activities: [{
                  title: item.title,
                  content: item.content,
                  timestamp: dateFormat(item.happenTime, 'MM-dd'),
                }],
              }
            }
          }
          this.eventsList.push(obj)
          this.activeNames.push(this.eventsList.length - 1)
        }
      })
    },
  },
  created () {
    this.getOrgEventsByOrgId(this.$route.query.id)
  },
}
</script>
<style lang="scss" scoped>
.events {
  position: relative;
  margin: 20px 80px;
  .item {
    position: relative;
  }
  .line {
    position: absolute;
    top: 10px;
    left: 84px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: #ddd;
    z-index: 1;
  }
  .el-icon-time {
    position: absolute;
    top: 10px;
    left: 70px;
    font-size: 30px;
    color: #ddd;
    background: #fff;
    z-index: 2;
  }
  .content {
    color: #999;
    font-size: 12px;
  }
}
</style>
<style scoped>
.events >>> .el-timeline-item__node {
  border: 1px solid #ddd;
  border-radius: 50%;
  z-index: 3;
}
.events >>> .el-timeline {
  margin-left: 40px;
}
.events >>> .el-timeline-item__timestamp {
  position: absolute;
  top: 5px;
  left: -50px;
  margin: 0;
}
.events >>> .el-collapse-item__arrow {
  margin: 0 auto 0 8px;
}
.events >>> .el-collapse-item__header,
.events >>> .el-collapse,
.events >>> .el-collapse-item__wrap {
  border: 0;
}
.events >>> .el-collapse-item__wrap {
  overflow: inherit;
}
.events >>> .el-timeline-item:hover .el-timeline-item__content {
  color: #cb3737;
  transition: all 0.5s;
}
.events >>> .el-timeline-item:hover .el-timeline-item__node {
  border-color: #cb3737;
  transition: all 0.5s;
}
.events >>> .el-timeline-item__tail {
  border-width: 1px;
}
.events >>> .el-timeline-item__node--normal {
  position: relative;
  top: 16px;
  left: -2px;
  width: 14px;
  height: 14px;
  background-color: #fff;
}
.events >>> .el-timeline-item__node--normal::before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.5s;
}
.events >>> .el-timeline-item:hover .el-timeline-item__node--normal::before {
  background-color: #cb3737;
}
</style>
