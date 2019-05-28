<template>
  <div class="tag-data-box">
    <el-row :gutter="20">
      <el-col :md="span" :xs="24" :sm="12" v-for="(item,index) in data" :key="index">
        <div class="item">
          <div class="item-icon" :style="{backgroundColor:item.color}">
            <i :class="item.icon"></i>
          </div>
          <div class="item-info">
            <div :style="{color:item.color}" class="title">{{item.count}}</div>
            <div class="info">{{item.title}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'TagDataBox',
  props: {
    option: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    span () { return this.option.span || 8 },
    data () { return this.option.data || [] },
  },
}
</script>
<style scoped>
.tag-data-box .item {
  display: flex;
}
.tag-data-box .item-icon i {
  font-size: 48px !important;
}
.tag-data-box .item-info .title {
  font-size: 30px;
  line-height: 40px;
  text-align: center;
}
.tag-data-box .item-info .info {
  color: #999;
  font-size: 14px;
  text-align: center;
}
.tag-data-box .item-icon {
  width: 100px;
  height: 100px;
  color: #fff;
  text-align: center;
  line-height: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.tag-data-box .item-info {
  border: 1px solid #eee;
  border-left: none;
  background-color: #fff;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
