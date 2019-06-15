<template>
  <div>
    <IepAppListCard :dataList="dataList.slice(0, 6)" @click="handleDetail">
      <iep-button type="" plain class="lr-btn" disabled>JAVA规范认定</iep-button>
      <iep-button type="" plain class="lr-btn" disabled>产品能力认证</iep-button>
    </IepAppListCard>
  </div>
</template>
<script>
import { getMaterialList } from '@/api/app/mlms/'
export default {
  data () {
    return {
      title: '学习资源',
      dataList: [
        '20190323北京市政务服务事项标准化和主题事项持续优化项目介绍',
        '20190314研发中心测试组赵雨晨培训如何应用阿里云和腾讯云云测试工具进行性能测试',
        '20190306研发中心俞泽益培训如何提高人员文档撰写能力及撰写规范',
        '20190226陈振辉给佛山技术团队培训国脉GDS微服务开发框架',
        '20190226区块链点对点技术实现电子现金系统技术培训',
        '北京市政务服务（公共服务）事项规范填报说明培训'],
    }
  },
  methods: {
    loadList () {
      getMaterialList().then(({data}) => {
        this.dataList = data.data.rlxx ? data.data.rlxx.map((m) => {return {name: m.material_name,id: m.id}}) : []
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.lr-btn {
  margin: 15px 30px;
}
</style>
