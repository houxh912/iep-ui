<template>
  <iep-fams-card title="待处理">
    <div class="processing-wrapper">
      <div class="processing-data">
        <a-list itemLayout="horizontal" :dataSource="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
              <div slot="description" class="description">
                <div>向<a href="#">{{item.place}}</a>提交了<a href="#">{{item.type}}</a></div>
                <div>{{item.time}}</div>
              </div>
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
      <a-list class="processing-select" :grid="{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }" :dataSource="selectMap">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>{{item.label}}({{item.value}})</a-card>
        </a-list-item>
      </a-list>
    </div>
  </iep-fams-card>
</template>
<script>
import IepFamsCard from './IepFamsCard'
export default {
  components: { IepFamsCard },
  data () {
    return {
      data: [
        {
          title: '王军辉',
          place: '舟山研发中心',
          type: '报销申请',
          time: '2011.11.11',
        },
        {
          title: '王军辉',
          place: '舟山研发中心',
          type: '报销申请',
          time: '2011.11.11',
        },
        {
          title: '王军辉',
          place: '舟山研发中心',
          type: '报销申请',
          time: '2011.11.11',
        },
        {
          title: '王军辉',
          place: '舟山研发中心',
          type: '报销申请',
          time: '2011.11.11',
        },
      ],
      selectMap: [
        { label: '提现', value: 75 },
        { label: '发票', value: 75 },
        { label: '开票', value: 75 },
        { label: '组织拆借', value: 75 },
        { label: '资金调拨', value: 75 },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  justify-content: space-between;
}
.processing-wrapper {
  display: flex;
  .processing-select {
    flex: 1;
  }
  .processing-data {
    border-right: 1px solid #e8e8e8;
    padding-right: 15px;
    margin-right: 15px;
    flex: 2;
  }
}
</style>
